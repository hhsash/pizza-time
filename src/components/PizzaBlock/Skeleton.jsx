import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <div className='pizza-block__wrapper'>
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={465}
      viewBox='0 0 280 465'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <rect x='457' y='491' rx='3' ry='3' width='88' height='6' />
      <circle cx='140' cy='120' r='120' />
      <rect x='0' y='270' rx='10' ry='10' width='280' height='27' />
      <rect x='0' y='310' rx='10' ry='10' width='280' height='85' />
      <rect x='125' y='410' rx='20' ry='20' width='150' height='30' />
      <rect x='8' y='415' rx='10' ry='10' width='70' height='25' />
    </ContentLoader>
  </div>
);

export default Skeleton;
