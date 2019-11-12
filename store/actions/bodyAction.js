import TYPES from './types';

// Secciones de clases Base
//==============================
export const actionGetSeccionBase = (movements, workouts, warmups) => ({
   type: TYPES.GET_SECCION_BASE,
   args: {
      warmups,
      workouts,
      movements
   }
});
export const actionGuardarSeccionBaseStore = (claseBase) => ({
   type: TYPES.GUARDAR_SECCION_BASE_STORE,
   claseBase
});

export const actionGuardarWarmupsStore = (warmups) => ({
   type: TYPES.GUARDAR_WARMUPS_STORE,
   warmups
});

export const actionGuardarWorkoutsStore = (workouts) => ({
   type: TYPES.GUARDAR_WORKOUTS_STORE,
   workouts
});

export const actionGuardarMovementsStore = (movements) => ({
   type: TYPES.GUARDAR_MOVEMENTS_STORE,
   movements
});



