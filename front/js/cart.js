//Importation des fonctions
import { displayCartProduct } from "./modules/cartCreation.js";

//Importation des variables
import { clientContact } from "./form.js";

//Récupération des éléments dans le localStorage et affichage des produits du panier
let cartArray = localStorage.getItem("cart");
if (cartArray) {
    cartArray = JSON.parse(cartArray);

    for (let element of cartArray) {
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


    //Création d'un tableau contenant les produits commandés           UTILISER CARTARRAY A LA  PLACE?
    const articleElementList = document.querySelectorAll(".cart__item");

    const orderSummary = [];

    for (let element of articleElementList) {
        orderSummary.push(getProductSummary(element));
    }

    //Envoi de l'objet clientContact et de l'array orderSummary à l'API, effacement du local Storage et redirection vers la page de confirmation
    if (getOrderId(clientContact, orderSummary)) {
        console.log("Test")
        localStorage.removeItem("cart");
        document.location.href = `confirmation.html?orderId=${getOrderId(clientContact, orderSummary)}`;
    }

} else {
    alert("Le panier est vide");
    document.location.href = "../html/index.html";
}

/**
 * Get the total order price
 * @returns { Number } sum
 */
function getSumPrice() {
    const quantityElementsList = document.querySelectorAll(".itemQuantity");
    const priceElementsList = document.querySelectorAll(".cart__item__content__description p:nth-child(3)")

    let sum = 0;

    for (let i = 0; i < quantityElementsList.length; i++) {
        const price = parseInt(priceElementsList[i].innerText);
        const quantity = quantityElementsList[i].value;
        sum += quantity * price;
    }
    return sum;
}

/**
 * Get the total number of items
 * @returns { Integer } sum
 */
function getSumQuantity() {
    const quantityElementsList = document.querySelectorAll(".itemQuantity");

    let sum = 0;

    for (let element of quantityElementsList) {
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

/**
 * Get the item data (productName, productId, productColor, productPrice, proctQuantity) in an the object productSummary
 * @param { HTMLElement } element 
 * @returns { Object } productSummary
 */
function getProductSummary(element) {

    const productNameElement = element.querySelector(".cart__item__content__description h2");
    const productName = productNameElement.innerText;
    const productId = element.dataset.id;
    const productColor = element.dataset.color;
    const productPriceElement = element.querySelector(".cart__item__content__description p:nth-child(3)");
    const productPrice = productPriceElement.innerText;
    const productQuantityElement = element.querySelector(".itemQuantity");
    const productQuantity = productQuantityElement.value;

    const productSummary = {
        productName: productName,            //PEUT ÊTRE RETIRE
        productId: productId,
        productColor: productColor,
        productPrice: productPrice,          //PEUT ÊTRE RETIRE
        productQuantity: productQuantity
    }
    return productSummary
}

/**
 * Send request using fetch api and returns order number
 * @param { Object } clientContact 
 * @param { Array } orderSummary 
 * @returns { Promise } orderId
 */
async function getOrderId(clientContact, orderSummary) {
    try {
        let response = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                contact: clientContact,
                products: orderSummary
            })
        });
        let orderId = await response.json();

        console.log(orderId);

        return orderId
    }
    catch (error) {
        console.log(error);
        return;
    }
}
