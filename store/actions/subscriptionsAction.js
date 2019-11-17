import TYPES from './types';

// Fases
export const actionSetPremium = (userId, value) => ({
   type: TYPES.SET_PREMIUM,
   args: {
      userId,
      value
   }
});

export const actionGetIsPremium = (userId) => ({
   type: TYPES.GET_PREMIUM,
   userId
});

export const actionGuardarPremiumStore = (data) => ({
   type: TYPES.GUARDAR_PREMIUM_SUBSCRIPTIONS_STORE,
   premium: data.premium,
   loading: data.loading
});

export const actionUpdatePremium = (value) => ({
   type: 'UPDATE_PREMIUM',
   value
});

