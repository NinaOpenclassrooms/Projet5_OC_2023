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

    //Création du prix total des produits et du nombre de produits
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = getSumPrice();
    const totalQuantityElement = document.getElementById("totalQuantity");
    totalQuantityElement.innerText = getSumQuantity();


    //Formulaire de coordonnées
    const orderElement = document.getElementById("order");
    orderElement.addEventListener("click" || "keypress", event => checkFormValidity(event))

} else {
    alert("Le panier est vide");  //A LAISSER?
    document.location.href = "../html/index.html";
}

function getSumPrice() {
    const quantityElementsList = document.querySelectorAll(".itemQuantity");
    const priceElementsList = document.querySelectorAll(".cart__item__content__description p:nth-child(3)")

    let sum = 0;

    for (let i = 0; i < quantityElementsList.length; i++) {   //A REVOIR AVEC LA METHODE FOR OF
        const price = parseInt(priceElementsList[i].innerText);
        const quantity = quantityElementsList[i].value;
        sum += quantity * price;
    }
    return sum;
}

function getSumQuantity() {
    const quantityElementsList = document.querySelectorAll(".itemQuantity");

    let sum = 0;

    let element = {};
    for (element of quantityElementsList) {
        sum += parseInt(element.value);
    }
    return sum
}

// function getSumPrice(cartArray, product) {
//     let sum = 0;
//     let element = {};
//     for (element of cartArray) {
//         sum += product.price * element.quantityProduct;
//     }
//     return sum;
// }

// function getSumQuantity(cartArray) {
//     let sum = 0;
//     let element = {};
//     for (element of cartArray) {
//         sum += parseInt(element.quantityProduct);
//     }
//     return sum;
// }

function checkFormValidity(event) {
    event.preventDefault();
    const firstNameElement = document.getElementById("firstName");
    const firstName = firstNameElement.value;

    if (firstName === "") {
        alert("Veuillez renseigner votre prénom.");
    }
    let regexFirstName = new RegExp("^[A-Za-z\é\è\ê\-\ï\ë]+$")
    let validationFirstName = regexFirstName.test(firstName);
    if (validationFirstName === false) {
        alert("Le format du prénom n'est pas correct.")
    }
    console.log(firstName);

    const lastNameElement = document.getElementById("lastName");
    const lastName = lastNameElement.value;
    if (lastName === "") {
        alert("Veuillez renseigner votre nom.");
    }
    let regexLastName = new RegExp("^[A-Za-z\é\è\ê\-\ï\ë\ ]+$")
    let validationLastName = regexLastName.test(lastName);
    if (validationLastName === false) {
        alert("Le format du nom n'est pas correct.")
    }

    const addressElement = document.getElementById("address");
    const address = addressElement.value;
    if (address === "") {
        alert("Veuillez renseigner votre adresse.");
    }

    const cityElement = document.getElementById("city");
    const city = cityElement.value;
    if (city === "") {
        alert("Veuillez renseigner votre ville.");
    }
    let validationCity = regexLastName.test(city);
    if (validationCity === false) {
        alert("Le format de la ville n'est pas correct.")
    }
    const emailElement = document.getElementById("email");
    const email = emailElement.value;
    if (email === "") {
        alert("Veuillez renseigner votre e-mail.");
    }
}