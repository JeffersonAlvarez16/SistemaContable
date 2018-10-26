import React, { Component } from 'react';
import MenuHerramientas from '../../menus/MenuHerramientas'
import ItemMenuHerramienta from '../../menus/ItemMenuHerramienta'
import TablaNormal from '../../tables/TableNormal'
import Divider from '@material-ui/core/Divider';

class ControlVencimiento extends Component {

    state={
        listaStock:[
            {
                cantidad: '175',
                categoria: 'Filtros',
                codigo: '2781927897189',
                id: '2781927897189',
                iva: '13',
                nombre: 'filtros',
                precio_mayor: '17,56',
                precio_menor: '16',
                proveedor: 'BtaApps'
            },
            {
                cantidad: '175',
                categoria: 'Filtros',
                codigo: '5435345345',
                id: '5435345345',
                iva: '13',
                nombre: 'filtros',
                precio_mayor: '17,56',
                precio_menor: '16',
                proveedor: 'BtaApps'
            },
            {
                cantidad: '175',
                categoria: 'Filtros',
                codigo: '34534632',
                id: '34534632',
                iva: '13',
                nombre: 'filtros',
                precio_mayor: '17,56',
                precio_menor: '16',
                proveedor: 'BtaApps'
            }
        ],
        rowslistaStock: [
            { id: 'codigo', numeric: false, disablePadding: true, label: 'Codigo' },
            { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
            { id: 'precio_mayor', numeric: true, disablePadding: false, label: 'Precio Mayor' },
            { id: 'precio_menor', numeric: true, disablePadding: false, label: 'Precio Menor' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'iva', numeric: true, disablePadding: false, label: 'Iva (%)' },
            { id: 'cantidad', numeric: true, disablePadding: false, label: 'Cantidad' }
        ],
        estadoTabla:'llena'
    }

    handleGetData = (n, item) => {
        if (item.id === 'codigo') {
            return n.codigo
        }
        if (item.id === 'nombre') {
            return n.nombre
        }
        if (item.id === 'precio_mayor') {
            return n.precio_mayor
        }
        if (item.id === 'precio_menor') {
            return n.precio_menor
        }
        if (item.id === 'iva') {
            return n.iva
        }
        if (item.id === 'cantidad') {
            return n.cantidad
        }
    }
    
    render() {
        return (
            <div>
                <MenuHerramientas>
                    <ItemMenuHerramienta
                        titleButton="Button"
                        color="primary"
                        visible={true}
                        onClick={() => console.log("Hola")}
                    />
                </MenuHerramientas>

                <Divider />

                <TablaNormal
                    textoTitleP="Productos"
                    textoTitleS="Producto"

                    selectedItems={false}
                    toolbar={false}

                    data={this.state.listaStock}
                    rows={this.state.rowslistaStock}
                    handleGetData={this.handleGetData}
                    estadoTabla={this.state.estadoTabla}
                />
            </div>
        );
    }
}

export default ControlVencimiento;