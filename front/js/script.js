//Importation des fonctions
import { displayProduct } from "./modules/homeDisplay.js";

getProducts()

/**
 * Send a request using fetch api to get the array products
 * @returns 
 */
async function getProducts() {
    try {
        const reponse = await fetch("http://localhost:3000/api/products");
        const products = await reponse.json();

        for (let product of products) {
            displayProduct(product);
        }
    }
    catch (error) {
        console.log(error);
        return;
    }
}
