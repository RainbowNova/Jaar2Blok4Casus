document.addEventListener('DOMContentLoaded', () => {
    // Assuming you have an HTML form with the following fields: name, email, and password
    const registrationForm = document.getElementById("register-form");
  
    registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent form submission
      
      const name = String(document.getElementById("register-username").value);
      const email = String(document.getElementById("register-email").value);
      const password = String(document.getElementById("register-password").value);
      const adress = String(document.getElementById("register-Address").value);
      const birthday = new Date(document.getElementById("register-Date of Birth").value);
  
      // Prepare the data object
      const data = {
        "username": name,
        "email": email,
        "profilePicture": "",
        "currency": 0,
        "password": password,
        "birthday": birthday.toISOString(),
        "adress": adress
      };
  
      try {
        const response = await fetch('https://dampbackendapi.azurewebsites.net/api/Accounts', {
          method: 'POST',
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Origin, Methods, Content-Type'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          // Registration successful
          console.log('Registration successful!');
          // You can redirect the user or display a success message here
        } else {
          // Registration failed
          console.error('Registration failed.');
          // Handle the error condition accordingly
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network errors or other exceptions here
      }
    });
  });