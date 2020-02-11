import TYPES from './types';

export const actionGetIQ = page => ({
   type: TYPES.GET_IQ,
   page
});

// export const actionGuardarIQStorage = data => {
//    console.log('DATA ACTIONS',data)
// };
export const actionGuardarIQStorage = (data) => ({
   type: TYPES.GUARDAR_IQ_STORE,
   posts: data.IQ,
   totalPosts: data.totalPosts,
   totalPages: data.totalPages,
   perPage: data.perPage
});