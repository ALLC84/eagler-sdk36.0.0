// ============================================
// DE MOMENTO NO SE ESTA USANDO ESTE COMPONENTE
// ============================================

import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from 'react-native-swiper'
import { Button, Right } from "native-base";
import Text from './CustomText'; // Custom Text Styles and Font

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SliderIntro = (props) => {
   return(
      <>
         <Image style={styles.imageIntro} source={props.uri} />
         <Button style={styles.boton} onPress={()=>props.cerrarTourApp()}>
            <Text>skip</Text>
         </Button>
      </>
   )
}
const SliderInfo = (props) => {
   return(
      <>
         <Image style={styles.image} source={props.uri} />
         {
            props.fin
            ?
            <Button style={styles.botonHecho} block onPress={()=>props.cerrarTourApp()}>
               <Text>Hecho</Text>
            </Button>
            :
            <Button style={styles.boton} onPress={()=>props.cerrarTourApp()}>
               <Text>skip</Text>
            </Button>
         }
      </>
   )
}

export default class SliderComponent extends Component {
   constructor(props){
      super(props)
      this.state = {
         imageSlider: [
            require('../assets/images/Home_640.jpg'),
            require('../assets/images/LaApp_640.jpg'),
            require('../assets/images/Home_640.jpg'),
            require('../assets/images/LaApp_640.jpg')
         ]
      }
   }

   render(){
      return(
         <Swiper
            containerStyle={styles.container}
            loop={false}
            activeDotColor={'#240066'}
            // autoplay
            //height={240}
         >
            {/* {
            this.state.imageSlider.map((item, i) =>  <Slider cerrarTourApp={this.props.cerrarTourApp} uri={item} key={i} />)
            } */}

            <View>
               <SliderIntro cerrarTourApp={this.props.cerrarTourApp} uri={this.state.imageSlider[1]}/>
            </View>
            <View>
               <SliderInfo cerrarTourApp={this.props.cerrarTourApp} uri={this.state.imageSlider[0]}/>
            </View>
            <View>
               <SliderInfo cerrarTourApp={this.props.cerrarTourApp} uri={this.state.imageSlider[1]}/>
            </View>
            <View>
               <SliderInfo cerrarTourApp={this.props.cerrarTourApp} uri={this.state.imageSlider[2]}/>
            </View>
            <View>
               <SliderInfo cerrarTourApp={this.props.cerrarTourApp} uri={this.state.imageSlider[3]} fin={true}/>
            </View>
         </Swiper>
      )
   }
}


const styles = StyleSheet.create({
	container: {
      flex: 1,
      backgroundColor: "#fff",
      // marginVertical: 100,
	   // marginHorizontal: 10
		
   },
   imageIntro: {
      height,
      width
   },
   image: {
      height: 250,
      width
   },
   boton: {
      position: 'absolute',
      right: 20,
      marginTop: 60,
      backgroundColor: "#240066"
   },
   botonHecho: {
      backgroundColor: "#240066"
   }
});