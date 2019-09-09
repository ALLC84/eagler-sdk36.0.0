import TYPES from '../actions/types';

const initialState = {
   IQ: []
}

const IQReducer = ( state = initialState, action ) => {
   //console.log('State IQ',state);
   switch(action.type){
      case TYPES.GUARDAR_IQ_STORE:
         //console.log(action.IQ);
         return {
            ...state,
            IQ: action.IQ 
         };
      default: 
         return state;
   }
}

export default IQReducer;
