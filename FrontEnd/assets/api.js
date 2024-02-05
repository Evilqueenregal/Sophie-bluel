const apiWorks = async() => {
    await fetch ("http://localhost:5678/api/works")
    .then (response => response.json())
    .then ((data) => (workData = data))

    showWorks(workData);
}

apiWorks();

const apiCategories = async() => {
    await fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then((data) => (categoryData = data))

    displayCategorysButtons (categoryData);

}

apiCategories();

const getUsers = async() => {
  await fetch("http://localhost:5678/api/post")
  .then(response => response.json())
  .then((data) => (postData = data))

    showPost (postData);
}

apiUsers();