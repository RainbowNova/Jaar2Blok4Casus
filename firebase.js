

const firebaseConfig = {
    apiKey: "AIzaSyBlxNS6DfDzWIHeksRpE8brSO0odUQrbwM",
    authDomain: "gameplatform-db.firebaseapp.com",
    databaseURL: "https://gameplatform-db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gameplatform-db",
    storageBucket: "gameplatform-db.appspot.com",
    messagingSenderId: "545500280718",
    appId: "1:545500280718:web:95e285f583b0157adf56df",
    measurementId: "G-R2NMTXLKF5"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);


//create firebase database reference LOGIN
/*var contactFormDB = firebase.database().ref("login-form")

document.getElementById("login-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var email = getElementVal("email");
    var password = getElementVal("password");
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}
*/

//create firebase database reference REGISTER

document.addEventListener('DOMContentLoaded', () => {
    var registerFormDB = firebase.database().ref("register-form")

    document.getElementById("register-form").addEventListener("submit", submitForm);

    function submitForm(e) {
        e.preventDefault();

        var username = getElementVal("register-username");
        var email = getElementVal("register-email");
        var location = getElementVal("register-Address");
        var address = getElementVal("register-Address");
        var birthday = getElementVal("register-Date of Birth");
        var password = getElementVal("register-password");

        console.log(username, email, location, address, birthday, password);

        storeAccount(username, email, location, address, birthday, password);
    }

    const storeAccount = (username, email, location, address, birthday, password) => {
        var newRegisterFormDB = registerFormDB.push();
        newRegisterFormDB.set({
            username: username,
            email: email,
            location: location,
            address: address,
            birthday: birthday,
            password: password
        });
    }


    const getElementVal = (id) => {
        return document.getElementById(id).value;
    }
});