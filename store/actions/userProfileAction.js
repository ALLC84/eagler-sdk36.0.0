import TYPES from './types';

// All Profile
export const actionGetUserProfile = (userId) => ({
   type: TYPES.GET_USER_PROFILE,
   userId
});

export const actionGuardarUserProfileStore = (userProfile) => ({
   type: TYPES.GUARDAR_USER_PROFILE_STORE,
   userProfile
});

// Actualiza Campos perfil de juego
export const actionUpdatePlayUserProfile = (userId, values) => ({
   type: TYPES.UPDATE_PLAY_USER_PROFILE,
   args: {
      userId,
      values
   }
});

// Actualiza Campos perfil fisico
export const actionUpdatePhysicalUserProfile = (userId, values) => ({
   type: TYPES.UPDATE_PHYSICAL_USER_PROFILE,
   args: {
      userId,
      values
   }
});

// Crear fase Inicial
export const actionCreateInitialPhase = (userId, fase, handicap) => ({
   type: TYPES.CREATE_INITIAL_PHASE,
   args: {
      userId,
      fase,
      handicap
   }
});

// Image Profile
export const actionSetImageProfile = (uri, name) => ({
   type: TYPES.SET_IMAGE_PROFILE,
   args: {
      uri,
      name,
   }
});

export const actionGuardarImageProfileStore = (imageProfile) => ({
   type: TYPES.GUARDAR_IMAGEN_PROFILE_STORE,
   imageProfile
});