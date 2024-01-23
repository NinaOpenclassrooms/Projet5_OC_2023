export async function displayCartProduct(cartArray) { 
    try {
        let element = {};  //A VERIF

        for (element of cartArray) {

        const reponse = await fetch(`http://localhost:3000/api/products/${element.idProduct}`);
        const product = await reponse.json();
    
        //Création de l'article 
        const sectionCart = document.getElementById("cart__items");
        const articleElement = document.createElement ("article");   //METTRE CART DANS LE NOM?
        articleElement.classList.add("cart__item");
        articleElement.setAttribute("data-id", element.idProduct);
        articleElement.setAttribute("data-color", element.colorProduct);


        //Création de l'image
        const imageContainerElement = document.createElement ("div");
        imageContainerElement.classList.add("cart__item__img");
        const imageElement = document.createElement ("img");
        imageElement.src = product.imageUrl;
        imageElement.alt = product.altTxt;

        //Création de la description du produit
        const cartElement = document.createElement("div");
        cartElement.classList.add("cart__item__content");
        const cartDescriptionElement = document.createElement ("div");
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

        const cartSettingsDeleteElement = document.createElement("div");
        cartSettingsDeleteElement.classList.add("cart__item__content__settings__delete");
        const deleteParagraphElement = document.createElement("button");
        deleteParagraphElement.classList.add("deleteItem");
        deleteParagraphElement.innerText = "Supprimer";

        //Création du prix total des produits et du nombre de produits
        const totalPriceElement = document.getElementById("totalPrice");
        totalPriceElement.innerText = getSumPrice(cartArray, product);
        const totalQuantityElement = document.getElementById("totalQuantity");
        totalQuantityElement.innerText = getSumQuantity(cartArray);

        //Création des nouveaux éléments du DOM
        sectionCart.appendChild(articleElement);

        articleElement.appendChild(imageContainerElement);
        imageContainerElement.appendChild(imageElement);

        articleElement.appendChild(cartElement);
        cartElement.appendChild(cartDescriptionElement);
        cartDescriptionElement.appendChild(nameElement);
        cartDescriptionElement.appendChild(colorElement);
        cartDescriptionElement.appendChild(priceElement);

        articleElement.appendChild(cartSettingsElement);
        cartSettingsElement.appendChild(cartSettingsQuantityElement);
        cartSettingsQuantityElement.appendChild(quantityParagraphElement);
        cartSettingsQuantityElement.appendChild(quantityElement);

        cartSettingsElement.appendChild(cartSettingsDeleteElement);
        cartSettingsDeleteElement.appendChild(deleteParagraphElement);
        }
    } 
    catch (error) {
        console.log(error);
        return;
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
            sum += element.quantityProduct;
        }
        return sum;
    }
}