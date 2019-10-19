import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
/* =========== FIREBASE ============= */
import { FIREBASECONFIG } from '../../services/firebase';

import TYPES from '../actions/types'
import {
   actionGuardarSeccionBaseStore
} from '../actions/bodyAction';

//Movements
//=================================
const getMovementsFirebase = async (clase) => {
   const url = `https://firestore.googleapis.com/v1beta1/projects/${
      FIREBASECONFIG.projectId
   }/databases/(default)/documents/body/movements/${clase}?key=${
      FIREBASECONFIG.apiKey
   }`
   let movements = [];
   const response = await fetch(url);
   const data = await response.json();
   movements = data.documents;
   return movements;
}


// Warmup
//=================================
const getWarmupsFirebase = async (clase) => {
   const url = `https://firestore.googleapis.com/v1beta1/projects/${
      FIREBASECONFIG.projectId
   }/databases/(default)/documents/body/warmups/${clase}?key=${
      FIREBASECONFIG.apiKey
   }`
   let warmups = [];
   const response = await fetch(url);
   const data = await response.json();
   warmups = data.documents;
   return warmups;
}

// Workouts
//=================================
const getWorkoutsFirebase = async (clase) => {
   const url = `https://firestore.googleapis.com/v1beta1/projects/${
      FIREBASECONFIG.projectId
   }/databases/(default)/documents/body/workouts/${clase}?key=${
      FIREBASECONFIG.apiKey
   }`
   let workouts = [];
   const response = await fetch(url);
   const data = await response.json();
   workouts = data.documents;
   return workouts;
}


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



// DB.collection("body").doc('movements').collection('1')
   // .get()
   // .then( doc => {
      // let movements = [];
      // if (doc.exists) {
      //    movements.push(doc.data());
      // } else {
      //    console.log('CLASE => ', clase)
      //    console.log('TCL: -------------------------------------------------')
      //    console.log('TCL: getMovementsFirebase -> No existe el documento')
      //    console.log('TCL: -------------------------------------------------')
      // } 
      // return movements;
   //})