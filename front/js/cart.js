//Fonction pour récupérer les éléments dans le localStorage
let cartArray = localStorage.getItem("cart");
if (cartArray) {
    cartArray = JSON.parse(cartArray);
    console.log(cartArray);
    displayCartProduct(cartArray);
} else {
    alert("Le panier est vide.")  //REDIRECTION VERS PAGE ACCUEIL
}

async function displayCartProduct(cartArray) { 
        try {
            
            for (let i = 0; i < cartArray.length; i++) {  //MODIFIER AVEC OF

            const reponse = await fetch(`http://localhost:3000/api/products/${cartArray[i].idProduct}`);
            const product = await reponse.json();
        
            console.log(product.name);

            const div = `<article class="cart__item" data-id=${cartArray[i].idProduct} data-color=${cartArray[i].colorProduct}>
            <div class="cart__item__img">
            <img src=${product.imageUrl} alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartArray[i].colorProduct}</p>
                <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartArray[i].quantityProduct}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
            </div>
        </article>` 
            const sectionCart = document.getElementById("cart__items");
            const articleCartElement = document.createElement ("div");
            sectionCart.appendChild (articleCartElement);
            articleCartElement.innerHTML = div;
            }
        } 
        catch (error) {
            console.log(error);
            return;
        }
}

function verifyQuantity(quantity) {
    if (quantity<1 || quantity>100 ) {
        console.log("Erreur quantité");
        alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
    }
}


// async function getName() {
//     try {
//         const reponse = await fetch(`http://localhost:3000/api/products/${cartArray[i].idProduct}`);
//         const product = await reponse.json();
    
//         console.log(product.name);
//         const name = product.name;
//         return(name);
    
//         } 
//     catch (error) {
//         console.log(error);
//         return;
//     }
// }

// async function getPrice() {
//     try {
//         const reponse = await fetch(`http://localhost:3000/api/products/${cartArray[0].idProduct}`);
//         const product = await reponse.json();
    
//         console.log(product.price);
//         const price = product.price;
//         return(price);
    
//         } 
//     catch (error) {
//         console.log(error);
//         return;
//     }
// }

// async function getImageUrl() {
//     try {
//         const reponse = await fetch(`http://localhost:3000/api/products/${cartArray[0].idProduct}`);
//         const product = await reponse.json();
    
//         console.log(product.imageUrl);
//         const image = product.imageUrl;
//         return(image);
    
//         } 
//     catch (error) {
//         console.log(error);
//         return;
//     }
// }

// async function getImageAlt() {
//     try {
//         const reponse = await fetch(`http://localhost:3000/api/products/${cartArray[0].idProduct}`);
//         const product = await reponse.json();
    
//         console.log(product.altTxt);
//         const imageAlt = product.altTxt;
//         return(imageAlt);
//         } 
//     catch (error) {
//         console.log(error);
//         return;
//     }
// }
