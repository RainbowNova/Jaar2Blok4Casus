function loadUserData() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const username = document.getElementById("username");
    username.textContent = user.username;
}

function CreateFriend() {

    const DivContainer = document.getElementById("friend-container");

    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.style.display = "inline-block";
    newDiv.style.maxWidth = "31%";
    newDiv.style.background = "rgba(48, 41, 144, 0.514)";
    newDiv.style.borderRadius = "5px";
    newDiv.style.margin = "1%";

    const smallIcon = document.createElement("div");
    smallIcon.classList.add("smallIcon");
    const ionIcon = document.createElement("ion-icon");
    ionIcon.setAttribute("name", "person");
    smallIcon.appendChild(ionIcon);

    const usernameDiv = document.createElement("div");
    usernameDiv.style.textAlign = "center";
    usernameDiv.textContent = "New Friend";

    newDiv.appendChild(smallIcon);
    newDiv.appendChild(usernameDiv);
    DivContainer.appendChild(newDiv);
    UsersInFriendsList == 0;

}


if (sessionStorage.getItem("user") == null) {
    window.location.href = "../LoginPage/login.html";
}

else {
    loadUserData();
}


