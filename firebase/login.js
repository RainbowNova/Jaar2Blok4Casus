const firebaseConfig = {
  apiKey: "AIzaSyCGi7d3hQFtXooGw_HosUqGrH0dBJYojYI",
  authDomain: "damp-c7a9d.firebaseapp.com",
  projectId: "damp-c7a9d",
  storageBucket: "damp-c7a9d.appspot.com",
  messagingSenderId: "1045743798558",
  appId: "1:1045743798558:web:8ac8bd44114553396ee10f"
};



firebase.initializeApp(firebaseConfig);



//ADD AUTHENTICATION, LOGIN.... THEN ADD TEMPORARY JS STORAGE FOR LOGIN SESSION STORAGE

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("login-form").addEventListener("submit", tryLogin);

    function tryLogin(e) {
        firebase.database().ref("accounts").once("value")
        .then((snapshot) => {

            const usersData = snapshot.val();


            for (const userId in usersData) {
                if (usersData.hasOwnProperty(userId)) {
                    const user = usersData[userId];

                    const email = user.email;
                    const password = user.password;
                    
                    if (email == document.getElementById("email").value && password == document.getElementById("password").value) {
                        console.log("Login successful");
                        console.log("Email: ", email);
                        //TO DO: Store user data in session storage for later use in other pages
                        break;
                    }


                }
            }
        })
        .catch((error) => {
            console.log("Error reading data: ", error);
        });
    }	


});