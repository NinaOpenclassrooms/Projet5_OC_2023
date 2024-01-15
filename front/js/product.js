
async function getProduct() {
    try {
        const reponse = await fetch(`http://localhost:3000/api/products/${getId()}`);
        const product = await reponse.json();

        console.log(product.name);

        displayProduct(product);

        } 
    catch (error) {
        console.log(error);
        return;
    }
}
getProduct()

function getId() { 
    const str = window.location.href;
    const url = new URL (str);
    console.log(url);

    const id = url.searchParams.get("id");
    console.log(id);
    return id;
}

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

    //Options de couleurs
    const sectionColors = document.getElementById("colors");

    for (let i=0; i < product.colors.length; i++) {
   
    const colorElement = document.createElement("option")
    colorElement.innerText = product.colors[i];

    sectionColors.appendChild(colorElement);
    }
}

console.log("chargement du produit terminé");

const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener ("click", function() {

        let cartObject = {
        idProduct:`${getId()}`,
        quantityProduct: `${getQuantity()}`,
        colorProduct: `${getColor()}`
        };

console.log(cartObject);

let cartArray = [{}];

let cart = window.localStorage.getItem("cart");

if (cart !== null) {
    

    for (let i=0; i < cartArray.length; i++) {
        if (cartArray[i].idProduct === cartObject.idProduct && cartArray[i].colorProduct === cartObject.colorProduct) {
            cartObject.quantityProduct += cartArray[i].quantity;
        } 
    };
}

cartArray.push(cartObject);
console.log(cartArray);

myJSON = JSON.stringify (cart);
window.localStorage.setItem ("cart", myJSON);

})

function getQuantity() {
    const quantityElement = document.getElementById("quantity"); //PEUT-ON METTRE LEs 2 LIGNES EN UNE SEULE?
    const quantity = quantityElement.value;
    return quantity;
}

function getColor() {
    const colorElement = document.getElementById("colors");
    const color = colorElement.options[colorElement.selectedIndex].text;
    return color;
}