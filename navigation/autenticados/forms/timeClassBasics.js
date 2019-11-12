/* =========== LIBRERIAS ============= */
import React from 'react' // React
import { StyleSheet } from 'react-native'; // React Native
import { Field, reduxForm } from 'redux-form'; // Redux
import { Item, Input, Button, Picker, Text} from "native-base"; // Native Base
/* ========== PROPIOS ================ */
// import Text from '../../../components/CustomText'; // Custom Text and Style Font
import Strings from '../../../constants/Strings'; // Strings


const FieldInput = (props) => {
   //console.log('Props Input: =========================> ', props)
   return (
      <>
         <Item rounded style={{borderColor: '#444444'}}>
            <Input
               name={props.name}
               keyboardType={props.type}
               placeholder={props.placeholder}
               initial={props.defaulValue}
               value={props.input.value}
               onChangeText={props.input.onChange}
               onBlur={props.input.onBlur}
            />
            {/* <Text>{props.text}</Text> */}
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

// Valida formulario Perfil de Juego
const validate = (values) => {
   // console.log('Validate Form: =========================> ', values);
   const error = {};

   // Tiempo
   if(!values.tiempo){
      error.tiempo = 'requerido'
   } else if(values.tiempo < 30 || values.tiempo > 120) {
      error.tiempo = 'El tiempo debe ser entre 30 y 120'
   }else if(!/^\D*\d*$/.test(values.tiempo)) {
      error.tiempo = 'Intruduce un número sin decimales'
   }

   return error;
   
};

// Formulario que utilizamos en Perfil fisico screen
const TimeClassBasicsForm = (props) => {
   // console.log(props)
   return (
      <>
         <Field 
            type={'numeric'} 
            name="tiempo"              
            component={FieldInput} 
            //text='Tiempo'               
         />

         <Button rounded style={stylesPage.button_form}
            block
            onPress = {
               props.handleSubmit((value) => {
                  props.actualizarPerfil(props.userId, value.tiempo);
                  props.actualizaFase(props.userId)
               })
            }
         >
            <Text>
               {Strings.ST53}
            </Text>
         </Button>
      </>
   )
}

export default reduxForm({
   form: 'TimeClassBasicsForm',
   enableReinitialize : true,
   validate
})( TimeClassBasicsForm );   


// Styles Page
const stylesPage = StyleSheet.create({
   button_form: {
      marginTop: 10,
      backgroundColor: "#240066",
      height: 60
   },
})