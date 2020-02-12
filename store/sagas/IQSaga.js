import { takeEvery, call, put } from 'redux-saga/effects';
////// Firebase
import { DB } from '../../services/firebase'

import TYPES from '../actions/types'
import { actionGuardarIQStorage } from '../actions/IQAction';

const data = {
   IQ: [],
   perPage: 5,
   totalPosts: 0,
   totalPages: 1,
   lastVisible: {}
}

const getIQFirebase = async page => {
   
   await DB.collection("posts")
   .get()
   .then( querySnapshot => {
      data.totalPosts = querySnapshot.size;
      data.totalPages = Math.ceil(data.totalPosts / data.perPage)
   })
   if(page <= 1) {
      await DB.collection("posts")
      .limit(data.perPage)
      .orderBy('date')
      .get()
      .then(querySnapshot => {
         data.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
         querySnapshot.forEach( doc => {
            data.IQ.push(doc.data());
         })
      })
   } else {
      await DB.collection("posts")
      .limit(data.perPage)
      .orderBy('date')
      .startAfter(data.lastVisible)
      .get()
      .then(querySnapshot => {
         data.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
         querySnapshot.forEach( doc => {
           data.IQ.push(doc.data());
         })
      })

   }

   return data;
}
   



function* getIQ({page}) {
   try {
      const data = yield call(getIQFirebase, page)
      yield put(actionGuardarIQStorage(data))
      // yield console.log('DATA SAGA ==>', data.totalPages)
   } catch (error) {
      console.log(error)
   }
}

export default function* funcionesIQSaga() {
   yield takeEvery(TYPES.GET_IQ, getIQ)
}