import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Students {
  id: string;
  nombreCompleto: string;
  fechaNacimiento: Date;
  correo: string;
  contraseña: string;
  confirmacionContraseña: string;
}

export interface StudentsState {
  students: Students[];
}

const initialState: StudentsState = {
  students: [],
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Students>) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
