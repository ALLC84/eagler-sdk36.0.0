import TYPES from '../actions/types';

const initialState = {
   drills: [],
   perPage: 6,
   totalDrills: 0,
   totalPages: 1
}

const DrillReducer = ( state = initialState, action ) => {
   //console.log('State Drill =>', state)
   switch(action.type){
      case TYPES.GUARDAR_DRILLS_STORE:
         const { drills, totalDrills, totalPages, perPage } = action
         //console.log(action.drills);
         return {
            ...state,
            drills,
            totalDrills,
            totalPages,
            perPage
         };
      default: 
         return state;
   }
}

export default DrillReducer;
