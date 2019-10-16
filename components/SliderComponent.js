// ============================================
// DE MOMENTO NO SE ESTA USANDO ESTE COMPONENTE
// ============================================

import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet, ImageBackground } from "react-native";
import Swiper from 'react-native-swiper'
import { Button, Right, Text, Container, Content } from "native-base";
// import Text from './CustomText'; // Custom Text Styles and Font

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SliderIntro = (props) => {
   return(
      <>
         {/* <Image style={styles.imageIntro} source={props.uri} />
         <Button style={styles.boton} onPress={()=>props.cerrarTourApp()}>
            <Text>skip</Text>
         </Button> */}

         <ImageBackground source={props.uri} style={styles.imageIntro}>
            <Button style={styles.boton} onPress={()=>props.cerrarTourApp()}>
               <Text>skip</Text>
            </Button>
            
            <View>
               <Image style={{
                  width: 140,
                  height: 140,
                  marginTop: 180,
                  marginBottom: 20
               }} 
                  source={require('../assets/images/SimboloAz.png')}
                  resizeMode="contain"
               />
            </View>

            <View style={{padding: 40}}>
               <Text style={{
                  textAlign: 'center', 
                  // marginTop: 180,
                  color: 'white',
                  fontSize: 24
               }}>Bienvenido a la App de Eagler</Text>

               <Text style={{
                  textAlign: 'center', 
                  marginTop: 40,
                  color: 'white',
                  fontSize: 18
               }}>Encontraras las claves para mejorar todo tu golf</Text>
            </View>
               
         </ImageBackground>
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

            <View style={{padding: 40}}>
               <Text style={{
                  textAlign: 'center', 
                  // marginTop: 180,
                  // color: 'white',
                  fontSize: 24
               }}>{props.title}</Text>

               <Text style={{
                  textAlign: 'center', 
                  marginTop: 40,
                  // color: 'white',
                  fontSize: 18
               }}>{props.description}</Text>
            </View>
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
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[0]} 
                  title={'Basics'}
                  description={'Aqui tendras sesiones personalizadas de entrenamientos por niveles desde le Putt hasta el Drive Pincha en la sesiones, introduce el tiempo que quieras dedicar y empieza a mejorar!!'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[1]}
                  title={'Body'}
                  description={'Para que los entrenamiento técnicos mejoren más rápido, deberemos entrenar la movilidad de nuestro cuerpo. Te presentamos las combinaciones más eficientes para tu nivel.'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[2]}
                  title={'Drills'}
                  description={'Encontraras ejercidos muy sencillos y concretos que podrás hacer en cualquier momento que harán que mejores tu golf sin necesidad de ir al campo.'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[3]}
                  title={'iQ'}
                  description={'La psicología y la nutrición son aspectos para aumentar el rendimiento en cualquier deporte. Aquí te propondremos estrategias y ejercicios fáciles de implementar y lleven a tu Golf al siguiente nivel.'}
               />
            </View>

            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[1]} fin={true}
                  title={'Gracias!!'}
                  description={'Para que los ejercicios Técnicos y entrenamientos físicos se adapten a ti, necesitamos que introduzcas algunos datos sencillos'}
               />
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
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      height,
      width,
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