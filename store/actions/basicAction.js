import TYPES from './types';

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
