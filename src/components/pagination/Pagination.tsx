import { useState } from 'react';

import {
  PAGINATION_DEFAULT_VALUE,
  PaginationDefaultType,
} from '@/constant/defaultConstants';

const Pagination = ({
  handlePaginationCallback,
}: {
  handlePaginationCallback: (arg: PaginationDefaultType) => void;
}) => {
  const [paginationData, setPaginationData] = useState(
    PAGINATION_DEFAULT_VALUE
  );

  const handleChange = (id: string, value: number | string) => {
    const updatedValue = { ...paginationData, [id]: value };
    setPaginationData(updatedValue);
    handlePaginationCallback(updatedValue);
  };

  const { pageNo, pageSize } = paginationData;
  return (
    <div className='rounded-[5px] p-4 text-[14px] text-[#93b1a6] md:text-[16px]'>
      <div className='mx-[0] my-1 inline-flex w-full flex-wrap items-center justify-center'>
        <div className='m-[10px]'>
          Page
          <input
            onChange={(e) => {
              handleChange('pageNo', Number(e.target.value) || pageNo);
            }}
            type='number'
            className='page-no mx-[10px] my-[0] max-w-[4rem] text-[14px]'
            min={1}
            value={pageNo}
          />{' '}
        </div>
        <div className='m-[10px]'>
          Show
          <input
            onChange={(e) => {
              handleChange('pageSize', Number(e.target.value) || pageSize);
            }}
            className='page-no mx-[10px] my-[0] max-w-[4rem] text-[14px]'
            type='number'
            min={1}
            max={100}
            value={pageSize}
          />{' '}
          results per page
        </div>
      </div>
    </div>
  );
};

export default Pagination;
