webpackHotUpdate("static\\development\\pages\\ventasFac.js",{

/***/ "./components/components/ventas/Ventas_01.js":
/*!***************************************************!*\
  !*** ./components/components/ventas/Ventas_01.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../containers/Layout */ "./components/containers/Layout.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/Grid/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SectionFactura__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SectionFactura */ "./components/components/SectionFactura.js");
/* harmony import */ var _SectionContentFactura__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SectionContentFactura */ "./components/components/SectionContentFactura.js");
/* harmony import */ var _menus_MenuHerramientas__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../menus/MenuHerramientas */ "./components/components/menus/MenuHerramientas.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Search */ "./components/components/Search.js");
/* harmony import */ var _tables_TableNormal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tables/TableNormal */ "./components/components/tables/TableNormal.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Divider */ "./node_modules/@material-ui/core/Divider/index.js");
/* harmony import */ var _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _menus_ItemMenuHerramienta__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../menus/ItemMenuHerramienta */ "./components/components/menus/ItemMenuHerramienta.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/Tooltip */ "./node_modules/@material-ui/core/Tooltip/index.js");
/* harmony import */ var _material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/MonetizationOn */ "./node_modules/@material-ui/icons/MonetizationOn.js");
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/icons/Add */ "./node_modules/@material-ui/icons/Add.js");
/* harmony import */ var _material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/IconButton/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _material_ui_icons_Input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/icons/Input */ "./node_modules/@material-ui/icons/Input.js");
/* harmony import */ var _material_ui_icons_Input__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Input__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/icons/FileCopy */ "./node_modules/@material-ui/icons/FileCopy.js");
/* harmony import */ var _material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_FileCopy__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _material_ui_icons_LocalPrintshop__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/icons/LocalPrintshop */ "./node_modules/@material-ui/icons/LocalPrintshop.js");
/* harmony import */ var _material_ui_icons_LocalPrintshop__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LocalPrintshop__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/icons/PictureAsPdf */ "./node_modules/@material-ui/icons/PictureAsPdf.js");
/* harmony import */ var _material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _material_ui_icons_SwapHoriz__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @material-ui/icons/SwapHoriz */ "./node_modules/@material-ui/icons/SwapHoriz.js");
/* harmony import */ var _material_ui_icons_SwapHoriz__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_SwapHoriz__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_icons_Subtitles__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/icons/Subtitles */ "./node_modules/@material-ui/icons/Subtitles.js");
/* harmony import */ var _material_ui_icons_Subtitles__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Subtitles__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _material_ui_icons_LocalAtm__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/icons/LocalAtm */ "./node_modules/@material-ui/icons/LocalAtm.js");
/* harmony import */ var _material_ui_icons_LocalAtm__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LocalAtm__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _material_ui_icons_CreditCard__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/icons/CreditCard */ "./node_modules/@material-ui/icons/CreditCard.js");
/* harmony import */ var _material_ui_icons_CreditCard__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_CreditCard__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _material_ui_icons_Payment__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/icons/Payment */ "./node_modules/@material-ui/icons/Payment.js");
/* harmony import */ var _material_ui_icons_Payment__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Payment__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _material_ui_icons_AttachMoney__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/icons/AttachMoney */ "./node_modules/@material-ui/icons/AttachMoney.js");
/* harmony import */ var _material_ui_icons_AttachMoney__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AttachMoney__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _material_ui_icons_DoneAll__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/icons/DoneAll */ "./node_modules/@material-ui/icons/DoneAll.js");
/* harmony import */ var _material_ui_icons_DoneAll__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DoneAll__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _material_ui_icons_Done__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/icons/Done */ "./node_modules/@material-ui/icons/Done.js");
/* harmony import */ var _material_ui_icons_Done__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Done__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/TextField/index.js");
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! firebase/database */ "./node_modules/firebase/database/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _tables_ReturnTextTable__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../tables/ReturnTextTable */ "./components/components/tables/ReturnTextTable.js");
/* harmony import */ var _FullScreenDialog__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../FullScreenDialog */ "./components/components/FullScreenDialog.js");
/* harmony import */ var _plugins_nueva_venta__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../plugins/nueva_venta */ "./components/plugins/nueva_venta.js");
/* harmony import */ var _utils_funtions__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../../utils/funtions */ "./utils/funtions.js");
/* harmony import */ var _modals_container_ModalCompraProductos__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../../modals_container/ModalCompraProductos */ "./components/modals_container/ModalCompraProductos.js");
/* harmony import */ var _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../../plugins/setSnackBars */ "./components/plugins/setSnackBars.js");
/* harmony import */ var _modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../../modals_container/ModalContainerNormal */ "./components/modals_container/ModalContainerNormal.js");
/* harmony import */ var _plugins_EmitirFacturaModal__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../../plugins/EmitirFacturaModal */ "./components/plugins/EmitirFacturaModal.js");
/* harmony import */ var _modals_container_ventas_ModalCancelarVenta__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../../modals_container/ventas/ModalCancelarVenta */ "./components/modals_container/ventas/ModalCancelarVenta.js");
/* harmony import */ var _modals_container_ventas_ModalEditarVenta__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../../modals_container/ventas/ModalEditarVenta */ "./components/modals_container/ventas/ModalEditarVenta.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! react-to-print */ "./node_modules/react-to-print/lib/index.js");
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(react_to_print__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var _plugins_plantillas_resivo_venta__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../../plugins/plantillas/resivo_venta */ "./components/plugins/plantillas/resivo_venta.js");
/* harmony import */ var _plugins_plantillas_container_plantillas__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../../plugins/plantillas/container_plantillas */ "./components/plugins/plantillas/container_plantillas.js");
/* harmony import */ var _plugins_ModalNewVenta__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../../plugins/ModalNewVenta */ "./components/plugins/ModalNewVenta.js");
/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../../../utils/colors */ "./utils/colors.js");
/* harmony import */ var _plugins_plugins_ErrorEstado__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../../plugins/plugins/ErrorEstado */ "./components/plugins/plugins/ErrorEstado.js");
/* harmony import */ var _plugins_plugins_ViewPDF__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../../plugins/plugins/ViewPDF */ "./components/plugins/plugins/ViewPDF.js");

var _jsxFileName = "E:\\next\\SistemaContable\\components\\components\\ventas\\Ventas_01.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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























var Ventas_01 =
/*#__PURE__*/
function (_Component) {
  _inherits(Ventas_01, _Component);

  function Ventas_01() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Ventas_01);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Ventas_01)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      itemsSeleccionados: [],
      listaVentas: [],
      estadoTabla: 'cargando',
      listaVentasTemporal: [],
      rowslistaVentas: [{
        id: 'accions',
        numeric: false,
        disablePadding: true,
        label: ''
      }, {
        id: 'factura_emitida',
        numeric: false,
        disablePadding: true,
        label: 'Estado'
      }, {
        id: 'cliente',
        numeric: true,
        disablePadding: false,
        label: 'Cliente'
      }, {
        id: 'productos',
        numeric: true,
        disablePadding: false,
        label: 'Productos'
      }, {
        id: 'tipo_pago',
        numeric: true,
        disablePadding: false,
        label: 'Tipo de pago'
      }, {
        id: 'subtotal',
        numeric: true,
        disablePadding: false,
        label: 'SubTotal'
      }, {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total'
      }, {
        id: 'iva',
        numeric: true,
        disablePadding: false,
        label: 'Precio Iva'
      }, {
        id: 'descuento',
        numeric: true,
        disablePadding: false,
        label: 'Descuento'
      }, {
        id: 'dinero_resibido',
        numeric: true,
        disablePadding: false,
        label: 'Dinero recibido'
      }, {
        id: 'cambio',
        numeric: true,
        disablePadding: false,
        label: 'Cambio/Vuelto'
      }, {
        id: 'acreditado',
        numeric: true,
        disablePadding: false,
        label: 'Dinero acreditado'
      }, {
        id: 'codigo',
        numeric: false,
        disablePadding: true,
        label: 'Codigo'
      }, {
        id: 'observacion',
        numeric: true,
        disablePadding: false,
        label: 'Observación'
      }, {
        id: 'empleado',
        numeric: true,
        disablePadding: false,
        label: 'Empleado'
      }, {
        id: 'fecha_venta',
        numeric: true,
        disablePadding: false,
        label: 'Fecha de venta'
      }, {
        id: 'hora_venta',
        numeric: true,
        disablePadding: false,
        label: 'Hora de venta'
      }],
      //usuario
      usuario: null,
      // modals
      openModalNewVenta: false,
      estadoModalSimpleCompraProductos: false,
      estadoModalEmitirFactura: false,
      estadoModalCancelarVenta: false,
      estadoModalEditarVenta: false,
      openModalNewVentaFinal: false,
      //item para editar
      itemEditar: null,
      //fecha actual
      //permisosUsuarios
      estadoPermisos: null,
      estadoacciones: '',
      permisoUsuario: null,
      fechaActual: '',
      //estado decaja,
      estadoCaja: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "obtenerDataBaseDatos", function () {
      firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
          var productosRef = db.ref('users/' + user.uid + '/ventas').orderByChild('caja').equalTo(_this.state.cajaSeleccionada.codigo);
          productosRef.on('value', function (snapshot) {
            if (snapshot.val()) {
              _this.setState({
                listaVentas: [],
                listaVentasTemporal: [],
                estadoTabla: 'cargando'
              });

              var lista = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snapshot);
              var filterList = lista.sort(function (a, b) {
                a = new Date(a.order);
                b = new Date(b.order);
                return a > b ? -1 : a < b ? 1 : 0;
              });

              _this.setState({
                listaVentas: filterList,
                listaVentasTemporal: filterList,
                estadoTabla: 'llena'
              });
            } else {
              _this.setState({
                listaVentas: [],
                listaVentasTemporal: [],
                estadoTabla: 'vacio'
              });
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "obteberCajaSeleccionada", function () {
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
          var operacionVentaRefCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_abiertas_usuario');
          operacionVentaRefCaja.on('value', function (snap) {
            if (snap.val()) {
              var caja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap).filter(function (it) {
                return it.usuario === _this.props.usuario.code;
              })[0];

              if (caja != null) {
                _this.setState({
                  cajaSeleccionada: caja,
                  estadoCaja: caja.estado
                });

                _this.obtenerDataBaseDatos();
              } else {
                _this.setState({
                  cajaSeleccionada: null,
                  estadoCaja: false,
                  estadoTabla: 'vacio'
                });
              }
            } else {
              _this.setState({
                cajaSeleccionada: null,
                estadoCaja: false,
                estadoTabla: 'vacio'
              });
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleGetData", function (n, item) {
      if (item.id === 'codigo') {
        return n.codigo;
      }

      if (item.id === 'accions') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_to_print__WEBPACK_IMPORTED_MODULE_44___default.a, {
          ref: function ref(el) {
            return _this.refEventoImprimir = el;
          },
          trigger: function trigger() {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null);
          },
          content: function content() {
            return _this.refImprimirResivo;
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 200
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Imprimir resivo",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 205
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            _this.enviarToPlantillaData(n);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 206
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LocalPrintshop__WEBPACK_IMPORTED_MODULE_18___default.a, {
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 210
          },
          __self: this
        }))), n.urlpdf != 'genererando' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Descargar pdf",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 215
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            window.open(n.urlpdf, '_blank');
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_19___default.a, {
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 223
          },
          __self: this
        }))), n.urlpdf === 'genererando' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 229
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 230
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["CircularProgress"], {
          size: 20,
          thickness: 5,
          style: {
            color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryBlue300()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 231
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: '#42A5F5',
            display: 'flex',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 233
          },
          __self: this
        }, "Pdf...")));
      }

      if (item.id === 'cliente') {
        return n.cliente === 'Consumidor Final' ? n.cliente : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_tables_ReturnTextTable__WEBPACK_IMPORTED_MODULE_33__["default"], {
          referencia: "clientes",
          codigo: n.cliente.codigo,
          datoTraido: "nombre",
          estado: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 241
          },
          __self: this
        }));
      }

      if (item.id === 'productos') {
        return n.productos.map(function (item) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            style: {
              display: 'flex',
              flexDirection: 'row'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 252
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
            avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
              style: {
                width: 'max-content',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 0,
                height: 25
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 258
              },
              __self: this
            }, item.cantidad),
            label: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_tables_ReturnTextTable__WEBPACK_IMPORTED_MODULE_33__["default"], {
              referencia: "productos",
              codigo: item.codigo,
              datoTraido: "descripcion_producto",
              estado: true,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 270
              },
              __self: this
            }),
            clickable: true,
            color: "inherit",
            style: {
              margin: 1,
              height: 25,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 256
            },
            __self: this
          }));
        });
      }

      if (item.id === 'subtotal') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 286
          },
          __self: this
        }, n.subtotal);
      }

      if (item.id === 'tipo_pago') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 290
          },
          __self: this
        }, n.tipo_pago === 'cheque' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDarkRed300()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 295
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Subtitles__WEBPACK_IMPORTED_MODULE_22___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 299
            },
            __self: this
          })),
          label: 'Con cheque',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 293
          },
          __self: this
        }), n.tipo_pago === 'transferencia' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDarkDeepPurple300()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 311
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_SwapHoriz__WEBPACK_IMPORTED_MODULE_21___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 315
            },
            __self: this
          })),
          label: 'Por transferencia bancaria',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 309
          },
          __self: this
        }), n.tipo_pago === 'efectivo' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDark()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 327
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_AttachMoney__WEBPACK_IMPORTED_MODULE_26___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 331
            },
            __self: this
          })),
          label: 'En efectivo',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 325
          },
          __self: this
        }), n.tipo_pago === 'credito' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDarkAmber300()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 343
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_LocalAtm__WEBPACK_IMPORTED_MODULE_23___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 347
            },
            __self: this
          })),
          label: 'A crédito',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 341
          },
          __self: this
        }), n.tipo_pago === 'tarjeta-credito' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDarkGreen300()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 359
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_CreditCard__WEBPACK_IMPORTED_MODULE_24___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 363
            },
            __self: this
          })),
          label: 'Con tarjeta de crédito',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 357
          },
          __self: this
        }), n.tipo_pago === 'tarjeta-debito' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          avatar: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Avatar"], {
            style: {
              padding: 1,
              background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryDarkBlue300()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 375
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Payment__WEBPACK_IMPORTED_MODULE_25___default.a, {
            style: {
              fontSize: 20,
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 379
            },
            __self: this
          })),
          label: 'Con tarjeta de débito',
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymaryGrey200()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 373
          },
          __self: this
        }));
      }

      if (item.id === 'factura_emitida') {
        return n.cliente === 'Consumidor Final' ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row',
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 392
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Devolver Venta",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 393
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            _this.setState({
              estadoacciones: 'devolver_venta'
            });

            setTimeout(function () {
              _this.comprobarUsuario(n);
            }, 100);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 394
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20___default.a, {
          style: {
            color: '#EF5350'
          },
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 403
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 406
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Done__WEBPACK_IMPORTED_MODULE_28___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 407
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 409
          },
          __self: this
        }, "Consumidor Final")) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 412
          },
          __self: this
        }, n.factura_emitida === 'emitida' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 415
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 416
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_DoneAll__WEBPACK_IMPORTED_MODULE_27___default.a, {
          style: {
            color: '#00c853'
          },
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 417
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: '#00c853',
            display: 'flex',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 419
          },
          __self: this
        }, "Emitida")), n.factura_emitida === 'no_emitida' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 424
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Devolver Venta",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 425
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            _this.setState({
              estadoacciones: 'devolver_venta'
            });

            setTimeout(function () {
              _this.comprobarUsuario(n);
            }, 100);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 426
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20___default.a, {
          style: {
            color: '#EF5350'
          },
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 434
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Emitir Factura",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 437
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            _this.setState({
              estadoacciones: 'emitir_factura'
            });

            setTimeout(function () {
              _this.comprobarUsuario(n);
            }, 100);
            /*  this.setState({
                 codigoEmitirFactura: n.codigo,
                 estadoModalEmitirFactura: true,
             }) */
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 438
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Input__WEBPACK_IMPORTED_MODULE_16___default.a, {
          color: "primary",
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 450
          },
          __self: this
        })))), n.factura_emitida === 'reenviar' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 457
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
          title: "Emitir Factura",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 458
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          onClick: function onClick() {
            _this.setState({
              estadoacciones: 'emitir_factura'
            });

            setTimeout(function () {
              _this.comprobarUsuario(n);
            }, 100);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 459
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Input__WEBPACK_IMPORTED_MODULE_16___default.a, {
          color: "primary",
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 467
          },
          __self: this
        })))), n.factura_emitida === 'pendiente' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 474
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 475
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["CircularProgress"], {
          size: 20,
          thickness: 5,
          style: {
            color: '#42A5F5'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 476
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: '#42A5F5',
            display: 'flex',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 478
          },
          __self: this
        }, "Emitiendo...")), n.factura_emitida === 'error' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 483
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
          disabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 484
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_20___default.a, {
          style: {
            color: 'red'
          },
          fontSize: "small",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 485
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: 'red',
            display: 'flex',
            alignItems: 'center'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 487
          },
          __self: this
        }, "Error de emisi\xF3n")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_plugins_plugins_ErrorEstado__WEBPACK_IMPORTED_MODULE_49__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 490
          },
          __self: this
        }, n.error_factura_emitida));
      }

      if (item.id === 'total') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 495
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["Chip"], {
          label: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            style: {
              color: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorWhite()
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 497
            },
            __self: this
          }, n.total),
          clickable: true,
          style: {
            background: _utils_colors__WEBPACK_IMPORTED_MODULE_48__["default"].getColorPrymary()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 496
          },
          __self: this
        }));
      }

      if (item.id === 'iva') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 505
          },
          __self: this
        }, n.iva);
      }

      if (item.id === 'observacion') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 509
          },
          __self: this
        }, n.observacion);
      }

      if (item.id === 'dinero_resibido') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 513
          },
          __self: this
        }, n.dinero_resibido);
      }

      if (item.id === 'cambio') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 517
          },
          __self: this
        }, n.cambio);
      }

      if (item.id === 'acreditado') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 521
          },
          __self: this
        }, n.valor_acreditado);
      }

      if (item.id === 'fecha_venta') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 525
          },
          __self: this
        }, n.fecha_venta);
      }

      if (item.id === 'hora_venta') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 529
          },
          __self: this
        }, n.hora_venta);
      }

      if (item.id === 'descuento') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 533
          },
          __self: this
        }, n.descuento);
      }

      if (item.id === 'empleado') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_tables_ReturnTextTable__WEBPACK_IMPORTED_MODULE_33__["default"], {
          referencia: "usuarios",
          codigo: n.empleado,
          datoTraido: "nombre",
          estado: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 537
          },
          __self: this
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "recuperarJsonFactura", function (codigo) {
      firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
          var productosRef = db.ref('users/' + user.uid + '/facturas_ventas/' + codigo);
          productosRef.on('value', function (snapshot) {
            if (snapshot.val()) {
              _this.postSet(user.uid, snapshot.val(), codigo);

              var venteRef = db.ref('users/' + user.uid + '/ventas/' + codigo);
              venteRef.update({
                factura_emitida: 'pendiente'
              }); //setSnackBars.openSnack('success', 'rootSnackBar', 'Factura emitida con exito', 2000)
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "postSet",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(uidUser, jsonData, codigo) {
        var rawResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch('https://stormy-bayou-19844.herokuapp.com/generarfactura', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'id': uidUser,
                    'codigo': codigo
                  },
                  body: JSON.stringify(jsonData)
                });

              case 2:
                rawResponse = _context.sent;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateDataProductos", function (codigoVenta) {
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      var ventaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/ventas/' + codigoVenta);
      var operacionVentaRefCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_abiertas_usuario');
      ventaRef.on('value', function (snapshot) {
        if (snapshot.val()) {
          operacionVentaRefCaja.once('value', function (snap) {
            if (snap.val()) {
              var caja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap).filter(function (it) {
                return it.usuario === _this.props.usuario.code;
              })[0];
              var cajaRefValorActual = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo);
              cajaRefValorActual.once('value', function (snap) {
                if (snap.val()) {
                  if (Number(snap.val().valor_caja) < Number(snapshot.val().total)) {
                    _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__["default"].openSnack('error', 'rootSnackBar', 'Dinero insuficiente en caja', 2000);
                  } else {
                    snapshot.val().productos.forEach(function (element) {
                      var productoRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/productos/' + element.codigo);
                      productoRef.once('value', function (snapshot) {
                        if (snapshot.val()) {
                          productoRef.update({
                            stock_actual: Number(snapshot.val().stock_actual) + Number(element.cantidad)
                          });
                        }
                      });
                    });

                    _this.setOperacionStock(snapshot.val().productos, snapshot.val().cliente, snapshot.val().dinero_resibido, snapshot.val().total, snapshot.val().subtotal, snapshot.val().descuento, snapshot.val().cambio, snapshot.val().tipo_pago);

                    _this.setVentaDevuelta(snapshot.val(), snapshot.val().tipo_pago);

                    _this.setVentaCaja(snapshot.val(), snapshot.val().tipo_pago);

                    setTimeout(function () {
                      _this.deleteVenta(snapshot.val().codigo);
                    }, 300);
                  }
                }
              });
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOperacionStock", function (listaProductos, cliente, dinero_resibido, total, subtotal, descuento, cambio, tipo_pago) {
      var codigoStock = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].guidGenerator();
      var arrayProductos = [];
      listaProductos.forEach(function (item) {
        arrayProductos.push({
          codigo: item.codigo,
          cantidad: item.cantidad,
          precio_venta_a: item.precio_venta_a
        });
      });
      var order = new Date();
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      var operacionStockRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
      operacionStockRef.set({
        codigo: codigoStock,
        tipo_operacion: 'devolucion_cliente',
        fecha: _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].obtenerFechaActual(),
        hora: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        cliente_proveedor: cliente,
        productos: arrayProductos,
        total_final: "".concat(Number(total).toFixed(2)),
        empleado: _this.props.usuario.code,
        observacion: '',
        subtotal: "".concat(Number(subtotal).toFixed(2)),
        descuento: "".concat(Number(descuento).toFixed(2)),
        otros_gastos: '0.00',
        flete: '0.00',
        valor_pagado: dinero_resibido,
        medio_pago: tipo_pago,
        saldo_favor: '0.00',
        en_deuda: '0.00',
        vuelto: cambio,
        acreditado: '0.00',
        order: order + ""
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deleteVenta", function (codigo) {
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      var ventRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/ventas/' + codigo);
      var ventRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/ventas/' + codigo);
      ventRef.remove();
      _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__["default"].openSnack('success', 'rootSnackBar', 'Venta eliminada con exito', 2000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enviarToPlantillaData", function (item) {
      var itemFormat = {
        numero_venta: item.codigo,
        tipo_venta: item.tipo_venta,
        productos: item.productos,
        subtotal: item.subtotal,
        iva: item.iva,
        total: item.total,
        descuento: item.descuento,
        fecha_venta: item.fecha_venta,
        hora_venta: item.hora_venta,
        tipo_pago: item.tipo_pago,
        valor_acreditado: item.valor_acreditado,
        fecha_a_pagar: item.fecha_a_pagar,
        numero_tarjeta: item.numero_tarjeta,
        nombre_banco: item.nombre_banco
      };
      firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();

          if (item.tipo_venta === 'factura') {
            var clienteRef = db.ref('users/' + user.uid + '/clientes/' + item.cliente.codigo);
            var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial");
            clienteRef.once('value', function (snapshot) {
              if (snapshot.val()) {
                itemFormat.nombreCliente = snapshot.val().nombre;
                itemFormat.emailCliente = snapshot.val().email;
                itemFormat.identificacionCliente = snapshot.val().numero_identificacion;
                itemFormat.direccionCliente = snapshot.val().direccion;
                empresaRef.once('value', function (snap) {
                  if (snap.val()) {
                    itemFormat.nombreEmpresa = snap.val();

                    _this.setState({
                      itemFormateadoImprimir: itemFormat
                    });

                    _this.refEventoImprimir.handlePrint();
                  }
                });
              }
            });
          } else {
            var empresaRef = db.ref('auth_admins/' + user.uid + "/nombre_comercial");
            empresaRef.once('value', function (snap) {
              if (snap.val()) {
                itemFormat.nombreEmpresa = snap.val();

                _this.setState({
                  itemFormateadoImprimir: itemFormat
                });

                _this.refEventoImprimir.handlePrint();
              }
            });
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearch", function (codigo) {
      _this.setState({
        listaVentas: [],
        estadoTabla: 'cargando'
      });

      _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].setTime(300, function () {
        var array = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].filterObjectsCodigo(_this.state.listaVentasTemporal, codigo);

        if (array.length > 0) {
          _this.setState({
            estadoTabla: 'llena'
          });
        } else {
          _this.setState({
            estadoTabla: 'sin_resultados'
          });
        }

        _this.setState({
          listaVentas: array
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "obtenerPermisosusuarios", function () {
      firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
          var usuariosRef = db.ref("users/".concat(user.uid, "/usuarios/").concat(_this.props.usuario.code));
          usuariosRef.on('value', function (snapshot) {
            if (snapshot.val()) {
              if (snapshot.val().privilegios.ventas === true) {
                _this.setState({
                  estadoPermisos: true
                });
              } else {
                _this.setState({
                  estadoPermisos: false
                });
              }
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "comprobarUsuario", function (item) {
      if (_this.props.usuario.tipo_usuario === 'administrador') {
        if (_this.state.estadoacciones === 'devolver_venta') {
          _this.setState({
            codigoEmitirFactura: item.codigo,
            estadoModalCancelarVenta: true
          });
        } else if (_this.state.estadoacciones === 'emitir_factura') {
          _this.setState({
            codigoEmitirFactura: item.codigo,
            estadoModalEmitirFactura: true
          });
        } else {
          _this.setState({
            itemSeleccionado: item
          });

          _this.setState({
            openModalNewCliente: true
          });
        }
      } else {
        if (_this.state.estadoacciones === 'devolver_venta') {
          if (item.empleado === _this.props.usuario.code) {
            _this.setState({
              codigoEmitirFactura: item.codigo,
              estadoModalCancelarVenta: true
            });
          } else {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__["default"].openSnack('warning', 'rootSnackBar', "Usted ".concat(_this.props.usuario.nombre, " no registro esta Venta"), 2000);
          }
        } else if (_this.state.estadoacciones === 'emitir_factura') {
          if (item.empleado === _this.props.usuario.code) {
            _this.setState({
              codigoEmitirFactura: item.codigo,
              estadoModalEmitirFactura: true
            });
          } else {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__["default"].openSnack('warning', 'rootSnackBar', "Usted ".concat(_this.props.usuario.nombre, " no registro esta Venta"), 2000);
          }
        }
      }
    });

    return _this;
  }

  _createClass(Ventas_01, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        fechaActual: _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].obtenerFechaActual()
      }); //setTimeout(() => { this.obtenerDataBaseDatos() }, 100)

      this.obteberCajaSeleccionada();
      this.obtenerPermisosusuarios();
      this.comprobarUsuario();
    }
  }, {
    key: "setVentaCaja",
    // venta caja devolver
    value: function setVentaCaja(itemVenta, tipo_pago) {
      var _this2 = this;

      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      var codigoVentaCaja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].guidGenerator();
      var operacionVentaRefCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_abiertas_usuario');
      operacionVentaRefCaja.once('value', function (snap) {
        if (snap.val()) {
          var caja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap).filter(function (it) {
            return it.usuario === _this2.props.usuario.code;
          })[0];

          if (Boolean(caja.estado)) {
            if (itemVenta.tipo_pago === 'efectivo') {
              var operacionVentaCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas_devueltas/' + itemVenta.codigo);
              operacionVentaCaja.set(itemVenta);
            }

            var operacionVentaCajaEliminar = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas/' + itemVenta.codigo);
            operacionVentaCajaEliminar.remove();
            var cajaRefValorAcreditado = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/lista_dinero_acreditado_venta_credito/' + itemVenta.codigo);
            cajaRefValorAcreditado.remove();
            var cajaRefValorActual = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo);
            var cuentaCobrarDeudaQuitarRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/').orderByChild('cliente/codigo').equalTo(itemVenta.cliente.codigo);
            cuentaCobrarDeudaQuitarRef.once('value', function (snap2) {
              if (snap2.val()) {
                var cuentaCobrarDeudaQuitarRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap2)[0].cliente.codigo + '/lista_deudas/' + itemVenta.codigo);
                cuentaCobrarDeudaQuitarRef.remove();
              }
            });

            if (Number(itemVenta.valor_acreditado) > 0) {
              var cuentaCobrarDeudaQuitarRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/').orderByChild('cliente/codigo').equalTo(itemVenta.cliente.codigo);
              cuentaCobrarDeudaQuitarRef.once('value', function (snap2) {
                if (snap2.val()) {
                  var cuentaCobrarDeudaQuitarRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap2)[0].cliente.codigo + '/lista_acreditados/' + itemVenta.codigo);
                  cuentaCobrarDeudaQuitarRef.remove();
                }
              });
            }

            if (itemVenta.tipo_pago === 'efectivo') {
              cajaRefValorActual.once('value', function (snap2) {
                if (snap2.val()) {
                  cajaRefValorActual.update({
                    valor_caja: Number(Number(snap2.val().valor_caja) - Number(itemVenta.total)).toFixed(2)
                  });
                }
              });
            }
          }
        }
      });
    } // venta ventas devueltas

  }, {
    key: "setVentaDevuelta",
    value: function setVentaDevuelta(itemVenta, tipo_pago) {
      var _this3 = this;

      var db = firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.database();
      var codigoVentaCaja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].guidGenerator();
      var operacionVentaRefCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_abiertas_usuario');
      operacionVentaRefCaja.once('value', function (snap) {
        if (snap.val()) {
          var caja = _utils_funtions__WEBPACK_IMPORTED_MODULE_36__["default"].snapshotToArray(snap).filter(function (it) {
            return it.usuario === _this3.props.usuario.code;
          })[0];

          if (Boolean(caja.estado)) {
            var operacionVentaDevuelta = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/lista_ventas/ventas_devueltas/' + itemVenta.codigo);
            itemVenta.caja = caja.codigo;
            itemVenta.factura_emitida = 'devuelta';
            operacionVentaDevuelta.set(itemVenta);

            if (Number(itemVenta.valor_acreditado) > 0) {
              var operacionAcreditadoDevueltoCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/ventas_devueltas/lista_dinero_acreditado_venta_credito/' + itemVenta.codigo);
              operacionAcreditadoDevueltoCaja.remove();
              var operacionValorTotalCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_30___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo);
              operacionValorTotalCaja.once('value', function (snap) {
                if (snap.val()) {
                  operacionValorTotalCaja.update({
                    valor_caja: Number(snap.val().valor_caja) - Number(itemVenta.valor_acreditado)
                  });
                }
              });
            }
          }
        }
      });
    } //opercacion stock

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 905
        },
        __self: this
      }, this.state.estadoPermisos && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 910
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_menus_MenuHerramientas__WEBPACK_IMPORTED_MODULE_6__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 911
        },
        __self: this
      }, Boolean(this.state.estadoCaja) === true ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
        title: "Estado de caja",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 916
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 917
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          color: '#00c853'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 918
        },
        __self: this
      })))) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Tooltip__WEBPACK_IMPORTED_MODULE_12___default.a, {
        title: "Estado de caja",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 924
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_15___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 925
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_13___default.a, {
        style: {
          color: '#EF5350'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 926
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_menus_ItemMenuHerramienta__WEBPACK_IMPORTED_MODULE_10__["default"], {
        titleButton: "Nueva Venta",
        color: "primary",
        visible: true,
        onClick: function onClick() {
          if (_this4.state.estadoCaja) {
            _this4.setState({
              itemEditar: null
            });

            _this4.setState({
              openModalNewVentaFinal: true
            });
          } else {
            _plugins_setSnackBars__WEBPACK_IMPORTED_MODULE_38__["default"].openSnack('error', 'rootSnackBar', 'Abrir caja!', 2000);
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 932
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Add__WEBPACK_IMPORTED_MODULE_14___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 945
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          flex: 0.95
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 948
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Search__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "buscar-cliente-clientes",
        textoSearch: "Buscar...",
        textoTooltip: "Buscar venta",
        handleSearch: this.handleSearch,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 950
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_9___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 958
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_tables_TableNormal__WEBPACK_IMPORTED_MODULE_8__["default"], {
        textoTitleP: "Ventas",
        textoTitleS: "Venta",
        selectedItems: true,
        toolbar: false,
        notTab: false,
        data: this.state.listaVentas,
        rows: this.state.rowslistaVentas,
        handleGetData: this.handleGetData,
        estadoTabla: this.state.estadoTabla,
        itemsSeleccionados: function itemsSeleccionados(items) {
          _this4.setState({
            itemsSeleccionados: items
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 960
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FullScreenDialog__WEBPACK_IMPORTED_MODULE_34__["default"], {
        openModal: this.state.openModalNewVentaFinal,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 975
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_plugins_ModalNewVenta__WEBPACK_IMPORTED_MODULE_47__["default"], {
        usuario: this.props.usuario,
        handleClose: function handleClose() {
          return _this4.setState({
            openModalNewVentaFinal: false
          });
        },
        item: this.state.itemEditar,
        cajaSeleccionada: this.state.cajaSeleccionada,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 976
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FullScreenDialog__WEBPACK_IMPORTED_MODULE_34__["default"], {
        openModal: this.state.estadoModalSimpleCompraProductos,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 985
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalCompraProductos__WEBPACK_IMPORTED_MODULE_37__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalSimpleCompraProductos: false
          });
        },
        usuario: this.props.usuario,
        tipoAjuste: "devolucion_cliente",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 986
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_39__["default"], {
        open: this.state.estadoModalEmitirFactura,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalEmitirFactura: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 995
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_plugins_EmitirFacturaModal__WEBPACK_IMPORTED_MODULE_40__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalEmitirFactura: false
          });
        },
        handleEmitir: function handleEmitir() {
          _this4.recuperarJsonFactura(_this4.state.codigoEmitirFactura);

          _this4.setState({
            estadoModalEmitirFactura: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 999
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_39__["default"], {
        open: this.state.estadoModalCancelarVenta,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalCancelarVenta: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1008
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ventas_ModalCancelarVenta__WEBPACK_IMPORTED_MODULE_41__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalCancelarVenta: false
          });
        },
        handleCancelarVenta: function handleCancelarVenta() {
          // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
          _this4.updateDataProductos(_this4.state.codigoEmitirFactura);

          _this4.setState({
            estadoModalCancelarVenta: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1012
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_39__["default"], {
        open: this.state.estadoModalEditarVenta,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalEditarVenta: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1022
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ventas_ModalEditarVenta__WEBPACK_IMPORTED_MODULE_42__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalEditarVenta: false
          });
        },
        handleEditarVenta: function handleEditarVenta() {
          // this.recuperarJsonFactura(this.state.codigoEmitirFactura)
          _this4.setState({
            openModalNewVenta: true
          });

          _this4.setState({
            estadoModalEditarVenta: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1026
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_plugins_plantillas_container_plantillas__WEBPACK_IMPORTED_MODULE_46__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1036
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_plugins_plantillas_resivo_venta__WEBPACK_IMPORTED_MODULE_45__["default"], {
        item: this.state.itemFormateadoImprimir,
        ref: function ref(el) {
          return _this4.refImprimirResivo = el;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1037
        },
        __self: this
      }))), this.state.estadoPermisos === false && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '80vh'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1047
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1048
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1048
        },
        __self: this
      }, "Usted no tiene permisos para ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1048
        },
        __self: this
      }), "esta seccion comuniquese con el administrador"))), this.state.estadoPermisos === null && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_43__["CircularProgress"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1054
        },
        __self: this
      }));
    }
  }]);

  return Ventas_01;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Ventas_01);

/***/ })

})
//# sourceMappingURL=ventasFac.js.5971a50964532964bff4.hot-update.js.map