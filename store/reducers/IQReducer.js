import TYPES from '../actions/types';

const initialState = {
   perPage: 6,
   posts: [],
   totalPosts: 0,
   totalPages: 1
}

const IQReducer = ( state = initialState, action ) => {
   //console.log('State IQ',state);
   switch(action.type){
      case TYPES.GUARDAR_IQ_STORE:
         const { posts, totalPosts, totalPages, perPage } = action
         // return console.log('PAYLOAD ===> ', posts, total, type);
         return {
            ...state,
            posts,
            totalPosts,
            totalPages,
            perPage
         };
      default: 
         return state;
   }
}

export default IQReducer;
