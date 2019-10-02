import React, { useEffect } from 'react'
import { AUTH } from '../services/firebase';
/* ========== REDUX ================ */
import { useDispatch, useSelector  } from 'react-redux' // React-Redux
import { actionEstablecerSesion, actionCerrarSesion } from '../store/actions/registerAction'; // Action-Redux
// Rutas
import NoAutenticadas from './noAutenticados/RutasNoAutenticadas'
import AppNavigator from './autenticados/AppNavigator';

const RutasSelection = props => {
   // REDUX
   const {user} = useSelector(state => state.session);
	// Dispatchs
	const dispatch = useDispatch();
	const autentication = () => 
      AUTH.onAuthStateChanged( user => {
         if ( user !== null ) {
            dispatch(actionEstablecerSesion(user))
         } else {
            dispatch(actionCerrarSesion())
         }
      });
   
   
   useEffect(() => {
      autentication()
   }, [])

   return (
      user 
         ? <AppNavigator openDrawer={props.openDrawer}/> 
         : <NoAutenticadas />
   )
}
export default RutasSelection;
