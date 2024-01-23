//Importation des fonctions
import { displayCartProduct } from "./modules/cartCreation.js";

//Récupération des éléments dans le localStorage et affichage des produits du panier
let cartArray = localStorage.getItem("cart");
if (cartArray) {
    cartArray = JSON.parse(cartArray);
    console.log(cartArray);
    displayCartProduct(cartArray);

//Ajout d'un listener pour supprimer un produit
    let deleteList = document.querySelectorAll(".deleteItem");
    console.log(deleteList);                                     //PROBLEME : LISTE VIDE
     
    for (let i = deleteList.length-1; i >= 0; i--) {
        element.addEventListener("click", function() {
            const id = getIdData(deleteList[i]);
            const color = getcolorData(deleteList[i]);
            deleteItem(id, color);
        });
    }

//Ajout d'un listener pour modifier la quantité d'un produit
    let quantityList = document.querySelectorAll(".itemQuantity");
    console.log(quantityList);

    for (element of quantityList) {
        element.addEventListener("change", function() {
            const id = getIdData(element);
            const color = getcolorData(element);
            changeQuantity(id, color);
        });
    }
} else {
    alert("Le panier est vide");  //A LAISSER?
    document.location.href = "../html/index.html";
}

function changeQuantity(id, color) {

    //Message d'erreur si la quantité > 100
    const quantity = element.value;

    if (verifyCartQuantity (quantity) === false) {
        return;
    }

    if (quantity === 0) {
        deleteItem(id, color);
    }

    let findProduct = false;

    for (product of cartArray) {

        if (id === cartArray.idProduct && color === cartArray.colorProduct) {
            findProduct = true;
            cartArray.quantityProduct = quantity;
            alert("changement");
        }
        localStorage.setItem ("cart", JSON.stringify(cartArray));
    }
}

function verifyCartQuantity(quantity) {

    if (quantity>=100 ) {
        console.log("Erreur quantité");
        alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
        return false;
    }
    return true;
}

function deleteItem(id, color) {
    
    for (product of cartArray) {

        if (id === cartArray.idProduct && color === cartArray.colorProduct) {
            findProduct = true;
            cartArray.splice(product);
            alert("supression");
        }
        localStorage.setItem ("cart", JSON.stringify(cartArray));
    }
    //Mise à jour de la page
    updatePage()   
    cartArray = localStorage.getItem("cart");
    if (cartArray) {
        cartArray = JSON.parse(cartArray);
        console.log(cartArray);
        displayCartProduct(cartArray);
    } else {
    alert("Le panier est vide");  //A LAISSER?
    document.location.href = "../html/index.html";
    } 
    return

}

function getIdData(element) {
    const idElement = element.closest(".cart__item");
    const id = idElement.dataset.dataId;
    console.log(id);
    return id
}

function getcolorData(element) {
    const idElement = element.closest(".cart__item");
    const color = idElement.dataset.dataColor;
    console.log(color);
    return color
}

function updatePage() {
    document.getElementById("cart__items").innerHTML = "";
    return
}