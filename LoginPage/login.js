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
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

        //testing purposes: DELETE CONSOLE LOGS LATER
      if (response.ok) {
        const accounts = await response.json();
        for(const account of accounts) {
            console.log(account);
            if (account.email == email && account.password == password) {
                console.log("Login successful");
                window.location.href = "../index.html";
            }
            else { 
                alert("Login failed, please try again")
            }
        };
        console.log('All accounts:', accounts);

      } else {
        console.error('Error:', response.status);
      }

      
    
        
    });
  });
  