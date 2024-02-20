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
        const figcaption = document.createElement("figcaption");

        img.src = element.imageUrl;

        galleryModal.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
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
const portfolio = document.querySelector('#portfolio')

if (localStorage.getItem('token')) {
    filters.style.display = "none";
    admin.style.display = "block";

    const btnModifier = document.createElement('a');
    btnModifier.href = "#modal1";
    btnModifier.innerHTML = '<i class="fas fa-edit"></i> Modifier';
    btnModifier.classList.add('js-modal');

    const firstChild = portfolio.firstChild;

    portfolio.insertBefore(btnModifier, firstChild);
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

async function displayGalleryModal () {
    galleryModal.innerHTML ="";
    const galleryData = await getmodal();
    galleryData.forEach(projet => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("i")

        img.src = projet.imageUrl

        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = projet.id

        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        galleryModal.appendChild(figure)
    });
    deleteProjet()
}
displayGalleryModal()

//supression d'une image dans la modale 

function deleteProjet() {
    const trashAll = document.querySelectorAll(".fa-trash-can")
    trashAll.forEach(trash => {
        trash.addEventListener("click", (e)=>{
            const id = trash.id
            const init ={
                method:"DELETE",
                Headers:{"content-Type" :"application/json"},
            }
            fetch("https://localhost:5678/api/works/" +id,init)
            .then((response)=>{
                if (!response.ok) {
                    console.log("delete n'a pas fonctionné")
                }
                return response.json()
            })
           .then((data)=>{
                console.log("delete a reussi voici la data :",data)
                displayGalleryModal()
                displayProjets()
           }) 
        })
    })
}


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
    modal.removeEventlistener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventlistener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventlistener('click', stopPropagation)
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




