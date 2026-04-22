import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

type Props = {
  currentPage: number;
  perPage: number;
  itemsLength: number;
  onPageChange: (page: number) => void;
};

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
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const buttonBaseClass = "border-[2px] rounded-[50%] w-[38px] h-[38px] flex items-center justify-center transition-colors duration-200";
  const buttonActiveHover = "hover:bg-[#A2A6B0] hover:text-black text-[#A2A6B0] border-[#A2A6B0] cursor-pointer";
  const buttonDisabled = "cursor-not-allowed opacity-50";

  return (
    <div className="flex justify-center pb-[30px] md:pb-0">
      <div className="flex items-center">
        <div className="mr-[12px]">
          <button
            className={classNames(buttonBaseClass, isFirstPage ? buttonDisabled : buttonActiveHover)}
            onClick={handlePrev}
            disabled={isFirstPage}
          >
            <ChevronLeft width="16px" height="16px" stroke="currentColor" />
          </button>
        </div>

        <span className="font-poppins font-light">Page {currentPage}</span>

        <div className="ml-[12px]">
          <button
            onClick={handleNext}
            className={classNames(buttonBaseClass, isLastPage ? buttonDisabled : buttonActiveHover)}
            disabled={isLastPage}
          >
            <ChevronRight width="16px" height="16px" stroke="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};