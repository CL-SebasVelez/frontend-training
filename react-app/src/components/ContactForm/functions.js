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


/**
 * Get data from values' param and to create an object with text and value
 * @param {Object} labels
 * @param {Object} values
 */
function formData(labels, values) {
    return Object.keys(labels).map((data) => {
        return {
            text: labels[data],
            value: values[data],
        };
    });
}

/**
 * Validate all fields from fields' param and to return an object with fields have errors
 * @param {Object} fields
 */
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