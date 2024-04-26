import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Instructors {
  id: string;
  nombreCompleto: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  tipoUsuario: string;
  correo: string;
  contraseña: string;
  confirmacionContraseña: string,
}

export interface InstructorsState {
  instructors: Instructors[];
}

const initialState: InstructorsState = {
  instructors: [],
};

export const instructorsSlice = createSlice({
  name: "instructors",
  initialState,
  reducers: {
    addInstructor: (state, action: PayloadAction<Instructors>) => {
      state.instructors.push(action.payload);
    },
  },
});

export const { addInstructor } = instructorsSlice.actions;

export default instructorsSlice.reducer;
