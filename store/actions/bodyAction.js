import TYPES from './types';

// Secciones de clases Base
//==============================
export const actionGetSeccionBase = (movements, workouts, warmups) => ({
   type: TYPES.GET_SECCION_BASE,
   args: {
      movements,
      workouts,
      warmups
   }
});

export const actionGuardarSeccionBaseStore = (claseBase) => ({
   type: TYPES.GUARDAR_SECCION_BASE_STORE,
   claseBase
});

