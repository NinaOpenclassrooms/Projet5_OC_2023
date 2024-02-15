//Importation des fonctions
import { displayCartProduct } from "./modules/cartDisplay.js";
import { verifyForm } from "./modules/form.js";

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
    totalQuantityElement.innerText = getSumQuantity(cartArray);

    //Création d'un tableau contenant les Id des produits commandés
    let productIdList = [];

    for (let element of cartArray) {
        productIdList.push(element.idProduct);
    }

    //Ajout d'un eventListener au "Submit", Verification du formulaire, POST à l'API, effacement du local Storage et redirection vers la page de confirmation
    const orderElement = document.getElementById("order");
    orderElement.addEventListener("click" || "keypress", (event) => {
        let clientContact = verifyForm();
        if (clientContact) {
            getOrderId(clientContact, productIdList)
                .then(orderId => {
                    localStorage.removeItem("cart");
                    document.location.href = `confirmation.html?orderId=${orderId}`;
                })
                .catch(() => {
                    alert("Une erreur est survenue, le numéro de commande n'a pu être trouvé.")
                })
        }
    });
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
function getSumQuantity(cartArray) {
    let sum = 0;
    for (let element of cartArray) {
        sum += parseInt(element.quantityProduct);
    }
    return sum;
}

/**
 * Send request using fetch api and return order number
 * @param { Object } clientContact 
 * @param { Array } productIdList
 * @returns { Promise } orderArray.orderId
 */
async function getOrderId(clientContact, productIdList) {
    if (clientContact === null) {
        return
    }
    try {
        let response = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                contact: clientContact,
                products: productIdList
            })
        });
        let orderArray = await response.json();

        return orderArray.orderId
    }
    catch (error) {
        console.log(error);
        return;
    }
}
