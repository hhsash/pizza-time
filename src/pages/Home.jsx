import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import {
  selectCategoryId,
  selectSortType,
  setCategoryId,
  setSearchParams,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import Categories, { categories } from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Search from '../components/Search/index';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const categoryId = useSelector(selectCategoryId);
  const sortType = useSelector(selectSortType);

  const searchValue = useSelector((state) => state.filter.searchValue);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setSearchParams({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType]);

  useEffect(() => {
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
      <h2 className='content__title'>{categories[categoryId]} піци</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Виникла помилка!</h2>
          <p>При отриманні піц щось пішло не так, cпробуйте повторити спробу пізніше...</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
    </div>
  );
};

export default Home;
