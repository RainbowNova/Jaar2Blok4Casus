document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var dateOfBirth = document.getElementById('date-of-birth').value;
    
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Date of Birth:', dateOfBirth);
  });