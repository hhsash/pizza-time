import React, { useState, useEffect, useRef, useContext } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { setCategoryId, setCurrentPage, setSearchParams } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Search from '../components/Search/index';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    try {
      axios
        .get(
          `https://63e6c829c865e1f24432b2a9.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}&` : ''
          }sortBy=${sortType}`,
        )
        .then((json) => {
          setItems(json.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
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
    fetchPizzas();
  }, [categoryId, sortType, searchValue]);

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
      <h2 className='content__title'>Усі піци</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
