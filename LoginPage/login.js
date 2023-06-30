document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const email = String(document.getElementById("email").value);
    const password = String(document.getElementById("password").value);

    // Prepare the data object
    const data = {
      "email": email,
      "password": password
    };
    console.log(data);

    const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Accounts', {
      method: 'GET',
      headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
      }
    });

    if (response.ok) {
      const accounts = await response.json();
      let accountFound = false;
    
      for (const account of accounts) {
        if (account.email === email && account.password === password) {
          sessionStorage.setItem("user", JSON.stringify(account));
          console.log("Login successful");
          accountFound = true;
          window.location.href = "../index.html";
          break;
        }
      }
    
      if (!accountFound) {
        console.log("Login failed");
        alert("Login failed"); 
      }
    } else {
      console.error('Error:', response.status);
    }
    
  });
});
