import TYPES from '../actions/types';

const initialState = {
   fases: {},
   fase: null,
   claseCombinada: [],
   claseSeccionMedia: [],
   claseSeccionCorta: [],
   loading: true
}

const BasicReducer = ( state = initialState, action ) => {
   // console.log('State Basics =>', action)
   switch(action.type){
      case TYPES.GUARDAR_FASE_STORE:
         return {
            ...state,
            fases: action.fases,
            fase : action.fases.fase,
            premium: action.fases.premium,
            loading: action.fases.loading
         };
      case TYPES.GUARDAR_CLASE_COMBINADA_BASIC_STORE:
         return {
            ...state,
            claseCombinada: action.claseCombinada
         };
      case TYPES.GUARDAR_CLASE_SECCION_MEDIA_BASIC_STORE:
         return {
            ...state,
            claseSeccionMedia: action.claseSeccionMedia
         };
      case TYPES.GUARDAR_CLASE_SECCION_CORTA_BASIC_STORE:
         return {
            ...state,
            claseSeccionCorta: action.claseSeccionCorta
         };
      default: 
         return state; 
   }
}

export default BasicReducer;
