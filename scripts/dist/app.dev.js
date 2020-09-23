"use strict";

(function () {
  dropdown();
})();

function dropdown() {
  document.querySelector('.dropdown').onclick = function (e) {
    e.stopPropagation();
    this.querySelector('.nav-dropdown').style.display = 'grid';
  };

  document.querySelector('html').onclick = function () {
    this.querySelector('.nav-dropdown').style.display = 'none';
  };
}

var news = function () {
  function getNews() {
    var term,
        _args = arguments;
    return regeneratorRuntime.async(function getNews$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            term = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch("".concat(API_URL, "/search?q=").concat(term, "&mkt=es-ES"), {
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

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function appendNews() {
    var data = getNews();
    var parent = document.querySelector('#news');
    var newsHTML = '';
    data.then(function (news) {
      news.forEach(function (element) {
        console.log(element);
        var image = 'image' in element ? element.image.thumbnail.contentUrl : 'https://images.ctfassets.net/hrltx12pl8hq/1zlEl4XHkxeDuukJUJyQ7Y/a149a908727e2084d503dc103a620d7f/lohp-image-img-3.jpg?fit=fill&w=480&h=270';
        newsHTML += "\n                <news-card class=\"news-card\">\n                    <img slot=\"image\" src=\"".concat(image, "\" alt=\"\">\n                    <p slot=\"title\">").concat(element.name, "</p>\n                    <p slot=\"content\">").concat(element.description, "...</p>\n                </news-card>\n                ");
      });
      parent.insertAdjacentHTML('afterbegin', newsHTML);
    });
  }

  return {
    append: appendNews
  };
}();

news.append();