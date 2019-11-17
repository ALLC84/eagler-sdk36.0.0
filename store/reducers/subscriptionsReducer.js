import TYPES from '../actions/types';

const initialState = {
   premium: 'FREE',
   loading: true
}

const SubscriptionsReducer = ( state = initialState, action ) => {
   switch(action.type){
      case TYPES.GUARDAR_PREMIUM_SUBSCRIPTIONS_STORE:
         return {
            ...state,
            premium: action.premium,
            loading: action.loading
         };
      case 'UPDATE_PREMIUM':
         return {
            ...state,
            premium: action.value,
         };
      default: 
         return state; 
   }
}

export default SubscriptionsReducer;
