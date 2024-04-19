import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/courses";
import usersReducer from "../slices/users";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
