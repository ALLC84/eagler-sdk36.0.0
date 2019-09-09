import TYPES from '../actions/types';

const initialState = {
   userProfile: {}
}

const UserProfileReducer = ( state = initialState, action ) => {
   //console.log('State userProfile =>', state)
   switch(action.type){
      case TYPES.GUARDAR_USER_PROFILE_STORE:
            return {
               ...state,
               userProfile: action.userProfile,
               imageProfile: action.userProfile.avatarImg
            };
      case TYPES.GUARDAR_IMAGEN_PROFILE_STORE:
            return {
               ...state,
               userProfile: state.userProfile,
               imageProfile: action.imageProfile
            };
      default: 
         return state;
   }
}

export default UserProfileReducer;