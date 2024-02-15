//Formulaire de coordonnées
/**
 * Verify form validity with regular expressions
 * @returns { Object } clientContact
 */
export function verifyForm() {

    try {
        event.preventDefault();

        //Champ prénom
        const firstNameElement = document.getElementById("firstName");
        let firstName = firstNameElement.value.trim();
        let regexFirstName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-]{2,15}$");
        let validationFirstName = regexFirstName.test(firstName);
        const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "";
        if (validationFirstName === false) {
            firstNameErrorMsg.innerText = "Le champ n\'a pas le format attendu (uniquement des lettres sans espaces)."
        }

        //Champ nom
        const lastNameElement = document.getElementById("lastName");
        let lastName = lastNameElement.value.trim();
        let regexLastName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
        let validationLastName = regexLastName.test(lastName);
        const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "";
        if (validationLastName === false) {
            lastNameErrorMsg.innerText = "Le champ n\'a pas le format attendu (uniquement des lettres)."
        }

        //Champ adresse
        const addressElement = document.getElementById("address");
        let address = addressElement.value.trim();
        let regexAddress = new RegExp("[0-9]{0,3}[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,100}");
        let validationAddress = regexAddress.test(address);
        const addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = "";
        if (validationAddress === false) {
            addressErrorMsg.innerText = "Le champ n\'a pas le format attendu (Numéro + adresse)."
        }

        //Champ ville
        const cityElement = document.getElementById("city");
        let city = cityElement.value.trim();
        let regexCity = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
        let validationCity = regexCity.test(city);
        const cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "";
        if (validationCity === false) {
            cityErrorMsg.innerText = "Le champ n\'a pas le format attendu (uniquement des lettres)."
        }

        //Champ email
        const emailElement = document.getElementById("email");
        let email = emailElement.value.trim();
        let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,10}")
        let validationEmail = regexEmail.test(email);
        const emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "";
        if (validationEmail === false) {
            emailErrorMsg.innerText = "Le champ n\'a pas le format attendu (exemple@domaine.fr)."
        }

        if (validationFirstName === true && validationLastName === true && validationAddress === true && validationCity === true && validationEmail === true) {

            //Création d'un objet contenant les coordonnées du client
            let clientContact = {
                firstName: firstNameElement.value,
                lastName: lastNameElement.value,
                address: addressElement.value,
                city: cityElement.value,
                email: emailElement.value
            }
            console.log("Validation du formulaire terminée.")
            return clientContact
        }
    } catch (error) {
        console.log("Une erreur est survenue : " + error.message)
    }
};