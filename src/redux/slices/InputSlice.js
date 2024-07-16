import { createSlice } from "@reduxjs/toolkit";

const InputSlice = createSlice({
    name: "input",
    initialState: {
        inputValue: "",
    },
    reducers: {
        setInputValue: (state, action) => {
            console.log("setInputValue", action.payload);
            state.inputValue = action.payload;
        },
    },

});

export const { setInputValue } = InputSlice.actions;
export default InputSlice.reducer;