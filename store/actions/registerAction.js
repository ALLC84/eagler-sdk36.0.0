import TYPES from './types'

export const actionRegistroUsuario = values => ({
   type: TYPES.REGISTRO_USUARIO,
   datos: values
});

export const handleErrorSessionUsuario = value => ({
   type: 'ERROR_SESSION_USUARIO',
   error: value
})


export const  actionLoginUsuario = values => ({
   type: TYPES.LOGIN_USUARIO,
   datos: values
});

export const  actionEstablecerSesion= user => ({
   type: TYPES.ESTABLECER_SESION,
   user
});

export const  actionCerrarSesion = () => ({
   type: TYPES.CERRAR_SESION
});