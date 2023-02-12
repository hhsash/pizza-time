import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [selected, setSelected] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярності',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(
        `https://63e6c829c865e1f24432b2a9.mockapi.io/items?${
          categoryId === 0 ? categoryId : ''
        }&sortBy=${sortType.sortProperty}`,
      )
        .then((response) => response.json())
        .then((json) => {
          setItems(json);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className='content__title'>Усі піци</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
