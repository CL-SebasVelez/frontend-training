(function () {
    dropdown();
    document.querySelector('#mobile-menu').addEventListener('click', function (event) {
        mobileMenu(event);
    });
})();

/**
 * Obtain the inputs of the submitted form and validate that they meet the necessary criteria.
 * @param {string} id_form = HTML Form ID to validate
 */
function validateFields(id_form) {
    let isValid = true;
    document.querySelectorAll(`#${id_form} .validate`).forEach(el => {
        switch (el.type) {
            case "email":
                if (el.value == "" && !emailIsValid(el.value)) {
                    el.classList.add('is-invalid');
                    showError(el);
                }
                break;
            case "number":
                if (el.value == "" && !isNumeric(el.value)) {
                    el.classList.add('is-invalid');
                    showError(el);
                }
                break;
            case "text":
            case "textarea":
                if (el.value == "") {
                    el.classList.add('is-invalid');
                    showError(el);
                }
                break;
            default:
                break;
        }
        el.addEventListener('blur',  (event) => removeInvalid(event), false);
        el.addEventListener('keyup', (event) => removeInvalid(event), false);
        if (el.value == "") {
            el.classList.add('is-invalid');
            showError(el);
            isValid = false;
            return;
        }
    });

    return isValid;
}

/**
 * Show error message
 * @param {HTMLElement} target
 */
function showError(target) {
    const parent = target.closest('div');
    parent.querySelector('p') ? parent.querySelector('p').classList.remove('d-none') : false;
}

/**
 * Hide error message
 * @param {HTMLElement} target
 */
function hideError(target) {
    const parent = target.closest('div');
    parent.querySelector('p') ? parent.querySelector('p').classList.add('d-none') : false;
}

/**
 * Validate the input fields and define if it is valid or not
 * @param {HTMLEvent} event = Event executed in inputs
 */
function removeInvalid(event) {
    switch (event.target.type) {
        case "email":
            if (event.target.value != "" && emailIsValid(event.target.value)) {
                event.target.classList.remove('is-invalid');
                hideError(event.target);
            }
            break;
        case "number":
            if (event.target.value != "" && isNumeric(event.target.value)) {
                event.target.classList.remove('is-invalid');
                hideError(event.target);
            }
            break;
        case "text":
        case "textarea":
            if (event.target.value != "") {
                event.target.classList.remove('is-invalid');
                hideError(event.target);
            }
            break;
    }
}

/**
 * Toggle dropdown
 */
function dropdown() {
    document.querySelector('.dropdown').onclick = function (e) {
        e.stopPropagation();
        this.querySelector('.nav-dropdown').style.display = 'grid';
    };

    document.querySelector('html').onclick = function () {
        this.querySelector('.nav-dropdown').style.display = 'none';
    };
}

/**
 * Open mobile menu
 * @param {HTMLEvent} event = Event executed in HTML
 */
function mobileMenu(event) {
    const self   = event.target;
    const parent = self.closest("#mobile-menu");
    const icon   = parent.querySelector('.icon');
    const state  = parent.querySelector('ul').classList.contains('d-none');
    if (state) {
        parent.querySelector('ul').classList.remove('d-none');
    } else if (!state && (self == parent || self == icon)) {
        parent.querySelector('ul').classList.add('d-none');
    }
    mobileSubMenu();
}

/**
 * Allow to show sub-menus in menu
 */
function mobileSubMenu() {
    document.querySelectorAll('.m-menu li.dropdown').forEach(element => {
        element.onclick = function () {
            const state = this.querySelector('ul').classList.contains('sub-menu');
            if (!state) {
                this.querySelector('ul').classList.add('sub-menu');
            } else {
                this.querySelector('ul').classList.remove('sub-menu');
            }
        }
    });
}

/**
 * Validate email
 * @param {any} email
 */
function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate numeric value
 * @param {any} num
 */
function isNumeric(num) {
    return /^-?\d+$/.test(num);
}

/**
 * Remove position to array from specific key
 * @param {array} data
 * @param {object} key
 */
function arrayUnique(data,key){
    return [
        ...new Map(
            data.map(x => [key(x),x])
        ).values()
    ];
}