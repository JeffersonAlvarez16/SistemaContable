import React from 'react'
import Scrollbar from 'react-scrollbars-custom';

function ScrollBarMenuMain(props) {
    return (
        <Scrollbar
            maximalThumbYSize={200}
            scrollbarWidth={20}
            disableTracksWidthCompensation={true}
            thumbYProps={{
                renderer: props => {
                    const { elementRef, ...restProps } = props;
                    return <div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            background:  '#009688' ,
                            borderRadius: 50
                        }}
                    />
                }
            }}
            trackYProps={{
                renderer: props1 => {
                    const { elementRef, ...restProps } = props1
                    return < div
                        {...restProps}
                        ref={elementRef}
                        style={{
                            width: props.open ? 5 : 2 ,
                            height: '80vh',
                            background:  '#dcd8d8' ,
                            position: 'absolute',
                            right:  '0' ,
                            marginTop: '15vh',
                            marginBottom: '5vh',
                            borderRadius: 50
                        }}
                    />
                }
            }}
            noScrollX={true}>
            {props.children}
        </Scrollbar>
    )
}

export default ScrollBarMenuMain