import React from 'react'
import Scrollbar from 'react-scrollbars-custom';

function TableScrollContainer(props) {
    return (
        <Scrollbar
            maximalThumbYSize={50}
            scrollbarWidth={20}
            disableTracksWidthCompensation={true}
            thumbYProps={{
                renderer: props => {
                    const { elementRef, ...restProps } = props;
                    return <div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            background: '#009688',
                            borderRadius: 50,
                            border: '1px solid #fff'
                        }}
                    />
                }
            }}
            trackYProps={{
                renderer: props => {
                    const { elementRef, ...restProps } = props
                    return < div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            width: 14,
                            height: '96.2%',
                            background: 'white',
                            position: 'absolute',
                            right: 0,
                        }}
                    />
                }
            }}
            thumbXProps={{
                renderer: props => {
                    const { elementRef, ...restProps } = props;
                    return <div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            background: '#009688',
                            borderRadius: 50,
                            border: '1px solid #fff',
                            height: '12px'
                        }}
                    />
                }
            }}
            trackXProps={{
                renderer: props => {
                    const { elementRef, ...restProps } = props
                    return < div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            background: 'white',
                            position: 'absolute',
                            bottom: 0,
                            width:'90%',
                            paddingLeft:'5%',
                            paddingRight:'5%'
                        }}
                    />
                }
            }}
            style={{ height: '100%' }}>
            {props.children}
        </Scrollbar>
    )
}

export default TableScrollContainer