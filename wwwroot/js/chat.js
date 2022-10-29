
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
console.log(connection)

var currentUser = document.querySelector("#currentUser").value;



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

connection.start().then(function () {
    $("#sendMessage").prop('disabled', false);
}).catch(function (err) {
    return console.error(err.toString());
});

document.querySelector("#sendMessage").addEventListener("click", () => {

    var sender = document.querySelector("#sender").value;
    var receiver = document.querySelector("#receiver").value;
    var message = document.querySelector("#message").value;


    if (receiver != "") {
        //send to a user
        connection.invoke("SendPrivateMessege", sender, receiver, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else {
        //send to all
        connection.invoke("SendMessage", sender, message).catch(function (err) {
            return console.error(err.toString());
        });
    }


    event.preventDefault();
})


//$("#sendMessage").click(function () {

//    var sender = $("#sender").val();
//    var receiver = $("#receiver").val();
//    var message = $("#message").val();

//    if (receiver != "") {
//        //send to a user
//        connection.invoke("SendMessageToGroup", sender, receiver, message).catch(function (err) {
//            return console.error(err.toString());
//        });
//    }
//    else {
//        //send to all
//        connection.invoke("SendMessage", sender, message).catch(function (err) {
//            return console.error(err.toString());
//        });
//    }


//    event.preventDefault();

//});
