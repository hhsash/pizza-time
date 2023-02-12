import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Search from '../components/Search/index';

const Home = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярності',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(
        `https://63e6c829c865e1f24432b2a9.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}&` : ''
        }sortBy=${sortType.sortProperty}`,
      )
        .then((response) => response.json())
        .then((json) => {
          setItems(json);
          console.log(items);
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
    setCurrentPage(1);
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
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Search />
        </div>
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className='content__title'>Усі піци</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
