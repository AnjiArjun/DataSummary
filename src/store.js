import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    loadDataSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    loadDataError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loadDataSuccess, loadDataError } = dataSlice.actions;

export const loadData = () => async (dispatch) => {
  try {
    const response = await axios.get('/data/sample.json');
    dispatch(loadDataSuccess(response.data));
  } catch (error) {
    dispatch(loadDataError(error.message));
  }
};

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
