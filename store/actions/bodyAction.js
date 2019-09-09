import TYPES from './types';

// Secciones de clases principal
//==============================
export const actionGetSeccionClase = (movements, workouts, warmups) => ({
   type: TYPES.GET_SECCION_CLASE,
   args: {
      movements,
      workouts,
      warmups
   }
});

export const actionGuardarSeccionClaseStore = (clase) => ({
   type: TYPES.GUARDAR_SECCION_CLASE_STORE,
   clase
});

