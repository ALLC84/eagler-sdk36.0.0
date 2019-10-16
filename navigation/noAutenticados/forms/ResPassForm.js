/* =========== LIBRERIAS ============= */
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Item, Input, Button, Text } from "native-base";
/* ========== PROPIOS ================ */
// import Text from '../../../components/CustomText'; // Custom Text and Style Font
import Strings from "../../../constants/Strings";
import styles  from "../../../constants/styles/FormLoginStyle";

const FieldInput = (props) => {
   return(
      <>
         <Item rounded style={{ marginTop: 20 }}>
            <Input
               keyboardType={'email-address'}
               autoCapitalize='none'
               placeholder={props.placeholder}
               value={props.input.value}
               onChangeText={props.input.onChange}
               onBlur={props.input.onBlur}
            />
         </Item>
         {props.meta.touched && props.meta.error &&  <Text style={{color: 'red'}}>{props.meta.error}</Text>}
      </>
   );
};

const validate = (values) => {
   const error = {};

   //Valida Correo
   if(!values.email){
      error.email = 'requerido'
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      error.email = 'Correo invalido'
   } 
   
   return error;
}


const RestorePasswordForm = props => {
   return (
      <>
         <Field placeholder={'Correo'} name="email" component={FieldInput}/>

         <Button
            rounded
            block
            style={[styles.button_auth, { marginTop: 30 }]}
            onPress = {
               props.handleSubmit( value => {
                  props.restorePassword(value),
                  props.setFormPassword(false)
               })
            }
         >
            <Text style={styles.text_auth}>
               Recuperar contraseña
            </Text>
         </Button>
      </>
   );
}

export default reduxForm({
   form: 'RestorePasswordForm',
   validate
})(RestorePasswordForm);