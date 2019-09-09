import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import { actionGuardarIQStorage } from '../actions/IQAction';

const getIQFirebase = () => 
   DB.collection("posts")
   .get()
   .then( querySnapshot => {
      let IQ = [];
      querySnapshot.forEach( doc => {
         IQ.push(doc.data());
      })
      return IQ;
   })


function* getIQ() {
   try {
      const IQ = yield call(getIQFirebase)
      yield put(actionGuardarIQStorage(IQ))
   } catch (error) {
      console.log(error)
   }
}

export default function* funcionesIQSaga() {
   yield takeEvery(TYPES.GET_IQ, getIQ)
}