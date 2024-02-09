//Formulaire de coordonnées
/**
 * Verify form validity with regular expressions
 * @returns { Object } clientContact
 */
export function verifyForm() {

    try {
        event.preventDefault();

        let errorMessage = "";

        //Champ prénom
        const firstNameElement = document.getElementById("firstName");
        let firstName = firstNameElement.value.trim();
        let regexFirstName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-]{2,15}$");
        let validationFirstName = regexFirstName.test(firstName);
        if (validationFirstName === false) {
            const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
            firstNameErrorMsg.innerText = "Le champ Prénom n'a pas le format attendu."
        }

        //Champ nom
        const lastNameElement = document.getElementById("lastName");
        let lastName = lastNameElement.value.trim();
        let regexLastName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
        let validationLastName = regexLastName.test(lastName);
        if (validationLastName === false) {
            const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
            lastNameErrorMsg.innerText = "Le champ Nom n'a pas le format attendu."
        }

        //Champ adresse
        const addressElement = document.getElementById("address");
        let address = addressElement.value.trim();
        let regexAddress = new RegExp("^[0-9a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,100}$");
        let validationAddress = regexAddress.test(address);
        if (validationAddress === false) {
            const addressErrorMsg = document.getElementById("addressErrorMsg");
            addressErrorMsg.innerText = "Le champ Adresse n'a pas le format attendu."
        }

        //Champ ville
        const cityElement = document.getElementById("city");
        let city = cityElement.value.trim();
        let regexCity = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
        let validationCity = regexCity.test(city);
        if (validationCity === false) {
            const cityErrorMsg = document.getElementById("cityErrorMsg");
            cityErrorMsg.innerText = "Le champ Ville n'a pas le format attendu."
        }

        //Champ email
        const emailElement = document.getElementById("email");
        let email = emailElement.value.trim();
        let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,10}+")
        let validationEmail = regexEmail.test(email);
        if (validationEmail === false) {
            const emailErrorMsg = document.getElementById("emailErrorMsg");
            emailErrorMsg.innerText = "Le champ E-mail n'a pas le format attendu."
        }

        console.log("Validation du formulaire terminée.")

        //Création d'un objet contenant les coordonnées du client
        let clientContact = {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            address: addressElement.value,
            city: cityElement.value,     //A VERIF
            email: emailElement.value
        }
        console.log(clientContact);
        return clientContact
    } catch (error) {
        console.log("Une erreur est survenue : " + error.message)
    }
};

// /**
//  * Check the first name format in the form, send an error message if the format is incorrect
//  * @param { HTMLElement } firstNameElement
//  * @returns
//  */
// function checkFirstName(firstNameElement) {
//     let firstName = firstNameElement.value.trim();
//     let regexFirstName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-]{2,15}$");
//     let validationFirstName = regexFirstName.test(firstName);
//     if (validationFirstName === false) {
//         throw new Error(alert("Le champ Prénom n'a pas le format attendu."))
//     }
//     return
// }

// /**
//  * Check the first name format in the form, send an error message if the format is incorrect
//  * @param { HTMLElement } lastNameElement
//  * @returns
//  */
// function checkLastName(lastNameElement) {
//     let lastName = lastNameElement.value.trim();
//     let regexLastName = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
//     let validationLastName = regexLastName.test(lastName);
//     if (validationLastName === false) {
//         throw new Error(alert("Le champ Nom n'a pas le format attendu."))
//     }
//     return
// }

// /**
//  * Check the address format in the form, send an error message if the format is incorrect
//  * @param { HTMLElement } addressElement
//  * @returns
//  */
// function checkAddress(addressElement) {
//     let address = addressElement.value.trim();
//     let regexAddress = new RegExp("^[0-9a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,100}$");
//     let validationAddress = regexAddress.test(address);
//     if (validationAddress === false) {
//         throw new Error(alert("Le champ Adresse n'a pas le format attendu."))
//     }
//     return
// }

// /**
//  * Check the city format in the form, send an error message if the format is incorrect
//  * @param { HTMLElement } cityElement
//  * @returns
//  */
// function checkCity(cityElement) {
//     let city = cityElement.value.trim();
//     let regexCity = new RegExp("^[a-zA-ZàâäéèêëïîôöùûüçÀÂÄÉÈÊËÏÎÔÖÙÛÜÇ\-\\s]{2,50}$");
//     let validationCity = regexCity.test(city);
//     if (validationCity === false) {
//         throw new Error(alert("Le champ Ville n'a pas le format attendu."))
//     }
//     return
// }

// /**
//  * Check the email format in the form, send an error message if the format is incorrect
//  * @param { HTMLElement } emailElement
//  * @returns
//  */
// function checkEmail(emailElement) {
//     let email = emailElement.value.trim();
//     let regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,10}+")
//     let validationEmail = regexEmail.test(email);
//     if (validationEmail === false) {
//         throw new Error(alert("Le champ Email n'a pas le format attendu."))
//     }
//     return
// }