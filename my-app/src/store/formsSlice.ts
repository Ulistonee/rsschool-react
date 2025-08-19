import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FormData = {
  name: string;
  email: string;
};

type FormsState = {
  uncontrolled: FormData[];
  hook: FormData[];
};

const initialState: FormsState = {
  uncontrolled: [],
  hook: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolled(state, action: PayloadAction<FormData>) {
      state.uncontrolled.push(action.payload);
    },
    addHook(state, action: PayloadAction<FormData>) {
      state.hook.push(action.payload);
    },
  },
});

export const { addUncontrolled, addHook } = formsSlice.actions;
export default formsSlice.reducer;
