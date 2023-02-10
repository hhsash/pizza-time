import React, { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      fetch('https://63e6c829c865e1f24432b2a9.mockapi.io/items')
        .then((response) => response.json())
        .then((json) => setItems(json));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Усі піци</h2>
          <div className='content__items'>
            {items.map((item) => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
