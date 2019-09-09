import TYPES from './types';

//InitalState
export const actionGetInitialState = () => ({
   type: TYPES.GET_INITIAL_STATE
})

// Fases
export const actionGetFase = (userId) => ({
   type: TYPES.GET_FASE,
   userId
});

export const actionGuardarFaseStore = (fases) => ({
   type: TYPES.GUARDAR_FASE_STORE,
   fases
});

// Clases
export const actionGuardarClaseStore = (clase) => ({
   type: TYPES.GUARDAR_CLASE_BASIC_STORE,
   clase
})

// Modal Perfil juego del usuario
export const actionMostrarModal = () => ({
   type: TYPES.ACTION_MOSTRAR_MODAL,
   
})
export const actionCerrarModal = () => ({
   type: TYPES.ACTION_CERRAR_MODAL,
})

//State Contador y Tiempo clase
export const actionSetTiempoClase = (value) => ({
   type: TYPES.SET_TIEMPO_CLASE,
   value
})
export const actionSetStateConunter = (value) => ({
   type: TYPES.SET_STATE_COUNTER,
   value
})
export const actionSetCountVideo = (value) => ({
   type: TYPES.SET_COUNTER,
   value
})