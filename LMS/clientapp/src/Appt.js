
    document.addEventListener("DOMContentLoaded", () => {
        const nameInput = document.getElementById("name");
        const mobileInput = document.getElementById("mobile");
        const emailInput = document.getElementById("email");
        const submitButton = document.getElementById("submit");
        const errorDiv = document.getElementById("error");
        const summaryTable = document.getElementById("summaryTable").querySelector("tbody");
        const nameColumn = document.getElementById("nameColumn");
        const inputBox = getElementsByTagName('input');

        let contacts = [];
        let sortOrderAsc = true;

        const validateName = (name) => /^[a-zA-Z\s]{1,20}$/.test(name.trim());
        const validateMobile = (mobile) => /^\d{10}$/.test(mobile.trim());
        const validateEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
            return emailRegex.test(email.trim()) && email.trim().length <= 40;
        };

        const displayError = (show) => {
            errorDiv.style.display = show ? "block" : "none";
        };

        const resetFields = () => {
            nameInput.value = "";
            mobileInput.value = "";
            emailInput.value = "";
        };

        const addContactToTable = (contact) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${contact.name}</td><td>${contact.mobile}</td><td>${contact.email}</td>`;
            summaryTable.appendChild(row);
        };

        const sortContacts = () => {
            contacts.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrderAsc ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrderAsc ? 1 : -1;
                return 0;
            });

            summaryTable.innerHTML = "";
            contacts.forEach(addContactToTable);
            sortOrderAsc = !sortOrderAsc;
        };

        inputBox.addEventListener("change", () => {
            const name = nameInput.value;
            const mobile = mobileInput.value;
            const email = emailInput.value;
            displayError(false);

            if (!name || !mobile || !email || !validateName(name) || !validateMobile(mobile) || !validateEmail(email)) {
                displayError(true);
                return;
            }

            displayError(false);

           
        });

        submitButton.addEventListener("click", () => {
            const name = nameInput.value;
            const mobile = mobileInput.value;
            const email = emailInput.value;

            if (!name || !mobile || !email || !validateName(name) || !validateMobile(mobile) || !validateEmail(email)) {
                displayError(true);
                return;
            }

            displayError(false);

            const contact = { name, mobile, email };
            contacts.push(contact);

            addContactToTable(contact);
            resetFields();
        });

        nameColumn.addEventListener("click", sortContacts);

        displayError(true); // Display error by default
    });
