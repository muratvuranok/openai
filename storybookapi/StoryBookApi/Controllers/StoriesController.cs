using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OpenAI.Chat;
using OpenAI.Images;
using StoryBookApi.Context;
using StoryBookApi.Models;
using System.ClientModel;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;
    public StoriesController(
        IConfiguration configuration,
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager
        )
    {
        this._context = context;
        this._userManager = userManager;
        this._configuration = configuration;

    }

    [HttpGet("GetStory")]
    public string GetStory([FromBody] StoryCreateDto story)
    {

        #region Prompt
        var prompt = $@"
Write a {story.StoryType} story about a {story.PetType} named {story.PetName} who is {story.PetAge} years old. The story is set in {story.StorySetting}. Make sure the story is engaging and suitable for all ages. Story language should be {story.Language}.

**Story Title:**
Create an engaging and suitable title for the story.

**Introduction:**
Introduce {story.PetName}, a {story.Color} {story.PetType}, in the {story.StorySetting}. Describe the initial setting and the pet's appearance and personality.

**The Beginning of the Adventure:**
Describe how {story.PetName} starts their adventure. Show the pet exploring new parts of the {story.StorySetting} and encountering the first magical or exciting elements.

**A Significant Encounter:**
Describe a significant encounter or discovery that {story.PetName} makes. This could be meeting a new friend, discovering a hidden place, or finding a magical object.

**The Challenge:**
Describe a challenge or obstacle that {story.PetName} faces. Show how the pet uses their bravery and intelligence to overcome this challenge.

**The Resolution:**
Conclude the story with {story.PetName} achieving a significant milestone or making a meaningful change. Reflect on the adventure and describe how the pet has grown or what they have learned.

Make sure each section is detailed enough to create a vivid mental image, and ensure that the story remains engaging and suitable for all ages. Each section must start with the specified headings: **Introduction:**, **The Beginning of the Adventure:**, **A Significant Encounter:**, **The Challenge:**, **The Resolution:**.
";
        #endregion

        return prompt;
    }


    [HttpGet("GetAllStories")]
    public async Task<IActionResult> GetAllStories()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        if (currentUser == null)
        {
            return Unauthorized();
        }

        var stories = _context.Stories.Where(x => x.ApplicationUserId == currentUser.Id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.ImageUrl,
                Scenes = x.Scenes.Select(s => new
                {
                    s.ImageUrl,
                    s.Description
                }).ToList()
            })
            .ToList();

        return Ok(stories);
    }

    [HttpPost(Name = "AskGPT")]
    public async Task<IActionResult> Post(StoryCreateDto story)
    {
        try
        {
            #region Prompt
            var prompt = $@"
Write a {story.StoryType} story about a {story.PetType} named {story.PetName} who is {story.PetAge} years old. The story is set in {story.StorySetting}. Make sure the story is engaging and suitable for all ages. Story language should be {story.Language}.

**Title:**
Create an engaging and suitable title for the story.

**Introduction:**
Introduce {story.PetName}, a {story.Color} {story.PetType}, in the {story.StorySetting}. Describe the initial setting and the pet's appearance and personality.

**The Beginning of the Adventure:**
Describe how {story.PetName} starts their adventure. Show the pet exploring new parts of the {story.StorySetting} and encountering the first magical or exciting elements.

**A Significant Encounter:**
Describe a significant encounter or discovery that {story.PetName} makes. This could be meeting a new friend, discovering a hidden place, or finding a magical object.

**The Challenge:**
Describe a challenge or obstacle that {story.PetName} faces. Show how the pet uses their bravery and intelligence to overcome this challenge.

**The Resolution:**
Conclude the story with {story.PetName} achieving a significant milestone or making a meaningful change. Reflect on the adventure and describe how the pet has grown or what they have learned.

Make sure each section is detailed enough to create a vivid mental image, and ensure that the story remains engaging and suitable for all ages. Each section must start with the specified headings: **Title:**, **Introduction:**, **The Beginning of the Adventure:**, **A Significant Encounter:**, **The Challenge:**, **The Resolution:**
";
            #endregion

            string[] splitters = {
                "**Title:**",
                "**Introduction:**",
                "**The Beginning of the Adventure:**",
                "**A Significant Encounter:**",
                "**The Challenge:**",
                "**The Resolution:**"
            };



            ChatClient client = new(model: _configuration["OpenAI:Model"],
                credential: _configuration["OpenAI:ApiKey"]);

            ClientResult<ChatCompletion> completion = client.CompleteChat(prompt);
             

            string[] parts = completion.Value.Content[0].Text.Split(splitters, StringSplitOptions.None);


            var result = await CreateImages(new StoryPrompt
            {
                PetName = story.PetName,
                PetType = story.PetType,
                PetAge = story.PetAge,
                StorySetting = story.StorySetting,
                StoryType = story.StoryType,
                Language = story.Language,
                Color = story.Color,
                Story = completion.Value.Content[0].Text
            });

            var currentUser = await _userManager.GetUserAsync(User);
            var currentStory = new Story
            {
                Title = parts[0].Replace("**", "").Replace("Title:", ""),
                ImageUrl = result[0],
                ApplicationUserId = currentUser.Id,
                Scenes = parts[1..].Where(x => x.Length > 1)
                .Select((value, index) => new { value, index })
                .Select(part => new Scene
                {
                    Description = part.value,
                    ImageUrl = result[1..][part.index]
                }).ToList()
            };

            _context.Stories.Add(currentStory);
            await _context.SaveChangesAsync();


            var response = new
            {
                currentStory.Id,
                currentStory.Title,
                currentStory.ImageUrl,
                ApplicationUserId = currentUser.Id,
                Scenes = currentStory.Scenes.Select(s => new
                {
                    s.ImageUrl,
                    s.Description
                }).ToList()
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private async Task<string[]> CreateImages(StoryPrompt story)
    {
        string[] prompts = {
    $"Cover: Create a cover image for the story featuring {story.PetName}, a {story.Color} {story.PetType}, in the {story.StorySetting}. The cover should be captivating and set the tone for the adventure, showcasing key elements such as the pet and a hint of the setting. Ensure the scene is in a single frame.",
    $"Scene 1: Introduce {story.PetName}, a {story.Color} {story.PetType} who is {story.PetAge} years old, in the {story.StorySetting}. Show the pet in a peaceful and serene part of the setting, such as under a large tree with twisted branches, resembling a mystical guardian. Ensure the scene is in a single frame.",
    $"Scene 2: {story.PetName} starts their adventure, exploring new and exciting parts of the {story.StorySetting}. Include magical or fantastical elements to highlight the adventure, such as glowing lights and mysterious paths in the moonlit forest. Ensure the scene is in a single frame.",
    $"Scene 3: {story.PetName} encounters a significant landmark or character related to the {story.StoryType}. This could be a hidden cottage or a wise guide within the forest, surrounded by tall pine trees and mountain views. Ensure the scene is in a single frame.",
    $"Scene 4: {story.PetName} faces a challenge or obstacle in the {story.StorySetting}, showcasing their bravery and determination. For example, navigating through a dense, foggy area of the forest at night. Ensure the scene is in a single frame.",
    $"Scene 5: Conclude the story with {story.PetName} achieving a significant milestone or making a new friend, reflecting on their adventure in the {story.StorySetting}. This could be in front of the moonlit mountain range, symbolizing the journey's end. Ensure the scene is in a single frame."
};


        string bearerToken = _configuration["OpenAI:ApiKey"];
        ImageClient client = new(model: _configuration["OpenAI:ImageModel"], bearerToken);

        ImageGenerationOptions options = new()
        {
            Quality = GeneratedImageQuality.High,
            Size = GeneratedImageSize.W1792xH1024,
            Style = GeneratedImageStyle.Vivid,
            ResponseFormat = GeneratedImageFormat.Bytes,
        };

        List<string> images = new();
        foreach (var prompt_ in prompts.Select((v, i) => (v, i)))
        {
            string prompt = $@"
            Create an enchanting and adventurous scene based on the following story details:
        
            Pet Type: {story.PetType}
            Pet Name: {story.PetName}
            Pet Age: {story.PetAge}
            Story Setting: {story.StorySetting}
            Story Type: {story.StoryType}
            Language: {story.Language}
            Dominant Color: {story.Color}

            {prompt_.v}

            Ensure the scene is in a single frame and visually consistent with the rest of the scenes.";

            GeneratedImage image = client.GenerateImage(prompt, options);
            BinaryData bytes = image.ImageBytes;

            string fileName = await SaveImageToFile(bytes, prompt_.i);

            images.Add(fileName);
        }
        return images.ToArray();
    }

    private async Task<string> SaveImageToFile(BinaryData binaryData, int index)
    {
        byte[] bytes = binaryData.ToArray();

        string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
        Directory.CreateDirectory(directoryPath);
        string imageName = $"{Guid.NewGuid()}.png";
        string fileName = Path.Combine(directoryPath, imageName);

        using (FileStream stream = new FileStream(fileName, FileMode.Create, FileAccess.Write))
        {
            await stream.WriteAsync(bytes, 0, bytes.Length);
        }

        return imageName;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var story = _context.Stories.FirstOrDefault(x => x.Id == id);
        if (story == null)
        {
            return NotFound();
        }

        _context.Stories.Remove(story);
        await _context.SaveChangesAsync();

        return Ok(id);
    }
}