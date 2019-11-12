/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet, View } from "react-native"; // React Native
import { Button, Text, List, ListItem, Body, Right, Left, Thumbnail } from "native-base"; // Native 
import { Ionicons } from '@expo/vector-icons';
/* ========== PROPIOS ================ */
import Colors from '../constants/Colors';

const colorArray = ['#240066', 'red'];

class CounterBody extends Component {

  constructor (props) {
    super(props);

    this.state = {
      liveTimeMin: -1,
      liveTimeSec: 0,

      color: colorArray[0],
      colorInt:0,

      timeFormat:'00:00',
      flagTimer: false,
  
      duracao: this.props.duracao,
      secons: this.props.secons,
      isPlay: this.props.start,
  
      getTime: null,
    }
  }
   

  componentDidMount() {
    this.startClock(this.state.duracao, this.props.secons)
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
            this.toggleColor();
            clearInterval(this.getTime);
            
            if(this.props.index < (this.props.videos.length -1)) {
              this.props.nextVideo(this.props.videos, (this.props.index + 1))
            }
            
            return           
            // this.setUnoMas(true)
            //this.toggleColor();
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

  clearListener() {
    if(this.state.getTime !== null) {
      clearInterval(this.state.getTime)
    }
  }

  toggleColor(){
    this.setState({
      color: colorArray[1]
    })
  }

  // Hacer que al dar play al contador inicie el video
  render() {
    const {videos, video, index, nextVideo, currentVideo} = this.props

    return (
      <ListItem thumbnail onPress = {() => nextVideo(videos, index)}
      >
        <Left>
          {video.fields.img && video.fields.img.stringValue !== '' ? (
            <Thumbnail
              square
              source={{ uri: video.fields.img.stringValue }}
            />
          ) : (
            <Thumbnail
              square
              source={require("../assets/images/1Basics.png")}
            />
          )}
        </Left>
        <Body>
          <Text>{video.fields.title.stringValue}</Text>
          <Text style={stylesPage.text_button_counter, {color: this.state.color}}> 
            {this.state.timeFormat}
          </Text>
        </Body>
        <Right>
          {/* // TODO: Validar play contador solo si es el current video */}
          <Button transparent 
            onPress={() => {
              if(currentVideo == video.fields.video.stringValue) {
                this.handlePlay()
              }
            }}
          >
            <Ionicons
              name="md-stopwatch"
              size={26}
              color={"#240066"}
            />
          </Button>
        </Right>
      </ListItem>
    )
  };
}

export default CounterBody;

// Styles del Componente
const stylesPage = StyleSheet.create({
  button_counter: {
    
  },
  text_button_counter: {
    fontWeight: 'bold',
    marginTop: 5 
  }
});

// return (
//   <Button style={stylesPage.button_counter}
//     small
//     transparent
//     onPress={() => this.handlePlay()}
//   >
//     <Text style={stylesPage.text_button_counter}> 
//       {this.state.timeFormat}
//     </Text>
//   </Button>
// )