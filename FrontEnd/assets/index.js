const gallery = document.querySelector(".gallery")
const galleryModal = document.querySelector('.galleryModal')

function showWorks(workData) {
    
    workData.forEach(element => {
        const figure = document.createElement("figure");
        figure.id = element.id;
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        
        img.src = element.imageUrl;
        figcaption.innerText = element.title;
        
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    });

    workData.forEach(element => {
        const figure = document.createElement("figure");
        figure.id = element.id;
        const img = document.createElement("img");
        const trash = document.createElement('button');
        trash.classList.add('btn-delete');
        trash.setAttribute('data-id', element.id)
        trash.innerHTML = '<i class="fas fa-trash-alt"></i>';

        img.src = element.imageUrl;

        galleryModal.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(trash);
    });
    
}

const filters = document.querySelector(".filters");

    function displayCategorysButtons(categoryData) {
        const btnFilterAll = document.createElement("button");
        btnFilterAll.innerText = "Tous";
        filters.appendChild(btnFilterAll);

        categoryData.forEach(element => {
            const btnFilter = document.createElement("button");
            btnFilter.classList.add('btn-filter');
            btnFilter.innerText = element.name;
            btnFilter.setAttribute('data-id', element.id);
            filters.appendChild(btnFilter);
        });

        const btnFilters = document.querySelectorAll (".btn-filter[data-id]");

        btnFilters.forEach(button => {
            button.addEventListener("click", () => {
                const btnId = button.dataset.id;
                let filtre = workData.filter(function(element) {
                    return element.categoryId == btnId;
                });
                gallery.innerHTML = "";
                showWorks(filtre);
            });
        });
        btnFilterAll.addEventListener("click", () => {
            gallery.innerHTML = "";
            return showWorks(workData);
        });
    }

const admin = document.querySelector('.admin');
const titlePortfolio = document.querySelector('.title-portfolio');

if (localStorage.getItem('token')) {
    filters.style.display = "none";
    admin.style.display = "block";

    const btnModifier = document.createElement('a');
    btnModifier.href = "#modal1";
    btnModifier.innerHTML = '<i class="fas fa-edit"></i> Modifier';
    btnModifier.classList.add('js-modal');

    const btnEdition = document.createElement('a');
    btnEdition.href = "#";
    btnEdition.innerHTML = 'Mode édition';

    const firstChild = portfolio.firstChild;

    titlePortfolio.appendChild(btnModifier);
    admin.appendChild(btnEdition);
}

//La modale

let modal = null
const focusableSelector ='button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null


const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null;
    focusables[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

// affichage de la poubelle

function deleteProjet() {
    const btnDeletes = document.querySelectorAll(".btn-delete");
    const galleryIndex = document.querySelectorAll('.gallery figure');


    btnDeletes.forEach((btnDelete, index) => {
        btnDelete.addEventListener("click", async () => {

            const projetId = btnDelete.dataset.id;
            const figure = btnDelete.parentNode;
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:5678/api/works/${projetId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.ok) {
                    figure.remove();
                    if(galleryIndex[index]) {
                        galleryIndex[index].remove();
                    }
                } else {
                    console.error("La suppression du projet a échoué");
                }
            } catch (error) {
                console.error("Une erreur est survenue lors de la suppression du projet", error);
            }
        });
    });
}

// Appeler la fonction deleteProjet une fois la page chargée
document.addEventListener("DOMContentLoaded", deleteProjet);


const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    window.setTimeout(function() {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    }else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal (e)
    }
    if (e.key === 'Tab' && modal !== null)
    focusInModal (e)
})

const modalProjects = document.querySelector('.modal-projects');
const modalForm = document.querySelector('.modal-form');
const btnChange = document.querySelector('.button2');
const btnBack = document.querySelector('.btn-back');

btnChange.addEventListener('click', () => {
    modalProjects.style.display = "none";
    modalForm.style.display ="block";
})

btnBack.addEventListener('click', () => {
    modalProjects.style.display = "block";
    modalForm.style.display = "none";
})

//2eme modal

const previewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input ");
const labelFile = document.querySelector(".containerFile label");
const iconFile  = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");

inputFile.addEventListener ("change", ()=>{
    const file = inputFile.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "flex";
                labelFile.style.display = "none";
                iconFile.style.display = "none";
                pFile.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
});


//Fonction pour afficher l'image séléctionnée
function afficheImage() {
    let fileInput = document.querySelector("input[type=file]");
    let resultat= document.querySelector("#resultat");

        if(fileInput.files.length >0 ){
            let FileReader = new FileReader();
                FileReader.onload =  function(event) {
                    resultat.setAttribute("src",event.target.result);
                };
                FileReader.readAsDataURL(fileInput.files[0]);
        }
}


//Ajout d'un projet

const form = document.querySelector(".modal-form .donnees form");
const title = document.querySelector(".modal-form .donnees #title");
const categorie = document.querySelector(".modal-form .donnees #categorie");

//comparaison des valeurs imput & api (img text titre)
    
async function addWorks() {
    const form = document.querySelector(".modal-form .donnees form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token non trouvé. L'utilisateur n'est probablemant pas connecter.");
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(`http://localhost:5678/api/works`, {
                method: "POST",
                body: formData,
                headers: {
                    //  "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log("Nouveau projet ajouté avec succés !");
                // vider la galerie de l index et de la modale
                apiWorks();
            } else {
                console.error("Erreur lors de l'ajout du projet :", response.status, response.statusText);
                const responseBody = await response.json();
                console.error(responseBody);
            }
            } catch (error) {
                console.error("Une erreur s'est produite lors de l'envois du formulaire :", error);
            }    
        });
    }

    afficheImage();
    addWorks();




