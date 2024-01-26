//Importation des fonctions
import { displayCartProduct } from "./modules/cartCreation.js";

//Récupération des éléments dans le localStorage et affichage des produits du panier
let cartArray = localStorage.getItem("cart");
if (cartArray) {
    cartArray = JSON.parse(cartArray);
    console.log(cartArray);


    let element = {};    //NE FONCTIONNE PAS SANS, A REVOIR

    for (element of cartArray) {
        try {
            const reponse = await fetch(`http://localhost:3000/api/products/${element.idProduct}`);
            const product = await reponse.json();

            displayCartProduct(product, element);
        } catch (error) {
            console.log(error);
        }
    }
    // //Création du prix total des produits et du nombre de produits
    // const totalPriceElement = document.getElementById("totalPrice");
    // totalPriceElement.innerText = getSumPrice(cartArray, product);     //NE CONNAIT PAS PRODUCT, ALLER CHERCHER LE PRIX DANS LE DOM??
    // const totalQuantityElement = document.getElementById("totalQuantity");
    // totalQuantityElement.innerText = getSumQuantity(cartArray);




} else {
    alert("Le panier est vide");  //A LAISSER?
    document.location.href = "../html/index.html";
}


function getSumPrice(cartArray, product) {
    let sum = 0;
    let element = {};
    for (element of cartArray) {
        sum += product.price * element.quantityProduct;
    }
    return sum;
}

function getSumQuantity(cartArray) {
    let sum = 0;
    let element = {};
    for (element of cartArray) {
        sum += parseInt(element.quantityProduct);
    }
    return sum;
}