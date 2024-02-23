const gallery = document.querySelector(".gallery")
const galleryModal = document.querySelector('.galleryModal')

function showWorks(workData) {
    
    workData.forEach(element => {
        const figure = document.createElement("figure");
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
        const img = document.createElement("img");
        const trash = document.querySelector('button');
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
    const trashIcons = document.querySelectorAll(".fa-trash-alt");

    trashIcons.forEach(trashIcon => {
        trashIcon.addEventListener("click", async () => {
            const projetId = trashIcon.id;

            try {
                const response = await fetch(`https://localhost:5678/api/works/${projetId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    // Supprimer le projet de la galerie
                    const projetFigure = trashIcon.closest("figure");
                    galerie.removeChild(projetFigure);
                    // Rafraîchir la galerie
                    displayGalleryModal();
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


