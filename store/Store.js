import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// const composeEnhancers = composeWithDevTools({
//    realtime: true,
//    name: 'Eagler',
//    hostname: 'localhost',
//    port: '19001/debugger-ui/'
// })

//Middlewares
// import funcionPrimaria from './sagas/registerUserSaga';
import createSagaMiddleware from 'redux-saga';
// Mis sagas
import funcionesRegistroSaga from './sagas/registerUserSaga';
import funcionesBasicSaga from './sagas/basicSaga';
import funcionesBodySaga from './sagas/bodySaga';
import funcionesDrillSaga from './sagas/drillSaga';
import funcionesIQSaga from './sagas/IQSaga';
import funcionesUserProfileSaga from './sagas/userProfileSaga';
import funcionesSubscriptionsSaga from './sagas/subscriptionsSaga';


//Combine Reducers
import reducers from './reducers'


// Saga es un middleware para trabajar con funciones* asincronas (yield == await )
const sagaMiddleware = createSagaMiddleware()
      // composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
   reducers,
   composeWithDevTools(
      applyMiddleware(
         sagaMiddleware,
      ),
   )
);

sagaMiddleware.run(
   funcionesRegistroSaga
);
sagaMiddleware.run(
   funcionesBasicSaga
);
sagaMiddleware.run(
   funcionesBodySaga
);
sagaMiddleware.run(
   funcionesDrillSaga
);
sagaMiddleware.run(
   funcionesIQSaga
);
sagaMiddleware.run(
   funcionesUserProfileSaga
);
sagaMiddleware.run(
   funcionesSubscriptionsSaga
);

export default store;