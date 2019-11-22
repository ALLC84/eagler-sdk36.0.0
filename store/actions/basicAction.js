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

// Clases Combinada
export const actionGetClaseCombinada = fases => ({
   type: TYPES.GET_CLASE_COMBINADA,
   fases
})
export const actionGuardarClaseCombinadaStore = (claseCombinada) => ({
   type: TYPES.GUARDAR_CLASE_COMBINADA_BASIC_STORE,
   claseCombinada
})

// Clases Seccion Media
export const actionGetClaseSeccionMedia = fases => ({
   type: TYPES.GET_CLASE_SECCION_MEDIA,
   fases
})
export const actionGuardarClaseSeccionMediaStore = (claseSeccionMedia) => ({
   type: TYPES.GUARDAR_CLASE_SECCION_MEDIA_BASIC_STORE,
   claseSeccionMedia
})

// Clases Seccion Corta
export const actionGetClaseSeccionCorta = fases => ({
   type: TYPES.GET_CLASE_SECCION_CORTA,
   fases
})
export const actionGuardarClaseSeccionCortaStore = (claseSeccionCorta) => ({
   type: TYPES.GUARDAR_CLASE_SECCION_CORTA_BASIC_STORE,
   claseSeccionCorta
})
