import TYPES from '../actions/types';

const SessionReducer = (state=null, action) => {
   switch(action.type){
      case TYPES.ESTABLECER_SESION:
         return {...action.user};
      case TYPES.CERRAR_SESION:
         return null;
      default: 
         return state;
   }
}

export default SessionReducer;