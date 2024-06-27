using Microsoft.AspNetCore.Identity;

namespace StoryBookApi.Models;

public class ApplicationUser : IdentityUser<int> { }
public class ApplicationRole : IdentityRole<int> { }