import TYPES from './types';

export const actionGetIQ = () => ({
   type: TYPES.GET_IQ
});

export const actionGuardarIQStorage = (IQ) => ({
   type: TYPES.GUARDAR_IQ_STORE,
   IQ
});