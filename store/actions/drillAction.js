import TYPES from './types';

export const actionGetDrills = () => ({
   type: TYPES.GET_DRILLS
});

export const actionGuardarDrillsStorage = (drills) => ({
   type: TYPES.GUARDAR_DRILLS_STORE,
   drills
});