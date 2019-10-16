import TYPES from '../actions/types';

const initialState = {
   user: null,
   error: null,
   success: null
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
            user: null,
         };
      case TYPES.SUCCESS_SESSION_USUARIO:
         return {
            ...state,
            success: action.success
         }
      case TYPES.ERROR_SESSION_USUARIO:
         return {
            ...state,
            error: action.error
         }
      default: 
         return {...state};
   }
}

export default SessionReducer;