using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StoryBookApi.Models;

namespace StoryBookApi.Context;


public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Story> Stories { get; set; }
    public DbSet<Scene> Scenes { get; set; }
}