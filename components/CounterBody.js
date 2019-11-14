/* =========== LIBRERIAS ============= */
import React, { Component } from "react"; // React
import { StyleSheet, View } from "react-native"; // React Native
import { Button, Text, ListItem, Body, Right, Left, Thumbnail } from "native-base"; // Native 
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

      if(this.props.currentVideo != this.props.video.fields.video.stringValue) {
        this.setState({
          isPlay: false
        })
      }

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

  // Items List
  //================
  itemImage(img){
    return (
      <Left>
        {img && img.stringValue !== '' && img.stringValue !== 'img' ? (
          <Thumbnail
            square
            source={{ uri: img.stringValue }}
            style={{borderRadius: 5}}
          />
        ) : (
          <Thumbnail
            square
            source={require("../assets/images/no_image.png")}
            style={{borderRadius: 5}}
          />
        )}
      </Left>
    )
  }

  itemBody(videos, video, index, nextVideo, currentVideo){
    return(
      <Body>
        <Button transparent
          onPress = {() => nextVideo(videos, index)}
        >
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text 
              style={{fontWeight: currentVideo == video.video.stringValue ? "bold" : null, color: 'black'}}
            >
              {video.title ? video.title.stringValue : 'Titulo del video'}
            </Text>
            <Text style={{fontWeight: currentVideo == video.video.stringValue ? "bold" : null, color: this.state.color, marginTop: 5}}
            > 
              {this.state.timeFormat}
            </Text>
          </View>
        </Button>
      </Body>
    )
  }

  itemIcon(video, currentVideo){
    return (
      <Right>
        <Button transparent iconRight
          style={{minWidth: 40}}
          onPress={() => {
            if(currentVideo == video.video.stringValue) {
              this.handlePlay()
            }
          }}
        >
          <Text></Text>
          <Ionicons
            name="md-stopwatch"
            size={26}
            color={currentVideo == video.video.stringValue ? "#240066" : "#ccc"}
          />
        </Button>
      </Right>
    )
  }

  // Render Componet
  render() {
    const {videos, video, index, nextVideo, currentVideo} = this.props

    return (
      <ListItem thumbnail>
        {/* Left Imagen */}
        {this.itemImage(video.fields.img)}

        {/* Body */}
        {this.itemBody(
          videos,
          video.fields,
          index,
          nextVideo,
          currentVideo
        )}

        {/* Right Items Button */}
        {this.itemIcon(video.fields, currentVideo)}
      </ListItem>
    )
  };
}

export default CounterBody;

// Styles del Componente
const stylesPage = StyleSheet.create({
  text_counter: {
    fontWeight: 'bold',
    marginTop: 8 
  }
});
