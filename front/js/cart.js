//Fonction pour récupérer les éléments dans le localStorage
//let cart = window.localStorage.getItem("cart");
//cartArray = JSON.parse(cart);
//console.log(cartArray);
let cartArray = [{
    idProduct: "107",
    quantityProduct: 1,
    colorProduct: "red"
    }];
console.log(cartArray);

async function getName() {
    try {
        const reponse = await fetch(`http://localhost:3000/api/products/${cartArray.idProduct}`);
        const product = await reponse.json();
    
        console.log(product.name);
        const name =product.name;
        return(name);
    
        } 
    catch (error) {
        console.log(error);
        return;
    }
}

async function getPrice() {
    try {
        const reponse = await fetch(`http://localhost:3000/api/products/${cartArray.idProduct}`);
        const product = await reponse.json();
    
        console.log(product.price);
        const price =product.price;
        return(price);
    
        } 
    catch (error) {
        console.log(error);
        return;
    }
}

function displayProduct(product) { 
     
    for (let i = 0; i < cartArray.length; i++) { // BOUCLE OU for (product[i] of cartArray)?

    
        //Cart
        const sectionCart = document.getElementById("cart__items");

        const articleElement = document.createElement("article");
        articleElement.classList.add("cart__item");

        const divImageElement = document.createElement("div");
        divImageElement.classList.add("cart__item__img");

        const imageCartElement = document.createElement("img");
        imageCartElement.classList.add("cart__item__img");
        imageCartElement.src = "../images/product01.jpg";
        imageCartElement.alt = "Photographie d'un canapé";

        const cartElement = document.createElement("div");
        cartElement.classList.add("cart__item__content");

        const descriptionCartElement = document.createElement("div");
        descriptionCartElement.classList.add("cart__item__content__description");

        const nameCartElement = document.createElement("h2");
        nameCartElement.innerText = `${getName()} €`;
        const colorCartElement = document.createElement("p");
        colorCartElement.innerText = cartArray[i].colorProduct;
        const priceCartElement = document.createElement("p");
        priceCartElement.innerText = `${getPrice()} €`;

        const settingsCartElement = document.createElement("div"); 
        settingsCartElement.classList.add("cart__item__content__settings");

        const settingsCartQuantityElement = document.createElement("div"); 
        settingsCartQuantityElement.classList.add("cart__item__content__settings__quantity");
        const quantityCartElement = document.createElement("p");
        quantityCartElement.innerText = "Qté : ";
        const quantityInputElement = documment.createElement("input");
        quantityInputElement.type = "number";
        quantityInputElement.classList.add("itemQuantity");
        quantityInputElement.name = "itemQuantity";
        quantityInputElement.min = "1";
        quantityInputElement.max = "100";
        quantityInputElement.value = "";

        const settingsCartDeleteElement = document.createElement("div"); 
        settingsCartDeleteElement.classList.add("cart__item__content__settings__delete");
        const deleteCartElement = document.createElement("p");
        settingsCartDeleteElement.classList.add("deleteItem");
        settingsCartDeleteElement.innerText = "Supprimer";

        sectionCart.appendChild(articleElement);

        articleElement.appendChild(divImageElement);

        divImageElement.appendChild(imageCartElement)

        articleElement.appendChild(cartElement);

        cartElement.appendChild(descriptionCartElement);
        descriptionCartElement.appendChild(nameCartElement);
        descriptionCartElement.appendChild(colorCartElement);
        descriptionCartElement.appendChild(priceCartElement);

        cartElement.appendChild(settingsCartElement);

        settingsCartElement.appendChild(settingsCartQuantityElement);
        settingsCartQuantityElement.appendChild(quantityCartElement);
        settingsCartQuantityElement.appendChild(quantityInputElement);
        settingsCartElement.appendChild(settingsCartDeleteElement);
        settingsCartDeleteElement.appendChild(deleteCartElement);
    }
}
displayProduct (cartArray);