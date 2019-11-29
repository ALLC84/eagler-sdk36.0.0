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

         {/* <ImageBackground source={props.uri} style={styles.imageIntro}> */}
         <View style={styles.backIntro}>
            <Button transparent style={styles.boton} onPress={()=>props.cerrarTourApp()}>
               <Text style={{color: '#240066', fontSize: 18}}>SALIR</Text>
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

            <View style={{padding: 40, marginTop: 30}}>
               <Text style={{
                  textAlign: 'center', 
                  // marginTop: 180,
                  color: '#240066',
                  fontSize: 32,
                  fontWeight: 'bold',
               }}>Bienvenido a Eagler</Text>

               <Text style={{
                  textAlign: 'center', 
                  marginTop: 40,
                  color: '#240066',
                  fontSize: 26
               }}>Encontraras las claves para mejorar todo tu golf</Text>
            </View>
               
         {/* </ImageBackground> */}
         </View>
      </>
   )
}
const SliderInfo = (props) => {
   return(
      <View style={{displa: 'flex', alignItems: 'center'}}>
         <View style={{height: 400, marginBottom: 30}}>
            <Image style={{height: 400, width}} source={props.uri} />
         </View>
         { !props.fin ? <View style={{height: 100}}>
            <Image style={styles.image} source={props.icon} />
         </View> : null}

         {
            props.fin
            ?
            <Button transparent style={styles.botonHecho} block onPress={()=>props.cerrarTourApp()}>
               <Text style={{color: '#fff'}}>HECHO</Text>
            </Button>
            :
            <Button transparent style={styles.boton} onPress={()=>props.cerrarTourApp()}>
               <Text style={{color: '#240066', fontSize: 18}}>SALIR</Text>
            </Button>
         }

            <View style={{padding: 40}}>
               <Text style={{
                  textAlign: 'center', 
                  // marginTop: 180,
                  // color: 'white',
                  fontSize: 26,
                  fontWeight: '600'
               }}>{props.title}</Text>

               <Text style={{
                  textAlign: 'center', 
                  marginTop: 40,
                  // color: 'white',
                  fontSize: 20
               }}>{props.description}</Text>
            </View>
      </View>
   )
}

export default class SliderComponent extends Component {
   constructor(props){
      super(props)
      this.state = {
         imageSlider: [
            require('../assets/images/portadaBasics/koepkaHierros.jpg'),
            require('../assets/images/portadaBody/img-mueve-cuerda.jpg'),
            require('../assets/images/portadaBasics/puttSpieth.jpg'),
            require('../assets/images/introApp/Golf-Pre-Shot-Routine.jpg'),
            require('../assets/images/introApp/Celebrating.jpg'),
         ],  
         iconSlider: [
            require('../assets/images/1BasicsAz.png'),
            require('../assets/images/1BodyAz.png'),
            require('../assets/images/1DrillsAz.png'),
            require('../assets/images/1IQAz.png'),
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
                  icon={this.state.iconSlider[0]}
                  title={'Basics'}
                  description={'Aqui tendras sesiones personalizadas de entrenamientos por niveles desde le Putt hasta el Drive Pincha en la sesiones, introduce el tiempo que quieras dedicar y empieza a mejorar!'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[1]}
                  icon={this.state.iconSlider[1]}
                  title={'Body'}
                  description={'Para que los entrenamiento técnicos mejoren más rápido, deberemos entrenar la movilidad de nuestro cuerpo. Te presentamos las combinaciones más eficientes para tu nivel.'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[2]  }                
                  icon={this.state.iconSlider[2]}
                  title={'Drills'}
                  description={'Encontraras ejercidos muy sencillos y concretos que podrás hacer en cualquier momento que harán que mejores tu golf sin necesidad de ir al campo.'}
               />
            </View>
            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[3]}
                  icon={this.state.iconSlider[3]}
                  title={'iQ'}
                  description={'La psicología y la nutrición son aspectos para aumentar el rendimiento en cualquier deporte. Aquí te propondremos estrategias y ejercicios fáciles de implementar y lleven a tu Golf al siguiente nivel.'}
               />
            </View>

            <View>
               <SliderInfo 
                  cerrarTourApp={this.props.cerrarTourApp} 
                  uri={this.state.imageSlider[4]} fin={true}
                  title={'Gracias!'}
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
   backIntro: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      height,
      width,
      backgroundColor: '#DEFD59'
   },
   image: {
      maxHeight: 100,
      width: 100,
      resizeMode: 'stretch'
   },
   boton: {
      position: 'absolute',
      right: 20,
      marginTop: 60,
      // backgroundColor: "#240066"
   },
   botonHecho: {
      backgroundColor: "#240066",
      width: width - 20,
      marginLeft: 10
   }
});