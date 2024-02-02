const confirmationElement = document.getElementById("orderId");
confirmationElement.innerText = getOrderId();

function getOrderId() {
    const str = window.location.href;
    const url = new URL(str);
    const orderId = url.searchParams.get("orderId");

    return orderId;
}