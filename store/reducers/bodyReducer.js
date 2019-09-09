import TYPES from '../actions/types';

const initialState = {
   clase: [],
   claseLight: [],
   claseStrong: []
}

const BodyReducer = ( state = initialState, action ) => {
   //console.log('State Body =>', state)
   switch(action.type){
      case TYPES.GUARDAR_SECCION_CLASE_STORE:
            return {
               ...state,
               clase: action.clase
            };
      default: 
         return state;
   }
}

export default BodyReducer;
