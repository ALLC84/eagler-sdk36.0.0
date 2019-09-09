import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB, FIREBASECONFIG } from '../../services/firebase'
import TYPES from '../actions/types'
//Actions
import {
   actionGuardarFaseStore,
   actionGuardarClaseStore,
} from '../actions/basicAction';

// Funciones asignar fase
import FunctionSetPhase from '../../lib/functions/functionFaseClase';


// Asigna una fase en funcion del tiempo de las habilidades del profile
const getFaseFirebase = userId => 
   DB.collection("users").doc(userId)
   .get()
   .then(doc => {
      let fases = {
         handicap: '',
         fase: '',
         faseHierrosCortos: '',
         faseHierrosLargos: '',
         faseMaderas: '',
         faseDrive: '',
         faseApproach: '',
         fasePutt: '',
      };
      if (doc.exists) {
         const data = doc.data();
         
         fases.handicap          = data.handicap !== undefined ? data.handicap : 36.0
         fases.fase              = data.fase
         fases.faseHierrosCortos = data.faseHierrosCortos !== undefined ? FunctionSetPhase.getPhaseHierrosCortos(data.tiempoHierrosCortos,fases.handicap) : 1
         fases.faseHierrosLargos = data.faseHierrosLargos !== undefined ? FunctionSetPhase.getPhaseHierrosLargos(data.tiempoHierrosLargos, fases.handicap) : 1
         fases.faseMaderas       = data.faseMaderas !== undefined ? FunctionSetPhase.getPhaseMaderas(data.tiempoMaderas, fases.handicap) : 1
         fases.faseDrive         = data.faseDrive !== undefined ? FunctionSetPhase.getPhaseDrive(data.tiempoDrive, fases.handicap) : 1
         fases.faseApproach      = data.faseApproach !== undefined ? FunctionSetPhase.getPhaseApproach(data.tiempoApproach, fases.handicap) : 1
         fases.fasePutt          = data.fasePutt !== undefined ? FunctionSetPhase.getPhasePutt(data.tiempoPutt, fases.handicap) : 1   
      } else {
         console.log("El documento esta vacio");
      }
      return fases;
   })
   
// Genera una seccion aleatoria de clases utilizando getClase
 const getClases = async (fases) => {
   let clases = [];
   const abilidades = [
      "shortgame",
      "shortirons",
      "longirons",
      "woods",
      "drive",
      "putt"
   ];

   const faseAbilidades = [
      fases.faseApproach,
      fases.faseHierrosCortos,
      fases.faseHierrosLargos,
      fases.faseMaderas,
      fases.faseDrive,
      fases.fasePutt
   ];

   for (i = 0; i <= abilidades.length - 1; i++) {
      const data = await getClase(
         abilidades[i],
         faseAbilidades[i],
         0
      )
      clases.push(data);
      //console.log('Data ====> ', data);
   }

   return clases
};

// Obtiene una avilidad => Es llamada dentro del bucle desde getClases
const getClase = async (doc, fase, random) => {
   const url = `https://firestore.googleapis.com/v1beta1/projects/${
      FIREBASECONFIG.projectId
   }/databases/(default)/documents/${doc}/${fase}/${random}/0?key=${
      FIREBASECONFIG.apiKey
   }`
   
   const response = await fetch(url);
   const data = await response.json();
   
   return data;
}




function* getDataClases(values) {
   try {
      const fases = yield call(getFaseFirebase, values.userId)
      const clase = yield call(getClases, fases)
      
      yield put(actionGuardarClaseStore(clase))
      yield put( actionGuardarFaseStore(fases))
   }catch (error) {
      console.log('Error al obtener las fase desde firebase',error)
   }
}


export default function* funcionesBasicSaga() {
   yield takeEvery(TYPES.GET_FASE, getDataClases);
}








// .then(fases => {
   //    if (
   //       fases.fase == "" ||
   //       fases.fase == undefined
   //    ) {
   //       // this.setState({
   //       //    mostrarModalPerfilJuego: true
   //       // });
   //       console.log('De momento mostramos modal perfil juego');
   //    } else {
   //       getClases(fases);
   //    }
   // })






   //return data
   // .then(() => {
   //    this.setState({
   //       clases: [...this.state.clases, data]
   //    });
   // });



   //const prioridad = ["primary", "secondary"];
   // TODO: Modificar la funcion elimnando prioridad de la url y bucle
   // for (i = 0; i <= abilidades.length - 1; i++) {
   //    for (x = 0; x <= prioridad.length - 1; x++) {
   //       if (
   //          (abilidades[i] === "woods" && prioridad[x] === "secondary") ||
   //          (abilidades[i] === "longirons" &&
   //             prioridad[x] === "secondary") ||
   //          (abilidades[i] === "shortirons" &&
   //             prioridad[x] === "secondary") ||
   //          (abilidades[i] === "shortgame" && prioridad[x] === "secondary")
   //       ) {
   //          continue;
   //       } else {
   //          const data = await getClase(
   //             abilidades[i],
   //             faseAbilidades[i],
   //             prioridad[x]
   //          )
   //          clases.push(data);
   //       }
   //    }
   // }

   //URL DE LA PETICION SEGUN BUCLE DE ARRIBA
   //===========================================================
   // const url = `https://firestore.googleapis.com/v1beta1/projects/${
   //    FIREBASECONFIG.projectId
   // }/databases/(default)/documents/${doc}/${fase}/${prioridad}/0?key=${
   //    FIREBASECONFIG.apiKey
   // }`