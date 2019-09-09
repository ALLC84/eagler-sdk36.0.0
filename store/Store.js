import { createStore, applyMiddleware } from 'redux';

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


//Combine Reducers
import reducers from './reducers'


// Saga es un middleware para trabajar con funciones* asincronas (yield == await )
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   reducers, 
   applyMiddleware(sagaMiddleware)
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

export default store;