/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet, View } from "react-native"; // React Native
import { Button, Text } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Colors from '../constants/Colors';

const colorArray = ['#FFF', 'red'];

class CounterClass extends Component {

  constructor (props) {
    super(props);
    this.setUnoMas = this.props.setUnoMas;

    this.state = {
      liveTimeMin: -1,
      liveTimeSec: 0,
      color: colorArray[0],
      colorInt:0,
      timeFormat:'00:00',
      flagTimer: false,
  
      duracao: this.props.duracao,
      isPlay: this.props.start,
  
      getTime: null,
    }
  }

  componentDidMount() {
    this.startClock(this.state.duracao, 59)
    // if(this.state.isPlay){
    // }
  }

  componentWillUnmount(){
    this.clearListener() 
  }

  startClock(minute, secons){
    let timeFormater = this.timeFormater

    this.getTime =  setInterval(() => {
      
      if(this.state.liveTimeSec == 0){
        let min = 0;
        if(this.state.liveTimeMin == -1){
          min = parseInt(minute) - 1
        }else{
          if(this.state.liveTimeMin == 0){
            clearInterval(this.getTime);
            this.setUnoMas(true)
            //this.toggleColor();
            return           
          }
          min = this.state.liveTimeMin -1
        }
        min = '' + min;

        this.setState({
          liveTimeMin: min,
          liveTimeSec: secons
        })
      }else{
        this.setState({
          liveTimeSec: this.state.liveTimeSec -1
        })
      }

      let timeFormat = timeFormater(this.state.liveTimeMin) + ':' + timeFormater(this.state.liveTimeSec)

      this.setState({
        timeFormat,
        flagTimer: true,
        getTime: this.getTime
      })

      if(!this.state.isPlay) {
        clearInterval(this.getTime)
      }
    }, 1000)
  }

  timeFormater(time) {
    if (time < 10) {
        time = '0' + time
    }
    return time
  }

  handlePlay() {
    this.setState({
      isPlay: !this.state.isPlay
    },() => {
      if(this.state.isPlay){
        this.startClock(this.state.liveTimeMin, this.state.liveTimeSec)
      }
    })
  }

  async nextVideo(minute) {
    await this.clearListener()
    this.setState({
      liveTimeMin: -1,
      liveTimeSec: 0,
      isPlay: false
    }, () => {
      this.startClock(minute, 59)
    })
  }

  clearListener() {
    if(this.state.getTime !== null) {
      clearInterval(this.state.getTime)
    }
  }

  toggleColor(){
    this.getTime =  setInterval(() => {
      // console.log("toggleColor =");
      let newIndice = this.state.colorInt + 1;
      let indice = newIndice % 2
      // console.log('indice color = '+ indice);
      this.setState({
        color: colorArray[indice],
        colorInt: newIndice
      })
    }, 1000)
  }

  // Hacer que al dar play al contador inicie el video
  render() {
    return (
      <Button style={stylesPage.button_counter}
        small
        transparent
        onPress={() => this.handlePlay()}
      >
        {/* // TODO: cambiar tamaño */}
        <Text style={stylesPage.text_button_counter}> 
          {this.state.timeFormat}
        </Text>
      </Button>
    )
  };
}

export default CounterClass;

// Styles del Componente
const stylesPage = StyleSheet.create({
  button_counter: {
    width: 80,
  },
  text_button_counter: {
    color: '#240066'
  }
});