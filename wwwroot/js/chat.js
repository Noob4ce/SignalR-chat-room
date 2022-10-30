
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
console.log(connection)

var currentUser = document.querySelector("#currentUser").value;

console.log('hh')




//Disable send button until connection is established
$("#sendMessage").prop('disabled', true);

connection.on("Received", function (user, message) {

    var msg = message.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
    var encodedMsg = user + " : " + msg;
    var line = document.createElement("div")
    var p = document.createElement("p");
    p.textContent = encodedMsg;

    if (user == currentUser) {
        p.classList.add("ownMessage")
        p.classList.add("col-5")
        line.classList.add("justify-content-end")
    } else {
        p.classList.add("message")
        p.classList.add("col-5")
        line.classList.add("justify-content-start")
    }
    line.classList.add("row")
    line.append(p)
    $("#messageBox").append(line);
});

connection.on("Connected", function (user) {

    var line = document.createElement("div")
    var p = document.createElement("p");
    p.textContent = user + " has joined the chat";


    p.classList.add("notification-connected")
    p.classList.add("col-5")
    line.classList.add("justify-content-start")

    line.classList.add("row")
    line.append(p)
    $("#messageBox").append(line);
});

connection.start().then(function () {
    $("#sendMessage").prop('disabled', false);
    connection.invoke("Join", currentUser);
}).catch(function (err) {
    return console.error(err.toString());
});




document.querySelector("#sendMessage").addEventListener("click", () => {

    var sender = document.querySelector("#sender").value;
    var receiver = document.querySelector("#receiver").value;
    var message = document.querySelector("#message").value;


    if (receiver != "") {
        //send to a specific user
        connection.invoke("SendPrivateMessege", sender, receiver, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else {
        //send to all users
        connection.invoke("SendMessage", sender, message).catch(function (err) {
            return console.error(err.toString());
        });
    }


    event.preventDefault();
})
