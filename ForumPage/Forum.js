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

const DivContainer = document.getElementById("div-container");

CategoryAdd.addEventListener("click", AddCategory);

function AddCategory(){
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <script src="../components/category-table.js" type="text/javascript" defer></script>
    <category-table-component></category-table-component>
    `;
    DivContainer.appendChild(newDiv);
}