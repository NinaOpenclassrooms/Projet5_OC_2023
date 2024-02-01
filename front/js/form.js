    //Formulaire de coordonnées
    const orderElement = document.getElementById("order");
    orderElement.addEventListener("click" || "keypress", (event) => {
        try {
            event.preventDefault();
            //Champ prénom
            const firstNameElement = document.getElementById("firstName");
            const firstName = firstNameElement.value.trim();
            console.log(firstName);
            checkFieldValidity(firstName);
            //Champ nom
            const lastNameElement = document.getElementById("lastName");
            const lastName = lastNameElement.value;
            checkFieldValidity(lastName);
            //Champ adresse
            const addressElement = document.getElementById("address");
            const address = addressElement.value;
            checkFieldValidity(address);
            //Champ ville
            const cityElement = document.getElementById("city");
            const city = cityElement.value;
            checkFieldValidity(city);
            //Champ email
            const emailElement = document.getElementById("email");
            const email = emailElement.value;
            checkFieldValidity(email);
        } catch (error) {
            console.log("Une erreur est survenue : " + error.message)
        }
    });

    function checkFieldValidity(field) {
        
        let regexFirstName = new RegExp("^[A-Za-z\é\è\ê\-\ï\ë]+$")
        let validationFirstName = regexFirstName.test(firstName);
        if (validationFirstName === false) {
            alert("Le format du prénom n'est pas correct.")
        }

        let regexLastName = new RegExp("^[A-Za-z\é\è\ê\-\ï\ë\ ]+$")
        let validationLastName = regexLastName.test(lastName);
        if (validationLastName === false) {
            alert("Le format du nom n'est pas correct.")
        }
    


    


        let validationCity = regexLastName.test(city);
        if (validationCity === false) {
            alert("Le format de la ville n'est pas correct.")
        }


    }