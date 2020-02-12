import TYPES from './types';

export const actionGetDrills = page => ({
   type: TYPES.GET_DRILLS,
   page
});

// export const actionGuardarDrillsStorage = data => {
//    console.log('DATA ACTIONS DRILLS =>', data)
// };

export const actionGuardarDrillsStorage = (data) => ({
   type: TYPES.GUARDAR_DRILLS_STORE,
   drills: data.drills,
   totalDrills: data.totalDrills,
   totalPages: data.totalPages,
   perPage: data.perPage
});