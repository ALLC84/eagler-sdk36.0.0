import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import { actionGuardarDrillsStorage } from '../actions/drillAction';

const getDrillsFirebase = () => 
   DB.collection("drills")
   .get()
   .then( querySnapshot => {
      let drills = [];
      querySnapshot.forEach( doc => {
         drills.push(doc.data());
      })
      return drills;
   })


function* getDrills() {
   try {
      const drills = yield call(getDrillsFirebase)
      yield put(actionGuardarDrillsStorage(drills))
   } catch (error) {
      console.log(error)
   }
}

export default function* funcionesDrillSaga() {
   yield takeEvery(TYPES.GET_DRILLS, getDrills)
}