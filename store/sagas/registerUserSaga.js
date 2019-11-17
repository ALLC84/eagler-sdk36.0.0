import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { AUTH, DB } from '../../services/firebase';

import TYPES from '../actions/types'
import { handleSuccessSessionUsuario, handleErrorSessionUsuario } from '../actions/registerAction';

// Registro Usuario
//============================================
const crearObjectUserFirebase = userProfile => {
   let user = AUTH.currentUser;

   if (user != null) {
      DB
         .collection("users")
         .doc(user.uid)
         .set(userProfile);
   }
};

const crearProfile = (name, email) => {
   return (userProfile = {
      //CAMPOS PERFIL USUARIO
      name,
      lastName: "",
      email,
      nickName: "",
      altura: "",
      peso: "",
      fachaNacimiento: "",
      avatarImg: "",

      //CAMPOS DE JUEGO
      anioInicio: "",
      diasJuegoSemana: "",
      diasEntrenamientoSemana: "",
      handicap: "",
      tiempoDrive: 0,
      tiempoMaderas: 0,
      tiempoHierrosLargos: 0,
      tiempoHierrosCortos: 0,
      tiempoApproach: 0,
      tiempoPutt: 0,

      // CAMPOS STATUS
      premium: 'FREE'
   });
};

const registroUsuarioFirebase = (value) => {
   AUTH
      .createUserWithEmailAndPassword(
         value.email,
         value.password
      )
      .then(() => {
         crearObjectUserFirebase(crearProfile(
            value.usuario,
            value.email
         ));
      })
      .then(() => 'success')
}

function* registroUsuario(values) {
   try {
      yield call(registroUsuarioFirebase, values.datos)
      yield put(handleErrorSessionUsuario(null))
   } catch (error) {
      yield put(handleErrorSessionUsuario('Verifique los campos e intentelo nuevamente'))
      console.log('TCL: --------------------------------------------')
      console.log('TCL: function*registroUsuario -> error', error)
      console.log('TCL: --------------------------------------------')
   }
}

//Login Usuario
//============================================
const  loginUsuarioFirebase = value => 
   AUTH
      .signInWithEmailAndPassword(value.email, value.password)
      .then(() => 'success');


function* loginUsuario(values){
   try {
      yield call(loginUsuarioFirebase, values.datos)
      yield put(handleErrorSessionUsuario(null))
   }catch (error) {
      yield put(handleErrorSessionUsuario('Verifique los campos e intentelo nuevamente'))
      console.log('TCL: -----------------------------------------')
      console.log('TCL: function*loginUsuario -> error', error)
      console.log('TCL: -----------------------------------------')
   }
}


// Restore Password
//===============================================
const restorePasswordFirebase = value => 
   AUTH
      .sendPasswordResetEmail(value.email)
      .then(() => 'succsess');


function* restorePassword(values) {
   try {
      yield call(restorePasswordFirebase, values.email)
      yield put(handleErrorSessionUsuario(null))
      yield put(handleSuccessSessionUsuario('Correo enviado con exito!'))
   } catch (error) {
      yield put(handleErrorSessionUsuario('Ha ocurrido un error inesperado, intentelo nuevamente'))
      console.log('TCL: --------------------------------------------')
      console.log('TCL: function*restorePassword -> error', error)
      console.log('TCL: --------------------------------------------')
   }
}

// Dispatch
export default function* funcionesRegistroSaga() {
   yield takeEvery(TYPES.REGISTRO_USUARIO, registroUsuario)
   yield takeEvery(TYPES.LOGIN_USUARIO, loginUsuario)
   yield takeEvery(TYPES.RESTORE_PASSWORD, restorePassword)
}