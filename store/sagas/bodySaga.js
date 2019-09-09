import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import {
   actionGuardarSeccionClaseStore
} from '../actions/bodyAction';

//Movements
//=================================
const getMovementsFirebase = (clase) => 
   DB.collection("movements").doc(clase)
   .get()
   .then( doc => {
      let movements = [];
      if (doc.exists) {
         movements.push(doc.data());
      } else {
         console.log("No existe el documento solicitado a movements");
      } 
      return movements;
   })


// Warmup
//=================================
const getWarmupsFirebase = (clase) => 
   DB.collection("warmups").doc(clase)
   .get()
   .then( doc => {
      let warmups = [];
      if (doc.exists) {
         warmups.push(doc.data());
      } else {
         console.log("No existe el documento solicitado a warmups");
      } 
      return warmups;
   })



// Workouts
//=================================
const getWorkoutsFirebase = (clase) => 
   DB.collection("workouts").doc(clase)
   .get()
   .then( doc => {
      let workouts = [];
      if (doc.exists) {
         workouts.push(doc.data());
      } else {
         console.log("No existe el documento solicitado a workouts");
      } 
      return workouts;
   })


// Crea una Seccion de clases aleatoria de movements, warmups, worckouts
//======================================================================
function* getSeccionClase(values) {
   try {
      const movements = yield call(getMovementsFirebase, values.args.movements);
      const warmups = yield call(getWarmupsFirebase, values.args.warmups);
      const workouts = yield call(getWorkoutsFirebase, values.args.workouts);
      const clase = yield movements.concat(warmups, workouts);
      yield put(actionGuardarSeccionClaseStore(clase))
   } catch (error) {
      console.log('Error al pasar los datos',error)
   }
}

// Crea una Seccion de clases aleatoria (light) de movements, warmups, worckouts
//==============================================================================



// Crea una Seccion de clases aleatoria (strong) de movements, warmups, worckouts
//==============================================================================



export default function* funcionesBodySaga() {
   yield takeEvery(TYPES.GET_SECCION_CLASE, getSeccionClase);
}