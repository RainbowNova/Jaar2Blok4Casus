document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var username = sanitizeInput(document.getElementById('email').value);
        var password = sanitizeInput(document.getElementById('password').value);
        
        console.log('Email:', username);
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

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var username = sanitizeInput(document.getElementById('register-username').value);
        var email = sanitizeInput(document.getElementById('register-email').value);
        var password = sanitizeInput(document.getElementById('register-password').value);
    
        //var address = sanitizeInput(document.getElementById('address').value);
        //var dateOfBirth = sanitizeInput(document.getElementById('date-of-birth').value);
        
        console.log('Register-Username:', username);
        console.log('Register-Email:', email);
        console.log('Register-Password:', password);
        //console.log('Address:', address);
        //console.log('Date of Birth:', dateOfBirth);
    });
});
