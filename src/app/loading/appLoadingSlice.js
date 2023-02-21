const { createSlice } = require('@reduxjs/toolkit');

const appLoadingSlice = createSlice({
    name: 'appLoading',
    initialState: {
        loading: false,
    },
    reducers: {
        setAppLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setAppLoading } = appLoadingSlice.actions;

export const selectAppLoading = (state) => state.appLoading.loading;

export default appLoadingSlice.reducer;
