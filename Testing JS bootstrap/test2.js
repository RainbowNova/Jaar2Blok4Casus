/* TODO: fill the divs with data, depending on which button is pressed. 
At minimum:
    Categories require a user with an Admin role to be logged in and a category name.
    Topics require a user with an Admin role to be logged in and a topic name and in which category it belongs.
    Posts require the user to be logged in, a title and description. */

// TODO: when creating a category, check if a category with the same name already exists. If yes, inform the user. If not, inform the user.
// TODO: when creating a topic, check if a topic with the same name already exists within the same category. Inform user.
// TODO: when a category, topic or post is succesfully created, all relevant data should be sent to the database.

// TODO: when a category, topic or post is created, all input fields should be sanitized / checked for injection / exploits.

const CategoryAdd = document.querySelector(".add-category");
const TopicAdd = document.querySelector(".add-topic");
const PostCreate = document.querySelector(".create-post");

const DivContainer = document.getElementById("div-container");

CategoryAdd.addEventListener("click", AddCategory);
TopicAdd.addEventListener("click", AddTopic);
PostCreate.addEventListener("click", CreatePost);

function AddCategory(){
    const newDiv = document.createElement("div");
    newDiv.classList.add('div-shadow');
    var content = document.createTextNode("New category name here");
    newDiv.appendChild(content);
    DivContainer.appendChild(newDiv);
}

function AddTopic(){
    const newDiv = document.createElement("div");
    newDiv.classList.add('div-shadow');
    var content = document.createTextNode("New topic name here");
    newDiv.appendChild(content);
    DivContainer.appendChild(newDiv);
}

function CreatePost(){
    const newDiv = document.createElement("div");
    newDiv.classList.add('div-shadow');
    var content = document.createTextNode("New post name here");
    newDiv.appendChild(content);
    DivContainer.appendChild(newDiv);
}