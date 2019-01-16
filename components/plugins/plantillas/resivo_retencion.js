import React, { Component } from 'react';


class ResivoRetencion extends Component {
    render() {
        const {
            item,
        } = this.props

        if (item != null) {


            return (
                <div style={{ width: 793, height: 'max-content', margin: 9, fontFamily: "Lucida Sans Typewriter", }}>
                    <div style={{ fontFamily: "Courier New", fontSize: 20, display: 'flex', marginRight: 25, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        {item.nombreEmpresa}
                    </div>
                    {
                        item.tipo_venta === 'factura' ?
                            <div style={{ fontFamily: "Lucida Sans Typewriter", fontSize: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',marginRight:10 }}>Revisa tu factura <br />electrónica en tu correo</div>
                            :
                            <div style={{ fontFamily: "Lucida Sans Typewriter", fontSize: 10, display: 'flex', justifyContent: 'center' }}>Consumidor final</div>
                    }
                    {
                        item.tipo_venta === 'factura' &&
                        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, fontFamily: "Lucida Sans Typewriter", marginLeft: 15, fontSize: 8 }}>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Nombre: ${item.nombreCliente}`}</div>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Correo: ${item.emailCliente}`}</div>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Cédula: ${item.identificacionCliente}`}</div>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Dirección: ${item.direccionCliente}`}</div>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Fecha: ${item.fecha_venta}`}</div>
                            <div style={{ fontSize: 8, display: 'flex' }}>{`Numero de venta: ${item.numero_venta}`}</div>
                        </div>
                    }
                    <div style={{ fontFamily: "Lucida Sans Typewriter", borderBottom: '1px solid', borderTop: '1px solid', padding: 15, marginTop: 10, display: 'flex', flexDirection: 'row', fontSize: 8 }}>
                        <div style={{ flex: .8 }}>Cant.</div>
                        <div style={{ flex: 2.5 }}>Descripción</div>
                        <div style={{ flex: 1.7 }}>V. Unt.</div>
                        <div style={{ flex: 2.5 }}>V. Tot.</div>
                    </div>
                    <div>
                        {
                            item.productos.map(item =>
                                <div key={item.codigo} style={{ fontFamily: "Lucida Sans Typewriter", paddingLeft: 15, paddingRight: 5, display: 'flex', flexDirection: 'row', fontSize: 8 }}>
                                    <div style={{ flex: .5 }}>{item.cantidad}</div>
                                    <div style={{ flex: 2.5 }}>{item.descripcion_producto}</div>
                                    <div style={{ flex: .3 }}></div>
                                    <div style={{ flex: 1.7 }}>{`$ ${Number(item.precio_venta).toFixed(2)}`}</div>
                                    <div style={{ flex: 2.5 }}>{`$ ${(Number(item.precio_venta) * Number(item.cantidad)).toFixed(2)}`}</div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{ borderBottom: '1px solid', marginTop: 5, marginBottom: 5 }}></div>
                    <div>
                        <div style={{ fontFamily: "Lucida Sans Typewriter", paddingLeft: 10, paddingRight: 8, display: 'flex', flexDirection: 'row', fontSize: 8 }}>
                            <div style={{ flex: 2 }}></div>
                            <div style={{ flex: 2 }}>
                                <div>Descuento</div>
                                <div>Subtotal</div>
                                <div>Valor Iva:</div>
                                <div>Valor Total:</div>
                            </div>
                            <div style={{ flex: 2, fontFamily: "Lucida Sans Typewriter" }}>
                                <div>{`$ ${Number(item.descuento).toFixed(2)}`}</div>
                                <div>{`$ ${item.subtotal}`}</div>
                                <div>{`$ ${item.iva}`}</div>
                                <div>{`$ ${item.total}`}</div>
                            </div>
                        </div>
                    </div>
                    {
                        item.tipo_pago === 'efectivo' ?
                            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, fontFamily: "Lucida Sans Typewriter", marginLeft: 15, fontSize: 8 }}>
                                <div style={{ fontSize: 8, display: 'flex' }}>{`Tipo Pago: ${item.tipo_pago}`}</div>
                            </div>
                            : item.tipo_pago === 'credito' ?
                                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, fontFamily: "Courier New", marginLeft: 15, fontSize: 8 }}>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Tipo Pago: A Credito`}</div>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Valor Acreditado: $ ${item.valor_acreditado}`}</div>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Saldo Pendiente: $ ${item.total - item.valor_acreditado}`}</div>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Fecha a Pagar: ${item.fecha_a_pagar}`}</div>

                                </div>
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 10, fontFamily: "Lucida Sans Typewriter", marginLeft: 15, fontSize: 8 }}>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Tipo Pago:  ${item.tipo_pago}`}</div>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Numero: ${item.numero_tarjeta}`}</div>
                                    <div style={{ fontSize: 8, display: 'flex' }}>{`Nombre Banco: ${item.nombre_banco}`}</div>
                                </div>




                    }
                    <div style={{ fontFamily: "Lucida Sans Typewriter", paddingLeft: 15, paddingRight: 10, paddingTop: 10, fontSize: 8 }}>
                        <div>Generado por: RapiFac</div>
                        <div>www.rapifac.com</div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>ndad</div>
            )
        }
    }
}

export default ResivoRetencion;