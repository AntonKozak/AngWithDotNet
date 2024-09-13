using Core.Entities;

namespace API.DTOs;

public class UserDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Address? Address { get; set; }
}
