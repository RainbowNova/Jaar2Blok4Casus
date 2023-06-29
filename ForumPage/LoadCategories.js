document.addEventListener('DOMContentLoaded', () => {
    createCategories();
    displayCategories();
  });

  // Function to fetch game data from the API
async function fetchGameData() {
    try {
      const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Games');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch game data: ${error}`);
    }
  }
  
  // Function to create categories based on game data
  async function createCategories() {
    try {
      const gameData = await fetchGameData();
      const categories = gameData.map((game) => ({
        title: game.name,
        description: game.description,
        gameId: game.id,
      }));
  
      // Send a POST request to create categories in the API
      const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categories),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      console.log('Categories created successfully');
    } catch (error) {
      console.error(`Failed to create categories: ${error}`);
    }
  }
  
  // Function to fetch categories from the API
  async function fetchCategories() {
    try {
      const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Categories');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch categories: ${error}`);
    }
  }
  
  // Function to display categories on the forum page
  async function displayCategories() {
    try {
      const categories = await fetchCategories();
      const forumContainer = document.getElementById('forum-container');
  
      // Clear existing content in the forum container
      forumContainer.innerHTML = '';
  
      // Create and append category elements to the forum container
      categories.forEach((category) => {
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `
          <h2>${category.title}</h2>
          <p>${category.description}</p>
          <p>Game ID: ${category.gameId}</p>
        `;
        forumContainer.appendChild(categoryElement);
      });
    } catch (error) {
      console.error(`Failed to display categories: ${error}`);
    }
  }
  
  // Call the functions to create categories and display them on the forum page
  createCategories();
  displayCategories();
  