import TYPES from '../actions/types';

const initialState = {
   fases: {},
   fase: null,
   claseCombinada: [],
   loading: true
}

const BasicReducer = ( state = initialState, action ) => {
   //console.log('State Basics =>', state)
   switch(action.type){
      case TYPES.GUARDAR_FASE_STORE:
         return {
            ...state,
            fases: action.fases,
            fase : action.fases.fase,
            loading: action.fases.loading
         };
      case TYPES.GUARDAR_CLASE_COMBINADA_BASIC_STORE:
         return {
            ...state,
            claseCombinada: action.claseCombinada
         };
      default: 
         return state; 
   }
}

export default BasicReducer;
