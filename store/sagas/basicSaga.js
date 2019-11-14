import { takeEvery, call, put } from 'redux-saga/effects';
/* =========== FIREBASE ============= */
import { DB, FIREBASECONFIG } from '../../services/firebase'
/* =========== REDUX ============= */
import TYPES from '../actions/types'
// Actions
import {
   actionGuardarFaseStore,
   actionGuardarClaseCombinadaStore,
} from '../actions/basicAction';
/* =========== FUNCIONES ASIGNAR FASES ============= */
import FunctionSetPhase from '../../lib/functions/functionFaseClase';
import FunctionBasic from '../../lib/functions/funcionesBasic';



/* =========== GET FASES ============= */
// Asigna una fase en funcion del tiempo de las habilidades del profile
const getFaseFirebase = userId => 
   DB.collection("users").doc(userId)
   .get()
   .then(doc => {
      let fases = {
         premium: '',
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
         fases.premium           = data.premium
         fases.handicap          = data.handicap !== undefined ? data.handicap : 36.0
         fases.fase              = data.fase
         fases.faseHierrosCortos = FunctionSetPhase.getPhaseHierrosCortos(parseInt(data.tiempoHierrosCortos),parseFloat(fases.handicap))
         fases.faseHierrosLargos = FunctionSetPhase.getPhaseHierrosLargos(parseInt(data.tiempoHierrosLargos), parseFloat(fases.handicap))
         fases.faseMaderas       = FunctionSetPhase.getPhaseMaderas(parseInt(data.tiempoMaderas), parseFloat(fases.handicap))
         fases.faseDrive         = FunctionSetPhase.getPhaseDrive(parseInt(data.tiempoDrive), parseFloat(fases.handicap))
         fases.faseApproach      = FunctionSetPhase.getPhaseApproach(parseInt(data.tiempoApproach), parseFloat(fases.handicap))
         fases.fasePutt          = FunctionSetPhase.getPhasePutt(parseInt(data.tiempoPutt), parseFloat(fases.handicap))  
      } else {
         console.log('TCL: ------------------------------------------------------')
         console.log('TCL: getFaseFirebase -> Warning: El documento esta vacio')
         console.log('TCL: ------------------------------------------------------')
      }
      data = {
         fases,
         loading : false
      }
      return data
   })
// Guarda las fases en el Redux
function* getFases(values) {
   try {
      const data = yield call(getFaseFirebase, values.userId)
      yield put( actionGuardarFaseStore(data))
   }catch (error) {
      console.log('TCL: -------------------------------------')
      console.log('TCL: function*getFases -> error', error)
      console.log('TCL: -------------------------------------')
   }
}



/* =========== GET CLASES ============= */
//Genera una seccion aleatoria de clases utilizando getClase
const getClases = async (fases) => {
   let claseCombinada = [];
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

   for (i = 0; i <= abilidades.length; i++) {
      const data = await getClase(
         abilidades[i],
         faseAbilidades[i]
      )
      claseCombinada.push(data);
      if(i === 5) break
   }

   return claseCombinada
};
// Obtiene una avilidad => Es llamada dentro del bucle desde getClases
const getClase = async (doc, fase) => {
   const url = `https://firestore.googleapis.com/v1beta1/projects/${
      FIREBASECONFIG.projectId
   }/databases/(default)/documents/basics/${doc}/${fase}?key=${
      FIREBASECONFIG.apiKey
   }`
   
   const response = await fetch(url);
   const data = await response.json();
   const dataArr = data.documents;
   const length = dataArr.length;
   const random = FunctionBasic.getRadnom(length);
   const result = dataArr[random];

   return result;
}
// Guarda en la clase generada en Redux
function* getClaseCombinada(values) {
   try {
      const claseCombinada = yield call(getClases, values.fases)
      yield put(actionGuardarClaseCombinadaStore(claseCombinada))
   }catch (error) {
      console.log('TCL: ----------------------------------------------')
      console.log('TCL: function*getClaseCombinada -> error', error)
      console.log('TCL: ----------------------------------------------')
   }
}


export default function* funcionesBasicSaga() {
   yield takeEvery(TYPES.GET_FASE, getFases);
   yield takeEvery(TYPES.GET_CLASE_COMBINADA, getClaseCombinada);
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



// const getClases = async (fases) => {
//    const url = `https://firestore.googleapis.com/v1beta1/projects/${
//       FIREBASECONFIG.projectId
//    }/databases/(default)/documents/basics/drive/1?key=${
//       FIREBASECONFIG.apiKey
//    }`
//    const response = await fetch(url);
//    const data = await response.json();
//    const dataArr = data.documents
//    const length = dataArr.length
//    const random = FunctionBasic.getRadnom(length)


//    console.log('TCL: ---------------------------')
//    console.log('TCL: getClases -> data', dataArr, 'randomData-> ', dataArr[random])
//    console.log('TCL: ---------------------------')
   
//    return dataArr[random];
// }