export async function displayCartProduct(product, element) {

    //Création de l'article 
    const sectionCart = document.getElementById("cart__items");
    const articleElement = document.createElement("article");
    articleElement.classList.add("cart__item");
    articleElement.setAttribute("data-id", element.idProduct);
    articleElement.setAttribute("data-color", element.colorProduct);


    //Création de l'image
    const imageContainerElement = document.createElement("div");
    imageContainerElement.classList.add("cart__item__img");
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;

    //Création de la description du produit
    const cartElement = document.createElement("div");
    cartElement.classList.add("cart__item__content");
    const cartDescriptionElement = document.createElement("div");
    cartDescriptionElement.classList.add("cart__item__content__description");
    const nameElement = document.createElement("h2");
    nameElement.innerText = product.name;
    const colorElement = document.createElement("p");
    colorElement.innerText = element.colorProduct;
    const priceElement = document.createElement("p");
    priceElement.innerText = `${product.price} €`;

    //Création des paramètres
    const cartSettingsElement = document.createElement("div");
    cartSettingsElement.classList.add("cart__item__content__settings");

    const cartSettingsQuantityElement = document.createElement("div");
    cartSettingsQuantityElement.classList.add("cart__item__content__settings__quantity");
    const quantityParagraphElement = document.createElement("p");
    quantityParagraphElement.innerText = "Qté : ";
    const quantityElement = document.createElement("input");
    quantityElement.type = "number";
    quantityElement.classList.add("itemQuantity");
    quantityElement.name = "itemQuantity";
    quantityElement.min = "1";
    quantityElement.max = "100";
    quantityElement.value = element.quantityProduct;
    //Ajout d'un listener pour la modifier la quantité d'un produit
    quantityElement.addEventListener("change", (event) => {
        console.log(event.target.value)
        if (parseInt(event.target.value) === 0) {
            deleteProductCart(event);
        } else {
            modifyQuantityCart(event)
        }
    });

    const cartSettingsDeleteElement = document.createElement("div");
    cartSettingsDeleteElement.classList.add("cart__item__content__settings__delete");
    const deleteParagraphElement = document.createElement("p");
    deleteParagraphElement.classList.add("deleteItem");
    deleteParagraphElement.innerText = "Supprimer";
    //Ajout d'un listener pour supprimer un produit
    deleteParagraphElement.addEventListener("click", event => deleteProductCart(event));

    //Création des nouveaux éléments du DOM
    sectionCart.appendChild(articleElement);

    articleElement.appendChild(imageContainerElement);
    imageContainerElement.appendChild(imageElement);

    articleElement.appendChild(cartElement);
    cartElement.appendChild(cartDescriptionElement);
    cartDescriptionElement.appendChild(nameElement);
    cartDescriptionElement.appendChild(colorElement);
    cartDescriptionElement.appendChild(priceElement);

    cartElement.appendChild(cartSettingsElement);
    cartSettingsElement.appendChild(cartSettingsQuantityElement);
    cartSettingsQuantityElement.appendChild(quantityParagraphElement);
    cartSettingsQuantityElement.appendChild(quantityElement);

    cartSettingsElement.appendChild(cartSettingsDeleteElement);
    cartSettingsDeleteElement.appendChild(deleteParagraphElement);
}

function deleteProductCart(event) {

    //Récupération de l'id et de la couleur de l'article à supprimer
    const articleElement = event.target.closest(".cart__item");
    const id = articleElement.dataset.id;
    const color = articleElement.dataset.color;

    //Modification du DOM pour supprimer l'article
    console.log(articleElement);
    articleElement.innnerHTML = "";

    //Récupération du local storage
    let cartArray = localStorage.getItem("cart");
    if (!cartArray) {
        window.location.reload();
    }
    cartArray = JSON.parse(cartArray);
    console.log(cartArray);

    //Mise à jour du local storage
    for (let i = cartArray.length - 1; i >= 0; i--) {

        if (id === cartArray[i].idProduct && color === cartArray[i].colorProduct) {   //REVOIR AVEC LA METHODE OF POUR LE SPLICE
            cartArray.splice(i, 1);
            alert("supression");
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }

    //Retour à la page d'accueil si le panier est vide ou mise à jour de la page
    if (cartArray.length === 0) {                        //NE FONCTIONNE PAS AVEC CartArray === null
        console.log("Le panier est vide!!!")
        document.location.href = "../html/index.html";
    } else {
        window.location.reload();
    }
}

function modifyQuantityCart(event) {

    const newquantity = parseInt(event.target.value);
    console.log(newquantity);

    //Message d'erreur si la quantité > 100
    if (verifyCartQuantity(newquantity) === false) {
        return;
    }

    //Récupération de l'id et de la couleur de l'article à supprimer
    const articleElement = event.target.closest(".cart__item");
    const id = articleElement.dataset.id;
    const color = articleElement.dataset.color;

    //Récupération du local storage
    let cartArray = localStorage.getItem("cart");
    if (!cartArray) {
        window.location.reload();
        return
    }

    cartArray = JSON.parse(cartArray);
    console.log(cartArray);

    //Mise à jour du local storage

    for (let product of cartArray) {

        if (id === product.idProduct && color === product.colorProduct) {
            product.quantityProduct = newquantity;
            alert("changement");
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}

function updatePage() {
    document.getElementById("cart__items").innerHTML = "";
    return;
}

function verifyCartQuantity(quantity) {

    if (quantity >= 100) {     //REMETTRE LA VALEUR A LA QUANTITE PREALABLE?
        alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
        return false;
    }
    return true;
}