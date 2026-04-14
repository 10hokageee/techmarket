import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

type Props = {
  currentPage: number
  perPage: number
  itemsLength: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  perPage,
  itemsLength,
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = itemsLength < perPage;

  const handlePrev = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-center pb-[30px] md:pb-0">
      <div className='flex items-center'>
        <div className='mr-[12px]'>
          <button
            className={classNames('border-[2px] rounded-[50%] w-[38px] h-[38px] flex items-center justify-center', { 'cursor-not-allowed opacity-50': isFirstPage })}
            onClick={handlePrev}
            disabled={isFirstPage}
          >
            <ChevronLeft color='#A2A6B0' width="16px" height="16px" />
          </button>
        </div>
        <span className="font-poppins font-light">Page {currentPage}</span>
        <div className='ml-[12px]'>
          <button
            onClick={handleNext}
            className={classNames('border-[2px] rounded-[50%] w-[38px] h-[38px] flex items-center justify-center', { 'cursor-not-allowed opacity-50': isLastPage })}
            disabled={isLastPage}
          >
            <ChevronRight color='#A2A6B0' width="16px" height="16px" />
          </button>
        </div>
      </div>
    </div>
  );
};