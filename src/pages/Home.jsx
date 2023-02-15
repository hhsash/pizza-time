import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Search from '../components/Search/index';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
    console.log(number);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get(
          `https://63e6c829c865e1f24432b2a9.mockapi.io/items?page=${currentPage}&limit=4&${
            categoryId > 0 ? `category=${categoryId}&` : ''
          }sortBy=${sortType.sortProperty}`,
        )
        .then((json) => {
          setItems(json.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchValue('');
  }, [currentPage]);

  useEffect(() => {
    onChangePage(1);
    setCategoryId(0);
  }, [searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className='container'>
      <div className='content-top__wrapper'>
        <div className='content__top'>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Search />
        </div>
        <Sort />
      </div>
      <h2 className='content__title'>Усі піци</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
