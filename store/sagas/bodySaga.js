import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import {
   actionGuardarSeccionBaseStore
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
         console.log('TCL: -------------------------------------------------')
         console.log('TCL: getMovementsFirebase -> No existe el documento')
         console.log('TCL: -------------------------------------------------')
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
         console.log('TCL: ------------------------------------------------')
         console.log('TCL: getWarmupsFirebase -> No existe el documento')
         console.log('TCL: ------------------------------------------------')
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
         console.log('TCL: -------------------------------------------------')
         console.log('TCL: getWorkoutsFirebase -> No existe el documento')
         console.log('TCL: -------------------------------------------------')
      } 
      return workouts;
   })


// Crea una Seccion de clases aleatoria de movements, warmups, worckouts
//======================================================================
function* getSeccionBase(values) {
   try {
      const movements = yield call(getMovementsFirebase, values.args.movements);
      const warmups = yield call(getWarmupsFirebase, values.args.warmups);
      const workouts = yield call(getWorkoutsFirebase, values.args.workouts);
      const claseBase = yield movements.concat(warmups, workouts);
      yield put(actionGuardarSeccionBaseStore(claseBase))
   } catch (error) {
      console.log('TCL: -------------------------------------------')
      console.log('TCL: function*getSeccionBase -> error', error)
      console.log('TCL: -------------------------------------------')
   }
}

// Crea una Seccion de clases aleatoria (light) de movements, warmups, worckouts
//==============================================================================



// Crea una Seccion de clases aleatoria (strong) de movements, warmups, worckouts
//==============================================================================



export default function* funcionesBodySaga() {
   yield takeEvery(TYPES.GET_SECCION_BASE, getSeccionBase);
}