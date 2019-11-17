import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import {
   actionGuardarPremiumStore 
} from '../actions/subscriptionsAction';

const getSubscriptionsFirebase = (userId) => 
   DB.collection("users").doc(userId).get()
   .then(( doc ) => {
      var premium = '';
      if(doc.exists){
         const data = doc.data();
         premium = data.premium
      } else {
         console.log('TCL: ----------------------------------------------------------------')
         console.log('TCL: getSubscriptionsFirebase -> Warning: El documento esta vacio')
         console.log('TCL: ----------------------------------------------------------------')
      }
      data = {
         premium,
         loading : false
      }
      return data
   });


function* getSubscriptions(values) {
   try {
      const data = yield call(getSubscriptionsFirebase, values.userId)
      yield put(actionGuardarPremiumStore(data))
   } catch (error) {
      console.log('TCL: ---------------------------------------------')
      console.log('TCL: function*getSubscriptions -> error', error)
      console.log('TCL: ---------------------------------------------')
   }
}

const updateSubscriptionFirebase = (userId, value) => 
   DB.collection("users").doc(userId)
   .update({
      premium: value
   })

function* updateSubscription(values){
   try {
      yield call(updateSubscriptionFirebase, values.args.userId, values.args.value)
   } catch (error) {
      console.log('TCL: -----------------------------------------------')
      console.log('TCL: function*updateSubscription -> error', error)
      console.log('TCL: -----------------------------------------------')
   }
}

export default function* funcionesSubscriptionsSaga() {
   yield takeEvery(TYPES.SET_PREMIUM, updateSubscription),
   yield takeEvery(TYPES.GET_PREMIUM, getSubscriptions)
}