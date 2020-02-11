import { combineReducers } from 'redux';

// Reducers
import { reducer as form } from 'redux-form';
import SessionReducer from './sessionReducer';
import BasicReducer from './basicReducer';
import BodyReducer from './bodyReducer';
import DrillReducer from './drillReducer';
import IQReducer from './IQReducer';
import UserProfileReducer from './userProfileReducer';
import SubscriptionsReducer from './subscriptionsReducer';


export default combineReducers({
   form,
   session       : SessionReducer,
   basic         : BasicReducer,
   body          : BodyReducer,
   drills        : DrillReducer,
   postsData     : IQReducer,
   userProfile   : UserProfileReducer,
   subscriptions : SubscriptionsReducer
});

