webpackHotUpdate("static\\development\\pages\\ventasFac.js",{

/***/ "./components/plugins/ModalNewVenta.js":
/*!*********************************************!*\
  !*** ./components/plugins/ModalNewVenta.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "./node_modules/@material-ui/core/Grid/index.js");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_SectionContentFactura__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/SectionContentFactura */ "./components/components/SectionContentFactura.js");
/* harmony import */ var _components_SectionFactura__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/SectionFactura */ "./components/components/SectionFactura.js");
/* harmony import */ var _utils_funtions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/funtions */ "./utils/funtions.js");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "./node_modules/@material-ui/core/CircularProgress/index.js");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Close */ "./node_modules/@material-ui/icons/Close.js");
/* harmony import */ var _material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/Settings */ "./node_modules/@material-ui/icons/Settings.js");
/* harmony import */ var _material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Settings__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/IconButton */ "./node_modules/@material-ui/core/IconButton/index.js");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/MonetizationOn */ "./node_modules/@material-ui/icons/MonetizationOn.js");
/* harmony import */ var _material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_MonetizationOn__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! firebase/database */ "./node_modules/firebase/database/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var _setSnackBars__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./setSnackBars */ "./components/plugins/setSnackBars.js");
/* harmony import */ var _modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../modals_container/ModalContainerNormal */ "./components/modals_container/ModalContainerNormal.js");
/* harmony import */ var _deleteActivarDesactivar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./deleteActivarDesactivar */ "./components/plugins/deleteActivarDesactivar.js");
/* harmony import */ var _AutoCompleteSelectedProducto__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./AutoCompleteSelectedProducto */ "./components/plugins/AutoCompleteSelectedProducto.js");
/* harmony import */ var _ModalNewVentaJs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ModalNewVentaJs */ "./components/plugins/ModalNewVentaJs.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");
/* harmony import */ var _ventas_ContenedorProductoVista__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ventas/ContenedorProductoVista */ "./components/plugins/ventas/ContenedorProductoVista.js");
/* harmony import */ var _components_tables_TableNormal__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/tables/TableNormal */ "./components/components/tables/TableNormal.js");
/* harmony import */ var _ventas_ContenedorClienteVista__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ventas/ContenedorClienteVista */ "./components/plugins/ventas/ContenedorClienteVista.js");
/* harmony import */ var _ventas_ContenedorPreciosTotalesVista__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ventas/ContenedorPreciosTotalesVista */ "./components/plugins/ventas/ContenedorPreciosTotalesVista.js");
/* harmony import */ var _ventas_ContenedorSeleccionarTipoPrecio__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ventas/ContenedorSeleccionarTipoPrecio */ "./components/plugins/ventas/ContenedorSeleccionarTipoPrecio.js");
/* harmony import */ var _ventas_ContenedorSeleccionarTipoPago__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./ventas/ContenedorSeleccionarTipoPago */ "./components/plugins/ventas/ContenedorSeleccionarTipoPago.js");
/* harmony import */ var _ventas_ContenedorBotonesVenta__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./ventas/ContenedorBotonesVenta */ "./components/plugins/ventas/ContenedorBotonesVenta.js");
/* harmony import */ var _modals_container_ventas_ModalFinalizaPago__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../modals_container/ventas/ModalFinalizaPago */ "./components/modals_container/ventas/ModalFinalizaPago.js");
/* harmony import */ var _modals_container_ModalSettingsPrices__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../modals_container/ModalSettingsPrices */ "./components/modals_container/ModalSettingsPrices.js");
/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../utils/colors */ "./utils/colors.js");
/* harmony import */ var _ventas_ContenedorNumeroFactura__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./ventas/ContenedorNumeroFactura */ "./components/plugins/ventas/ContenedorNumeroFactura.js");

var _jsxFileName = "E:\\next\\SistemaContable\\components\\plugins\\ModalNewVenta.js";

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
































var ModalNewVenta =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalNewVenta, _Component);

  function ModalNewVenta() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ModalNewVenta);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ModalNewVenta)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      usuario: null,
      sumaSubTotal: 0,
      sumaIva: 0,
      sumaTotal: 0,
      mostrarVentana: null,
      productosSeleccionados: [],
      //nuevos
      listaProductosSeleccionadosEditados: [],
      listaProductosSeleccionados: [],
      itemProductoCargado: null,
      cargaAutomatica: false,
      rowslistaProductos: [{
        id: 'acciones',
        numeric: true,
        disablePadding: false,
        label: ''
      }, {
        id: 'precio_por_defecto',
        numeric: true,
        disablePadding: false,
        label: 'Precio'
      }, {
        id: 'cantidad',
        numeric: true,
        disablePadding: false,
        label: 'Cantidad'
      }, {
        id: 'descripcion_producto',
        numeric: true,
        disablePadding: false,
        label: 'Descripcion'
      }, {
        id: 'precio_venta',
        numeric: true,
        disablePadding: false,
        label: 'Precio/U'
      }, {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total'
      }],
      clienteFacturacion: '',
      clienteSeleccionado: null,
      //tipo de pago
      tipo_pago: 'efectivo',
      //estado de modals
      estadoModalFinalizaPago: false,
      estadoModalSimpleConfigurarPrecios: false,
      //seleecionar producto por defecto
      seleccionarProductoPordefecto: true,
      //
      clienteCargadoDB: '',
      cliente: '',
      descuento: 0,
      observacion: '',
      dinero_resibido: 0,
      cambio: 0,
      //valores adicionales para la factura
      precioProductosSinIva: 0,
      precioProductosConIva: 0,
      //factura electronica
      facturaElectronica: false,
      // estado modales
      estadoModalGuardarVenta: false,
      //id del usuario
      uidUser: '',
      //tipo de venta
      tipo_venta: 'factura',
      // ambiente
      ambienteFacturacion: 0,
      //numero de factura
      numero_factura: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "obtenerPreciosDefectoConfiguracion", function () {
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var productosRef = db.ref('users/' + user.uid + '/configuracion/precio_por_defecto');
          productosRef.on('value', function (snapshot) {
            if (snapshot.val()) {
              _this.setState({
                precioSeleccionadoCargar: snapshot.val()
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

      if (item.id === 'precio_por_defecto') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 100,
            position: 'relative',
            left: -80
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 232
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["TextField"], {
          id: "filled-unidad-precio-defecto",
          select: true,
          label: "" //error={this.state.precio_por_defecto.length === 0}
          ,
          value: n.precio_por_defecto,
          onChange: function onChange(event) {
            var array = _this.state.listaProductosSeleccionados;
            array.forEach(function (it, i) {
              if (it.codigo === n.codigo) {
                var item = it;
                item.precio_por_defecto = event.target.value;
                array[i] = item;

                _this.setState({
                  listaProductosSeleccionados: array
                });
              }
            });
            setTimeout(function () {
              var array2 = _this.state.listaProductosSeleccionadosEditados;
              array2.forEach(function (it, i) {
                if (it.codigo === n.codigo) {
                  var item = it;
                  item.precio_venta = Number((Number(n.precio_costo) * Number(_this.obtenerPorcentajePrecio(n.precio_por_defecto)) + Number(n.precio_costo)).toFixed(2));
                  array2[i] = item;

                  _this.setState({
                    listaProductosSeleccionadosEditados: array2
                  });
                }
              });
            }, 100);
            setTimeout(function () {
              _this.calcularValoresTotales();
            }, 200);
          },
          margin: "normal",
          variant: "standard",
          style: {
            width: 'max-content',
            height: 30
          } //disabled={!props.itemProductoCargado}
          ,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 233
          },
          __self: this
        }, _this.state.precios != null && _this.state.precios.map(function (item) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["MenuItem"], {
            key: item.codigo,
            value: item.codigo,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 277
            },
            __self: this
          }, "".concat(item.nombre));
        })));
      }

      if (item.id === 'cantidad') {
        var restaRetorno = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content',
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 285
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["TextField"], {
          id: "handle-precio-edit-cantidad",
          margin: "dense",
          type: "number",
          value: _this.state.listaProductosSeleccionadosEditados.filter(function (item) {
            return n.codigo === item.codigo;
          })[0].cantidad,
          onChange: function onChange(event) {
            var array = _this.state.listaProductosSeleccionadosEditados;
            array.filter(function (item) {
              return n.codigo === item.codigo;
            })[0].cantidad = event.target.value;

            _this.setState({
              listaProductosSeleccionadosEditados: array
            });

            _this.calcularValoresTotales();
          },
          placeholder: "00",
          style: {
            width: 50
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 286
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            paddingLeft: 10
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 302
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'column'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 303
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            display: 'flex',
            flexDirection: 'row'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 304
          },
          __self: this
        }, "en stock ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: _utils_colors__WEBPACK_IMPORTED_MODULE_29__["default"].getColorPrymaryDark()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 305
          },
          __self: this
        }, Number(n.stock_actual) - Number(_this.state.listaProductosSeleccionadosEditados.filter(function (item) {
          return n.codigo === item.codigo;
        })[0].cantidad))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            color: _utils_colors__WEBPACK_IMPORTED_MODULE_29__["default"].getColorPrymary()
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 307
          },
          __self: this
        }, "".concat(n.unidad_medida)))));
        return restaRetorno;
      }

      if (item.id === 'descripcion_producto') {
        return Boolean(n.tiene_iva) ? "* ".concat(n.descripcion_producto) : n.descripcion_producto;
      }

      if (item.id === 'precio_venta') {
        var precioR = 0;
        precioR = (Number(n.precio_costo) * Number(_this.obtenerPorcentajePrecio(n.precio_por_defecto)) + Number(n.precio_costo)).toFixed(2);
        return precioR;
      }

      if (item.id === 'total') {
        var precioR = 0;
        precioR = (Number(n.precio_costo) * Number(_this.obtenerPorcentajePrecio(n.precio_por_defecto)) + Number(n.precio_costo)).toFixed(2);

        var itemValor = _this.state.listaProductosSeleccionadosEditados.filter(function (item) {
          return item.codigo === n.codigo;
        })[0];

        var sumaTotal = itemValor.cantidad * precioR;
        return sumaTotal.toFixed(2);
      }

      if (item.id === 'acciones') {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_9___default.a, {
          variant: "fab",
          mini: true,
          color: "default",
          "aria-label": "quit",
          onClick: function onClick() {
            var arraySeleccionados = _this.state.listaProductosSeleccionados;
            var arraySeleccionadosEditados = _this.state.listaProductosSeleccionadosEditados;
            var contador1 = 0;
            var contador2 = 0;
            arraySeleccionados.forEach(function (item) {
              if (item.codigo === n.codigo) {
                arraySeleccionados.splice(contador1, 1);

                _this.setState({
                  listaProductosSeleccionados: arraySeleccionados
                });
              }

              contador1++;
            });
            arraySeleccionadosEditados.forEach(function (item) {
              if (item.codigo === n.codigo) {
                arraySeleccionadosEditados.splice(contador2, 1);

                _this.setState({
                  listaProductosSeleccionadosEditados: arraySeleccionadosEditados
                });
              }

              contador2++;
            });

            _this.calcularValoresTotales();
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 334
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_icons_Close__WEBPACK_IMPORTED_MODULE_7___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 355
          },
          __self: this
        }));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "escFunction", function (event) {
      if (event.keyCode === 27) {
        _this.props.handleClose();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStatusUsuario", function () {
      if (_this.state.usuario) {
        if (_this.state.usuario.code) {
          _this.setState({
            mostrarVentana: true
          });
        } else {
          _this.setState({
            mostrarVentana: false
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {
      _this.contentFactura.finalizarVenta();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNuevaVenta", function () {
      _this.sectionFactura.nuevaVenta();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDescontar", function (descuento) {
      _this.setState({
        descuento: descuento
      });

      setTimeout(function () {
        var _this$state = _this.state,
            sumaSubTotal = _this$state.sumaSubTotal,
            sumaIva = _this$state.sumaIva,
            dinero_resibido = _this$state.dinero_resibido;
        var sumaDescuento = (Number(sumaSubTotal) + Number(sumaIva) - Number(descuento)).toFixed(2);

        _this.setState({
          sumaTotal: sumaDescuento
        });

        _this.handleDineroResibido(dinero_resibido);
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDineroResibido", function (dinero_resibido) {
      _this.setState({
        dinero_resibido: dinero_resibido
      });

      setTimeout(function () {
        var sumaTotal = _this.state.sumaTotal;
        var sumaCambio = Number(dinero_resibido) > 0 ? (Number(dinero_resibido) - Number(sumaTotal)).toFixed(2) : 0;

        _this.setState({
          cambio: sumaCambio
        });
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleObservacion", function (observacion) {
      _this.setState({
        observacion: observacion
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFinalizarVenta", function (item) {
      var _this$state2 = _this.state,
          listaProductosSeleccionadosEditados = _this$state2.listaProductosSeleccionadosEditados,
          facturaElectronica = _this$state2.facturaElectronica,
          uidUser = _this$state2.uidUser,
          tipo_venta = _this$state2.tipo_venta;
      var codigoRegistroVenta = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].guidGenerator();

      switch (item.tipo_pago) {
        case 'efectivo':
          {
            _this.updateDataProductos();

            _this.setOperacionStockEfectivo(listaProductosSeleccionadosEditados);

            _this.setSaveRegistroVentaEfectivo(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        case 'credito':
          {
            _this.updateDataProductos();

            _this.setOperacionStockCredito(listaProductosSeleccionadosEditados, item.valor_acreditado);

            _this.setSaveRegistroVentaCredito(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        case 'tarjeta-credito':
          {
            _this.updateDataProductos();

            _this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados);

            _this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        case 'tarjeta-debito':
          {
            _this.updateDataProductos();

            _this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados);

            _this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        case 'cheque':
          {
            _this.updateDataProductos();

            _this.setOperacionStockTarjetaCredito(listaProductosSeleccionadosEditados);

            _this.setSaveRegistroVentaTarjetaCredito(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        case 'transferencia':
          {
            _this.updateDataProductos();

            _this.setOperacionStockEfectivo(listaProductosSeleccionadosEditados);

            _this.setSaveRegistroVentaEfectivo(codigoRegistroVenta, item);

            _this.enviarFacturaElectronica(codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item);

            break;
          }

        default:
          {
            break;
          }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sumarNumeroFactura", function () {
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var numeroFactura = db.ref('users/' + user.uid + "/configuracion");
          numeroFactura.once('value', function (snap) {
            if (snap.val()) {
              var numero_factura = snap.val().numero_factura;
              var suma = Number(numero_factura) + 1;
              var tamaño = String(suma).length;
              var restaTamaño = 9 - Number(tamaño);
              var cadenaFinal = '';

              for (var i = 0; i < restaTamaño; i++) {
                cadenaFinal = cadenaFinal + '0';
              }

              numeroFactura.update({
                numero_factura: "".concat(cadenaFinal).concat(suma)
              });
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enviarFacturaElectronica", function (codigoRegistroVenta, uidUser, tipo_venta, facturaElectronica, item) {
      if (tipo_venta === 'factura') {
        var jsonData = {};

        switch (item.tipo_pago) {
          case 'efectivo':
            {
              jsonData = _this.createJsonFacturaElectronicaEfectivo();

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          case 'credito':
            {
              jsonData = _this.createJsonFacturaElectronicaCredito(item);

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          case 'tarjeta-credito':
            {
              jsonData = _this.createJsonFacturaElectronicaTarjetaCredito(item);

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          case 'tarjeta-debito':
            {
              jsonData = _this.createJsonFacturaElectronicaTarjetaCredito(item);

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          case 'cheque':
            {
              jsonData = _this.createJsonFacturaElectronicaTarjetaCredito(item);

              _this.postSetGeneratePdf(uidUser, jsonData, codigoRegistroVenta);

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          case 'transferencia':
            {
              jsonData = _this.createJsonFacturaElectronicaTransferencia();

              _this.postSetGeneratePdf(uidUser, jsonData, codigoRegistroVenta);

              _this.saveFacturasJson(jsonData, codigoRegistroVenta);

              _this.sumarNumeroFactura();

              _this.enviarFacturaElectrónica(facturaElectronica, uidUser, jsonData, codigoRegistroVenta);

              _this.setState({
                abrirModalFinalizarVenta: false
              });

              break;
            }

          default:
            {
              break;
            }
        }
      }

      setTimeout(function () {
        _this.props.handleClose();
      }, 500);
      _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('success', 'rootSnackBar', 'Venta guardada', 2000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enviarFacturaElectr\xF3nica", function (facturaElectronica, uidUser, jsonData, codigoRegistroVenta) {
      if (Boolean(facturaElectronica)) {
        _this.postSet(uidUser, jsonData, codigoRegistroVenta);
      } else {
        _this.postSetGeneratePdf(uidUser, jsonData, codigoRegistroVenta);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveFacturasJson", function (jsonData, codigoRegistroVenta) {
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionFacturaJson = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/facturas_ventas/' + codigoRegistroVenta);
      operacionFacturaJson.set(jsonData);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "postSet",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(uidUser, jsonData, codigoRegistroVenta) {
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
                    'codigo': codigoRegistroVenta
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "postSetGeneratePdf",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(uidUser, jsonData, codigoRegistroVenta) {
        var rawResponse;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch('https://stormy-bayou-19844.herokuapp.com/facturaPdf', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'id': uidUser,
                    'codigo': codigoRegistroVenta
                  },
                  body: JSON.stringify(jsonData)
                });

              case 2:
                rawResponse = _context2.sent;

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "comprobarCamposLlenosEfectivo", function () {
      var _this$state3 = _this.state,
          listaProductosSeleccionados = _this$state3.listaProductosSeleccionados,
          dinero_resibido = _this$state3.dinero_resibido;

      if (_this.comprobarTipoVenta() > 0 && listaProductosSeleccionados.length > 0 && dinero_resibido.length > 0) {
        return true;
      } else {
        _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('error', 'rootSnackBar', 'Completar todo los campos', 1000);
        return false;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "comprobarCamposLlenosCredito", function () {
      var _this$state4 = _this.state,
          listaProductosSeleccionados = _this$state4.listaProductosSeleccionados,
          dinero_resibido = _this$state4.dinero_resibido;

      if (_this.comprobarTipoVenta() > 0 && listaProductosSeleccionados.length > 0) {
        return true;
      } else {
        _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('error', 'rootSnackBar', 'Completar todo los campos', 1000);
        return false;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "comprobarTipoVenta", function () {
      var _this$state5 = _this.state,
          clienteSeleccionado = _this$state5.clienteSeleccionado,
          tipo_venta = _this$state5.tipo_venta;

      if (tipo_venta === 'final') {
        return true;
      } else {
        if (clienteSeleccionado != null) {
          if (clienteSeleccionado.toString().length > 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSaveRegistroVentaEfectivo", function (codigoVenta, item) {
      var _this$state6 = _this.state,
          clienteSeleccionado = _this$state6.clienteSeleccionado,
          descuento = _this$state6.descuento,
          observacion = _this$state6.observacion,
          dinero_resibido = _this$state6.dinero_resibido,
          cambio = _this$state6.cambio,
          sumaSubTotal = _this$state6.sumaSubTotal,
          sumaIva = _this$state6.sumaIva,
          sumaTotal = _this$state6.sumaTotal,
          tipo_venta = _this$state6.tipo_venta,
          facturaElectronica = _this$state6.facturaElectronica,
          listaProductosSeleccionadosEditados = _this$state6.listaProductosSeleccionadosEditados,
          tipo_pago = _this$state6.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionVentaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/ventas/' + codigoVenta);
      var order = new Date();
      var itemVenta = {
        codigo: codigoVenta,
        cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        descuento: Number(descuento).toFixed(2),
        tipo_venta: tipo_venta,
        factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
        observacion: observacion,
        dinero_resibido: Number(dinero_resibido).toFixed(2),
        cambio: Number(cambio).toFixed(2),
        subtotal: Number(sumaSubTotal).toFixed(2),
        iva: Number(sumaIva).toFixed(2),
        total: Number(sumaTotal).toFixed(2),
        productos: listaProductosSeleccionadosEditados,
        fecha_venta: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora_venta: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        empleado: _this.props.usuario.code,
        order: '' + order,
        estado: true,
        numero_tarjeta: '',
        nombre_banco: '',
        tipo_pago: tipo_pago,
        valor_acreditado: '0.00',
        fecha_a_pagar: '',
        caja: cajaSeleccionada.codigo,
        urlpdf: 'genererando'
      };

      _this.setVentaCaja(itemVenta, tipo_pago, item);

      operacionVentaRef.set(itemVenta);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSaveRegistroVentaCredito", function (codigoVenta, item) {
      var _this$state7 = _this.state,
          clienteSeleccionado = _this$state7.clienteSeleccionado,
          descuento = _this$state7.descuento,
          observacion = _this$state7.observacion,
          dinero_resibido = _this$state7.dinero_resibido,
          cambio = _this$state7.cambio,
          sumaSubTotal = _this$state7.sumaSubTotal,
          sumaIva = _this$state7.sumaIva,
          sumaTotal = _this$state7.sumaTotal,
          tipo_venta = _this$state7.tipo_venta,
          facturaElectronica = _this$state7.facturaElectronica,
          listaProductosSeleccionadosEditados = _this$state7.listaProductosSeleccionadosEditados,
          tipo_pago = _this$state7.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionVentaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/ventas/' + codigoVenta);
      var order = new Date();
      var itemVenta = {
        codigo: codigoVenta,
        cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        descuento: Number(descuento).toFixed(2),
        tipo_venta: tipo_venta,
        factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
        observacion: observacion,
        dinero_resibido: '0.00',
        cambio: '0.00',
        subtotal: Number(sumaSubTotal).toFixed(2),
        iva: Number(sumaIva).toFixed(2),
        total: Number(sumaTotal).toFixed(2),
        productos: listaProductosSeleccionadosEditados,
        fecha_venta: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora_venta: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        empleado: _this.props.usuario.code,
        order: '' + order,
        estado: true,
        numero_tarjeta: '',
        nombre_banco: '',
        tipo_pago: tipo_pago,
        valor_acreditado: Number(item.valor_acreditado).toFixed(2),
        fecha_a_pagar: item.fecha_vencimiento,
        caja: cajaSeleccionada.codigo,
        urlpdf: 'genererando'
      };

      _this.setVentaCaja(itemVenta, tipo_pago, item);

      operacionVentaRef.set(itemVenta);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSaveRegistroVentaTarjetaCredito", function (codigoVenta, item) {
      var _this$state8 = _this.state,
          clienteSeleccionado = _this$state8.clienteSeleccionado,
          descuento = _this$state8.descuento,
          observacion = _this$state8.observacion,
          dinero_resibido = _this$state8.dinero_resibido,
          cambio = _this$state8.cambio,
          sumaSubTotal = _this$state8.sumaSubTotal,
          sumaIva = _this$state8.sumaIva,
          sumaTotal = _this$state8.sumaTotal,
          tipo_venta = _this$state8.tipo_venta,
          facturaElectronica = _this$state8.facturaElectronica,
          listaProductosSeleccionadosEditados = _this$state8.listaProductosSeleccionadosEditados,
          tipo_pago = _this$state8.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionVentaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/ventas/' + codigoVenta);
      var order = new Date();
      var itemVenta = {
        codigo: codigoVenta,
        cliente: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        descuento: Number(descuento).toFixed(2),
        tipo_venta: tipo_venta,
        factura_emitida: Boolean(facturaElectronica) ? 'pendiente' : 'no_emitida',
        observacion: observacion,
        dinero_resibido: '0.00',
        cambio: '0.00',
        subtotal: Number(sumaSubTotal).toFixed(2),
        iva: Number(sumaIva).toFixed(2),
        total: Number(sumaTotal).toFixed(2),
        productos: listaProductosSeleccionadosEditados,
        fecha_venta: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora_venta: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        empleado: _this.props.usuario.code,
        order: '' + order,
        estado: true,
        numero_tarjeta: item.propiedades_numero,
        nombre_banco: item.propiedades_banco,
        tipo_pago: tipo_pago,
        valor_acreditado: '0.00',
        fecha_a_pagar: '',
        caja: cajaSeleccionada.codigo,
        urlpdf: 'genererando'
      };

      _this.setVentaCaja(itemVenta, tipo_pago, item);

      operacionVentaRef.set(itemVenta);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateDataProductos", function () {
      var listaProductosSeleccionadosEditados = _this.state.listaProductosSeleccionadosEditados;
      listaProductosSeleccionadosEditados.forEach(function (item) {
        var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
        var productosRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/productos/' + item.codigo);
        productosRef.once('value', function (snap) {
          if (snap.val()) {
            productosRef.update({
              stock_actual: Number(snap.val().stock_actual) - Number(item.cantidad)
            });
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOperacionStockEfectivo", function (listaProductos) {
      var _this$state9 = _this.state,
          clienteSeleccionado = _this$state9.clienteSeleccionado,
          observacion = _this$state9.observacion,
          dinero_resibido = _this$state9.dinero_resibido,
          sumaTotal = _this$state9.sumaTotal,
          tipo_venta = _this$state9.tipo_venta,
          sumaSubTotal = _this$state9.sumaSubTotal,
          descuento = _this$state9.descuento,
          cambio = _this$state9.cambio,
          tipo_pago = _this$state9.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var codigoStock = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].guidGenerator();
      var order = new Date();
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionStockRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
      operacionStockRef.set({
        codigo: codigoStock,
        tipo_operacion: 'venta-producto',
        fecha: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        productos: listaProductos,
        total_final: "".concat(Number(sumaTotal).toFixed(2)),
        empleado: _this.props.usuario.code,
        observacion: observacion,
        subtotal: "".concat(Number(sumaSubTotal).toFixed(2)),
        descuento: "".concat(Number(descuento).toFixed(2)),
        otros_gastos: '0.00',
        flete: '0.00',
        valor_pagado: "".concat(Number(dinero_resibido).toFixed(2)),
        medio_pago: tipo_pago,
        saldo_favor: '0.00',
        en_deuda: '0.00',
        vuelto: cambio,
        acreditado: '0.00',
        order: order + "",
        caja: cajaSeleccionada.codigo
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOperacionStockCredito", function (listaProductos, valor_acreditado) {
      var _this$state10 = _this.state,
          clienteSeleccionado = _this$state10.clienteSeleccionado,
          observacion = _this$state10.observacion,
          dinero_resibido = _this$state10.dinero_resibido,
          sumaTotal = _this$state10.sumaTotal,
          tipo_venta = _this$state10.tipo_venta,
          sumaSubTotal = _this$state10.sumaSubTotal,
          descuento = _this$state10.descuento,
          cambio = _this$state10.cambio,
          tipo_pago = _this$state10.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var codigoStock = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].guidGenerator();
      var order = new Date();
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionStockRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
      operacionStockRef.set({
        codigo: codigoStock,
        tipo_operacion: 'venta-producto',
        fecha: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        productos: listaProductos,
        total_final: "".concat(Number(sumaTotal).toFixed(2)),
        empleado: _this.props.usuario.code,
        observacion: observacion,
        subtotal: "".concat(Number(sumaSubTotal).toFixed(2)),
        descuento: "".concat(Number(descuento).toFixed(2)),
        otros_gastos: '0.00',
        flete: '0.00',
        valor_pagado: '0.00',
        medio_pago: tipo_pago,
        saldo_favor: '0.00',
        en_deuda: Number(Number(sumaTotal) - Number(valor_acreditado)).toFixed(2),
        vuelto: '0.00',
        acreditado: "".concat(Number(valor_acreditado).toFixed(2)),
        order: order + "",
        caja: cajaSeleccionada.codigo
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOperacionStockTarjetaCredito", function (listaProductos) {
      var _this$state11 = _this.state,
          clienteSeleccionado = _this$state11.clienteSeleccionado,
          observacion = _this$state11.observacion,
          dinero_resibido = _this$state11.dinero_resibido,
          sumaTotal = _this$state11.sumaTotal,
          tipo_venta = _this$state11.tipo_venta,
          sumaSubTotal = _this$state11.sumaSubTotal,
          descuento = _this$state11.descuento,
          cambio = _this$state11.cambio,
          tipo_pago = _this$state11.tipo_pago;
      var cajaSeleccionada = _this.props.cajaSeleccionada;
      var codigoStock = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].guidGenerator();
      var order = new Date();
      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var operacionStockRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/operaciones_stock/' + codigoStock);
      operacionStockRef.set({
        codigo: codigoStock,
        tipo_operacion: 'venta-producto',
        fecha: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
        hora: "".concat(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()),
        cliente_proveedor: tipo_venta === 'final' ? 'Consumidor Final' : clienteSeleccionado,
        productos: listaProductos,
        total_final: "".concat(Number(sumaTotal).toFixed(2)),
        empleado: _this.props.usuario.code,
        observacion: observacion,
        subtotal: "".concat(Number(sumaSubTotal).toFixed(2)),
        descuento: "".concat(Number(descuento).toFixed(2)),
        otros_gastos: '0.00',
        flete: '0.00',
        valor_pagado: '0.00',
        medio_pago: tipo_pago,
        saldo_favor: '0.00',
        en_deuda: '0.00',
        vuelto: '0.00',
        acreditado: '0.00',
        order: order + "",
        caja: cajaSeleccionada.codigo
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createJsonFacturaElectronicaEfectivo", function () {
      var _this$state12 = _this.state,
          sumaSubTotal = _this$state12.sumaSubTotal,
          precioProductosSinIva = _this$state12.precioProductosSinIva,
          precioProductosConIva = _this$state12.precioProductosConIva,
          sumaIva = _this$state12.sumaIva,
          sumaTotal = _this$state12.sumaTotal,
          descuento = _this$state12.descuento,
          clienteSeleccionado = _this$state12.clienteSeleccionado,
          listaProductosSeleccionadosEditados = _this$state12.listaProductosSeleccionadosEditados,
          listaProductosSeleccionados = _this$state12.listaProductosSeleccionados,
          precioSeleccionado = _this$state12.precioSeleccionado,
          punto_emision = _this$state12.punto_emision,
          codigoEstablecimiento = _this$state12.codigoEstablecimiento,
          numero_factura = _this$state12.numero_factura;
      var date = new Date();
      var json = {
        "ambiente": _this.state.ambienteFacturacion,
        "tipo_emision": 1,
        "secuencial": Number(numero_factura),
        "fecha_emision": date.toISOString(),
        "emisor": {
          "ruc": "",
          "obligado_contabilidad": false,
          "contribuyente_especial": "",
          "nombre_comercial": "",
          "razon_social": "",
          "direccion": "",
          "establecimiento": {
            "punto_emision": String(punto_emision),
            "codigo": String(codigoEstablecimiento),
            "direccion": ""
          }
        },
        "moneda": "USD",
        "totales": {
          "total_sin_impuestos": Number(sumaSubTotal),
          "impuestos": [{
            "base_imponible": Number(precioProductosSinIva),
            "valor": 0.0,
            "codigo": "2",
            "codigo_porcentaje": "0"
          }, {
            "base_imponible": Number(precioProductosConIva),
            "valor": Number(sumaIva),
            "codigo": "2",
            "codigo_porcentaje": "2"
          }],
          "importe_total": Number(sumaTotal),
          "propina": 0.0,
          "descuento": Number(Number(descuento).toFixed(2))
        },
        "comprador": {
          "email": clienteSeleccionado.email,
          "identificacion": clienteSeleccionado.numero_identificacion,
          "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
          "razon_social": clienteSeleccionado.nombre,
          "direccion": clienteSeleccionado.direccion,
          "telefono": clienteSeleccionado.celular
        },
        "items": listaProductosSeleccionadosEditados.map(function (item) {
          return {
            cantidad: Number(item.cantidad),
            codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
            codigo_auxiliar: item.codigo,
            precio_unitario: Number((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)).toFixed(2)),
            descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
            precio_total_sin_impuestos: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
            impuestos: [{
              base_imponible: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
              valor: Boolean(item.tiene_iva) ? Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.porcentaje_iva) / 100).toFixed(2)) : 0,
              tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
              codigo: '2',
              codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
            }],
            descuento: 0.0
          };
        }),
        "valor_retenido_iva": 0.00,
        "valor_retenido_renta": 0.00,
        "pagos": [{
          "medio": "efectivo",
          "total": Number(sumaTotal)
        }]
      };
      return json;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createJsonFacturaElectronicaCredito", function (item) {
      var _this$state13 = _this.state,
          sumaSubTotal = _this$state13.sumaSubTotal,
          precioProductosSinIva = _this$state13.precioProductosSinIva,
          precioProductosConIva = _this$state13.precioProductosConIva,
          sumaIva = _this$state13.sumaIva,
          sumaTotal = _this$state13.sumaTotal,
          descuento = _this$state13.descuento,
          clienteSeleccionado = _this$state13.clienteSeleccionado,
          listaProductosSeleccionadosEditados = _this$state13.listaProductosSeleccionadosEditados,
          listaProductosSeleccionados = _this$state13.listaProductosSeleccionados,
          precioSeleccionado = _this$state13.precioSeleccionado,
          punto_emision = _this$state13.punto_emision,
          codigoEstablecimiento = _this$state13.codigoEstablecimiento,
          numero_factura = _this$state13.numero_factura;
      var date = new Date();
      var json = {
        "ambiente": _this.state.ambienteFacturacion,
        "tipo_emision": 1,
        "secuencial": Number(numero_factura),
        "fecha_emision": date.toISOString(),
        "emisor": {
          "ruc": "",
          "obligado_contabilidad": false,
          "contribuyente_especial": "",
          "nombre_comercial": "",
          "razon_social": "",
          "direccion": "",
          "establecimiento": {
            "punto_emision": String(punto_emision),
            "codigo": String(codigoEstablecimiento),
            "direccion": ""
          }
        },
        "moneda": "USD",
        "totales": {
          "total_sin_impuestos": Number(sumaSubTotal),
          "impuestos": [{
            "base_imponible": Number(precioProductosSinIva),
            "valor": 0.0,
            "codigo": "2",
            "codigo_porcentaje": "0"
          }, {
            "base_imponible": Number(precioProductosConIva),
            "valor": Number(sumaIva),
            "codigo": "2",
            "codigo_porcentaje": "2"
          }],
          "importe_total": Number(sumaTotal),
          "propina": 0.0,
          "descuento": Number(Number(descuento).toFixed(2))
        },
        "comprador": {
          "email": clienteSeleccionado.email,
          "identificacion": clienteSeleccionado.numero_identificacion,
          "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
          "razon_social": clienteSeleccionado.nombre,
          "direccion": clienteSeleccionado.direccion,
          "telefono": clienteSeleccionado.celular
        },
        "items": listaProductosSeleccionadosEditados.map(function (item) {
          return {
            cantidad: Number(item.cantidad),
            codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
            codigo_auxiliar: item.codigo,
            precio_unitario: Number((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)).toFixed(2)),
            descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
            precio_total_sin_impuestos: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
            impuestos: [{
              base_imponible: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
              valor: Boolean(item.tiene_iva) ? Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.porcentaje_iva) / 100).toFixed(2)) : 0,
              tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
              codigo: '2',
              codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
            }],
            descuento: 0.0
          };
        }),
        "valor_retenido_iva": 0.00,
        "valor_retenido_renta": 0.00,
        "credito": {
          "fecha_vencimiento": "".concat(item.fecha_vencimiento),
          "monto": Number((Number(item.monto) - Number(item.valor_acreditado)).toFixed(2))
        },
        "pagos": [{
          "medio": 'efectivo',
          "total": Number(item.valor_acreditado)
        }]
      };
      return json;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createJsonFacturaElectronicaTarjetaCredito", function (item) {
      var _this$state14 = _this.state,
          sumaSubTotal = _this$state14.sumaSubTotal,
          precioProductosSinIva = _this$state14.precioProductosSinIva,
          precioProductosConIva = _this$state14.precioProductosConIva,
          sumaIva = _this$state14.sumaIva,
          sumaTotal = _this$state14.sumaTotal,
          descuento = _this$state14.descuento,
          clienteSeleccionado = _this$state14.clienteSeleccionado,
          listaProductosSeleccionadosEditados = _this$state14.listaProductosSeleccionadosEditados,
          listaProductosSeleccionados = _this$state14.listaProductosSeleccionados,
          precioSeleccionado = _this$state14.precioSeleccionado,
          punto_emision = _this$state14.punto_emision,
          codigoEstablecimiento = _this$state14.codigoEstablecimiento,
          numero_factura = _this$state14.numero_factura;
      var date = new Date();
      var json = {
        "ambiente": _this.state.ambienteFacturacion,
        "tipo_emision": 1,
        "secuencial": Number(numero_factura),
        "fecha_emision": date.toISOString(),
        "emisor": {
          "ruc": "",
          "obligado_contabilidad": false,
          "contribuyente_especial": "",
          "nombre_comercial": "",
          "razon_social": "",
          "direccion": "",
          "establecimiento": {
            "punto_emision": String(punto_emision),
            "codigo": String(codigoEstablecimiento),
            "direccion": ""
          }
        },
        "moneda": "USD",
        "totales": {
          "total_sin_impuestos": Number(sumaSubTotal),
          "impuestos": [{
            "base_imponible": Number(precioProductosSinIva),
            "valor": 0.0,
            "codigo": "2",
            "codigo_porcentaje": "0"
          }, {
            "base_imponible": Number(precioProductosConIva),
            "valor": Number(sumaIva),
            "codigo": "2",
            "codigo_porcentaje": "2"
          }],
          "importe_total": Number(sumaTotal),
          "propina": 0.0,
          "descuento": Number(Number(descuento).toFixed(2))
        },
        "comprador": {
          "email": clienteSeleccionado.email,
          "identificacion": clienteSeleccionado.numero_identificacion,
          "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
          "razon_social": clienteSeleccionado.nombre,
          "direccion": clienteSeleccionado.direccion,
          "telefono": clienteSeleccionado.celular
        },
        "items": listaProductosSeleccionadosEditados.map(function (item) {
          return {
            cantidad: Number(item.cantidad),
            codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
            codigo_auxiliar: item.codigo,
            precio_unitario: Number((Number(item.precio_costo) * Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto)) + Number(item.precio_costo)).toFixed(2)),
            descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
            precio_total_sin_impuestos: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
            impuestos: [{
              base_imponible: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
              valor: Boolean(item.tiene_iva) ? Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.porcentaje_iva) / 100).toFixed(2)) : 0,
              tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
              codigo: '2',
              codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
            }],
            descuento: 0.0
          };
        }),
        "valor_retenido_iva": 0.00,
        "valor_retenido_renta": 0.00,
        "pagos": [{
          "medio": item.tipo_pago === 'tarjeta-credito' ? 'tarjeta_credito' : item.tipo_pago === 'tarjeta-debito' ? 'tarjeta_debito' : 'cheque',
          "total": Number(item.total),
          "propiedades": {
            "numero": "".concat(item.propiedades_numero),
            "banco": "".concat(item.propiedades_banco)
          }
        }]
      };
      return json;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createJsonFacturaElectronicaTransferencia", function () {
      var _this$state15 = _this.state,
          sumaSubTotal = _this$state15.sumaSubTotal,
          precioProductosSinIva = _this$state15.precioProductosSinIva,
          precioProductosConIva = _this$state15.precioProductosConIva,
          sumaIva = _this$state15.sumaIva,
          sumaTotal = _this$state15.sumaTotal,
          descuento = _this$state15.descuento,
          clienteSeleccionado = _this$state15.clienteSeleccionado,
          listaProductosSeleccionadosEditados = _this$state15.listaProductosSeleccionadosEditados,
          listaProductosSeleccionados = _this$state15.listaProductosSeleccionados,
          precioSeleccionado = _this$state15.precioSeleccionado,
          punto_emision = _this$state15.punto_emision,
          codigoEstablecimiento = _this$state15.codigoEstablecimiento,
          numero_factura = _this$state15.numero_factura;
      var date = new Date();
      var json = {
        "ambiente": _this.state.ambienteFacturacion,
        "tipo_emision": 1,
        "secuencial": Number(numero_factura),
        "fecha_emision": date.toISOString(),
        "emisor": {
          "ruc": "",
          "obligado_contabilidad": false,
          "contribuyente_especial": "",
          "nombre_comercial": "",
          "razon_social": "",
          "direccion": "",
          "establecimiento": {
            "punto_emision": String(punto_emision),
            "codigo": String(codigoEstablecimiento),
            "direccion": ""
          }
        },
        "moneda": "USD",
        "totales": {
          "total_sin_impuestos": Number(sumaSubTotal),
          "impuestos": [{
            "base_imponible": Number(precioProductosSinIva),
            "valor": 0.0,
            "codigo": "2",
            "codigo_porcentaje": "0"
          }, {
            "base_imponible": Number(precioProductosConIva),
            "valor": Number(sumaIva),
            "codigo": "2",
            "codigo_porcentaje": "2"
          }],
          "importe_total": Number(sumaTotal),
          "propina": 0.0,
          "descuento": Number(Number(descuento).toFixed(2))
        },
        "comprador": {
          "email": clienteSeleccionado.email,
          "identificacion": clienteSeleccionado.numero_identificacion,
          "tipo_identificacion": clienteSeleccionado.tipo_identificacion,
          "razon_social": clienteSeleccionado.nombre,
          "direccion": clienteSeleccionado.direccion,
          "telefono": clienteSeleccionado.celular
        },
        "items": listaProductosSeleccionadosEditados.map(function (item) {
          return {
            cantidad: Number(item.cantidad),
            codigo_principal: item.codigo_barras.length > 0 ? item.codigo_barras : '0',
            codigo_auxiliar: item.codigo,
            precio_unitario: Number((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)).toFixed(2)),
            descripcion: Boolean(item.tiene_iva) ? '* ' + item.descripcion_producto : item.descripcion_producto,
            precio_total_sin_impuestos: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
              return it.codigo === item.codigo;
            })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
            impuestos: [{
              base_imponible: Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.cantidad)).toFixed(2)),
              valor: Boolean(item.tiene_iva) ? Number(((Number(item.precio_costo) * Number(Number(_this.obtenerPorcentajePrecio(listaProductosSeleccionados.filter(function (it) {
                return it.codigo === item.codigo;
              })[0].precio_por_defecto))) + Number(item.precio_costo)) * Number(item.porcentaje_iva) / 100).toFixed(2)) : 0,
              tarifa: Boolean(item.tiene_iva) ? Number(item.porcentaje_iva) : 0,
              codigo: '2',
              codigo_porcentaje: Boolean(item.tiene_iva) ? '2' : '0'
            }],
            descuento: 0.0
          };
        }),
        "valor_retenido_iva": 0.00,
        "valor_retenido_renta": 0.00,
        "pagos": [{
          "medio": "transferencia",
          "total": Number(sumaTotal)
        }]
      };
      return json;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChangueSelecteccionarProducto", function (item) {
      var array = _this.state.listaProductosSeleccionados;
      var arrayValoresSelecionados = _this.state.listaProductosSeleccionadosEditados;
      var array2 = array.filter(function (item2) {
        return item2.codigo === item.codigo;
      });

      if (_this.state.cargaAutomatica === false) {
        _this.setState({
          itemProductoCargado: item
        });
      } else {
        if (array2.length === 0) {
          if (Number(item.stock_actual) === 0) {
            _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('error', 'rootSnackBar', 'Producto vacío', 2000);
          } else {
            array.push(item);

            if (Boolean(!_this.state.seleccionarProductoPordefecto)) {
              if (_this.state.precioSeleccionadoCargar != null) {
                item.precio_por_defecto = _this.state.precioSeleccionadoCargar;
              }
            }

            arrayValoresSelecionados.push({
              codigo: item.codigo,
              cantidad: '1',
              precio_venta_a: item.precio_venta_a,
              precio_costo: item.precio_costo,
              tiene_iva: item.tiene_iva,
              porcentaje_iva: item.porcentaje_iva,
              stock_actual: item.stock_actual,
              codigo_barras: item.codigo_barras,
              descripcion_producto: item.descripcion_producto,
              precio_venta: Number((Number(item.precio_costo) * Number(_this.obtenerPorcentajePrecio(item.precio_por_defecto)) + Number(item.precio_costo)).toFixed(2))
            });

            _this.setState({
              itemProductoCargado: null
            });
          }

          _this.calcularValoresTotales();
        } else {
          _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000);
        }
      }

      _this.setState({
        listaProductosSeleccionados: array,
        listaProductosSeleccionadosEditados: arrayValoresSelecionados
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "agregarItemSeleccionadoVista", function (item) {
      if (_this.state.itemProductoCargado != null) {
        var array = _this.state.listaProductosSeleccionados;
        var arrayValoresSelecionados = _this.state.listaProductosSeleccionadosEditados;
        var array2 = array.filter(function (item2) {
          return item2.codigo === item.codigo;
        });

        if (array2.length === 0) {
          if (Number(item.stock_actual) === 0) {
            _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('error', 'rootSnackBar', 'Producto vacío', 2000);
          } else {
            array.push(item);
            arrayValoresSelecionados.push({
              codigo: item.codigo,
              cantidad: '1',
              precio_venta_a: item.precio_venta_a,
              precio_costo: item.precio_costo,
              tiene_iva: item.tiene_iva,
              porcentaje_iva: item.porcentaje_iva,
              stock_actual: item.stock_actual,
              codigo_barras: item.codigo_barras,
              descripcion_producto: item.descripcion_producto,
              precio_venta: Number((Number(item.precio_costo) * Number(_this.obtenerPorcentajePrecio(item.precio_por_defecto)) + Number(item.precio_costo)).toFixed(2))
            });

            _this.setState({
              listaProductosSeleccionados: array,
              listaProductosSeleccionadosEditados: arrayValoresSelecionados
            });

            _this.setState({
              itemProductoCargado: null
            });
          }
        } else {
          _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000);
        }

        _this.calcularValoresTotales();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "obtenerPorcentajePrecio", function (precio_por_defecto) {
      var porcentaje = 0;

      _this.state.precios.filter(function (it) {
        if (it.codigo === precio_por_defecto) {
          porcentaje = it.porcentaje;
        }
      });

      return porcentaje;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calcularValoresTotales", function () {
      var sumatotalConIVA = 0;
      var sumatotal = 0;
      var sumatotalProductosSinIva = 0;
      var sumatotalProductosConIva = 0;

      _this.state.listaProductosSeleccionadosEditados.forEach(function (item) {
        var stock = _this.state.listaProductosSeleccionadosEditados.filter(function (it) {
          return it.codigo === item.codigo;
        })[0].cantidad;

        var precioCosto = _this.state.listaProductosSeleccionadosEditados.filter(function (it) {
          return it.codigo === item.codigo;
        })[0].precio_costo;

        var reultado = precioCosto * Number(_this.obtenerPorcentajePrecio(_this.state.listaProductosSeleccionados.filter(function (it) {
          return it.codigo === item.codigo;
        })[0].precio_por_defecto)) + Number(precioCosto);
        var precio = reultado;
        var precioIva = 0;

        if (item.tiene_iva === true) {
          precioIva = precio * Number(item.porcentaje_iva) / 100;
          sumatotalProductosConIva += Number(precio) * Number(item.cantidad);
        } else {
          precioIva = 0;
          sumatotalProductosSinIva += Number(precio) * Number(item.cantidad);
        }

        sumatotalConIVA = sumatotalConIVA + Number(stock) * Number(precioIva);
        sumatotal = sumatotal + Number(stock) * Number(precio);
      });

      _this.setState({
        sumaTotal: (sumatotal + sumatotalConIVA).toFixed(2)
      });

      _this.setState({
        sumaIva: sumatotalConIVA.toFixed(2)
      });

      _this.setState({
        sumaSubTotal: sumatotal.toFixed(2)
      });

      _this.setState({
        precioProductosSinIva: sumatotalProductosSinIva.toFixed(2)
      });

      _this.setState({
        precioProductosConIva: sumatotalProductosConIva.toFixed(2)
      }); // this.setState({ productosSeleccionados: this.state.listaProductosSeleccionadosEditados })


      _this.handleDineroResibido(_this.state.dinero_resibido);

      _this.handleDescontar(_this.state.descuento);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "seleccionarCliente", function (item) {
      _this.setState({
        clienteFacturacion: item.codigo
      });

      _this.getClienteDataBase(item.codigo);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getClienteDataBase", function (codigo) {
      if (codigo) {
        firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
          if (user) {
            if (_this.state.clienteFacturacion.length > 0) {
              var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
              var productosRef = db.ref('users/' + user.uid + "/clientes/" + codigo);
              productosRef.on('value', function (snapshot) {
                if (snapshot.val()) {
                  _this.setState({
                    clienteSeleccionado: snapshot.val()
                  });
                } else {
                  _this.setState({
                    clienteSeleccionado: null
                  });
                }
              });
            }
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDescontar", function (descuento) {
      _this.setState({
        descuento: descuento
      });

      setTimeout(function () {
        var _this$state16 = _this.state,
            sumaSubTotal = _this$state16.sumaSubTotal,
            sumaIva = _this$state16.sumaIva,
            dinero_resibido = _this$state16.dinero_resibido;
        var sumaDescuento = (Number(sumaSubTotal) + Number(sumaIva) - Number(descuento)).toFixed(2);

        _this.setState({
          sumaTotal: sumaDescuento
        });

        _this.handleDineroResibido(dinero_resibido);
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDineroResibido", function (dinero_resibido) {
      _this.setState({
        dinero_resibido: dinero_resibido
      });

      setTimeout(function () {
        var sumaTotal = _this.state.sumaTotal;
        var sumaCambio = Number(dinero_resibido) > 0 ? (Number(dinero_resibido) - Number(sumaTotal)).toFixed(2) : 0;

        _this.setState({
          cambio: sumaCambio
        });
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleObservacion", function (observacion) {
      _this.setState({
        observacion: observacion
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFacturaElectronica", function () {
      _this.setState({
        facturaElectronica: !_this.state.facturaElectronica
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "abrirModalFinalizarVenta", function () {
      switch (_this.state.tipo_pago) {
        case 'efectivo':
          {
            if (_this.comprobarCamposLlenosEfectivo()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        case 'credito':
          {
            if (_this.comprobarCamposLlenosCredito()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        case 'tarjeta-credito':
          {
            if (_this.comprobarCamposLlenosCredito()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        case 'tarjeta-debito':
          {
            if (_this.comprobarCamposLlenosCredito()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        case 'cheque':
          {
            if (_this.comprobarCamposLlenosCredito()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        case 'transferencia':
          {
            if (_this.comprobarCamposLlenosCredito()) {
              _this.setState({
                estadoModalFinalizaPago: true
              });
            }

            break;
          }

        default:
          {
            break;
          }
      }
    });

    return _this;
  }

  _createClass(ModalNewVenta, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener("keydown", this.escFunction, false);
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        _this2.setState({
          uidUser: user.uid
        });
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var empresaRef = db.ref('auth_admins/' + user.uid + "/ambiente");
          empresaRef.on('value', function (snap) {
            if (snap.val()) {
              _this2.setState({
                ambienteFacturacion: snap.val()
              });
            }
          });
        }
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var empresaRef = db.ref('users/' + user.uid + "/precios");
          empresaRef.on('value', function (snap) {
            if (snap.val()) {
              _this2.setState({
                precios: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].snapshotToArray(snap)
              });
            }
          });
        }
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var empresaRef = db.ref('users/' + user.uid + "/configuracion");
          empresaRef.on('value', function (snap) {
            if (snap.val()) {
              var numero_factura = snap.val().numero_factura;
              var suma = Number(numero_factura) + 1;
              var tamaño = String(suma).length;
              var restaTamaño = 9 - Number(tamaño);
              var cadenaFinal = '';

              for (var i = 0; i < restaTamaño; i++) {
                cadenaFinal = cadenaFinal + '0';
              }

              var sumaFinal = "".concat(cadenaFinal).concat(suma);

              _this2.setState({
                numero_factura: sumaFinal
              });
            }
          });
        }
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var empresaRef = db.ref('users/' + user.uid + "/usuarios/" + _this2.props.usuario.code + '/punto_emision');
          empresaRef.on('value', function (snap) {
            if (snap.val()) {
              _this2.setState({
                punto_emision: snap.val()
              });
            }
          });
        }
      });
      firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().onAuthStateChanged(function (user) {
        if (user) {
          var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
          var empresaRef = db.ref('auth_admins/' + user.uid + '/establecimiento/codigo');
          empresaRef.on('value', function (snap) {
            if (snap.val()) {
              _this2.setState({
                codigoEstablecimiento: snap.val()
              });
            }
          });
        }
      });
      this.obtenerPreciosDefectoConfiguracion();

      if (this.props.item) {
        this.setState({
          cambio: this.props.item.cambio,
          cliente: this.props.item.cliente,
          codigo: this.props.item.codigo,
          descuento: this.props.item.descuento,
          dinero_resibido: this.props.item.dinero_resibido,
          empleado: this.props.item.empleado,
          estado: this.props.item.estado,
          factura_emitida: this.props.item.factura_emitida,
          fecha_venta: this.props.item.fecha_venta,
          hora_venta: this.props.item.hora_venta,
          iva: this.props.item.iva,
          observacion: this.props.item.observacion,
          order: this.props.item.order,
          productosSeleccionados: this.props.item.productos,
          subtotal: this.props.item.subtotal,
          tipo_venta: this.props.item.tipo_venta,
          total: this.props.item.total
        });
      }
    }
  }, {
    key: "setVentaCaja",
    ////////////////////////
    value: function setVentaCaja(itemVenta, tipo_pago, item) {
      var _this3 = this;

      var db = firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.database();
      var codigoVentaCaja = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].guidGenerator();
      var operacionVentaRefCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/caja/cajas_abiertas_usuario');
      operacionVentaRefCaja.once('value', function (snap) {
        if (snap.val()) {
          var caja = _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].snapshotToArray(snap).filter(function (it) {
            return it.usuario === _this3.props.usuario.code;
          })[0];

          if (Boolean(caja.estado)) {
            var operacionVentaCaja = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/ventas/' + itemVenta.codigo);
            var cajaRefValorActual = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo);

            if (tipo_pago === 'efectivo') {
              cajaRefValorActual.once('value', function (snap2) {
                if (snap2.val()) {
                  operacionVentaCaja.set(itemVenta);
                  cajaRefValorActual.update({
                    valor_caja: Number(Number(snap2.val().valor_caja) + Number(itemVenta.total)).toFixed(2)
                  });
                }
              });
            }

            if (tipo_pago === 'credito') {
              var cuentaCobrarClienteRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _this3.state.clienteSeleccionado.codigo);
              var configuracionMes = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/configuracion/dias_a_pagar_defecto/dias');
              cuentaCobrarClienteRef.once('value', function (snap) {
                if (snap.val()) {
                  var aumentarDeudaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _this3.state.clienteSeleccionado.codigo + '/lista_deudas/' + itemVenta.codigo);
                  var aumentarAcreditadoRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _this3.state.clienteSeleccionado.codigo + '/lista_acreditados/' + itemVenta.codigo);
                  aumentarDeudaRef.set({
                    codigo: itemVenta.codigo,
                    valor: _this3.state.sumaTotal,
                    fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                    hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                    estado: true
                  });
                  var cajaRefValorAcreditado = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/lista_dinero_acreditado_venta_credito/' + itemVenta.codigo);

                  if (Number(item.valor_acreditado) > 0) {
                    cajaRefValorAcreditado.set({
                      codigo: itemVenta.codigo,
                      valor: item.valor_acreditado,
                      fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                      hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                      estado: true,
                      tipo: 'pago_venta_credito'
                    });
                    aumentarAcreditadoRef.set({
                      codigo: itemVenta.codigo,
                      valor: item.valor_acreditado,
                      fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                      hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                      estado: true,
                      tipo: 'pago_venta_credito'
                    });
                    cajaRefValorActual.once('value', function (snap2) {
                      if (snap2.val()) {
                        cajaRefValorActual.update({
                          valor_caja: Number(Number(snap2.val().valor_caja) + Number(item.valor_acreditado)).toFixed(2)
                        });
                      }
                    });
                  }
                } else {
                  Date.prototype.addDays = function (days) {
                    var date = new Date(this.valueOf());
                    date.setDate(date.getDate() + days);
                    var dayDate = date.getDate();
                    var mes = date.getMonth() + 1;

                    if (dayDate.toString().length === 1) {
                      dayDate = '0' + dayDate;
                    }

                    if (mes.toString().length === 1) {
                      mes = '0' + mes;
                    }

                    return "".concat(date.getFullYear(), "-").concat(mes, "-").concat(dayDate);
                  };

                  var date = new Date();
                  configuracionMes.once('value', function (snapp) {
                    if (snapp.val()) {
                      cuentaCobrarClienteRef.set({
                        cliente: _this3.state.clienteSeleccionado,
                        codigo: _this3.state.clienteSeleccionado.codigo,
                        estado: true,
                        estado_cuenta: 'deuda',
                        fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                        fecha_pago: date.addDays(Number(snap.val())),
                        hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                        order: '' + new Date(),
                        tipo_cuenta: 'venta_credito',
                        total: _this3.state.sumaTotal,
                        usuario: _this3.props.usuario.code
                      });
                      var deudaRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _this3.state.clienteSeleccionado.codigo + '/lista_deudas/' + itemVenta.codigo);
                      deudaRef.set({
                        codigo: itemVenta.codigo,
                        valor: _this3.state.sumaTotal,
                        fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                        hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                        estado: true,
                        tipo: 'pago_venta_credito'
                      });
                      var cajaRefValorAcreditado = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/caja/cajas_normales/' + caja.codigo + '/lista_dinero_acreditado_venta_credito/' + itemVenta.codigo);
                      var aumentarAcreditadoRef = db.ref('users/' + firebase_app__WEBPACK_IMPORTED_MODULE_11___default.a.auth().currentUser.uid + '/cuentas_por_cobrar/cuentas_por_cobrar_basicas/' + _this3.state.clienteSeleccionado.codigo + '/lista_acreditados/' + itemVenta.codigo);

                      if (Number(item.valor_acreditado) > 0) {
                        cajaRefValorAcreditado.set({
                          codigo: itemVenta.codigo,
                          valor: item.valor_acreditado,
                          fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                          hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                          estado: true,
                          tipo: 'pago_venta_credito'
                        });
                        aumentarAcreditadoRef.set({
                          codigo: itemVenta.codigo,
                          valor: item.valor_acreditado,
                          fecha_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerFechaActual(),
                          hora_registro: _utils_funtions__WEBPACK_IMPORTED_MODULE_5__["default"].obtenerHoraActual(),
                          estado: true,
                          tipo: 'pago_venta_credito'
                        });
                        cajaRefValorActual.once('value', function (snap2) {
                          if (snap2.val()) {
                            cajaRefValorActual.update({
                              valor_caja: Number(Number(snap2.val().valor_caja) + Number(item.valor_acreditado)).toFixed(2)
                            });
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          }
        }
      });
    } ////////////////////////////////////////
    // actualizar el stok de los productos

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var styles = {
        styleText: {
          width: '100%'
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          zIndex: 30,
          background: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1727
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        container: true,
        variant: "permanent",
        style: {
          minHeight: '100vh'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1737
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 9,
        style: {
          background: 'rgba(222, 239, 255)'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1744
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        container: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1745
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 4,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1746
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          paddingLeft: 16,
          paddingRight: 16,
          flexDirection: 'column'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1747
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["TextField"], {
        id: "filled-tipo-venta",
        select: true,
        label: "Tipo de venta",
        error: this.state.tipo_venta.length > 0 ? false : true,
        value: this.state.tipo_venta,
        onChange: function onChange(event) {
          return _this4.setState({
            tipo_venta: event.target.value
          });
        },
        margin: "normal",
        variant: "outlined",
        style: styles.styleText,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1753
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["MenuItem"], {
        value: 'factura',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1766
        },
        __self: this
      }, "Factura"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["MenuItem"], {
        value: 'final',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1767
        },
        __self: this
      }, "Consumidor Final")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AutoCompleteSelectedProducto__WEBPACK_IMPORTED_MODULE_17__["default"], {
        styleText: styles.styleText,
        onChangue: this.onChangueSelecteccionarProducto,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1770
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: this.state.estadoModalGuardarVenta,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalGuardarVenta: true
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1777
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1781
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_6___default.a, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1788
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 8,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1793
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorProductoVista__WEBPACK_IMPORTED_MODULE_20__["default"], {
        itemProductoCargado: this.state.itemProductoCargado,
        cargaAutomatica: this.state.cargaAutomatica,
        cargaAutomaticaCambiar: function cargaAutomaticaCambiar() {
          return _this4.setState({
            cargaAutomatica: !_this4.state.cargaAutomatica
          });
        },
        agregarItemSeleccionadoVista: this.agregarItemSeleccionadoVista,
        precios: this.state.precios,
        onChangePrecio: function onChangePrecio(valor) {
          var producto = _this4.state.itemProductoCargado;
          producto.precio_por_defecto = valor;

          _this4.setState({
            itemProductoCargado: producto
          });
        },
        seleccionarProductoPordefecto: this.state.seleccionarProductoPordefecto,
        seleccionarProductoPordefectoCambiar: function seleccionarProductoPordefectoCambiar() {
          return _this4.setState({
            seleccionarProductoPordefecto: !_this4.state.seleccionarProductoPordefecto
          });
        },
        precioSeleccionadoCargar: this.state.precioSeleccionadoCargar,
        precioSeleccionadoCargarCambiar: function precioSeleccionadoCargarCambiar(valor) {
          return _this4.setState({
            precioSeleccionadoCargar: valor
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1795
        },
        __self: this
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        container: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1818
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 12,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1819
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_tables_TableNormal__WEBPACK_IMPORTED_MODULE_21__["default"], {
        textoTitleP: "Productos",
        textoTitleS: "Producto",
        selectedItems: true,
        toolbar: false,
        data: this.state.listaProductosSeleccionados,
        rows: this.state.rowslistaProductos,
        handleGetData: this.handleGetData,
        estadoTabla: this.state.listaProductosSeleccionados.length > 0 ? 'llena' : 'vacio',
        itemsSeleccionados: function itemsSeleccionados(items) {
          return console.log();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1820
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {
        item: true,
        xs: 3,
        style: {
          overflowY: 'auto',
          height: '100vh'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1834
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorNumeroFactura__WEBPACK_IMPORTED_MODULE_30__["default"], {
        numero_factura: this.state.numero_factura,
        punto_emision: this.state.punto_emision,
        codigoEstablecimiento: this.state.codigoEstablecimiento,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1835
        },
        __self: this
      }), this.state.tipo_venta === 'factura' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorClienteVista__WEBPACK_IMPORTED_MODULE_22__["default"], {
        clienteSeleccionado: this.state.clienteSeleccionado,
        errorCliente: this.state.clienteFacturacion.length > 0 ? false : true,
        usuario: this.props.usuario,
        seleccionarCliente: this.seleccionarCliente,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1842
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorPreciosTotalesVista__WEBPACK_IMPORTED_MODULE_23__["default"], {
        descuento: this.state.descuento,
        sumaSubTotal: this.state.sumaSubTotal,
        sumaIva: this.state.sumaIva,
        sumaTotal: this.state.sumaTotal,
        observacion: this.state.observacion,
        dinero_resibido: this.state.dinero_resibido,
        cambio: this.state.cambio,
        tipo_venta: this.state.tipo_venta,
        facturaElectronica: this.state.facturaElectronica,
        handleDescontar: this.handleDescontar,
        handleDineroResibido: this.handleDineroResibido,
        handleObservacion: this.handleObservacion,
        handleFacturaElectronica: this.handleFacturaElectronica,
        tipo_pago: this.state.tipo_pago,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1850
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          marginLeft: 16,
          marginRight: 16
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1868
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1869
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorSeleccionarTipoPago__WEBPACK_IMPORTED_MODULE_25__["default"], {
        tipo_pago: this.state.tipo_pago,
        tipo_venta: this.state.tipo_venta,
        handleChangeSeleccionTipoPago: function handleChangeSeleccionTipoPago(value) {
          _this4.setState({
            tipo_pago: value
          });

          _setSnackBars__WEBPACK_IMPORTED_MODULE_14__["default"].openSnack('info', 'rootSnackBar', 'Tipo de pago cambiado', 500);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1894
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ventas_ContenedorBotonesVenta__WEBPACK_IMPORTED_MODULE_26__["default"], {
        handleFinalizarVenta: this.abrirModalFinalizarVenta,
        handleClose: function handleClose() {
          return _this4.props.handleClose();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1904
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: this.state.estadoModalFinalizaPago,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalFinalizaPago: true
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1914
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ventas_ModalFinalizaPago__WEBPACK_IMPORTED_MODULE_27__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalFinalizaPago: false
          });
        },
        tipo_pago: this.state.tipo_pago,
        total: this.state.sumaTotal,
        handleAceptar: function handleAceptar(item) {
          _this4.handleFinalizarVenta(item);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1918
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalContainerNormal__WEBPACK_IMPORTED_MODULE_15__["default"], {
        open: this.state.estadoModalSimpleConfigurarPrecios,
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalSimpleConfigurarPrecios: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1929
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_modals_container_ModalSettingsPrices__WEBPACK_IMPORTED_MODULE_28__["default"], {
        handleClose: function handleClose() {
          return _this4.setState({
            estadoModalSimpleConfigurarPrecios: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1933
        },
        __self: this
      }))));
    }
  }]);

  return ModalNewVenta;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ModalNewVenta);

/***/ })

})
//# sourceMappingURL=ventasFac.js.97d7c73c102c092a9f37.hot-update.js.map