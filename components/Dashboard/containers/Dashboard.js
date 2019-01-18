import React, { Component } from 'react';
import { Grid, Card, CardHeader, CardContent, Icon, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import IconAssingment from '@material-ui/icons/Assignment'
import IconContentCopy from '@material-ui/icons/FileCopy'
import MoneyOff from '@material-ui/icons/MoneyOff'

class Dashboard extends Component {
  render() {
    return (
      <div style={{ margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container style={{ width: '90%' }}>
          <Grid item xs={3}>
            <Card style={{ width: '85%',height:115,backgroundColor: '#eee' }}>
              <CardMedia style={{ backgroundColor: '#009688', width: 70, height: 70, borderRadius: 5, position: 'absolute', zIndex: 1, marginLeft: 25, marginTop: -10, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconContentCopy fontSize='large' style={{ color: 'white' }} />
              </CardMedia>
              <CardActionArea style={{ width: '100%', backgroundColor: '#eee' }}>
                <CardContent style={{ width: 125, float: 'right', paddingRight: 0 }}>
                  <Typography variant='title' style={{ paddingBottom: 5,paddingTop:15, fontFamily: 'Roboto', fontWeight: 100, fontSize: 16 }}>
                    Ventas diarias
                  </Typography>
                  <Typography variant='display1' style={{ fontFamily: 'Roboto', fontWeight: 200, color: 'black' }}>
                    $ {this.props.ventaDiaria}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={3}>
          <Card style={{ width: '85%',height:115,backgroundColor: '#eee' }}>
              <CardMedia style={{ backgroundColor: '#ba000d', width: 70, height: 70, borderRadius: 5, position: 'absolute', zIndex: 1, marginLeft: 25, marginTop: -10, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MoneyOff fontSize='large' style={{ color: 'white' }} />
              </CardMedia>
              <CardActionArea style={{ width: '100%', backgroundColor: '#eee' }}>
                <CardContent style={{ width: 125, float: 'right', paddingRight: 0 }}>
                  <Typography variant='title' style={{ paddingBottom: 5,paddingTop:15, fontFamily: 'Roboto', fontWeight: 100, fontSize: 16 }}>
                    Gastos diarios
                  </Typography>
                  <Typography variant='display1' style={{ fontFamily: 'Roboto', fontWeight: 200, color: 'black' }}>
                    $ {this.props.gostosDiarios}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={3}>
          <Card style={{ width: '85%',height:115,backgroundColor: '#eee' }}>
              <CardMedia style={{ backgroundColor: '#009688', width: 70, height: 70, borderRadius: 5, position: 'absolute', zIndex: 1, marginLeft: 25, marginTop: -10, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconAssingment fontSize='large' style={{ color: 'white' }} />
              </CardMedia>
              <CardActionArea style={{ width: '100%', backgroundColor: '#eee' }}>
                <CardContent style={{ width: 125, float: 'right', paddingRight: 0 }}>
                  <Typography variant='title' style={{ paddingBottom: 5,paddingTop:15, fontFamily: 'Roboto', fontWeight: 100, fontSize: 14, }}>
                    Ventas Mensuales
                  </Typography>
                  <Typography variant='display1' style={{ fontFamily: 'Roboto', fontWeight: 200, color: 'black' }}>
                    $ {this.props.total_ventas_mensuales}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </Grid>
          
          <Grid item xs={3}>
          <Card style={{ width: '85%',height:115,backgroundColor: '#eee' }}>
              <CardMedia style={{ backgroundColor: '#ba000d', width: 70, height: 70, borderRadius: 5, position: 'absolute', zIndex: 1, marginLeft: 25, marginTop: -10, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MoneyOff fontSize='large' style={{ color: 'white' }} />
              </CardMedia>
              <CardActionArea style={{ width: '100%', backgroundColor: '#eee' }}>
                <CardContent style={{ width: 125, float: 'right', paddingRight: 0 }}>
                  <Typography variant='title' style={{ paddingBottom: 5,paddingTop:15, fontFamily: 'Roboto', fontWeight: 100, fontSize: 14 }}>
                    Gastos Mensuales
                  </Typography>
                  <Typography variant='display1' style={{ fontFamily: 'Roboto', fontWeight: 200, color: 'black' }}>
                    $ {this.props.gastosMensuales}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </Grid>
          
        </Grid>
      </div>
    );
  }
}

export default Dashboard;