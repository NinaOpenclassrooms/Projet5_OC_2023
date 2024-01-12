//Fonction pour récupérer les éléments dans le localStorage




async function displayProduct(product) { 
     
    //Logo
    const sectionLogo = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = "../images/logo.png";
    imageElement.alt = "Photographie d'un canapé";

    sectionLogo.appendChild(imageElement);

    //Nom et prix
    const nameElement = document.getElementById("title");
    nameElement.innerText = product.name;
    const priceElement = document.getElementById("price");
    priceElement.innerText = product.price;

    //Description
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;
}