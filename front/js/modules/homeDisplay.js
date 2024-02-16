/**
 * Display the product (image, name, short description)
 * @param { Object } product 
 */
export function displayProduct(product) {

    //Récupération de l'élément du DOM qui accueillera les produits
    const sectionItems = document.querySelector(".items");
    //Création d’une balise a dédiée au lien
    const linkElement = document.createElement("a");
    linkElement.href = `product.html?id=${product._id}`;
    //Création d’une balise dédiée au produit
    const productElement = document.createElement("article");
    //Création d’une balise dédiée à l'image
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;
    //Création d’une balise dédiée au nom
    const nameElement = document.createElement("h3");
    nameElement.classList.add("productName");
    nameElement.innerText = product.name;
    //Création d’une balise dédiée à la description
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("productDescription");
    descriptionElement.innerText = product.description;

    //Rattachement des éléments
    sectionItems.appendChild(linkElement);
    linkElement.appendChild(productElement);
    productElement.appendChild(imageElement);
    productElement.appendChild(nameElement);
    productElement.appendChild(descriptionElement);
}