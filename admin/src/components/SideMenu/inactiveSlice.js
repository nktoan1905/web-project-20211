const { createSlice } = require("@reduxjs/toolkit");
const inactiveSlice = createSlice({
  name: "status",
  initialState: false,
  reducers: {
    changeStatus(state) {
      return !state;
    },
  },
});
const { actions, reducer } = inactiveSlice;
export const { changeStatus } = actions;
export default reducer;