document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = sanitizeInput(document.getElementById('username').value);
    var password = sanitizeInput(document.getElementById('password').value);
    
    console.log('Username:', username);
    console.log('Password:', password);
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