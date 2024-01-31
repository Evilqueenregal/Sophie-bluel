const figure = [
	{
		"image":"abajour-tahina.png",
		"figcaption":"Abajour Tahina"
	},
	{
		"image":"appartement-paris-v.png",
		"figcaption":"Appartement Paris V"
	},
	{
		"image":"sushisen-londres.png",
		"figcaption":"Restaurant Sushisen - Londres"
	},
	{
		"image":"la-balisiere.png",
		"figcaption":"Villa “La Balisiere” - Port Louis"
	},
    {
        "image":"structures-thermopolis.png",
        "figcaption":"Structures Thermopolis"
    },
    {
        "image":"appartement-paris-x.png",
        "figcaption":"Appartement Paris X"
    },
    {
        "image":"le-coteau-cassis.png",
        "figcaption":"Pavillon “Le coteau” - Cassis"
    },
    {
        "image":"villa-ferneze.png",
        "figcaption":"Villa Ferneze - Isola d’Elba"
    },
    {
        "image":"appartement-paris-xviii.png",
        "figcaption":"Appartement Paris XVIII"
    },
    {
        "image":"bar-lullaby-paris.png",
        "figcaption":"Bar “Lullaby” - Paris"
    },
    {
        "image":"hotel-first-arte-new-delhi.png",
        "figcaption":"Hotel First Arte - New Delhi"
    }
]

const gallery = document.querySelector("figure");
const filters = document.querySelector(".filters");

async function getMesprojets() {
    const response = await fetch("http://localhost:5678/api-docs/");
    return await response.json();
}
getMesprojets();

async function affichageMesprojets() {
    const mesprojets = await getMesprojets();
    mesprojets.forEach((mesprojets) => {
        createMesprojets(gallery);
    });
}
affichageMesprojets();

function createMesprojets(gallery){
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = mesprojets.imageUrl;
        figcaption.textContent = mesprojets.title;
        figure.classList.add("gallery");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
}
     
async function getCategorys(){
    const response = await fetch("http://localhost:5678/api-docs/");
    const response.Json = await response.json();
}

getFiltres()

async function displayCategorysButtons() {
    const filtres = await getCategorys();
    filtres.forEach(filtres => {
        const btn = document.createElement("button");
        btn.textContent = filtre.name.toUpperCase();
        btn.id = filtre.id;
        filters.appendChild(btn);
    })
}

displayFiltresButtons();

//filtres au clic sur les boutons

function filterCategory() {
    const mesprojets = await getMesprojets();
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(button => {
        button.addEventListener("click", (e)=>{
            btnId = e.target.id;
            gallery.innerHTML ="";
            if (btnId !== "0") {
                const mesprojetsTriCategory = mesprojets.filter((gallery)=> {
                    return mesprojets.categoryId == btnId;
                });
                mesprojetsTriCategory.forEach(gallery => {
                    createGallery(gallery)
                });
            }
        });
    });
}