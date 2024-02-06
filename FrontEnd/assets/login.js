// variables globales pour le formulaire 

const alredyLoggedError = document.querySelector(".alredyLogged__error");
const loginEmailError = document.querySelector(".loginEmail__error");
const loginMdpError = document.querySelector(".loginMdp__error");


const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");

const submit = document.querySelector("submit");

alredyLogged();

// fonction de connexion

async function login() {
    const users = await getUsers();
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;
        let userFound = false;

        users.forEach((user) => {
            if (
                user.mail == userEmail &&
                user.password == userPwd 
            ) {
                userFound = true;
                window.sessionStorage.loged = true;
                window.location.href = "../login.html"
            }
        });

        if (!userFound) {
            email.classList.add("inputErrorLogin");
            password.classList.add("inputErrorLogin");
        }
    });
}

login();