import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export type FormData = {
  name: string;
  age: string;
  email: string;
  gender: string;
  country: string;
  picture: string;
};

type FormsState = {
  uncontrolled: FormData[];
  hook: FormData[];
  countries: string[];
};

const initialState: FormsState = {
  uncontrolled: [],
  hook: [],
  countries: Object.values(countries.getNames("en", { select: "official" })),
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
