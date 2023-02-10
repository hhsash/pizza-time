import React, { useState } from 'react';

const Categories = () => {
  const categories = ['Усі', 'М’ясні', 'Вегетаріанскі', 'Гриль', 'Гострі', 'Закриті'];
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
