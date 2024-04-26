import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/courses";
import instructorsReducer from "../slices/instructors";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    instructors: instructorsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
