"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  var isValid = true;
  document.querySelectorAll("#".concat(id_form, " .validate")).forEach(function (el) {
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

    el.addEventListener('blur', function (event) {
      return removeInvalid(event);
    }, false);
    el.addEventListener('keyup', function (event) {
      return removeInvalid(event);
    }, false);

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
  var parent = target.closest('div');
  parent.querySelector('p') ? parent.querySelector('p').classList.remove('d-none') : false;
}
/**
 * Hide error message
 * @param {HTMLElement} target
 */


function hideError(target) {
  var parent = target.closest('div');
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
  var self = event.target;
  var parent = self.closest("#mobile-menu");
  var icon = parent.querySelector('.icon');
  var state = parent.querySelector('ul').classList.contains('d-none');

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
  document.querySelectorAll('.m-menu li.dropdown').forEach(function (element) {
    element.onclick = function () {
      var state = this.querySelector('ul').classList.contains('sub-menu');

      if (!state) {
        this.querySelector('ul').classList.add('sub-menu');
      } else {
        this.querySelector('ul').classList.remove('sub-menu');
      }
    };
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


function arrayUnique(data, key) {
  return _toConsumableArray(new Map(data.map(function (x) {
    return [key(x), x];
  })).values());
}