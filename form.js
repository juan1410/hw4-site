const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const commentsField = document.querySelector("#comments");

const errorOut = document.querySelector("#error-message");
const infoOut = document.querySelector("#info-message");

function showError(msg) {
    errorOut.textContent = msg;
    errorOut.style.opacity = "1";

    setTimeout(() => {
        errorOut.style.opacity = "0";
    }, 2500);
}

function flashField(field) {
    field.style.backgroundColor = "#ffb3b3";
    setTimeout(() => {
        field.style.backgroundColor = "";
    }, 300);
}

nameField.addEventListener("input", () => {
  const allowed = /^[A-Za-z ]*$/;

  if (!allowed.test(nameField.value)) {
    showError("Illegal character! Only letters and spaces allowed.");
    flashField(nameField);

    nameField.value = nameField.value.replace(/[^A-Za-z ]/g, "");
  }
});

emailField.addEventListener("input", () => {
  const allowed = /^[A-Za-z0-9@._-]*$/;

  if (!allowed.test(emailField.value)) {
    showError("Illegal character for email.");
    flashField(emailField);

    emailField.value = emailField.value.replace(/[^A-Za-z0-9@._-]/g, "");
  }
});

commentsField.addEventListener("input", () => {
    const remaining = commentsField.maxLength - commentsField.value.length;

    infoOut.textContent = `${remaining} characters remaining`;

    if (remaining <= 20 && remaining > 0) {
        infoOut.style.color = "orange";
    } else if (remaining === 0) {
        infoOut.style.color = '#FF474c';
    } else {
        infoOut.style.color = "";
    }

    if (commentsField.value.length > commentsField.maxLength) {
        commentsField.setCustomValidity("Too many characters.");
    } else {
        commentsField.setCustomValidity("");
    }
});

commentsField.addEventListener("focus", () => {
  infoOut.style.opacity = "1";
});

commentsField.addEventListener("blur", () => {
  infoOut.style.opacity = "0"; 
});

function validateName() {
    nameField.setCustomValidity("");  

    const allowed = /^[A-Za-z ]*$/;

    if (!allowed.test(nameField.value)) {
        nameField.setCustomValidity("Name can include letters and spaces only.");
    } else if (nameField.value.length < nameField.minLength) {
        nameField.setCustomValidity("Name must be at least 2 characters long.");
    } else if(nameField.value.length > nameField.maxLength){
        nameField.setCustomValidity("Name must be less than 30 characeters long.")
    }
}

function validateEmail() {
    emailField.setCustomValidity("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(emailField.value)) {
        emailField.setCustomValidity("Please enter a valid email with a domain (e.g., example@gmail.com).");
    }
}

function validateComments() {
    commentsField.setCustomValidity("");

    if (commentsField.value.length < commentsField.minLength) {
        commentsField.setCustomValidity("Comments must be at least 5 characters long.");
    }
}

nameField.addEventListener("input", validateName);
emailField.addEventListener("input", validateEmail);
commentsField.addEventListener("input", validateComments);