//Formulaire de coordonnées
const orderElement = document.getElementById("order");
orderElement.addEventListener("click" || "keypress", (event) => {
    try {
        event.preventDefault();

        //Champ prénom
        const firstNameElement = document.getElementById("firstName");
        checkFieldValidity(firstNameElement);
        checkFirstName(firstNameElement);

        //Champ nom
        const lastNameElement = document.getElementById("lastName");
        checkFieldValidity(lastNameElement);
        checkLastName(lastNameElement);

        //Champ adresse
        const addressElement = document.getElementById("address");
        checkFieldValidity(addressElement);
        checkAddress(addressElement);

        //Champ ville
        const cityElement = document.getElementById("city");
        checkFieldValidity(cityElement);
        checkCity(cityElement);

        //Champ email
        const emailElement = document.getElementById("email");
        checkFieldValidity(emailElement);
        checkEmail(emailElement);
        console.log("Test Ok!")

        const clientContactDetails = {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            address: addressElement.value,
            city: cityElement.value,
            email: emailElement.value
        }
        getCartProducts()

    } catch (error) {
        console.log("Une erreur est survenue : " + error.message)
    }
});

function checkFieldValidity(field) {
    let fieldValue = field.value.trim();

    if (fieldValue === "") {
        throw new Error(alert(`Le champ ${field.id} est vide.`))
    }
    return
}

function checkFirstName(firstNameElement) {
    let firstName = firstNameElement.value.trim();
    let regexFirstName = new RegExp("^[A-Za-z\é\è\ê\ï\ë\É\È\Ê\Ï\Ë\-]{2,15}$")
    let validationFirstName = regexFirstName.test(firstName);
    if (validationFirstName === false) {
        throw new Error(alert("Le champ Prénom n'a pas le format attendu."))
    }
    return
}

function checkLastName(lastNameElement) {
    let lastName = lastNameElement.value.trim();
    let regexLastName = new RegExp("^[A-Za-z\é\è\ê\ï\ë\â\ä\ü\É\È\Ê\Ï\Ë\Â\Ä\Ü\-]{2,50}$") //RAJOUTER L'ESPACE (\s NE FONCTIONNE PAS) 
    let validationLastName = regexLastName.test(lastName);
    if (validationLastName === false) {
        throw new Error(alert("Le champ Nom n'a pas le format attendu."))
    }
    return
}

function checkAddress(addressElement) {
    let address = addressElement.value.trim();
    let regexAddress = new RegExp("^[0-9A-Za-z\é\è\ê\ï\ë\â\ä\ü\É\È\Ê\Ï\Ë\Â\Ä\Ü\-]{2,100}$")   //RAJOUTER L'ESPACE (\s NE FONCTIONNE PAS)
    let validationAddress = regexAddress.test(address);
    if (validationAddress === false) {
        throw new Error(alert("Le champ Adresse n'a pas le format attendu."))
    }
    return
}

function checkCity(cityElement) {
    let city = cityElement.value.trim();
    let regexCity = new RegExp("^[A-Za-z\é\è\ê\ï\ë\â\ä\ü\É\È\Ê\Ï\Ë\Â\Ä\Ü\-]{2,50}$") //RAJOUTER L'ESPACE (\s NE FONCTIONNE PAS) 
    let validationCity = regexCity.test(city);
    if (validationCity === false) {
        throw new Error(alert("Le champ Ville n'a pas le format attendu."))
    }
    return
}

function checkEmail(emailElement) {
    let email = emailElement.value.trim();
    let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
    let validationEmail = regexEmail.test(email);
    if (validationEmail === false) {
        throw new Error(alert("Le champ Email n'a pas le format attendu."))
    }
    return
}
function getCartProducts() {

    const productNameElement = document.querySelectorAll(".cart__item__content__description h2");
    const productColorElement = document.querySelectorAll(".cart__item__content__description p:nth-child(2)");
}