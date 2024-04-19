import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Users {
  id: string;
  nombreCompleto: string;
  nombreUsuario: string;
  fechaNacimiento: string;
  tipoUsuario: string;
  correo: string;
  contraseña: string;
  confirmacionContraseña: string;
}

export interface UsersState {
  users: Users[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<Users>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
