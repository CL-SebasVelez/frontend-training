"use strict";

function validateFields(id_form) {
  var isValid = true;
  document.querySelectorAll("#".concat(id_form, " .validate")).forEach(function (el) {
    switch (el.type) {
      case "number":
      case "text":
      case "time":
      case "date":
      case "email":
      case "textarea":
        if (el.value == "") {
          el.classList.add('is-invalid');
        } else {
          el.classList.add('is-valid');
        }

        break;

      default:
        break;
    }

    el.addEventListener('blur', function (event) {
      return removeInvalid(event);
    }, false);
    el.addEventListener('keyup', function (event) {
      return removeInvalid(event);
    }, false);

    if (el.value == "") {
      el.classList.add('is-invalid');
      isValid = false;
      return;
    }
  });
  return isValid;
}

function removeInvalid(event) {
  switch (event.target.type) {
    case "number":
    case "text":
    case "time":
    case "date":
    case "email":
    case "textarea":
      if (event.target.value != "") {
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
      }

      break;
  }
}