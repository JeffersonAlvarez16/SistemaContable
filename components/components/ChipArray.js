import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';



class ChipsArray extends React.Component {
    state = {
        selectedValue: 'a',
        value: 'todos',
    };

    handleDelete = data => () => {
        if (data.label === 'React') {
            alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
            return;
        }

        this.setState(state => {
            const chipData = [...state.chipData];
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            return { chipData };
        });
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.props.handleChangueList(event.target.value)
    };
    

    render() {

        return (
            <div style={{
                backgroundColor: '#E1F5FE',
            }}>
                <FormLabel
                    style={{
                        marginBottom: 10,
                        paddingLeft: 23,
                        paddingTop: 20,
                    }}
                    component="legend"
                >
                    {this.props.title}
                </FormLabel>

                <div style={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexWrap: 'wrap',

                    backgroundColor: '#E1F5FE',
                    paddingBottom: 10,
                    paddingLeft: 23
                }}>

                    {
                        this.props.data.length > 0 ?
                            <RadioGroup
                                aria-label="gender"
                                name="gender2"
                                value={this.state.value}
                                onChange={this.handleChange}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingLeft: 14,
                                }}
                            >
                                <FormControlLabel
                                    value="todos"
                                    control={<Radio color="secondary" />}
                                    label='Todos'
                                    style={{
                                        border: 'solid 1px rgba(0,0,0,0.4)',
                                        borderRadius: 50,
                                        paddingRight: 20,
                                        marginRight: 25,
                                        marginBottom: 10
                                    }}
                                />
                                {this.props.data.map(data => {

                                    return (
                                        <FormControlLabel
                                            key={data.key}
                                            value={`${data.nombre}`}
                                            control={<Radio color="secondary" />}
                                            label={`${data.nombre}`}
                                            style={{
                                                border: 'solid 1px rgba(0,0,0,0.4)',
                                                borderRadius: 50,
                                                paddingRight: 20,
                                                marginRight: 25,
                                                marginBottom: 10
                                            }}
                                        />
                                    );
                                })}

                            </RadioGroup>
                            :
                            <div>
                               
                            </div>
                    }


                </div>
            </div>
        );
    }
}


export default ChipsArray
