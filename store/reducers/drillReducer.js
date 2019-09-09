import TYPES from '../actions/types';

const initialState = {
   drills: []
}

const DrillReducer = ( state = initialState, action ) => {
   //console.log('State Drill =>', state)
   switch(action.type){
      case TYPES.GUARDAR_DRILLS_STORE:
         //console.log(action.drills);
         return {
            ...state,
            drills: action.drills 
         };
      default: 
         return state;
   }
}

export default DrillReducer;
