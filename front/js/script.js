async function getProducts() {
    try {
        const reponse = await fetch("http://localhost:3000/api/products");
        const products = await reponse.json();
        
        for (product of products) {
            displayProduct (product);
        } 
    }
    catch (error) {
        console.log(error)
        return;
    }
}
getProducts()

async function displayProduct(product) { 
     
        // Récupération de l'élément du DOM qui accueillera les produits
        const sectionProducts = document.querySelector(".items");
        // Création d’une balise dédiée au produit
        const productElement = document.createElement("article");
        // On crée l’élément img et on configure la source de l’image.
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        imageElement.alt = product.altTxt;
        // Idem pour le nom
        const nameElement = document.createElement("h3");
        nameElement.classList.add("productName");
        nameElement.innerText = product.name;
        // Idem pour la description
        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("productDescription");
        descriptionElement.innerText= product.description;

        // On rattache la balise article à la section Items
        sectionProducts.appendChild(productElement);
        // On rattache l’image à productElement (la balise article)
        productElement.appendChild(imageElement);
        // On rattache le h3 à productElement (la balise article)
        productElement.appendChild(nameElement);
        // On rattache le p à productElement (la balise article)
        productElement.appendChild(descriptionElement);
}

console.log("chargement des produits terminé");


