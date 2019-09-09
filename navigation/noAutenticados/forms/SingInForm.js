/* =========== LIBRERIAS ============= */
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Item, Input, Button } from "native-base";
/* ========== PROPIOS ================ */
import Text from '../../../components/CustomText'; // Custom Text and Style Font
import Strings from "../../../constants/Strings";
import styles  from "../../../constants/styles/FormLoginStyle";

const FieldInput = (props) => {
   return(
      <>
         <Item rounded style={{ marginTop: 20 }}>
            <Input
               keyboardType={props.type === 'email-address' ? props.type : null}
               secureTextEntry={props.type === 'password' ? true : null}
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

   //Valida Password
   if(!values.password){
      error.password = 'requerido'
   }

   return error;
   
}


const SingInForm = (props) => {
   return (
      <>
         <Field type={'email-address'} placeholder={'Correo'} name="email" component={FieldInput}/>
         <Field type={'password'} placeholder={'Contraseña'} name="password" component={FieldInput}/>

         <Button
            rounded
            block
            style={[styles.button_auth, { marginTop: 30 }]}
            onPress = {
               props.handleSubmit((value) => {
                  props.loginUsuario(value);
               })
            }
         >
            <Text style={styles.text_auth}>
               {Strings.ST7}
            </Text>
         </Button>
      </>
   );
}

export default reduxForm({
   form: 'SingInForm',
   validate
})(SingInForm);