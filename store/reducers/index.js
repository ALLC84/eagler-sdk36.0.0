import { combineReducers } from 'redux';

// Reducers
import { reducer as form } from 'redux-form';
import SessionReducer from './sessionReducer';
import BasicReducer from './basicReducer';
import BodyReducer from './bodyReducer';
import DrillReducer from './drillReducer';
import IQReducer from './IQReducer';
import UserProfileReducer from './userProfileReducer';


export default combineReducers({
   form,
   BasicReducer,
   SessionReducer,
   BodyReducer,
   DrillReducer,
   IQReducer,
   UserProfileReducer,
});

