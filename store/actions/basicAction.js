import TYPES from './types';

// Fases
export const actionGetFase = (userId) => ({
   type: TYPES.GET_FASE,
   userId
});

export const actionGuardarFaseStore = (data) => ({
   type: TYPES.GUARDAR_FASE_STORE,
   fases: data.fases,
   loading: data.loading
});

// Clases
export const actionGetClaseCombinada = fases => ({
   type: TYPES.GET_CLASE_COMBINADA,
   fases
})
export const actionGuardarClaseCombinadaStore = (claseCombinada) => ({
   type: TYPES.GUARDAR_CLASE_COMBINADA_BASIC_STORE,
   claseCombinada
})
