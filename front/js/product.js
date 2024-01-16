
async function getProduct() {
    try {
        const reponse = await fetch(`http://localhost:3000/api/products/${getId()}`);
        const product = await reponse.json();

        console.log(product.name);

        displayProduct(product);

        } 
    catch (error) {
        console.log(error);
        return;
    }
}
getProduct()

function getId() { 
    const str = window.location.href;
    const url = new URL (str);
    console.log(url);

    const id = url.searchParams.get("id");
    console.log(id);
    return id;
}

async function displayProduct(product) {
    //Nom dans title
    const nameTitle = document.querySelector("title");
    nameTitle.innerText = product.name;

    //Logo
    const sectionLogo = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = "../images/logo.png";
    imageElement.alt = "Photographie d'un canapé";

    sectionLogo.appendChild(imageElement);

    //Nom et prix
    const nameElement = document.getElementById("title");
    nameElement.innerText = product.name;
    const priceElement = document.getElementById("price");
    priceElement.innerText = product.price;

    //Description
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;

    //Options de couleurs
    const sectionColors = document.getElementById("colors");

    for (color of product.colors) {
   
    const colorElement = document.createElement("option");
    colorElement.value = color;
    colorElement.innerText = color;

    sectionColors.appendChild(colorElement);
    }

    console.log("chargement du produit terminé");
}


const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener ("click", addToCart)


function addToCart() {

    let cartObject = {
        idProduct:`${getId()}`,
        quantityProduct: `${getQuantity()}`,
        colorProduct: `${getColor()}`
    };

    console.log(cartObject);
 
    let cartArray = localStorage.getItem("cart");
    if (cartArray) {
        cartArray = JSON.parse(cartArray);
        let findProduct = false;
        
        for (product of cartArray) {
            if (product.idProduct === cartObject.idProduct && product.colorProduct === cartObject.colorProduct) {
                findProduct = true;
                product.quantityProduct += parseInt(cartObject.quantityProduct);  //A SIMPLIFIER? VERIFIER POUR LA DEUXIEME ITERATION
                product.quantityProduct = parseInt(product.quantityProduct);
                console.log(product.quantityProduct);
            }
        };
        
        if (findProduct === false) {
            cartArray.push (cartObject);  
        }
    } else {
        cartArray = [];
        cartArray.push (cartObject);

    }

    localStorage.setItem ("cart", JSON.stringify(cartArray));
}

function getQuantity() {
    const quantityElement = document.getElementById("quantity");
    const quantity = parseInt(quantityElement.value);
    verifyQuantity (quantity);
    return quantity;
}

function getColor() {
    const colorElement = document.getElementById("colors");
    const color = colorElement.value;
    verifyColor(color);
    return color;
}

function verifyQuantity(quantity) {
    if (quantity<1 || quantity>100 ) {
        console.log("Erreur quantité");
        alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
    }
}

function verifyColor (color) {
    if (color==="") {
        console.log("Erreur couleur");
        alert("Choisissez une couleur.");
    }
}