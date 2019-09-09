import TYPES from '../actions/types';

const initialState = {
   fases: {},
   fase: 1,
   clases: [],
   visibleModal: false,

   visibleModalTiempo: true,
   counterVisible: false,
   contVideo: 0,
   tiempoClase: 0
}

const BasicReducer = ( state = initialState, action ) => {
   //console.log('State Basics =>', state)
   switch(action.type){
      case TYPES.GET_INITIAL_STATE:
         return {
            ...state,
         };
      case TYPES.GUARDAR_FASE_STORE:
         return {
            ...state,
            fases: action.fases,
            fase : action.fases.fase,
            visibleModal: action.fases.fase === undefined ? true : false
         };
      case TYPES.GUARDAR_CLASE_BASIC_STORE:
         return {
            ...state,
            clases: action.clase
         };
      case TYPES.ACTION_CERRAR_MODAL:
         return {
            ...state,
            visibleModal: false
         };
      case TYPES.ACTION_MOSTRAR_MODAL:
         return {
            ...state,
            visibleModal: true
         };
      case TYPES.SET_TIEMPO_CLASE:
         return {
            ...state,
            tiempoClase: action.value
         };
      case TYPES.SET_STATE_COUNTER:
         return {
            ...state,
            counterVisible: action.value
         };
      case TYPES.SET_COUNTER:
         return {
            ...state,
            contVideo: action.value
         };
      default: 
         return state; 
   }
}

export default BasicReducer;
