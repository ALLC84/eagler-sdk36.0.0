/* =========== LIBRERIAS ============= */
import React from 'react' // React
import { StyleSheet } from 'react-native'; // React Native
import { Field, reduxForm } from 'redux-form'; // Redux
import { Item, Input, Button, Picker} from "native-base"; // Native Base
import { Icon } from "expo"; // Expo
/* ========== PROPIOS ================ */
import Text from '../../../components/CustomText'; // Custom Text and Style Font
import Strings from '../../../constants/Strings'; // Strings


const FieldInput = (props) => {
   //console.log('Props Input: =========================> ', props)
   return (
      <>
         <Item>
            <Input
               name={props.name}
               keyboardType={props.type}
               placeholder={props.placeholder}
               initial={props.defaulValue}
               value={props.input.value}
               onChangeText={props.input.onChange}
               onBlur={props.input.onBlur}
            />
            <Text type={'semi-bold'}>{props.text}</Text>
         </Item>
         {
            props.meta.touched && props.meta.error &&  
               <Text style={{color: 'red'}}>
                  {props.meta.error}
               </Text>
         }
      </>
   )
};

// No se esta usando
const FieldPicker = (props) => {
   console.log('Picker Input: =========================> ', props)
   return (
      <>
      <Item picker>
         <Picker
            name={props.name}
            mode="dropdown"
            iosIcon={
               <Icon.Ionicons
                  name="ios-arrow-dropdown"
                  style={{
                     color: "#240066"
                  }}
               />
            }
            style={{ width: undefined }}
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            
            //selectedValue={props.value}
            onValueChange={(value) => console.log(value)}
            // onBlur={props.input.onBlur}
         >
            <Picker.Item label="Diestro" value="Diestro" />
            <Picker.Item label="Zurdo"   value="Zurdo" />
         </Picker>
      </Item>
      {/* {
         props.meta.touched && props.meta.error &&  
            <Text style={{color: 'red'}}>
               {props.meta.error}
            </Text>
      } */}
      </>
   )
}

// Valida formulario Perfil de Juego
const validate = (values) => {
   // console.log('Validate Form: =========================> ', values);
   const error = {};
   const date = new Date();
   const anio = date.getFullYear();

   //Valida Correo
   if(!values.anioInicio){
      error.anioInicio = 'requerido'
   } else if (values.anioInicio < (anio - 80)) {
      error.anioInicio = `Año mínimo permitido ${anio- 80}`
   } else if (values.anioInicio > anio) {
      error.anioInicio = 'No debe ser mayo al año actual'
   }else if(!/^\D*\d*$/.test(values.anioInicio)) {
      error.anioInicio = 'Debe introducir un numero sin decimales'
   }

   //Valida Dias de entrenamiento por semana
   if(!values.diasEntrenamientoSemana){
      error.diasEntrenamientoSemana = 'requerido'
   }else if (values.diasEntrenamientoSemana < 1 || values.diasEntrenamientoSemana > 7) {
      error.diasEntrenamientoSemana = 'Debe introducir un numero entre 1 y 7'
   } else if(!/^\d*\d*$/.test(values.diasEntrenamientoSemana)) {
      error.diasEntrenamientoSemana = 'Debe introducir un numero sin decimales'
   }

   //Valida Dias de juego por semana
   if(!values.diasjuegoSemana){
      error.diasjuegoSemana = 'requerido'
   }else if (values.diasjuegoSemana < 1 || values.diasjuegoSemana > 7) {
      error.diasjuegoSemana = 'Debe introducir un numero entre 1 y 7'
   }else if(!/^\d*\d*$/.test(values.diasjuegoSemana)) {
      error.diasjuegoSemana = 'Debe introducir un numero sin decimales'
   }

   //Valida Handicap
   if(!values.handicap){
      error.handicap = 'requerido'
   }else if(values.handicap < 0  || values.handicap > 36){
      error.handicap = 'El campo handicap debe ser entre 0 y 36.0'
   }else if (/^\D*\.?\d*$/.test(values.handicap)) {
      error.handicap = 'Debe introducir un numero con decimal (36.0)'
   }

   // // Valida Mano del jugador (  Diestro, Zurdo)
   if(!values.mano){
      error.mano = 'requerido'
   } else if(values.mano != 'Diestro' && values.mano != 'Zurdo') {
      error.mano = 'Campo mano incorrecto'
   }

   return error;
   
};

// Formulario que utilizamos en Perfil juego screen
const PlayUserProfileForm = (props) => {
   //console.log(props)
   return (
      <>
         <Field 
            type={'numeric'} 
            name="anioInicio"              
            component={FieldInput} 
            text={Strings.ST42}               
         />

          <Field 
            type={'numeric'}  
            name="diasEntrenamientoSemana" 
            component={FieldInput} 
            text={Strings.ST43} 
         />

         <Field 
            type={'numeric'}  
            name="diasJuegoSemana"         
            component={FieldInput} 
            text={Strings.ST44}         
         />

        <Field 
            type={'numeric'}
            name="handicap"                
            component={FieldInput} 
            text={Strings.ST45}                         
         /> 

        <Field 
            placeholder={'Diestro/Zurdo'} 
            name="mano"                
            component={FieldInput} 
            text={Strings.ST46}                         
         /> 

         <Button style={stylesPage.button_form}
            block
            onPress = {
               props.handleSubmit(async (value) => {
                  //console.log('Handle Submit: =========================> ',props.userId ,value)

                  if(!props.cerrarModal) {
                     await props.updatePlayProfile(props.userId, value);
                     props.setMessage(Strings.ST48)
                     
                  } else {
                     await props.updatePlayProfile(props.userId, value);
                     await props.cerrarModal()
                     await props.createInitialPhase(props.userId, props.userProfile.fase, value.handicap)
                     await props.getFase(props.userId)
                     props.setMessage(Strings.ST48)
                  }
               })
               
            }
         >
            <Text style={stylesPage.text_button_form}>
               {Strings.ST47}
            </Text>
         </Button>
      </>
   )
}

export default reduxForm({
   form: 'PlayUserProfileForm ',
   enableReinitialize : true,
   validate
})(PlayUserProfileForm );

// Styles Page
const stylesPage = StyleSheet.create({
   button_form: {
      marginTop: 50,
      marginLeft: 20,
      backgroundColor: "#240066"
   },
   text_button_form: {
      color: '#FFF'
   }
})