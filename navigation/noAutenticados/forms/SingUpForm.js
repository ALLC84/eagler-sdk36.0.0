/* =========== LIBRERIAS ============= */
import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Item, Input, Button, DatePicker, Text } from "native-base";
/* ========== PROPIOS ================ */
// import Text from '../../../components/CustomText'; // Custom Text and Style Font
import Strings from "../../../constants/Strings";
import styles  from "../../../constants/styles/FormLoginStyle";
import layout from "../../../constants/Layout";

const FieldInput = (props) => {
   // console.log(props)
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

const FiledPicker = (props) => {
   return (
      <>
         <Item
            rounded
            style={{
               marginTop: 20,
               width: layout.window.width - 40,
               paddingTop: 5,
               paddingBottom: 5
            }}
         >
            <DatePicker
               defaultDate={new Date()}
               // minimumDate={new Date("1930-12-31")}
               //minimumDate={}
               maximumDate={new Date()}
               locale={"es"}
               timeZoneOffsetInMinutes={undefined}
               modalTransparent={false}
               animationType={"fade"}
               androidMode={"default"}
               placeHolderText="Fecha de Nacimiento"
               textStyle={{ color: "green" }}
               placeHolderTextStyle={{ color: "#31312B" }}
               onDateChange={props.input.onChange}
               disabled={false}
               onBlur={props.input.onBlur}
            />
         </Item>
         {props.meta.touched && props.meta.error &&  <Text style={{color: 'red'}}>{props.meta.error}</Text>}
      </>
   )
}

const validate = (values) => {
   const error = {};
   //Valida nombre
   // if(!values.nombre) {
   //    error.nombre = 'requerido'
   // } else if (values.nombre.length < 2) {
   //    error.nombre = 'El nombre deve tener al menos 2 caracteres'
   // } else if (values.nombre.length > 10){
   //    error.nombre = 'El nombre no deve tener mas de 10 caracteres'
   // }

   //Valida Apellidos
   // if(!values.apellido) {
   //    error.apellido = 'requerido'
   // } else if (values.apellido.length < 2) {
   //    error.apellido = 'El apellido deve tener al menos 2 caracteres'
   // } else if (values.apellido.length > 15){
   //    error.apellido = 'El apellido no deve tener mas de 15 caracteres'
   // }

   //Valida Correo
   if(!values.email){
      error.email = 'requerido'
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      error.email = 'Correo invalido'
   }

   //Valida Fecha Nacimiento
   // if(!values.fecha){
   //    error.fecha = 'requerido'
   // }

   //Valida Usuario
   if(!values.usuario) {
      error.usuario = 'requerido'
   } else if (values.usuario.length < 2) {
      error.usuario = 'El usuario deve tener al menos 2 caracteres'
   } else if (values.usuario.length > 10){
      error.nusuario = 'El usuario no deve tener mas de 10 caracteres'
   }

   //Valida Password
   if(!values.password){
      error.password = 'requerido'
   } else if (values.password.length < 6) {
      error.password = 'La contraseña deve tener al menos 6 caracteres'
   } else if (values.password.length > 15) {
      error.password = 'La contraseña no deve tener mas de 15 caracteres'
   }

   // Valida coincidencia password
   if(!values.password_confirm){
      error.password_confirm = 'requerido'
   } else if (values.password !== values.password_confirm) {
      error.password_confirm = 'Las contraseñas introducidas no coinciden'
   }

   return error;
   
}


const SingUpForm = (props) => {
   return (
      <>
         {/* <Field type={'string'}        placeholder={'Nombre'}               name="nombre"           component={FieldInput}/>
         <Field type={'string'}        placeholder={'Apellido'}             name="apellido"         component={FieldInput}/> */}
         <Field type={'string'}        placeholder={'Usuario'}              name="usuario"          component={FieldInput}/>
         <Field type={'email-address'} placeholder={'Correo'}               name="email"            component={FieldInput}/>
         {/* <Field type={'date'}          placeholder={'Fecha de nacimiento'}  name="fecha"            component={FiledPicker}/> */}
         <Field type={'password'}      placeholder={'Contraseña'}           name="password"         component={FieldInput}/>
         <Field type={'password'}      placeholder={'Confirmar contraseña'} name="password_confirm" component={FieldInput}/>

         <Button
            rounded
            block
            style={[styles.button_auth, { marginTop: 30 }]}
            onPress = {
               props.handleSubmit((value) => {
                  props.registroUsuario(value);
               })
            }
         >
            <Text >
               {Strings.ST8}
            </Text>
         </Button>
      </>
   );
}

export default reduxForm({
   form: 'SingUpForm',
   validate
})(SingUpForm);