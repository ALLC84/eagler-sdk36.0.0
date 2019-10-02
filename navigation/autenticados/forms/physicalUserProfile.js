/* =========== LIBRERIAS ============= */
import React from 'react' // React
import { StyleSheet } from 'react-native'; // React Native
import { Field, reduxForm } from 'redux-form'; // Redux
import { Item, Input, Button, Picker, Text} from "native-base"; // Native Base
import { Icon } from "expo"; // Expo
/* ========== PROPIOS ================ */
// import Text from '../../../components/CustomText'; // Custom Text and Style Font
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
            <Text style={{fontWeight: 'bold'}}>{props.text}</Text>
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

   // Altura
   if(!values.altura){
      error.altura = 'requerido'
   } else if(values.altura < 1.0 || values.altura > 2.30) {
      error.altura = 'Debe introducir un numero entre 1.0 y 2.30'
   }else if(!/^\d*(\.\d{2})$/.test(values.altura)) {
      error.altura = 'Debe introducir un numero con decimal ( 1.80 )'
   }

   // Peso
   if(!values.peso){
      error.peso = 'requerido'
   } else if(values.peso < 20 || values.peso > 150) {
      error.peso = 'Debe introducir un numero entre 20 y 150'
   }else if(!/^\D*\d*$/.test(values.peso)) {
      error.peso = 'Debe introducir un numero sin decimales'
   }

   // Año nacimiento
   if(!values.anioNacimiento){
      error.anioNacimiento = 'requerido'
   } else if (values.anioNacimiento < (anio - 90)) {
      error.anioNacimiento = `Año mínimo permitido ${anio- 90}`
   } else if (values.anioNacimiento > (anio - 5)) {
      error.anioNacimiento = `No debe ser mayo a ${anio - 5}`
   }else if(!/^\D*\d*$/.test(values.anioNacimiento)) {
      error.anioNacimiento = 'Debe introducir un numero sin decimales'
   }

   // // Valida Mano del jugador (  Diestro, Zurdo)
   if(!values.sexo){
      error.sexo = 'requerido'
   }else if(values.sexo != 'Masculino' && values.sexo != 'Femenino') {
      error.sexo = 'Campo sexo incorrecto'
   }

   return error;
   
};

// Formulario que utilizamos en Perfil fisico screen
const PlayPhysicalProfileForm = (props) => {
   // console.log(props)
   return (
      <>
         <Field 
            type={'numeric'} 
            name="altura"              
            component={FieldInput} 
            text={Strings.ST49}               
         />

         <Field 
            type={'numeric'}  
            name="peso" 
            component={FieldInput} 
            text={Strings.ST50} 
         />

         <Field 
            type={'numeric'}  
            name="anioNacimiento"         
            component={FieldInput} 
            text={Strings.ST51}         
         />

         <Field 
            name="sexo"                
            component={FieldInput} 
            text='Sexo' 
            placeholder={Strings.ST52}     
         /> 

         <Button style={stylesPage.button_form}
            block
            onPress = {
               props.handleSubmit((value) => {
                  props.updatePhysicalProfile(props.userId, value);
                  //console.log('Handle Submit: =========================> ',props.userId ,value)
                  props.setMessage(Strings.ST48)
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
   form: 'PlayPhysicalProfileForm',
   enableReinitialize : true,
   validate
})( PlayPhysicalProfileForm );    

// Styles Page
const stylesPage = StyleSheet.create({
   button_form: {
      marginTop: 50,
      marginLeft: 20,
      backgroundColor: "#240066"
   },
   // text_button_form: {
   //    color: '#FFF'
   // }
})