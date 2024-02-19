// variables globales pour le formulaire 

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("#form-login");

// fonction de connexion

    submit.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;

        fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": userEmail,
                "password": userPwd,
            })
        })
        .then(function(response) {
            if(!response.ok) {
                document.querySelector(".error").innerHTML = 'Email ou mot de passe incorrect';
                return;
            }else {
                response.json() .then(function(data){
                    localStorage.setItem('token', data.token);
                    window.location ="index.html";
                })
            }
        })
        .catch(error =>
            console.log('error:'+ error)
            );
    });