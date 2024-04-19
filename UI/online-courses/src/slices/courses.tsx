import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  id: string;
  titulo: string;
  instructor: string;
  categoria: string;
  file: any;
  costo: number;
  requisitos: string;
  descripcion: string;
}

export interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
