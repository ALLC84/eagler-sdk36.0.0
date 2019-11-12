import TYPES from '../actions/types';

const initialState = {
   warmups     : [],
   workouts    : [],
   movements   : [],
   claseBase   : [],
   claseLight  : [],
   claseStrong : []
}

const BodyReducer = ( state = initialState, action ) => {
   //console.log('State Body =>', state)
   switch(action.type){
      case TYPES.GUARDAR_WARMUPS_STORE:
         return {
            ...state,
            warmups: action.warmups
         }
      case TYPES.GUARDAR_WORKOUTS_STORE:
         return {
            ...state,
            workouts: action.workouts
         }
      case TYPES.GUARDAR_MOVEMENTS_STORE:
         return {
            ...state,
            movements: action.movements
         }
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
