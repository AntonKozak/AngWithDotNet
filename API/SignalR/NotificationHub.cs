using System.Collections.Concurrent;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class NotificationHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> UserConnections = new();

    public override Task OnConnectedAsync()
    {
        var email = Context.User?.FindFirstValue(ClaimTypes.Email);

        if (!string.IsNullOrEmpty(email)) UserConnections[email] = Context.ConnectionId;
        Console.WriteLine($"User {email} connected with connection id {Context.ConnectionId} SignalR OnConnectedAsync");

        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var email = Context.User?.FindFirstValue(ClaimTypes.Email);

        if (!string.IsNullOrEmpty(email)) UserConnections.TryRemove(email, out _);

        return base.OnDisconnectedAsync(exception);
    }

    public static string? GetConnectionIdByEmail(string email)
    {
        UserConnections.TryGetValue(email, out var connectionId);
        Console.WriteLine($"User {email} has connection id {connectionId} SignalR GetConnectionIdByEmail");
        return connectionId;

    }

}
