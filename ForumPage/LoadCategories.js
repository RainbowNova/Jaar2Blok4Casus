// Function to fetch categories from the API
async function fetchCategories() {
    try {
      const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Categories');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
  
  // Function to create category elements dynamically
  function createCategoryElements(categories) {
    const categoryContainer = document.getElementById('category-container'); // Replace 'category-container' with the ID of the container element where you want to display the categories
  
    categories.forEach((category) => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category');
      categoryElement.innerHTML = `
        <h2>${category.title}</h2>
        <p>${category.description}</p>
      `;
  
      categoryContainer.appendChild(categoryElement);
    });
  }
  
  // Fetch categories and create category elements when the page loads
  window.addEventListener('load', async () => {
    const categories = await fetchCategories();
    createCategoryElements(categories);
  });
  