import React, { useState } from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Усі', 'М’ясні', 'Вегетаріанскі', 'Гриль', 'Гострі', 'Закриті'];

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
