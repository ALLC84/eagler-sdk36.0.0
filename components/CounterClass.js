/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet } from "react-native"; // React Native
import { Button } from "native-base"; // Native Base
/* ========== PROPIOS ================ */
import Text from './CustomText'; // Custom Text Styles and Font
import Colors from '../constants/Colors';

const colorArray = ['#FFF', 'red'];

class CounterClass extends Component {

  constructor (props) {
    super(props);
    this.state = {
      duracao: null,
      liveTimeMin: -1,
      liveTimeSec: 0,
      color: colorArray[0],
      colorInt:0,
      timeFormat:'00:00',
      flagTimer: false,
      duracao: this.props.duracao,
      isPlay: this.props.start,
    }

    // if(this.props.start){
    //   this.startClock()
    // }
  }

  componentDidMount() {
    this.startClock(this.state.duracao, 59)
    // if(this.state.isPlay){
    // }
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

  startClock(minute, secons){
    let timeFormater = this.timeFormater
    this.getTime =  setInterval(() => {
      
      if(this.state.liveTimeSec == 0){
        let min = 0;
        if(this.state.liveTimeMin == -1){
          min = this.state.duracao - 1

        }else{
          if(this.state.liveTimeMin == 0){
            
            clearInterval(this.getTime);
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
     
      let timeFormat = timeFormater(this.state.liveTimeMin) + ':' +timeFormater
      (this.state.liveTimeSec)

      this.setState({
        timeFormat,
        flagTimer: true
      })

      if(!this.state.isPlay || !this.props.start) {
        window.clearInterval(this.getTime)
      }
    }, 1000)
  }

  timeFormater(time) {
    if (time < 10) {
        time = '0' + time
    }
    return time
  }

  // Hacer que al dar play al contador inicie el video
  render() {
    return (
      <Button style={stylesPage.button_counter}
        small
        transparent
        onPress={() => {
          this.setState({
            isPlay: !this.state.isPlay
          },() => {
            if(this.state.isPlay){
              this.startClock(this.state.liveTimeMin, this.state.liveTimeSec)
            }
          })
        }}
      >
        {/* // TODO: cambiar tamaño */}
        <Text style={stylesPage.text_button_counter}> 
          {this.state.timeFormat}
        </Text>
      </Button>
    );
  }
}

export default CounterClass;

// Styles del Componente
const stylesPage = StyleSheet.create({
  button_counter: {
    width: 80,
    // backgroundColor: "#240066",
  },
  text_button_counter: {
    color: '#240066'
  }

});