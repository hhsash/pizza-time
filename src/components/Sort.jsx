import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { selectSort, setSortType } from '../redux/slices/filterSlice';

export const sortList = [
  {
    name: 'популярності',
    sortProperty: 'rating',
  },
  {
    name: 'ціні',
    sortProperty: 'price',
  },
  {
    name: 'алфавіту',
    sortProperty: 'title',
  },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const onClickSortListItem = (item) => {
    dispatch(setSortType(item));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let path = event.composedPath ? event.composedPath() : event.path;
      if (!path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'>
          <path
            fillRule='evenodd'
            d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
          />
        </svg>
        <b>Сортувати по:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortList.map((item, index) => (
              <li
                onClick={() => onClickSortListItem(item)}
                key={index}
                className={sort.sortProperty === item.sortProperty ? 'active' : ''}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
