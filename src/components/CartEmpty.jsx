import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div className='cart cart--empty'>
        <h2>Кошик порожній!</h2>
        <p>
          Ви ще не додали до кошику жодної піци.
          <br />
          Для того, щоб зробити замовлення, перейдіть на головну сторінку.
        </p>
        <img src={cartEmptyImg} alt='Empty cart' />
        <Link to='/' className='button button--black'>
          <span>Головна сторінка</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
