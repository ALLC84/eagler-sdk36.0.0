const TYPES = {
   REGISTRO_USUARIO                          : 'REGISTRO_USUARIO',
   LOGIN_USUARIO                             : 'LOGIN_USUARIO',
   ESTABLECER_SESION                         : 'ESTABLECER_SESION',
   CERRAR_SESION                             : 'CERRAR_SESION',
   RESTORE_PASSWORD                          : 'RESTORE_PASSWORD',
   ERROR_SESSION_USUARIO                     : 'ERROR_SESSION_USUARIO',
   SUCCESS_SESSION_USUARIO                   : 'SUCCESS_SESSION_USUARIO',
      
      
   GET_FASE                                  : 'GET_FASE',
   GUARDAR_FASE_STORE                        : 'GUARDAR_FASE_STORE', 
   GET_CLASE_COMBINADA                       : 'GET_CLASE_COMBINADA', //Clase Combinada 
   GUARDAR_CLASE_COMBINADA_BASIC_STORE       : 'GUARDAR_CLASE_COMBINADA_BASIC_STORE',
   GET_CLASE_SECCION_MEDIA                   : 'GET_CLASE_SECCION_MEDIA', // Clase SeccionMedia
   GUARDAR_CLASE_SECCION_MEDIA_BASIC_STORE   : 'GUARDAR_CLASE_SECCION_MEDIA_BASIC_STORE',
   GET_CLASE_SECCION_CORTA                   : 'GET_CLASE_SECCION_CORTA', // Clase SeccionMedia
   GUARDAR_CLASE_SECCION_CORTA_BASIC_STORE   : 'GUARDAR_CLASE_SECCION_CORTA_BASIC_STORE',


   GET_SECCION_BASE                          : 'GET_SECCION_CLASE',
   GUARDAR_WARMUPS_STORE                     : 'GUARDAR_WARMUPS_STORE',
   GUARDAR_WORKOUTS_STORE                    : 'GUARDAR_WORKOUTS_STORE',
   GUARDAR_MOVEMENTS_STORE                   : 'GUARDAR_MOVEMENTS_STORE',
   GUARDAR_SECCION_BASE_STORE                : 'GUARDAR_SECCION_CLASE_STORE',


   GET_DRILLS                                : 'GET_DRILLS',
   GUARDAR_DRILLS_STORE                      : 'GUARDAR_DRILLS_STORE',


   GET_IQ                                    : 'GET_IQ',
   GUARDAR_IQ_STORE                          : 'GUARDAR_IQ_STORE',


   GET_USER_PROFILE                          : 'GET_USER_PROFILE',
   GUARDAR_USER_PROFILE_STORE                : 'GUARDAR_USER_PROFILE_STORE',
   SET_IMAGE_PROFILE                         : 'SET_IMAGE_PROFILE',
   GUARDAR_IMAGEN_PROFILE_STORE              : 'GUARDAR_IMAGEN_PROFILE_STORE',
   UPDATE_PLAY_USER_PROFILE                  : 'UPDATE_PLAY_USER_PROFILE',
   UPDATE_PHYSICAL_USER_PROFILE              : 'UPDATE_PHYSICAL_USER_PROFILE',
   CREATE_INITIAL_PHASE                      : 'CREATE_INITIAL_PHASE',


   ACTION_CERRAR_MODAL                       : 'ACTION_CERRAR_MODAL',
   ACTION_MOSTRAR_MODAL                      : 'ACTION_MOSTRAR_MODAL',

   SET_PREMIUM                               : 'SET_PREMIUM',
   GET_PREMIUM                               : 'GET_PREMIUM',
   GUARDAR_PREMIUM_SUBSCRIPTIONS_STORE       : 'GUARDAR_PREMIUM_SUBSCRIPTIONS_STORE'
}

export default TYPES;