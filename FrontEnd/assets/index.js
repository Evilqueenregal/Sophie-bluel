const gallery = document.querySelector(".gallery");

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

if (localStorage.getItem('token')) {
    filters.style.display = "none";
    admin.innerHTML = '<a href="#">Mode édition</a>';
}


