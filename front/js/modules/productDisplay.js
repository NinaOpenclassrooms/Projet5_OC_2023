/**
 * Display the product (image, name, description, price, color choices)
 * @param { Object } product 
 */
export async function displayProduct(product) {
    //Title
    document.title = product.name;

    //Logo
    const sectionLogo = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;

    sectionLogo.appendChild(imageElement);

    //Nom
    const nameElement = document.getElementById("title");
    nameElement.innerText = product.name;

    //Prix
    const priceElement = document.getElementById("price");
    priceElement.innerText = product.price;

    //Description
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;

    //Options de couleurs
    const sectionColors = document.getElementById("colors");

    for (let color of product.colors) {

        const colorElement = document.createElement("option");
        colorElement.value = color;
        colorElement.innerText = color;

        sectionColors.appendChild(colorElement);
    }
}