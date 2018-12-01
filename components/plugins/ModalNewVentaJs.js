import setSnackBars from "./setSnackBars";

class ModalNewVenta {

    //seleccionando un producto y cargandolo a la lista
    seleccionarProductoTable = (item, state,onChangueState) => {
        var array = state.listaProductosSeleccionados
        var arrayValoresSelecionados = state.listaProductosSeleccionadosEditados
        var array2 = array.filter(item2 => item2.codigo === item.codigo)
        console.log(item)
        if (state.cargaAutomatica === false) {
            onChangueState(item)
        } else {
            if (array2.length === 0) {
                if (Number(item.stock_actual) === 0) {
                    setSnackBars.openSnack('error', 'rootSnackBar', 'Producto vacío', 2000)
                } else {
                    array.push(item)
                    arrayValoresSelecionados.push({
                        codigo: item.codigo,
                        cantidad: '1',
                        precio_venta_a: item.precio_venta_a,
                        tiene_iva: item.tiene_iva,
                        porcentaje_iva: item.porcentaje_iva,
                        stock_actual: item.stock_actual,
                        codigo_barras: item.codigo_barras,
                        descripcion_producto: item.descripcion_producto,
                    })
                    onChangueState(state)
                }
                this.calcularValoresTotales(state )
            }else{
                setSnackBars.openSnack('info', 'rootSnackBar', 'Producto ya ingresado!', 2000)
            }
        }
        onChangueState(state)
    }

    //calcular los valores totales 
    calcularValoresTotales = (state ) => {
        var sumatotalConIVA = 0
        var sumatotal = 0
        var sumatotalProductosSinIva = 0
        var sumatotalProductosConIva = 0
        state.listaProductosSeleccionados.forEach(item => {
            var stock = state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].cantidad
            var precio = state.listaProductosSeleccionadosEditados.filter(it => it.codigo === item.codigo)[0].precio_venta_a

            var precioIva = 0
            if (item.tiene_iva === true) {
                precioIva = (precio * Number(item.porcentaje_iva)) / 100
                sumatotalProductosConIva += Number(precio) * Number(item.cantidad)
            } else {
                precioIva = 0
                sumatotalProductosSinIva += Number(precio) * Number(item.cantidad)
            }

            sumatotalConIVA = sumatotalConIVA + (Number(stock) * Number(precioIva))
            sumatotal = sumatotal + (Number(stock) * Number(precio))
        })
        /* this.handleSumaTotal((sumatotal + sumatotalConIVA).toFixed(2))
        this.handleSumaTotalIva(sumatotalConIVA.toFixed(2))
        this.handleSubTotal(sumatotal.toFixed(2))
        this.handlePrecioPrductosSinIva(sumatotalProductosSinIva.toFixed(2))
        this.handlePrecioPrductosConIva(sumatotalProductosConIva.toFixed(2))
        this.productosSeleccionados(state.listaSeleccionadosValoresEditados) */
    }

}

export default new ModalNewVenta()