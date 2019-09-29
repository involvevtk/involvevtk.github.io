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

function getAlbumById() {
  FB.api("/626581674196298", function (response) {
    if (response && !response.error) {
      console.log(response);
    }

    console.log(response.error);
  });
}

function getFbPostById() {
  FB.api("/481395608714906_1163013243886469/", function (response) {
    if (response && !response.error) {
      console.log(response);
    }

    console.log(response.error);
  });
}

var INVOLVMENT_DATA = ["<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.625115984342867%2F1180701355450991%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"241\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.625115984342867%2F1180701175451009%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.625115984342867%2F1180701142117679%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"241\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1163013230553137%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1163013120553148%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"244\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1163013017219825%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1162312897289837%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1154253571429103%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"498\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1131515910369536%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1107621549425639%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"285\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1107621492758978%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"241\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F1107621439425650%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"241\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F968929839961478%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.626581674196298%2F837886543065809%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"289\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.625115984342867%2F688149404706191%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"285\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>", "<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Finvolvevatakaraofficial%2Fphotos%2Fa.625115984342867%2F1180701402117653%2F%3Ftype%3D3&width=500\" width=\"500\" height=\"380\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allow=\"encrypted-media\"></iframe>"];

var InvolvementActivity =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InvolvementActivity, _React$Component);

  function InvolvementActivity() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InvolvementActivity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InvolvementActivity)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      $(".involvement-container").masonry({
        itemSelector: ".involvement",
        columnWidth: 200
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getActivityListing", function () {
      var activities = _this.props.list.map(function (item, index) {
        return React.createElement("div", {
          key: index,
          className: "involvement",
          dangerouslySetInnerHTML: {
            __html: item
          }
        });
      });

      return React.createElement(React.Fragment, null, activities);
    });

    return _this;
  }

  _createClass(InvolvementActivity, [{
    key: "render",
    value: function render() {
      return this.getActivityListing();
    }
  }]);

  return InvolvementActivity;
}(React.Component);

document.addEventListener("DOMContentLoaded", function () {
  var containerId = "involvement-container";
  var domContainer = document.getElementById(containerId);
  ReactDOM.render(React.createElement(InvolvementActivity, {
    list: INVOLVMENT_DATA
  }), domContainer);
});