namespace StoryBookApi.Models;


public class StoryCreateDto
{ 
    public string PetType { get; set; }
    public string PetName { get; set; }
    public int PetAge { get; set; }
    public string StorySetting { get; set; }
    public string StoryType { get; set; }
    public string Language { get; set; }
    public string Color { get; set; } 
}
 

public class Story
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string ImageUrl { get; set; }
    public int ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public ICollection<Scene> Scenes { get; set; }
} 

public class Scene
{
    public int Id { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
     
    public int StoryId { get; set; }
    public Story Story { get; set; } 
}
 