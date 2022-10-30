using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using chat_room.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.Components;
using System.Reflection;
using System.Net.NetworkInformation;

namespace chat_room.Pages
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly UserManager<IdentityUser> _userManager;

        [BindProperty]
        public List<SelectListItem> UserSelection { get; set; }

        [BindProperty]
        public string currentUser { get; set; }

        [BindProperty]
        public string _newMessage { get; set; }

        private string _hubUrl;

        private HubConnection _hubConnection;

        public IndexModel(ILogger<IndexModel> logger, UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }


        public async void OnGet()
        {
            //get all users from the database, to a selection list
            UserSelection = _userManager.Users.ToList().Select(user => new SelectListItem { Text = user.UserName, Value = user.UserName }).OrderBy(s => s.Text).ToList();


            //get the name of the current user
            currentUser = User.Identity.Name;




        }
        private class Message
        {
            public Message(string username, string body, bool isOwn)
            {
                Username = username;
                Content = body;
                IsOwn = isOwn;
            }
            public string Username { get; set; }
            public string Content { get; set; }
            public bool IsOwn { get; set; }

            public bool IsNotice => Content.StartsWith("[Notice]");

        }
    }
}