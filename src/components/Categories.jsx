import React, { useState } from 'react';

export const categories = ['Усі', 'М’ясні', 'Вегетаріанскі', 'Гриль', 'Гострі'];

const Categories = ({ value, onChangeCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
