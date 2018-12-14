module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/components/ClippedDrawer.js":
/*!************************************************!*\
  !*** ./components/components/ClippedDrawer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Drawer */ "@material-ui/core/Drawer");
/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/List */ "@material-ui/core/List");
/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Divider */ "@material-ui/core/Divider");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tileData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tileData */ "./components/components/tileData.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/ChevronLeft */ "@material-ui/icons/ChevronLeft");
/* harmony import */ var _material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/ChevronRight */ "@material-ui/icons/ChevronRight");
/* harmony import */ var _material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/ButtonBase */ "@material-ui/core/ButtonBase");
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Menu */ "@material-ui/core/Menu");
/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_21__);
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\ClippedDrawer.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




















 // firebase



var drawerWidth = 260;

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: "calc(100% - ".concat(drawerWidth, "px)"),
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    drawerPaper: {
      position: 'fixed',
      height: '100vh',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: _defineProperty({
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7
    }, theme.breakpoints.up('sm'), {
      width: theme.spacing.unit * 9
    }),
    toolbar: _objectSpread({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px'
    }, theme.mixins.toolbar),
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      position: 'relative'
    }
  };
};

var ClippedDrawer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ClippedDrawer, _React$Component);

  function ClippedDrawer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ClippedDrawer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ClippedDrawer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false,
      anchorEl: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrawerOpen", function () {
      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrawerClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (event) {
      _this.setState({
        anchorEl: event.currentTarget
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        anchorEl: null
      });
    });

    return _this;
  }

  _createClass(ClippedDrawer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var anchorEl = this.state.anchorEl;
      var _this$props = this.props,
          classes = _this$props.classes,
          theme = _this$props.theme,
          user = _this$props.user;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.root,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
        position: "fixed",
        className: classnames__WEBPACK_IMPORTED_MODULE_18___default()(classes.appBar, this.state.open && classes.appBarShift),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default.a, {
        disableGutters: !this.state.open,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9___default.a, {
        color: "inherit",
        "aria-label": "Open drawer",
        onClick: this.handleDrawerOpen,
        className: classnames__WEBPACK_IMPORTED_MODULE_18___default()(classes.menuButton, this.state.open && classes.hide),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
        variant: "title",
        color: "inherit",
        noWrap: true,
        style: {
          flex: 1
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        },
        __self: this
      }, this.props.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_14___default.a, {
        onClick: this.handleClick,
        style: {
          marginRight: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {
        variant: "subheading",
        color: "inherit",
        noWrap: true,
        style: {
          marginRight: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, user.nombre), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          width: 40,
          height: 40,
          fontSize: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: this
      }, user ? user.nombre.toString().charAt(0) : 'none')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_15___default.a, {
        id: "simple-menu",
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onClose: this.handleClose,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_16___default.a, {
        onClick: function onClick() {
          sessionStorage.removeItem("code-status-ser-section");

          _this2.props.closeSesion();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        },
        __self: this
      }, "Cerrar Sesi\xF3n")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_1___default.a, {
        variant: "permanent",
        classes: {
          paper: classnames__WEBPACK_IMPORTED_MODULE_18___default()(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
        },
        open: this.state.open,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.toolbar,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9___default.a, {
        onClick: this.handleDrawerClose,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        },
        __self: this
      }, theme.direction === 'rtl' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ChevronRight__WEBPACK_IMPORTED_MODULE_12___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ChevronLeft__WEBPACK_IMPORTED_MODULE_11___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        },
        __self: this
      }, _tileData__WEBPACK_IMPORTED_MODULE_7__["mailFolderListItems"]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_6___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_4___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, _tileData__WEBPACK_IMPORTED_MODULE_7__["otherMailFolderListItems"])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
        className: classes.content,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.toolbar,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          height: '100%',
          position: 'fixed',
          paddingLeft: '5%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      }, this.props.children))));
    }
  }]);

  return ClippedDrawer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

ClippedDrawer.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_17___default.a.object.isRequired,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_17___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_19__["withStyles"])(styles, {
  withTheme: true
})(ClippedDrawer));

/***/ }),

/***/ "./components/components/session/ItemUser.js":
/*!***************************************************!*\
  !*** ./components/components/session/ItemUser.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/ButtonBase */ "@material-ui/core/ButtonBase");
/* harmony import */ var _material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\session\\ItemUser.js";






var ItemUser = function ItemUser(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ButtonBase__WEBPACK_IMPORTED_MODULE_4___default.a, {
    style: {
      margin: 10
    },
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_3___default.a, {
    elevation: 4,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      margin: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_2___default.a, {
    style: {
      width: 80,
      height: 80,
      fontSize: 40,
      marginBottom: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, props.title ? props.title.toString().charAt(0) : 'none'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, {
    variant: "subheading",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, props.title ? props.title : 'none'))));
};

/* harmony default export */ __webpack_exports__["default"] = (ItemUser);

/***/ }),

/***/ "./components/components/session/Login.js":
/*!************************************************!*\
  !*** ./components/components/session/Login.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Input */ "@material-ui/core/Input");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "@material-ui/core/InputLabel");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "@material-ui/core/InputAdornment");
/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Visibility */ "@material-ui/icons/Visibility");
/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/VisibilityOff */ "@material-ui/icons/VisibilityOff");
/* harmony import */ var _material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "@material-ui/core/CircularProgress");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../plugins/setSnackBars */ "./components/plugins/setSnackBars.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_15__);
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\session\\Login.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














 // firebase




var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      password: '',
      usuario: '',
      statePassword: 'normal',
      stateUsuario: 'normal',
      showPassword: false,
      loading: false,
      success: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangePassword", function (event) {
      if (event.target.value.length === 0) {
        _this.setState({
          statePassword: 'error'
        });
      } else {
        _this.setState({
          statePassword: 'normal'
        });
      }

      _this.setState({
        password: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeUsuario", function (event) {
      if (event.target.value.length === 0) {
        _this.setState({
          stateUsuario: 'error'
        });
      } else {
        _this.setState({
          stateUsuario: 'normal'
        });
      }

      _this.setState({
        usuario: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickShowPassword", function () {
      _this.setState(function (state) {
        return {
          showPassword: !state.showPassword
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSetInitSession", function () {
      if (_this.state.usuario.length === 0) {
        _this.setState({
          stateUsuario: 'error'
        });
      }

      if (_this.state.password.length === 0) {
        _this.setState({
          statePassword: 'error'
        });
      }

      if (_this.state.usuario.length > 0 && _this.state.password.length > 0) {
        _this.setState({
          success: false,
          loading: true
        });

        firebase_app__WEBPACK_IMPORTED_MODULE_14___default.a.auth().signInWithEmailAndPassword(_this.state.usuario, _this.state.password).catch(function (error) {
          var errorCode = error.code;

          if (errorCode === 'auth/invalid-email') {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_13__["default"].openSnack('error', 'rootSnackBar', 'Formato de correo electrónico erroneo', 2000);
          }

          if (errorCode === 'auth/user-not-found') {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_13__["default"].openSnack('error', 'rootSnackBar', 'Usuario no registrado', 2000);
          }

          if (errorCode === 'auth/wrong-password') {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_13__["default"].openSnack('error', 'rootSnackBar', 'Contraseña erronea', 2000);
          }

          _this.setState({
            loading: false,
            success: true
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onKeyPress", function (event) {
      if (event.charCode === 13) {
        // enter key pressed
        event.preventDefault();

        _this.handleSetInitSession();
      }
    });

    return _this;
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "rootSnackBar",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_1___default.a, {
        elevation: 5,
        style: {
          minWidth: 300,
          padding: 30,
          display: 'flex',
          flexDirection: 'column'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
        variant: "display2",
        component: "h1",
        style: {
          marginTop: 20,
          textAlign: 'center',
          color: 'black'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "RapiFac"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
        variant: "headline",
        component: "h1",
        style: {
          textAlign: 'center',
          color: 'gray',
          fontSize: 15,
          marginBottom: 20,
          marginTop: 18
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      }, "Ingresa al sistema"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        noValidate: true,
        autoComplete: "off",
        style: {
          display: 'flex',
          flexDirection: 'column'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_3___default.a, {
        error: this.state.stateUsuario === 'normal' ? false : true,
        id: "user",
        type: "text",
        value: this.state.usuario,
        onChange: this.handleChangeUsuario,
        label: "Correo Electronico",
        margin: "normal",
        onFocus: function onFocus() {
          _this2.state.usuario.length === 0 && _this2.setState({
            stateUsuario: 'error'
          });
        },
        style: {
          marginTop: 10,
          marginBottom: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 147
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_9___default.a, {
        style: {
          marginBottom: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_7___default.a, {
        error: this.state.statePassword === 'normal' ? false : true,
        htmlFor: "adornment-password",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        },
        __self: this
      }, "Contrase\xF1a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_6___default.a, {
        id: "adornment-password",
        label: "Nombre de usuario",
        error: this.state.statePassword === 'normal' ? false : true,
        type: this.state.showPassword ? 'text' : 'password',
        value: this.state.password,
        onChange: this.handleChangePassword,
        onFocus: function onFocus() {
          _this2.state.password.length === 0 && _this2.setState({
            statePassword: 'error'
          });
        },
        onKeyPress: this._onKeyPress,
        endAdornment: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_8___default.a, {
          position: "end",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 183
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_5___default.a, {
          "aria-label": "Toggle password visibility",
          onClick: this.handleClickShowPassword,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 184
          },
          __self: this
        }, this.state.showPassword ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_VisibilityOff__WEBPACK_IMPORTED_MODULE_11___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 188
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_10___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 188
          },
          __self: this
        }))),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          marginLeft: 20,
          marginRight: 20,
          position: 'relative'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
        variant: "contained",
        color: "primary",
        style: {
          marginTop: 20,
          marginBottom: 10,
          width: '100%'
        },
        disabled: this.state.stateUsuario === 'normal' && this.state.statePassword === 'normal' ? this.state.loading : true,
        onClick: this.handleSetInitSession,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        },
        __self: this
      }, "Iniciar sesion"), this.state.loading && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_12___default.a, {
        size: 24,
        style: {
          color: 'primary',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -8,
          marginLeft: -12
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 217
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
        size: "small",
        color: "primary",
        style: {
          marginBottom: 20
        },
        onClick: function onClick() {
          return _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_13__["default"].openSnack('info', 'rootSnackBar', 'Por favor comuniquese con soporte', 2000);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        },
        __self: this
      }, "No recuerdo mi contrase\xF1a")));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ "./components/components/session/LoginContenedor.js":
/*!**********************************************************!*\
  !*** ./components/components/session/LoginContenedor.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClippedDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ClippedDrawer */ "./components/components/ClippedDrawer.js");
/* harmony import */ var _LoginUsuarios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginUsuarios */ "./components/components/session/LoginUsuarios.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/database */ "firebase/database");
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_database__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_funtions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/funtions */ "./utils/funtions.js");
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\session\\LoginContenedor.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 //firebase






var LoginContenedor =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginContenedor, _Component);

  function LoginContenedor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginContenedor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginContenedor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      idUser: null,
      userSelected: null,
      users: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkStatusSession", function (array) {
      var idSessionUser = sessionStorage.getItem("code-status-ser-section");

      if (idSessionUser) {
        var itemUser = array.filter(function (item) {
          return item.code === idSessionUser;
        });
        itemUser[0] ? _this.changueStatusSesionUserLocal(idSessionUser, itemUser) : _this.setState({
          idUser: null,
          userSelected: null
        });
      } else {
        _this.setState({
          idUser: null,
          userSelected: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changueStatusSesionUserLocal", function (idSessionUser, itemUser) {
      _this.setState({
        idUser: idSessionUser,
        userSelected: itemUser[0]
      });

      _this.props.onChangueUserState(_this.state.users.filter(function (user) {
        return user.code === idSessionUser;
      })[0]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changueStatusSesionUser", function (id) {
      _this.setState({
        idUser: id,
        userSelected: _this.state.users.filter(function (user) {
          return user.code === id;
        })[0]
      });

      _this.props.onChangueUserState(_this.state.users.filter(function (user) {
        return user.code === id;
      })[0]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeStatusSesionUser", function () {
      _this.setState({
        idUser: null,
        userSelected: null
      });
    });

    return _this;
  }

  _createClass(LoginContenedor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        stateUsers: 'cargando'
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_3___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_3___default.a.database();
          var productosRef = db.ref('users/' + user.uid + '/usuarios');
          productosRef.on('value', function (snapshot) {
            if (snapshot.val()) {
              var array = _utils_funtions__WEBPACK_IMPORTED_MODULE_6__["default"].snapshotToArray(snapshot);
              var arraytem = [];
              array.forEach(function (item) {
                if (item.estado) {
                  arraytem.push(item);
                }
              });

              _this2.setState({
                stateUsers: 'llena',
                users: arraytem
              });

              _this2.checkStatusSession(arraytem);
            }
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          children = _this$props.children;
      var _this$state = this.state,
          idUser = _this$state.idUser,
          stateUsers = _this$state.stateUsers,
          users = _this$state.users;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: this
      }, idUser ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ClippedDrawer__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: title,
        user: this.state.userSelected,
        closeSesion: this.closeStatusSesionUser,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, children) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LoginUsuarios__WEBPACK_IMPORTED_MODULE_2__["default"], {
        stateUsers: stateUsers,
        users: users,
        onChangueStatusSession: this.changueStatusSesionUser,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }));
    }
  }]);

  return LoginContenedor;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (LoginContenedor);

/***/ }),

/***/ "./components/components/session/LoginUsuarios.js":
/*!********************************************************!*\
  !*** ./components/components/session/LoginUsuarios.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ItemUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ItemUser */ "./components/components/session/ItemUser.js");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "@material-ui/core/CircularProgress");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Dialog */ "@material-ui/core/Dialog");
/* harmony import */ var _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/DialogActions */ "@material-ui/core/DialogActions");
/* harmony import */ var _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/DialogContent */ "@material-ui/core/DialogContent");
/* harmony import */ var _material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/DialogContentText */ "@material-ui/core/DialogContentText");
/* harmony import */ var _material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/DialogTitle */ "@material-ui/core/DialogTitle");
/* harmony import */ var _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Input */ "@material-ui/core/Input");
/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../plugins/setSnackBars */ "./components/plugins/setSnackBars.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _utils_funtions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/funtions */ "./utils/funtions.js");
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\session\\LoginUsuarios.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 // firebase





var LoginUsuarios =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginUsuarios, _Component);

  function LoginUsuarios() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginUsuarios);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginUsuarios)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      stateUsers: 'vacia',
      users: [],
      opendialog: false,
      userSelecionado: {},
      userSelecionadoPassword: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOpen", function (item) {
      _this.setState({
        opendialog: true,
        userSelecionado: item,
        userSelecionadoPassword: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        opendialog: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLoginUser", function () {
      if (_this.state.userSelecionado.password === _this.state.userSelecionadoPassword) {
        sessionStorage.setItem("code-status-ser-section", _this.state.userSelecionado.code);
        _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_12__["default"].openSnack('success', 'rootSnackBar', "Bienvenido ".concat(_this.state.userSelecionado.nombre), 2000);

        _this.handleClose();

        _utils_funtions__WEBPACK_IMPORTED_MODULE_15__["default"].setTime(500, function () {
          _this.props.onChangueStatusSession(_this.state.userSelecionado.code);
        });
      } else {
        _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_12__["default"].openSnack('error', 'rootSnackBar', 'Contraseña incorrecta', 2000);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enter", function (event) {
      if (event.keyCode === 13) {
        _this.handleLoginUser();
      } //this.handleLoginUser()

    });

    return _this;
  }

  _createClass(LoginUsuarios, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        stateUsers: this.props.stateUsers,
        users: this.props.users
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        stateUsers: props.stateUsers,
        users: props.users
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          opendialog = _this$state.opendialog,
          stateUsers = _this$state.stateUsers,
          users = _this$state.users;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_6___default.a, {
        open: opendialog,
        onClose: this.handleClose,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_10___default.a, {
        id: "alert-dialog-title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }, this.state.userSelecionado.nombre), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_DialogContent__WEBPACK_IMPORTED_MODULE_8___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_DialogContentText__WEBPACK_IMPORTED_MODULE_9___default.a, {
        id: "alert-dialog-description",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_11___default.a, {
        placeholder: "Contrase\xF1a",
        type: "password",
        inputProps: {
          'aria-label': 'password user'
        },
        value: this.state.userSelecionadoPassword,
        onChange: function onChange(text) {
          return _this2.setState({
            userSelecionadoPassword: text.target.value
          });
        },
        onKeyUp: function onKeyUp(event) {
          _this2.enter(event);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_7___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
        onClick: this.handleClose,
        color: "secondary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, "Cancelar"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
        onClick: this.handleLoginUser,
        color: "primary",
        autoFocus: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }, "Aceptar"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          width: '100%'
        },
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          flex: 1
        },
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
        onClick: function onClick() {
          return firebase_app__WEBPACK_IMPORTED_MODULE_13___default.a.auth().signOut();
        },
        color: "primary",
        autoFocus: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }, "Cerrar Sesion")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        },
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
        component: "h1",
        variant: "display2",
        gutterBottom: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, "Usuarios del sistema"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, stateUsers === 'cargando' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_4___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }), stateUsers === 'vacia' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
        component: "title",
        variant: "headline",
        gutterBottom: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Lista de usuarios vac\xEDa"), stateUsers === 'llena' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1833972386",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, users.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ItemUser__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: item.id,
          onClick: function onClick() {
            return _this2.handleClickOpen(item);
          },
          title: item.nombre,
          letra: function letra(nombre) {
            return _this2.MaysPrimera(nombre);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 142
          },
          __self: this
        });
      }))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "1833972386",
        css: ".paperstyle{cursor:pointer;}.paperstyle:hover{border:4px solid #334;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6XFxuZXh0XFxTaXN0ZW1hQ29udGFibGVcXGNvbXBvbmVudHNcXGNvbXBvbmVudHNcXHNlc3Npb25cXExvZ2luVXN1YXJpb3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0ptQyxBQUd3QyxBQUdPLGVBRjFCLE9BR0EiLCJmaWxlIjoiRTpcXG5leHRcXFNpc3RlbWFDb250YWJsZVxcY29tcG9uZW50c1xcY29tcG9uZW50c1xcc2Vzc2lvblxcTG9naW5Vc3Vhcmlvcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBUeXBvZ3JhcGh5IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHknO1xyXG5pbXBvcnQgSXRlbVVzZXIgZnJvbSAnLi9JdGVtVXNlcidcclxuaW1wb3J0IENpcmN1bGFyUHJvZ3Jlc3MgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvQ2lyY3VsYXJQcm9ncmVzcyc7XHJcblxyXG5pbXBvcnQgQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0J1dHRvbic7XHJcbmltcG9ydCBEaWFsb2cgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nJztcclxuaW1wb3J0IERpYWxvZ0FjdGlvbnMgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQWN0aW9ucyc7XHJcbmltcG9ydCBEaWFsb2dDb250ZW50IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0RpYWxvZ0NvbnRlbnQnO1xyXG5pbXBvcnQgRGlhbG9nQ29udGVudFRleHQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nQ29udGVudFRleHQnO1xyXG5pbXBvcnQgRGlhbG9nVGl0bGUgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvRGlhbG9nVGl0bGUnO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvSW5wdXQnO1xyXG5pbXBvcnQgc2V0U25hY2tCYXJzIGZyb20gJy4uLy4uL3BsdWdpbnMvc2V0U25hY2tCYXJzJztcclxuXHJcbi8vIGZpcmViYXNlXHJcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnXHJcbmltcG9ydCAnZmlyZWJhc2UvYXV0aCdcclxuaW1wb3J0IGZ1bnRpb25zIGZyb20gJy4uLy4uLy4uL3V0aWxzL2Z1bnRpb25zJztcclxuXHJcblxyXG5jbGFzcyBMb2dpblVzdWFyaW9zIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHN0YXRlVXNlcnM6ICd2YWNpYScsXHJcbiAgICAgICAgdXNlcnM6IFtdLFxyXG5cclxuICAgICAgICBvcGVuZGlhbG9nOiBmYWxzZSxcclxuICAgICAgICB1c2VyU2VsZWNpb25hZG86IHt9LFxyXG4gICAgICAgIHVzZXJTZWxlY2lvbmFkb1Bhc3N3b3JkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzdGF0ZVVzZXJzOiB0aGlzLnByb3BzLnN0YXRlVXNlcnMsXHJcbiAgICAgICAgICAgIHVzZXJzOiB0aGlzLnByb3BzLnVzZXJzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHN0YXRlVXNlcnM6IHByb3BzLnN0YXRlVXNlcnMsXHJcbiAgICAgICAgICAgIHVzZXJzOiBwcm9wcy51c2Vyc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2tPcGVuID0gKGl0ZW0pID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgb3BlbmRpYWxvZzogdHJ1ZSwgdXNlclNlbGVjaW9uYWRvOiBpdGVtLCB1c2VyU2VsZWNpb25hZG9QYXNzd29yZDogJycgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGhhbmRsZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBvcGVuZGlhbG9nOiBmYWxzZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaGFuZGxlTG9naW5Vc2VyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnVzZXJTZWxlY2lvbmFkby5wYXNzd29yZCA9PT0gdGhpcy5zdGF0ZS51c2VyU2VsZWNpb25hZG9QYXNzd29yZCkge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY29kZS1zdGF0dXMtc2VyLXNlY3Rpb25cIiwgdGhpcy5zdGF0ZS51c2VyU2VsZWNpb25hZG8uY29kZSk7XHJcbiAgICAgICAgICAgIHNldFNuYWNrQmFycy5vcGVuU25hY2soJ3N1Y2Nlc3MnLCAncm9vdFNuYWNrQmFyJywgYEJpZW52ZW5pZG8gJHt0aGlzLnN0YXRlLnVzZXJTZWxlY2lvbmFkby5ub21icmV9YCwgMjAwMClcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbG9zZSgpXHJcbiAgICAgICAgICAgIGZ1bnRpb25zLnNldFRpbWUoNTAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmd1ZVN0YXR1c1Nlc3Npb24odGhpcy5zdGF0ZS51c2VyU2VsZWNpb25hZG8uY29kZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRTbmFja0JhcnMub3BlblNuYWNrKCdlcnJvcicsICdyb290U25hY2tCYXInLCAnQ29udHJhc2XDsWEgaW5jb3JyZWN0YScsIDIwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVudGVyPShldmVudCk9PntcclxuICAgICAgIGlmKGV2ZW50LmtleUNvZGU9PT0xMyl7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVMb2dpblVzZXIoKVxyXG4gICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5oYW5kbGVMb2dpblVzZXIoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICBcclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgb3BlbmRpYWxvZywgc3RhdGVVc2VycywgdXNlcnMgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPERpYWxvZ1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW49e29wZW5kaWFsb2d9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCJhbGVydC1kaWFsb2ctdGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJhbGVydC1kaWFsb2ctZGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxEaWFsb2dUaXRsZSBpZD1cImFsZXJ0LWRpYWxvZy10aXRsZVwiPnt0aGlzLnN0YXRlLnVzZXJTZWxlY2lvbmFkby5ub21icmV9PC9EaWFsb2dUaXRsZT5cclxuICAgICAgICAgICAgICAgICAgICA8RGlhbG9nQ29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPERpYWxvZ0NvbnRlbnRUZXh0IGlkPVwiYWxlcnQtZGlhbG9nLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNvbnRyYXNlw7FhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdwYXNzd29yZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogJ3Bhc3N3b3JkIHVzZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudXNlclNlbGVjaW9uYWRvUGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh0ZXh0KSA9PiB0aGlzLnNldFN0YXRlKHsgdXNlclNlbGVjaW9uYWRvUGFzc3dvcmQ6IHRleHQudGFyZ2V0LnZhbHVlIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5VXA9eyhldmVudCk9PiB7dGhpcy5lbnRlcihldmVudCkgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0RpYWxvZ0NvbnRlbnRUZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvRGlhbG9nQ29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICA8RGlhbG9nQWN0aW9ucz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfSBjb2xvcj1cInNlY29uZGFyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVMb2dpblVzZXJ9IGNvbG9yPVwicHJpbWFyeVwiIGF1dG9Gb2N1cz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFjZXB0YXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9EaWFsb2dBY3Rpb25zPlxyXG4gICAgICAgICAgICAgICAgPC9EaWFsb2c+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2ZsZXg6MX19PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKX0gY29sb3I9XCJwcmltYXJ5XCIgYXV0b0ZvY3VzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDZXJyYXIgU2VzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLCBoZWlnaHQ6ICcxMDB2aCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgY29tcG9uZW50PVwiaDFcIiB2YXJpYW50PVwiZGlzcGxheTJcIiBndXR0ZXJCb3R0b20+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc3VhcmlvcyBkZWwgc2lzdGVtYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVVc2VycyA9PT0gJ2NhcmdhbmRvJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaXJjdWxhclByb2dyZXNzIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVVc2VycyA9PT0gJ3ZhY2lhJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IGNvbXBvbmVudD1cInRpdGxlXCIgdmFyaWFudD1cImhlYWRsaW5lXCIgZ3V0dGVyQm90dG9tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0YSBkZSB1c3VhcmlvcyB2YWPDrWFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVVc2VycyA9PT0gJ2xsZW5hJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJzLm1hcCgoaXRlbSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SXRlbVVzZXIga2V5PXtpdGVtLmlkfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmhhbmRsZUNsaWNrT3BlbihpdGVtKX0gdGl0bGU9e2l0ZW0ubm9tYnJlfSBsZXRyYT17KG5vbWJyZSk9PnRoaXMuTWF5c1ByaW1lcmEobm9tYnJlKX0gLz4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxyXG4gICAgICAgICAgICAgICAgICAgIC5wYXBlcnN0eWxlIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLnBhcGVyc3R5bGU6aG92ZXIgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgIzMzNDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBgfTwvc3R5bGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luVXN1YXJpb3M7Il19 */\n/*@ sourceURL=E:\\next\\SistemaContable\\components\\components\\session\\LoginUsuarios.js */",
        __self: this
      }));
    }
  }]);

  return LoginUsuarios;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (LoginUsuarios);

/***/ }),

/***/ "./components/components/tileData.js":
/*!*******************************************!*\
  !*** ./components/components/tileData.js ***!
  \*******************************************/
/*! exports provided: mailFolderListItems, otherMailFolderListItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mailFolderListItems", function() { return mailFolderListItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "otherMailFolderListItems", function() { return otherMailFolderListItems; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/ListItem */ "@material-ui/core/ListItem");
/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "@material-ui/core/ListItemIcon");
/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "@material-ui/core/ListItemText");
/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Home */ "@material-ui/icons/Home");
/* harmony import */ var _material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Home__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_Drafts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Drafts */ "@material-ui/icons/Drafts");
/* harmony import */ var _material_ui_icons_Drafts__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Drafts__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/MonetizationOn */ "@material-ui/icons/MonetizationOn");
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_History__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/History */ "@material-ui/icons/History");
/* harmony import */ var _material_ui_icons_History__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_History__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Group */ "@material-ui/icons/Group");
/* harmony import */ var _material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_DriveEta__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/DriveEta */ "@material-ui/icons/DriveEta");
/* harmony import */ var _material_ui_icons_DriveEta__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DriveEta__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_ShoppingBasket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/ShoppingBasket */ "@material-ui/icons/ShoppingBasket");
/* harmony import */ var _material_ui_icons_ShoppingBasket__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ShoppingBasket__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _material_ui_icons_SupervisedUserCircle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/SupervisedUserCircle */ "@material-ui/icons/SupervisedUserCircle");
/* harmony import */ var _material_ui_icons_SupervisedUserCircle__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SupervisedUserCircle__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Mail */ "@material-ui/icons/Mail");
/* harmony import */ var _material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Mail__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Delete */ "@material-ui/icons/Delete");
/* harmony import */ var _material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Delete__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_Report__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Report */ "@material-ui/icons/Report");
/* harmony import */ var _material_ui_icons_Report__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Report__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_icons_DonutSmall__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/icons/DonutSmall */ "@material-ui/icons/DonutSmall");
/* harmony import */ var _material_ui_icons_DonutSmall__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DonutSmall__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/ShoppingCart */ "@material-ui/icons/ShoppingCart");
/* harmony import */ var _material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_TrendingUp__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/TrendingUp */ "@material-ui/icons/TrendingUp");
/* harmony import */ var _material_ui_icons_TrendingUp__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_TrendingUp__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "@material-ui/icons/AccountCircle");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_Style__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/Style */ "@material-ui/icons/Style");
/* harmony import */ var _material_ui_icons_Style__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Style__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_MarkunreadMailbox__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/MarkunreadMailbox */ "@material-ui/icons/MarkunreadMailbox");
/* harmony import */ var _material_ui_icons_MarkunreadMailbox__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MarkunreadMailbox__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "@material-ui/core/Tooltip");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../plugins/setSnackBars */ "./components/plugins/setSnackBars.js");
var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\tileData.js";
// This file is shared across the demos.
























var mailFolderListItems = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 32
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 33
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 34
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Inicio",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 35
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 36
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_TrendingUp__WEBPACK_IMPORTED_MODULE_17___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 37
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Inicio",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 40
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/productos",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 43
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 44
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Productos",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 45
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 46
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ShoppingBasket__WEBPACK_IMPORTED_MODULE_10___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 47
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Productos",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 50
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/stock",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 53
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 54
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Stock",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 55
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 56
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_History__WEBPACK_IMPORTED_MODULE_7___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 57
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Stock",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 60
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/proveedores",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 63
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 64
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Proveedores",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 65
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 66
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_DriveEta__WEBPACK_IMPORTED_MODULE_9___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 67
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Proveedores",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 70
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/clientes",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 73
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 74
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Clientes",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 75
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 76
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_SupervisedUserCircle__WEBPACK_IMPORTED_MODULE_11___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 77
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Contactos",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 80
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/ventasFac",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 83
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 84
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Ventas",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 85
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 86
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ShoppingCart__WEBPACK_IMPORTED_MODULE_16___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 87
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Ventas",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 90
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/retencion",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 93
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 94
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Retenciones",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 95
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 96
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_DonutSmall__WEBPACK_IMPORTED_MODULE_15___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 97
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Retenciones",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 100
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/caja",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 103
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 104
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Caja",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 105
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 106
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_6___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 107
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Caja",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 110
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/cuentas_cobrar",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 113
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 114
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Cuentas Cobrar",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 115
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 116
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Style__WEBPACK_IMPORTED_MODULE_19___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 117
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Cuentas Cobrar",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 120
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_22___default.a, {
  prefetch: true,
  href: "/usuarios",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 123
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_1___default.a, {
  button: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 124
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_21___default.a, {
  title: "Usuarios",
  placement: "right",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 125
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_2___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 126
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Group__WEBPACK_IMPORTED_MODULE_8___default.a, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 127
  },
  __self: undefined
}))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_3___default.a, {
  primary: "Usuarios",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 130
  },
  __self: undefined
}))));
var otherMailFolderListItems = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 137
  },
  __self: undefined
});

/***/ }),

/***/ "./components/containers/Layout.js":
/*!*****************************************!*\
  !*** ./components/containers/Layout.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "styled-jsx/style");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_theme_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/theme/theme */ "./components/theme/theme.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/app */ "firebase/app");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ "firebase/firestore");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase/auth */ "firebase/auth");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_session_Login__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/session/Login */ "./components/components/session/Login.js");
/* harmony import */ var _components_session_LoginContenedor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/session/LoginContenedor */ "./components/components/session/LoginContenedor.js");
var _jsxFileName = "E:\\next\\SistemaContable\\components\\containers\\Layout.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 //theme


 // firebase



 //Login



var themeCont = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["createMuiTheme"])(_objectSpread({}, _components_theme_theme__WEBPACK_IMPORTED_MODULE_4__["default"])); // Initialize Firebase

if (!firebase_app__WEBPACK_IMPORTED_MODULE_5___default.a.apps.length) {
  var config = {
    apiKey: "AIzaSyDRr4xJB6BxM5Uu-xHEe7lo_6hVZ_hC8DU",
    authDomain: "facbtaapps-2bd69.firebaseapp.com",
    databaseURL: "https://facbtaapps-2bd69.firebaseio.com",
    projectId: "facbtaapps-2bd69",
    storageBucket: "facbtaapps-2bd69.appspot.com",
    messagingSenderId: "182776326473"
  };
  var firebaseApp = firebase_app__WEBPACK_IMPORTED_MODULE_5___default.a.initializeApp(config, {
    timestampsInSnapshots: true
  });
  var api = firebaseApp.firestore();
  var settings = {
    timestampsInSnapshots: true
  };
  api.settings(settings);
  /* api.enablePersistence().then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  }); */
}

var Layout =
/*#__PURE__*/
function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Layout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Layout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      sesionState: 'cargando',
      online: true
    });

    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      firebase_app__WEBPACK_IMPORTED_MODULE_5___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          _this2.setState({
            sesionState: 'iniciada'
          });
        } else {
          _this2.setState({
            sesionState: 'cerrada'
          });
        }
      });

      if (navigator.onLine) {
        this.setState({
          online: true
        });
      } else {
        this.setState({
          online: false
        });
      }

      window.addEventListener('offline', function () {
        return _this2.setState({
          online: false
        });
      });
      window.addEventListener('online', function () {
        return _this2.setState({
          online: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("title", {
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("html", {
        lang: "es",
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 104
        },
        __self: this
      })), this.state.online === true ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["MuiThemeProvider"], {
        theme: themeCont,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "rootSnackBar",
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        },
        __self: this
      }), this.state.sesionState === 'iniciada' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_session_LoginContenedor__WEBPACK_IMPORTED_MODULE_9__["default"], {
        title: title,
        onChangueUserState: function onChangueUserState(usuario) {
          return _this3.props.onChangueUserState(usuario);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }, children), this.state.sesionState === 'cerrada' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_session_Login__WEBPACK_IMPORTED_MODULE_8__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      })) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center'
        },
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          background: 'red',
          padding: 20,
          color: 'white',
          borderRadius: 50
        },
        className: "jsx-1131271139",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Por favor revise su conexi\xF3n a internet!")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
        styleId: "1131271139",
        css: "body{margin:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6XFxuZXh0XFxTaXN0ZW1hQ29udGFibGVcXGNvbXBvbmVudHNcXGNvbnRhaW5lcnNcXExheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4SW1DLEFBSW9CLFNBQUMiLCJmaWxlIjoiRTpcXG5leHRcXFNpc3RlbWFDb250YWJsZVxcY29tcG9uZW50c1xcY29udGFpbmVyc1xcTGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5cclxuLy90aGVtZVxyXG5pbXBvcnQgeyBNdWlUaGVtZVByb3ZpZGVyLCBjcmVhdGVNdWlUaGVtZSB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RoZW1lL3RoZW1lJ1xyXG5cclxuLy8gZmlyZWJhc2VcclxuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCdcclxuaW1wb3J0ICdmaXJlYmFzZS9maXJlc3RvcmUnXHJcbmltcG9ydCAnZmlyZWJhc2UvYXV0aCdcclxuXHJcblxyXG4vL0xvZ2luXHJcbmltcG9ydCBMb2dpbiBmcm9tICcuLi9jb21wb25lbnRzL3Nlc3Npb24vTG9naW4nO1xyXG5pbXBvcnQgTG9naW5Db250ZW5lZG9yIGZyb20gJy4uL2NvbXBvbmVudHMvc2Vzc2lvbi9Mb2dpbkNvbnRlbmVkb3InO1xyXG5cclxuY29uc3QgdGhlbWVDb250ID0gY3JlYXRlTXVpVGhlbWUoeyAuLi50aGVtZSB9KTtcclxuXHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxuaWYgKCFmaXJlYmFzZS5hcHBzLmxlbmd0aCkge1xyXG4gICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RFJyNHhKQjZCeE01VXUteEhFZTdsb182aFZaX2hDOERVXCIsXHJcbiAgICAgICAgYXV0aERvbWFpbjogXCJmYWNidGFhcHBzLTJiZDY5LmZpcmViYXNlYXBwLmNvbVwiLFxyXG4gICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vZmFjYnRhYXBwcy0yYmQ2OS5maXJlYmFzZWlvLmNvbVwiLFxyXG4gICAgICAgIHByb2plY3RJZDogXCJmYWNidGFhcHBzLTJiZDY5XCIsXHJcbiAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJmYWNidGFhcHBzLTJiZDY5LmFwcHNwb3QuY29tXCIsXHJcbiAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiMTgyNzc2MzI2NDczXCJcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZmlyZWJhc2VBcHAgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZywge1xyXG4gICAgICAgIHRpbWVzdGFtcHNJblNuYXBzaG90czogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYXBpID0gZmlyZWJhc2VBcHAuZmlyZXN0b3JlKClcclxuXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHsgdGltZXN0YW1wc0luU25hcHNob3RzOiB0cnVlIH07XHJcbiAgICBhcGkuc2V0dGluZ3Moc2V0dGluZ3MpXHJcbiAgICAvKiBhcGkuZW5hYmxlUGVyc2lzdGVuY2UoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgQ2xvdWQgRmlyZXN0b3JlIHRocm91Z2ggZmlyZWJhc2VcclxuICAgICAgICB2YXIgZGIgPSBmaXJlYmFzZS5maXJlc3RvcmUoKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgaWYgKGVyci5jb2RlID09ICdmYWlsZWQtcHJlY29uZGl0aW9uJykge1xyXG4gICAgICAgICAgICAvLyBNdWx0aXBsZSB0YWJzIG9wZW4sIHBlcnNpc3RlbmNlIGNhbiBvbmx5IGJlIGVuYWJsZWRcclxuICAgICAgICAgICAgLy8gaW4gb25lIHRhYiBhdCBhIGEgdGltZS5cclxuICAgICAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgfSBlbHNlIGlmIChlcnIuY29kZSA9PSAndW5pbXBsZW1lbnRlZCcpIHtcclxuICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFsbCBvZiB0aGVcclxuICAgICAgICAgICAgLy8gZmVhdHVyZXMgcmVxdWlyZWQgdG8gZW5hYmxlIHBlcnNpc3RlbmNlXHJcbiAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgIH1cclxuICAgIH0pOyAqL1xyXG5cclxufVxyXG5cclxuXHJcbmNsYXNzIExheW91dCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgc2VzaW9uU3RhdGU6ICdjYXJnYW5kbycsXHJcbiAgICAgICAgb25saW5lOiB0cnVlLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc2lvblN0YXRlOiAnaW5pY2lhZGEnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZXNpb25TdGF0ZTogJ2NlcnJhZGEnIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobmF2aWdhdG9yLm9uTGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIG9ubGluZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgb25saW5lOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsICgpID0+IHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBvbmxpbmU6IGZhbHNlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCAoKSA9PiB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgb25saW5lOiB0cnVlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7IGNoaWxkcmVuLCB0aXRsZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8SGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8aHRtbCBsYW5nPVwiZXNcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTWF0ZXJpYWwgVWkgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvOjMwMCw0MDAsNTAwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnNcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9IZWFkPlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub25saW5lID09PSB0cnVlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE11aVRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lQ29udH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPSdyb290U25hY2tCYXInPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlc2lvblN0YXRlID09PSAnaW5pY2lhZGEnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExvZ2luQ29udGVuZWRvciB0aXRsZT17dGl0bGV9IG9uQ2hhbmd1ZVVzZXJTdGF0ZT17dXN1YXJpbyA9PiB0aGlzLnByb3BzLm9uQ2hhbmd1ZVVzZXJTdGF0ZSh1c3VhcmlvKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xvZ2luQ29udGVuZWRvcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZXNpb25TdGF0ZSA9PT0gJ2NlcnJhZGEnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExvZ2luIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTXVpVGhlbWVQcm92aWRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMHZ3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMHZoJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3IgZmF2b3IgcmV2aXNlIHN1IGNvbmV4acOzbiBhIGludGVybmV0IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcclxuICAgICAgICAgICAgICAgICAgICBib2R5IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjowXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYH08L3N0eWxlPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7Il19 */\n/*@ sourceURL=E:\\next\\SistemaContable\\components\\containers\\Layout.js */",
        __self: this
      }));
    }
  }]);

  return Layout;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./components/plugins/SnackBars.js":
/*!*****************************************!*\
  !*** ./components/plugins/SnackBars.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Snackbar */ "@material-ui/core/Snackbar");
/* harmony import */ var _material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/Close */ "@material-ui/icons/Close");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/SnackbarContent */ "@material-ui/core/SnackbarContent");
/* harmony import */ var _material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/CheckCircle */ "@material-ui/icons/CheckCircle");
/* harmony import */ var _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/Error */ "@material-ui/icons/Error");
/* harmony import */ var _material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Info */ "@material-ui/icons/Info");
/* harmony import */ var _material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Warning */ "@material-ui/icons/Warning");
/* harmony import */ var _material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "E:\\next\\SistemaContable\\components\\plugins\\SnackBars.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var variantIcon = {
  success: _material_ui_icons_CheckCircle__WEBPACK_IMPORTED_MODULE_5___default.a,
  warning: _material_ui_icons_Warning__WEBPACK_IMPORTED_MODULE_8___default.a,
  error: _material_ui_icons_Error__WEBPACK_IMPORTED_MODULE_6___default.a,
  info: _material_ui_icons_Info__WEBPACK_IMPORTED_MODULE_7___default.a
};
var variantColor = {
  success: {
    backgroundColor: "#43a047"
  },
  warning: {
    backgroundColor: "#ffa000"
  },
  error: {
    backgroundColor: "#d32f2f"
  },
  info: {
    backgroundColor: "#1976d2"
  },
  default: {
    backgroundColor: '#1976d2'
  }
};

var SimpleSnackbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleSnackbar, _React$Component);

  function SimpleSnackbar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SimpleSnackbar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SimpleSnackbar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function () {
      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function (event, reason) {
      if (reason === 'clickaway') {
        return;
      }

      _this.setState({
        open: false
      });
    });

    return _this;
  }

  _createClass(SimpleSnackbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        open: this.props.openSnack
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Snackbar__WEBPACK_IMPORTED_MODULE_1___default.a, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        open: this.state.open,
        autoHideDuration: this.props.time,
        onClose: this.handleClose,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MySnackbarContent, {
        onClose: this.handleClose,
        variant: "".concat(this.props.variant),
        message: "".concat(this.props.message),
        style: this.props.variant === 'error' ? variantColor.error : this.props.variant === 'info' ? variantColor.info : this.props.variant === 'success' ? variantColor.success : this.props.variant === 'warning' ? variantColor.warning : variantColor.default,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      })));
    }
  }]);

  return SimpleSnackbar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

function MySnackbarContent(props) {
  var message = props.message,
      onClose = props.onClose,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["message", "onClose", "variant"]);

  var Icon = variantIcon[variant];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_SnackbarContent__WEBPACK_IMPORTED_MODULE_4___default.a, _extends({
    "aria-describedby": "client-snackbar",
    message: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      id: "client-snackbar",
      style: {
        display: 'flex',
        alignItems: 'center'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Icon, {
      style: {
        opacity: 0.9,
        marginRight: 10,
        fontSize: 20
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }), message),
    action: [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_2___default.a, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      onClick: onClose,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_3___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 119
      },
      __self: this
    }))]
  }, other, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (SimpleSnackbar);

/***/ }),

/***/ "./components/plugins/setSnackBars.js":
/*!********************************************!*\
  !*** ./components/plugins/setSnackBars.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_funtions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/funtions */ "./utils/funtions.js");
/* harmony import */ var _plugins_SnackBars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../plugins/SnackBars */ "./components/plugins/SnackBars.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "E:\\next\\SistemaContable\\components\\plugins\\setSnackBars.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var SetSnackBars = function SetSnackBars() {
  var _this = this;

  _classCallCheck(this, SetSnackBars);

  _defineProperty(this, "openSnack", function (variant, contenedor, message, time) {
    Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(_this.getSnack(variant, message, time), document.getElementById(contenedor));
    _utils_funtions__WEBPACK_IMPORTED_MODULE_1__["default"].setTime(time + 200, function () {
      Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: this
      }), document.getElementById(contenedor));
    });
  });

  _defineProperty(this, "getSnack", function (variant, message, time) {
    switch (variant) {
      case 'success':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_plugins_SnackBars__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "success",
          message: message,
          time: time,
          openSnack: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          },
          __self: this
        });

      case 'error':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_plugins_SnackBars__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "error",
          message: message,
          time: time,
          openSnack: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: this
        });

      case 'warning':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_plugins_SnackBars__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "warning",
          message: message,
          time: time,
          openSnack: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        });

      case 'info':
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_plugins_SnackBars__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "info",
          message: message,
          time: time,
          openSnack: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        });

      default:
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          },
          __self: this
        });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (new SetSnackBars());

/***/ }),

/***/ "./components/theme/theme.js":
/*!***********************************!*\
  !*** ./components/theme/theme.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/colors/teal */ "@material-ui/core/colors/teal");
/* harmony import */ var _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/colors/blue */ "@material-ui/core/colors/blue");
/* harmony import */ var _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/colors/red */ "@material-ui/core/colors/red");
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_2__);



var theme = {
  palette: {
    primary: _material_ui_core_colors_teal__WEBPACK_IMPORTED_MODULE_0___default.a,
    secondary: _material_ui_core_colors_blue__WEBPACK_IMPORTED_MODULE_1___default.a,
    error: _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_2___default.a,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};
/* harmony default export */ __webpack_exports__["default"] = (theme);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_containers_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/containers/Layout */ "./components/containers/Layout.js");
var _jsxFileName = "E:\\next\\SistemaContable\\pages\\index.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Main);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Main)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      initialState: false,
      usuario: {
        nombre: ''
      }
    });

    return _this;
  }

  _createClass(Main, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          initialState: true
        });
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, this.state.initialState ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_containers_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
        title: "Bienvenido",
        onChangueUserState: function onChangueUserState(usuario) {
          return _this3.setState({
            usuario: usuario
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex',
          textAlign: 'center',
          width: '100%',
          height: '80vh',
          paddingTop: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          fontFamily: "Courier new",
          fontWeight: '800'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, "".concat(this.state.usuario.nombre), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }), " RapiFac te da la bievenida")) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/static/spinner.gif",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        },
        __self: this
      })));
    }
  }]);

  return Main;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Main);

/***/ }),

/***/ "./utils/funtions.js":
/*!***************************!*\
  !*** ./utils/funtions.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FUNTIONS = function FUNTIONS() {
  _classCallCheck(this, FUNTIONS);

  _defineProperty(this, "filterObjectsCategories", function (array, categoria) {
    return array.filter(function (item) {
      return item.categoria === categoria;
    });
  });

  _defineProperty(this, "filterObjectsTipos", function (array, tipo) {
    return array.filter(function (item) {
      return item.tipo === tipo;
    });
  });

  _defineProperty(this, "filterObjectsCodigo", function (array, codigo) {
    var arrayReturn = [];
    array.forEach(function (item) {
      var itemData = JSON.stringify(item);
      itemData = itemData.toLowerCase();
      var itemFilter = itemData.includes(codigo);

      if (itemFilter) {
        arrayReturn.push(item);
      }
    });
    return arrayReturn;
  });

  _defineProperty(this, "filterObjectsCedulas", function (array, cedula) {
    var arrayReturn = [];
    array.forEach(function (item) {
      var itemData = JSON.stringify(item);
      itemData = itemData.toLowerCase();
      var itemFilter = itemData.includes(cedula);

      if (itemFilter) {
        arrayReturn.push(item);
      }
    });
    return arrayReturn;
  });

  _defineProperty(this, "filterObjectsCedula", function (array, cedula) {
    var arrayReturn = [];
    array.forEach(function (item) {
      if (item.cedula.toString().includes(cedula)) {
        arrayReturn.push(item);
      }
    });
    return arrayReturn;
  });

  _defineProperty(this, "categorieToKey", function (array) {
    var returnArray = [];
    var contador = 0;
    array.forEach(function (item) {
      var itemNew = {};
      itemNew.nombre = item;
      itemNew.key = contador;
      returnArray.push(itemNew);
      contador++;
    });
    return returnArray;
  });

  _defineProperty(this, "repeatTo", function (array) {
    var returnArray = [];
    array.forEach(function (item) {
      if (!returnArray.includes(item)) {
        returnArray.push(item);
      }
    });
    return returnArray;
  });

  _defineProperty(this, "inventarioToCategories", function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      var nameCategory = item.categoria ? item.categoria : 'Sin Categoria';
      returnArr.push(nameCategory);
    });
    return returnArr;
  });

  _defineProperty(this, "contactosToCedulas", function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      var nameCedula = item.cedula ? item.cedula : 'Sin Tipo';
      returnArr.push(nameCedula);
    });
    return returnArr;
  });

  _defineProperty(this, "contactosToTipos", function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      var name = item.tipo ? item.tipo : 'Sin Tipo';
      returnArr.push(name);
    });
    return returnArr;
  });

  _defineProperty(this, "inventarioToProveedores", function (snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      var name = item.proveedor ? item.proveedor : 'Sin Categoria';
      returnArr.push(name);
    });
    return returnArr;
  });

  _defineProperty(this, "guidGenerator", function () {
    var S4 = function S4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };

    return S4() + S4() + S4();
  });

  _defineProperty(this, "setTime", function (secons, funt) {
    setTimeout(function () {
      funt();
    }, secons);
  });

  _defineProperty(this, "snapshotToArray", function (snapshot) {
    var array = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.id = childSnapshot.key;
      array.push(item);
    });
    return array;
  });

  _defineProperty(this, "obtenerFechaActual", function () {
    var date = new Date();
    var day = date.getDate();
    var mon = date.getMonth();
    var yea = date.getFullYear();

    if (String(day).length === 1) {
      day = '0' + day;
    }

    if (String(mon).length === 1) {
      mon = '0' + mon;
    }

    return "".concat(yea, "-").concat(mon, "-").concat(day);
  });

  _defineProperty(this, "obtenerHoraActual", function () {
    return "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
  });
};

/* harmony default export */ __webpack_exports__["default"] = (new FUNTIONS());

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Avatar":
/*!*******************************************!*\
  !*** external "@material-ui/core/Avatar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/ButtonBase":
/*!***********************************************!*\
  !*** external "@material-ui/core/ButtonBase" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ButtonBase");

/***/ }),

/***/ "@material-ui/core/CircularProgress":
/*!*****************************************************!*\
  !*** external "@material-ui/core/CircularProgress" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CircularProgress");

/***/ }),

/***/ "@material-ui/core/Dialog":
/*!*******************************************!*\
  !*** external "@material-ui/core/Dialog" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Dialog");

/***/ }),

/***/ "@material-ui/core/DialogActions":
/*!**************************************************!*\
  !*** external "@material-ui/core/DialogActions" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogActions");

/***/ }),

/***/ "@material-ui/core/DialogContent":
/*!**************************************************!*\
  !*** external "@material-ui/core/DialogContent" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogContent");

/***/ }),

/***/ "@material-ui/core/DialogContentText":
/*!******************************************************!*\
  !*** external "@material-ui/core/DialogContentText" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogContentText");

/***/ }),

/***/ "@material-ui/core/DialogTitle":
/*!************************************************!*\
  !*** external "@material-ui/core/DialogTitle" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/DialogTitle");

/***/ }),

/***/ "@material-ui/core/Divider":
/*!********************************************!*\
  !*** external "@material-ui/core/Divider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Divider");

/***/ }),

/***/ "@material-ui/core/Drawer":
/*!*******************************************!*\
  !*** external "@material-ui/core/Drawer" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Drawer");

/***/ }),

/***/ "@material-ui/core/FormControl":
/*!************************************************!*\
  !*** external "@material-ui/core/FormControl" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/FormControl");

/***/ }),

/***/ "@material-ui/core/IconButton":
/*!***********************************************!*\
  !*** external "@material-ui/core/IconButton" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),

/***/ "@material-ui/core/Input":
/*!******************************************!*\
  !*** external "@material-ui/core/Input" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Input");

/***/ }),

/***/ "@material-ui/core/InputAdornment":
/*!***************************************************!*\
  !*** external "@material-ui/core/InputAdornment" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputAdornment");

/***/ }),

/***/ "@material-ui/core/InputLabel":
/*!***********************************************!*\
  !*** external "@material-ui/core/InputLabel" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/InputLabel");

/***/ }),

/***/ "@material-ui/core/List":
/*!*****************************************!*\
  !*** external "@material-ui/core/List" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/List");

/***/ }),

/***/ "@material-ui/core/ListItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/ListItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItem");

/***/ }),

/***/ "@material-ui/core/ListItemIcon":
/*!*************************************************!*\
  !*** external "@material-ui/core/ListItemIcon" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItemIcon");

/***/ }),

/***/ "@material-ui/core/ListItemText":
/*!*************************************************!*\
  !*** external "@material-ui/core/ListItemText" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/ListItemText");

/***/ }),

/***/ "@material-ui/core/Menu":
/*!*****************************************!*\
  !*** external "@material-ui/core/Menu" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Menu");

/***/ }),

/***/ "@material-ui/core/MenuItem":
/*!*********************************************!*\
  !*** external "@material-ui/core/MenuItem" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),

/***/ "@material-ui/core/Paper":
/*!******************************************!*\
  !*** external "@material-ui/core/Paper" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),

/***/ "@material-ui/core/Snackbar":
/*!*********************************************!*\
  !*** external "@material-ui/core/Snackbar" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Snackbar");

/***/ }),

/***/ "@material-ui/core/SnackbarContent":
/*!****************************************************!*\
  !*** external "@material-ui/core/SnackbarContent" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/SnackbarContent");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ "@material-ui/core/Tooltip":
/*!********************************************!*\
  !*** external "@material-ui/core/Tooltip" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tooltip");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/colors/blue":
/*!************************************************!*\
  !*** external "@material-ui/core/colors/blue" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/blue");

/***/ }),

/***/ "@material-ui/core/colors/red":
/*!***********************************************!*\
  !*** external "@material-ui/core/colors/red" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/red");

/***/ }),

/***/ "@material-ui/core/colors/teal":
/*!************************************************!*\
  !*** external "@material-ui/core/colors/teal" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/teal");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/AccountCircle":
/*!***************************************************!*\
  !*** external "@material-ui/icons/AccountCircle" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AccountCircle");

/***/ }),

/***/ "@material-ui/icons/CheckCircle":
/*!*************************************************!*\
  !*** external "@material-ui/icons/CheckCircle" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/CheckCircle");

/***/ }),

/***/ "@material-ui/icons/ChevronLeft":
/*!*************************************************!*\
  !*** external "@material-ui/icons/ChevronLeft" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ChevronLeft");

/***/ }),

/***/ "@material-ui/icons/ChevronRight":
/*!**************************************************!*\
  !*** external "@material-ui/icons/ChevronRight" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ChevronRight");

/***/ }),

/***/ "@material-ui/icons/Close":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Close" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Close");

/***/ }),

/***/ "@material-ui/icons/Delete":
/*!********************************************!*\
  !*** external "@material-ui/icons/Delete" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Delete");

/***/ }),

/***/ "@material-ui/icons/DonutSmall":
/*!************************************************!*\
  !*** external "@material-ui/icons/DonutSmall" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/DonutSmall");

/***/ }),

/***/ "@material-ui/icons/Drafts":
/*!********************************************!*\
  !*** external "@material-ui/icons/Drafts" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Drafts");

/***/ }),

/***/ "@material-ui/icons/DriveEta":
/*!**********************************************!*\
  !*** external "@material-ui/icons/DriveEta" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/DriveEta");

/***/ }),

/***/ "@material-ui/icons/Error":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Error" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Error");

/***/ }),

/***/ "@material-ui/icons/Group":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Group" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Group");

/***/ }),

/***/ "@material-ui/icons/History":
/*!*********************************************!*\
  !*** external "@material-ui/icons/History" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/History");

/***/ }),

/***/ "@material-ui/icons/Home":
/*!******************************************!*\
  !*** external "@material-ui/icons/Home" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Home");

/***/ }),

/***/ "@material-ui/icons/Info":
/*!******************************************!*\
  !*** external "@material-ui/icons/Info" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Info");

/***/ }),

/***/ "@material-ui/icons/Mail":
/*!******************************************!*\
  !*** external "@material-ui/icons/Mail" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Mail");

/***/ }),

/***/ "@material-ui/icons/MarkunreadMailbox":
/*!*******************************************************!*\
  !*** external "@material-ui/icons/MarkunreadMailbox" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/MarkunreadMailbox");

/***/ }),

/***/ "@material-ui/icons/Menu":
/*!******************************************!*\
  !*** external "@material-ui/icons/Menu" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Menu");

/***/ }),

/***/ "@material-ui/icons/MonetizationOn":
/*!****************************************************!*\
  !*** external "@material-ui/icons/MonetizationOn" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/MonetizationOn");

/***/ }),

/***/ "@material-ui/icons/Report":
/*!********************************************!*\
  !*** external "@material-ui/icons/Report" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Report");

/***/ }),

/***/ "@material-ui/icons/ShoppingBasket":
/*!****************************************************!*\
  !*** external "@material-ui/icons/ShoppingBasket" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ShoppingBasket");

/***/ }),

/***/ "@material-ui/icons/ShoppingCart":
/*!**************************************************!*\
  !*** external "@material-ui/icons/ShoppingCart" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/ShoppingCart");

/***/ }),

/***/ "@material-ui/icons/Style":
/*!*******************************************!*\
  !*** external "@material-ui/icons/Style" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Style");

/***/ }),

/***/ "@material-ui/icons/SupervisedUserCircle":
/*!**********************************************************!*\
  !*** external "@material-ui/icons/SupervisedUserCircle" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/SupervisedUserCircle");

/***/ }),

/***/ "@material-ui/icons/TrendingUp":
/*!************************************************!*\
  !*** external "@material-ui/icons/TrendingUp" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/TrendingUp");

/***/ }),

/***/ "@material-ui/icons/Visibility":
/*!************************************************!*\
  !*** external "@material-ui/icons/Visibility" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Visibility");

/***/ }),

/***/ "@material-ui/icons/VisibilityOff":
/*!***************************************************!*\
  !*** external "@material-ui/icons/VisibilityOff" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/VisibilityOff");

/***/ }),

/***/ "@material-ui/icons/Warning":
/*!*********************************************!*\
  !*** external "@material-ui/icons/Warning" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Warning");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/app");

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/auth");

/***/ }),

/***/ "firebase/database":
/*!************************************!*\
  !*** external "firebase/database" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/database");

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("firebase/firestore");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "next/link":
/*!****************************!*\
  !*** external "next/link" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "styled-jsx/style":
/*!***********************************!*\
  !*** external "styled-jsx/style" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map