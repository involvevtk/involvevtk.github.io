"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FEATURED_INVOLVEMENTS = [{
  url: "https://res.cloudinary.com/djb8sfqk1/image/upload/v1571526021/home-page-slider/place_holder_p5mf11.png",
  link: "https://www.facebook.com/involvevatakaraofficial/posts/1182091181978675",
  title: "Rotary School, Kozhikode",
  description: "I am a very simple card. I am good at containing small bits of information."
}, {
  url: "https://res.cloudinary.com/djb8sfqk1/image/upload/v1571526021/home-page-slider/place_holder_p5mf11.png",
  link: "https://www.facebook.com/involvevatakaraofficial/posts/968934716627657",
  title: "Aralam, Kannur",
  description: "I am a very simple card. I am good at containing small bits of information."
}, {
  url: "https://res.cloudinary.com/djb8sfqk1/image/upload/v1571526021/home-page-slider/place_holder_p5mf11.png",
  link: "https://www.facebook.com/involvevatakaraofficial/posts/1182091181978675",
  title: "Muthanga, Wayanad",
  description: "I am a very simple card. I am good at containing small bits of information."
}];

var FeaturedInvolvements =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FeaturedInvolvements, _React$Component);

  function FeaturedInvolvements() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeaturedInvolvements);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeaturedInvolvements)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      // init owl carousel
      $(".featured-slider").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        stagePadding: 50,
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 7500,
        autoplayHoverPause: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFeatureStructure", function (item) {
      return React.createElement("div", {
        "class": "card featured-card"
      }, React.createElement("div", {
        "class": "card-image"
      }, React.createElement("img", {
        src: item.url,
        alt: item.title,
        title: item.title
      }), React.createElement("span", {
        "class": "card-title"
      }, item.title)), React.createElement("div", {
        "class": "card-stacked"
      }, React.createElement("div", {
        "class": "card-content"
      }, React.createElement("p", null, item.description)), React.createElement("div", {
        "class": "card-action"
      }, React.createElement("a", {
        href: item.link
      }, "Read more"))));
    });

    _defineProperty(_assertThisInitialized(_this), "getFeaturedInvolvements", function () {
      var activities = _this.props.list.map(function (item, index) {
        return React.createElement("div", {
          key: index,
          className: "item"
        }, _this.getFeatureStructure(item));
      });

      return React.createElement(React.Fragment, null, activities);
    });

    return _this;
  }

  _createClass(FeaturedInvolvements, [{
    key: "render",
    value: function render() {
      return this.getFeaturedInvolvements();
    }
  }]);

  return FeaturedInvolvements;
}(React.Component);

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded"); // let containerId = "featured-container";
  // let domContainer = document.getElementById(containerId);
  // ReactDOM.render(
  //   <FeaturedInvolvements list={FEATURED_INVOLVEMENTS} />,
  //   domContainer
  // );
});