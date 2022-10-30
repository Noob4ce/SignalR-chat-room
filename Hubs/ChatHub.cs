using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace chat_room.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("Received", user, message);
        }


        public Task SendPrivateMessege(string sender, string receiver, string message)
        {
            return Clients.Group(receiver).SendAsync("Received", sender, message);
        }

        public async Task Join (string user)
        {
            await Clients.All.SendAsync("Connected", user);
        }
    }
}
