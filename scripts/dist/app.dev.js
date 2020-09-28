"use strict";

var news = function () {
  /**
   *  Get news from API
   * @param {string} term = Term to search
   * @param {int} offset  = Position to start searching from API
   * @param {int} count   = Number of items to search
   */
  function getNews() {
    var term,
        offset,
        count,
        _args = arguments;
    return regeneratorRuntime.async(function getNews$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            term = _args.length > 0 && _args[0] !== undefined ? _args[0] : "trending";
            offset = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
            count = _args.length > 2 && _args[2] !== undefined ? _args[2] : 4;
            _context.next = 5;
            return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/search?q=").concat(term, "&mkt=es-ES&offset=").concat(offset, "&count=").concat(count), {
              "method": "GET",
              "headers": {
                "x-rapidapi-host": API_HOST,
                "x-rapidapi-key": API_KEY
              }
            }).then(function (response) {
              return response.json();
            }).then(function (data) {
              return data.value;
            })["catch"](function (err) {
              console.log(err);
            }));

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
  /**
   * Append news to HTML
   * @param {string} term = Term to search
   * @param {int} offset  = Position to start searching from API
   */


  function appendNews(term) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var data = getNews(term, offset);
    var parent = document.querySelector('#news');
    var newsHTML = '';
    data.then(function (news) {
      news.forEach(function (element) {
        var image = 'image' in element ? element.image.thumbnail.contentUrl : 'https://www.bnd.com/latest-news/ppc7fl/picture222958020/alternates/LANDSCAPE_768/NEWSnew.jpg';
        newsHTML += "\n                <news-card class=\"news-card\" open data-url=\"".concat(element.url, "\">\n                    <img slot=\"image\" src=\"").concat(image, "\" alt=\"\">\n                    <p slot=\"title\">").concat(element.name, "</p>\n                    <p slot=\"content\">").concat(element.description, "...</p>\n                </news-card>\n                ");
      });
      parent.insertAdjacentHTML('beforeend', newsHTML);
    });

    document.querySelector('#more-stories').onclick = function () {
      appendNews(term, offset + 4);
    };
  }

  return {
    append: appendNews
  };
}();

var form = function () {
  /**
   * Validate fields and show modal with data for user validate
   * @param {HTMLEvent} event = Event executed in HTML
   * @param {string} form_id  = HTML form ID
   */
  function submitForm(event, form_id) {
    event.preventDefault();

    if (validateFields(form_id)) {
      var data = getDataForm(form_id);
      document.querySelector('body').insertAdjacentHTML('afterbegin', "\n            <app-modal>\n                <h1 slot=\"title\">All data is correct?</h1>\n                <ul slot=\"content\">\n                    ".concat(data.map(function (element) {
        return "<li><b>".concat(element.name, "</b> : ").concat(element.value, "</li>");
      }).join(''), "\n                </ul>\n                <a slot=\"close\" id=\"close\" class=\"btn btn-default c-pointer\" onclick=\"form.handleSubmit('").concat(form_id, "')\">Confirm and send</a>\n                <a slot=\"cancel\" id=\"close\" class=\"btn btn-danger c-pointer\">Cancel</a>\n            </app-modal>"));
    }
  }
  /**
   * Get all values from the form
   * @param {string} form_id  = HTML form ID
   */


  function getDataForm(id_form) {
    var form = document.querySelector("#".concat(id_form));
    var data = Array.from(new FormData(form), function (e) {
      return {
        name: getLabelForm(e[0]),
        value: e[1]
      };
    });
    return arrayUnique(data, function (it) {
      return it.name;
    });
  }
  /**
   * Get Label to the input
   * @param {string} name = Label name that refers to the input
   */


  function getLabelForm(name) {
    return document.querySelector("label[for=\"".concat(name, "\"]")).innerHTML;
  }
  /**
   * Submit form
   * @param {string} form_id  = HTML form ID
   */


  function handleSubmit(form_id) {
    document.querySelector("#".concat(form_id)).submit();
  }

  return {
    submit: submitForm,
    handleSubmit: handleSubmit
  };
}();

news.append("trending");