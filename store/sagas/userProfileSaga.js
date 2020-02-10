import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB, STORAGE } from '../../services/firebase'
import TYPES from '../actions/types';
import { 
   actionGuardarUserProfileStore, 
   actionGuardarImageProfileStore 
} from '../actions/userProfileAction'

// Get all Profile
const getUserProfileFirebase = (userId) => 
   DB.collection("users").doc(userId)
   .get()
   .then( doc => {
      let userProfile = {};
      if (doc.exists) {
         userProfile = doc.data();
         // console.log(doc.data());
      } else {
         console.log('TCL: --------------------------------------------------------------')
         console.log('TCL: getUserProfileFirebase -> Warning: El documento esta vacio')
         console.log('TCL: --------------------------------------------------------------')
      }
      return userProfile;
   })

function* getUserProfile(values){
   try {
      const userProfile = yield call(getUserProfileFirebase, values.userId);
      yield put(actionGuardarUserProfileStore(userProfile))
   }catch (error) {
      console.log('TCL: -------------------------------------------')
      console.log('TCL: function*getUserProfile -> error', error)
      console.log('TCL: -------------------------------------------')
   }
}

// Update perfil juego 
const updatePlayUserProfileFirebase = (userId, values) => 
   DB
   .collection("users")
   .doc(userId)
   .update({
      anioInicio: values.anioInicio,
      diasEntrenamientoSemana: values.diasEntrenamientoSemana,
      diasJuegoSemana: values.diasJuegoSemana,
      handicap: values.handicap,
      mano: values.mano
   })

function* updatePlayProfile(values){
   try {
      yield call(updatePlayUserProfileFirebase, values.args.userId, values.args.values)
   } catch (error) {
      console.log('TCL: ----------------------------------------------')
      console.log('TCL: function*updatePlayProfile -> error', error)
      console.log('TCL: ----------------------------------------------')
   }
}

// Update perfil fisico
const updatePhysicalUserProfileFirebase = (userId, values) => 
   DB
   .collection("users")
   .doc(userId)
   .update({
      altura: values.altura,
      peso: values.peso,
      anioNacimiento: values.anioNacimiento,
      sexo: values.sexo
   })

function* updatePhysicalProfile(values){
   try {
      yield call(updatePhysicalUserProfileFirebase, values.args.userId, values.args.values)
   } catch (error) {
      console.log('TCL: --------------------------------------------------')
      console.log('TCL: function*updatePhysicalProfile -> error', error)
      console.log('TCL: --------------------------------------------------')
   }
}

// Crear initial state
const createInitialPhaseFirebase = (userId, fase, handicap) => {
   if (fase == "" || fase == undefined || fase == null) {
      handicap > 28 ? (fase = 1) : (fase = 1);

      //console.log(userId, fase, handicap);

      if(fase != 1){
         tiempoHierrosCortos = 200,
         tiempoHierrosLargos = 200,
         tiempoMaderas = 200,
         tiempoDrive = 200,
         tiempoApproach = 200,
         tiempoPutt = 200
      } else {
         tiempoHierrosCortos = 0
         tiempoHierrosLargos = 0,
         tiempoMaderas = 0,
         tiempoDrive = 0,
         tiempoApproach = 0,
         tiempoPutt = 0
      }

      return DB
         .collection("users")
         .doc(userId)
         .update({
            fase,
            tiempoHierrosCortos,
            tiempoHierrosLargos,
            tiempoMaderas,
            tiempoDrive,
            tiempoApproach,
            tiempoPutt
         });
   } else {
      return;
   }
}
   
//Crea fase inicial al registrse un usuario
function* createInitialPhase(values){
   try {
      yield call(createInitialPhaseFirebase, values.args.userId, values.args.fase, values.args.handicap)
   } catch (error) {
      console.log('TCL: -----------------------------------------------')
      console.log('TCL: function*createInitialPhase -> error', error)
      console.log('TCL: -----------------------------------------------')
   }
}

// Update Image profile
const setImageProfileFirebase = async (args) => {
   const metadata = {
      contentType: 'image/jpeg'
   }
   const response = await fetch(args.uri);
   const blob = await response.blob();

   let uploadImage = STORAGE.ref()
      .child("userProfile/" + args.name)
      .put(blob, metadata);

   uploadImage.on('state_changed',(snapshot) => {
      // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
   }, (error) => {
      console.log('TCL: -------------------------------------------')
      console.log('TCL: setImageProfileFirebase -> error', error)
      console.log('TCL: -------------------------------------------')
   }, () => {
      uploadImage.snapshot.ref.getDownloadURL()
         .then(downloadURL => {
            DB
            .collection("users")
            .doc(args.name)
            .update({
               avatarImg: downloadURL
            })
      });
   })
}

function* setImageProfile(values){
   try {
      yield call(setImageProfileFirebase, values.args);
      yield put(actionGuardarImageProfileStore(values.args.uri))
   }catch (error) {
      console.log('TCL: --------------------------------------------')
      console.log('TCL: function*setImageProfile -> error', error)
      console.log('TCL: --------------------------------------------')
   }
}

// Dispatch
export default function* funcionesUserProfileSaga() {
   yield takeEvery(TYPES.GET_USER_PROFILE, getUserProfile)
   yield takeEvery(TYPES.SET_IMAGE_PROFILE, setImageProfile)
   yield takeEvery(TYPES.UPDATE_PLAY_USER_PROFILE, updatePlayProfile)
   yield takeEvery(TYPES.UPDATE_PHYSICAL_USER_PROFILE, updatePhysicalProfile)  
   yield takeEvery(TYPES.CREATE_INITIAL_PHASE, createInitialPhase)  
}