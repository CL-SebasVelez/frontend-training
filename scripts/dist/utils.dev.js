"use strict";

(function () {
  dropdown();
  document.querySelector('#mobile-menu').addEventListener('click', function (event) {
    mobileMenu(event);
  });
})();

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
          el.classList.remove('is-valid');
          el.classList.add('is-invalid');
        } else {
          el.classList.remove('is-invalid');
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

function dropdown() {
  document.querySelector('.dropdown').onclick = function (e) {
    e.stopPropagation();
    this.querySelector('.nav-dropdown').style.display = 'grid';
  };

  document.querySelector('html').onclick = function () {
    this.querySelector('.nav-dropdown').style.display = 'none';
  };
}

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