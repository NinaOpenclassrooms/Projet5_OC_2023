//Insertion du numéro de commande sur la page
const confirmationElement = document.getElementById("orderId");
confirmationElement.innerText = "";            //EFFACEMENT DU NUMERO PRECEDENT SI PROBLEME DE RECUPERATION DU NUMERO???
confirmationElement.innerText = getOrderId();

function getOrderId() {
    const str = window.location.href;
    const url = new URL(str);
    const orderId = url.searchParams.get("orderId");

    return orderId;
}