import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../slices/authSlice'
import { uiSlice } from '../slices/uiSlice'
import { userSlice } from '../slices/userSlice'

// ...

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [uiSlice.name]: uiSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch