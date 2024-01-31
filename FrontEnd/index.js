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

async function getMesprojets() {
    const response = await fetch("http://localhost:5678/api-docs/");
    return await response.json();
}
getMesprojets();

async function affichageMesprojets(gallery) {
    const mesprojets = await getMesprojets ();
    mesprojets.forEach((mesprojets) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = mesprojets.imageUrl
        figcaption.textContent = mesprojets.title;
        figure.classList.add("gallery");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        });
}
        
affichageMesprojets();

console.log(affichageMesprojets)