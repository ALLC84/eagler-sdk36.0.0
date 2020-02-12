import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import { actionGuardarDrillsStorage } from '../actions/drillAction';

const data = {
   drills     : [],
   perPage    : 5,
   totalDrills : 0,
   totalPages : 1,
   lastVisible: {}
}

const getDrillsFirebase = async page => {
   
   await DB.collection("drills")
   .get()
   .then( querySnapshot => {
      data.totalDrills = querySnapshot.size;
      data.totalPages = Math.ceil(data.totalDrills / data.perPage)
   })
   if(page <= 1) {
      await DB.collection("drills")
      .limit(data.perPage)
      .orderBy('title')
      .get()
      .then(querySnapshot => {
         data.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
         querySnapshot.forEach( doc => {
            data.drills.push(doc.data());
         })
      })
   } else {
      await DB.collection("drills")
      .limit(data.perPage)
      .orderBy('title')
      .startAfter(data.lastVisible)
      .get()
      .then(querySnapshot => {
         data.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
         querySnapshot.forEach( doc => {
           data.drills.push(doc.data());
         })
      })

   }

   return data;
}


function* getDrills({page}) {
   try {
      const data = yield call(getDrillsFirebase, page)
      yield put(actionGuardarDrillsStorage(data))
   } catch (error) {
      console.log(error)
   }
}

export default function* funcionesDrillSaga() {
   yield takeEvery(TYPES.GET_DRILLS, getDrills)
}