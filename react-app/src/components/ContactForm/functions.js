/**
 * Validate email
 * @param {any} email
 */
function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate empty string
 * @param {any} email
 */
function isEmpty(value) {
    return value === '';
}

/**
 * Validate numeric value
 * @param {any} num
 */
function isNumeric(num) {
    return /^-?\d+$/.test(num);
}


function formData(labels, values) {
    return Object.keys(labels).map((data) => {
        return {
            text: labels[data],
            value: values[data],
        };
    });
}

function validateForm(fields) {
    let errors = {};
    Object.keys(fields.labels).map((field, key) => {
        switch (field) {
            case 'firstName':
            case 'lastName':
            case 'message':
                if (isEmpty(fields[field])) {
                    errors[field] = "This field is required";
                }
                break;
            case 'email':
                if (isEmpty(fields[field])) {
                    errors[field] = "This field is required";
                    break;
                }
                if (!emailIsValid(fields[field])) {
                    errors[field] = "The format is not valid";
                }
                break;
            case 'phone':
                if (isEmpty(fields[field])) {
                    errors[field] = "This field is required";
                    break;
                }
                if (!isNumeric(fields[field])) {
                    errors[field] = "The format is not valid";
                }
                break;
            default:
                break;
        }
    });
    return errors;

}

export {
    formData,
    validateForm
}