import TYPES from '../actions/types';

const initialState = {
   error: null,
   user: null
}

const SessionReducer = (state = initialState, action) => {
   switch(action.type){
      case TYPES.ESTABLECER_SESION:
         return {
            ...state,
            user: {...action.user}
         };
      case TYPES.CERRAR_SESION:
         return {
            ...state,
            user: null
         };
      case 'ERROR_SESSION_USUARIO':
         return {
            ...state,
            error: action.error
         }
      default: 
         return {...state};
   }
}

export default SessionReducer;