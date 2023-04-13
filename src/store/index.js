// export point for everyting related to redux
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersReducer } from './slices/usersSlice'
import { albumsApi } from './apis/albumsApi'

// create store
//usersReducer is the combine reducer from usersSlice
export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware)
  },
})

setupListeners(store.dispatch)

export * from './thunks/fetchUser'
export * from './thunks/addUser'
export * from './thunks/removeUser'
export { useFetchAlbumsQuery } from './apis/albumsApi'
