import React, { Component } from 'react'
import { connect }  from 'react-redux'
import { AUTH } from '../services/firebase';

// Rutas
import NoAutenticadas from './noAutenticados/RutasNoAutenticadas'
import AppNavigator from './autenticados/AppNavigator';
import { actionEstablecerSesion, actionCerrarSesion } from '../store/actions/registerAction';

class RutasSelection extends Component {

   componentDidMount(){
      this.props.autenticacion();
   }

   render() {
      return (
         this.props.user 
            ? <AppNavigator openDrawer={this.openDrawer}/> 
            : <NoAutenticadas />
      )
   }
}


const mapStateToProps = state => {
   return {
      user: state.SessionReducer
   }
}

const mapDispatchToProps = dispath => {
   return {
      autenticacion: () => {
         AUTH.onAuthStateChanged( user => {
            if ( user !== null ) {
               dispath(actionEstablecerSesion(user))
            } else {
               dispath(actionCerrarSesion())
            }
         });
      }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(RutasSelection);
