import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  searchValue: '',
  sort: {
    name: 'популярності',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSearchParams(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state) => state.filter.sort;
export const selectCategoryId = (state) => state.filter.categoryId;
export const selectSortType = (state) => state.filter.sort.sortProperty;

export const { setCategoryId, setSearchValue, setSortType, setSearchParams } = filterSlice.actions;

export default filterSlice.reducer;
