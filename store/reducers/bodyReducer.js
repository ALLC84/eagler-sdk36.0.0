import TYPES from '../actions/types';

const initialState = {
   claseBase: [],
   claseLight: [],
   claseStrong: []
}

const BodyReducer = ( state = initialState, action ) => {
   //console.log('State Body =>', state)
   switch(action.type){
      case TYPES.GUARDAR_SECCION_BASE_STORE:
            return {
               ...state,
               claseBase: action.claseBase
            };
      default: 
         return state;
   }
}

export default BodyReducer;
