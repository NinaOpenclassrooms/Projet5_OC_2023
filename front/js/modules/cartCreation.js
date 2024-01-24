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


        //Ajout d'un listener pour supprimer un produit
        let deleteList = document.querySelectorAll(".deleteItem");    
        console.log(deleteList);  

        for (let i = deleteList.length-1; i >= 0; i--) {
            deleteList[i].addEventListener("click", function() {
                const id = getIdData(deleteList[i]);
                const color = getcolorData(deleteList[i]);
                deleteItem(id, color, cartArray);
            });
        }

        //Ajout d'un listener pour modifier la quantité d'un produit
        let quantityList = document.querySelectorAll(".itemQuantity");
        console.log(quantityList);

        for (let i = 0; i < quantityList.length; i++) {
            quantityList[i].addEventListener("change", function() {
                const id = getIdData(quantityList[i]);
                const color = getcolorData(quantityList[i]);
                const newquantity = quantityList[i].value;
                changeQuantity(id, color, newquantity, cartArray);
            });
        }
        // for (element of quantityList) {
        //     element.addEventListener("change", function() {
        //         const id = getIdData(element);
        //         const color = getcolorData(element);
        //         const newquantity = element.value;
        //         changeQuantity(id, color, newquantity, cartArray);
        //     });
        // }
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
            sum += parseInt(element.quantityProduct);
        }
        return sum;
    }
    function changeQuantity(id, color, newquantity, cartArray) {

        //Message d'erreur si la quantité > 100
        if (verifyCartQuantity(newquantity) === false) {
            return;
        }
    
        if (newquantity === 0) {
            deleteItem(id, color, cartArray);
        }

        let product = {};    //??
    
        for (product of cartArray) {
    
            if (id === product.idProduct && color === product.colorProduct) {
                product.quantityProduct = newquantity;
                alert("changement");
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
    
    function verifyCartQuantity(quantity) {
    
        if (quantity>=100 ) {
            console.log("Erreur quantité");
            alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
            return false;
        }
        return true;
    }
    
    function deleteItem(id, color, cartArray) { 
         
        for (let i = 0; i < cartArray.length; i++) {
    
            if (id === cartArray[i].idProduct && color === cartArray[i].colorProduct) {   //REVOIR AVEC LA METHODE OF POUR LE SPLICE
                cartArray.splice(i, 1);
                alert("supression");
            }
            localStorage.setItem ("cart", JSON.stringify(cartArray));
        }
        //Mise à jour de la page
        updatePage();
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
        console.log(idElement);
        const id = idElement.getAttribute("data-id");
        console.log(id);
        return id
    }
    
    function getcolorData(element) {
        const idElement = element.closest(".cart__item");
        const color = idElement.getAttribute("data-color");
        console.log(color);
        return color
    }
    
    function updatePage() {
        document.getElementById("cart__items").innerHTML = "";
        return;
    }
}