import TYPES from '../actions/types';

const initialState = {
   posts: []
}

const IQReducer = ( state = initialState, action ) => {
   //console.log('State IQ',state);
   switch(action.type){
      case TYPES.GUARDAR_IQ_STORE:
         //console.log(action.IQ);
         return {
            ...state,
            posts: action.IQ 
         };
      default: 
         return state;
   }
}

export default IQReducer;
