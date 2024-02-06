
/**
 * Send request using fetch api to get the object product
 * @returns 
 */
async function getProduct() {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${getId()}`);
        const product = await response.json();

        displayProduct(product);
    }
    catch (error) {
        console.log(error);
        return;
    }
}
getProduct()

/**
 * Get the product's id in the url of the page
 * @returns { String } id
 */
function getId() {
    const str = window.location.href;
    const url = new URL(str);
    const id = url.searchParams.get("id");

    return id;
}

/**
 * Display the product (image, name, description, price, color choices)
 * @param { Object } product 
 */
async function displayProduct(product) {
    //Title
    document.title = product.name;

    //Logo
    const sectionLogo = document.querySelector(".item__img");
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = product.altTxt;

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
}


const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

/**
 * Add the products to the cart by using the local Storage
 * @returns if the quantity or the color of the product is incorrect
 */
function addToCart() {

    let cartObject = {
        idProduct: getId(),
        quantityProduct: getQuantity(),
        colorProduct: getColor()
    }

    if (verifyQuantity(cartObject.quantityProduct) === false || verifyColor(cartObject.colorProduct) === false) {
        return;
    }

    console.log(cartObject);

    let cartArray = localStorage.getItem("cart");
    if (cartArray) {
        cartArray = JSON.parse(cartArray);
        let findProduct = false;

        for (product of cartArray) {
            if (product.idProduct === cartObject.idProduct && product.colorProduct === cartObject.colorProduct) {
                findProduct = true;
                product.quantityProduct += cartObject.quantityProduct;
            }
        };

        if (findProduct === false) {
            cartArray.push(cartObject);
        }
    } else {

        cartArray = [];
        cartArray.push(cartObject);
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));
    alert("Le produit a été ajouté à votre panier.")
}

/**
 * Get quantity chosen by the user for the product
 * @returns { Integer } quantity
 */
function getQuantity() {
    const quantityElement = document.getElementById("quantity");
    const quantity = parseInt(quantityElement.value);  //VERIF SI IL FAUT PARSEINT
    return quantity;
}

/**
 * Get color chosen by the user for the product
 * @returns { String } color
 */
function getColor() {
    const colorElement = document.getElementById("colors");
    const color = colorElement.value;
    return color;
}

/**
 * Verify that the quantity is >=1 and <=100
 * @param { Integer } quantity 
 * @returns boolean
 */
function verifyQuantity(quantity) {
    if (quantity < 1 || quantity >= 100) {
        console.log("Erreur quantité");
        alert("La quantité choisie n'est pas conforme. Choisissez une quantité comprise entre 1 et 100.");
        return false;
    }
    return true;
}

/**
 * Verify that a color has been chosen for the product
 * @param { String } color 
 * @returns boolean
 */
function verifyColor(color) {
    if (color === "") {
        console.log("Erreur couleur");
        alert("Choisissez une couleur.");
        return false;
    }
    return true;
}