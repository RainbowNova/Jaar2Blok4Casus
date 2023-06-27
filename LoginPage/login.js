document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById("email").value.toLowerCase();
    const password = document.getElementById("password").value;

    // Prepare the data object
    const data = {
      "email": email.toLowerCase(),
      "password": password
    };
    console.log(data);
    
    try {
      const response = await fetch(`https://dampbackendapi.azurewebsites.net/api/Accounts/email/${email.replace(/@/g, "%40")}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const account = await response.json();
        let found = false;
        if (account.email == email && account.password == password) {
          sessionStorage.setItem("user", JSON.stringify(account));
          console.log("Login successful");
          window.location.href = "../index.html";
          found = true;
        }

        if (!found) {
          alert("Login failed, please try again");
        }
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    loginForm.reset();
  });
});
