document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = sanitizeInput(document.getElementById('username').value);
    var password = sanitizeInput(document.getElementById('password').value);
    var email = sanitizeInput(document.getElementById('email').value);
    var address = sanitizeInput(document.getElementById('address').value);
    var dateOfBirth = sanitizeInput(document.getElementById('date-of-birth').value);
    
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Date of Birth:', dateOfBirth);
});

function sanitizeInput(input) {
  // replace potentally dangerous characters with html entity equivalents
  var sanitizedInput = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  
  return sanitizedInput;
}