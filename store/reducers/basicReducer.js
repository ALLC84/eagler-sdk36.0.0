import TYPES from '../actions/types';

const initialState = {
   fases: {},
   fase: 1,
   clases: [],
}

const BasicReducer = ( state = initialState, action ) => {
   //console.log('State Basics =>', state)
   switch(action.type){
      case TYPES.GUARDAR_FASE_STORE:
         return {
            ...state,
            fases: action.fases,
            fase : action.fases.fase,
         };
      case TYPES.GUARDAR_CLASE_BASIC_STORE:
         return {
            ...state,
            clases: action.clase
         };
      default: 
         return state; 
   }
}

export default BasicReducer;
