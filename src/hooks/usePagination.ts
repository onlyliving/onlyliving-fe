import React, { useEffect, useState } from 'react';
import getPagination from '../utilities/getPagination';

const usePagination = (
  totalCount: number,
  dataCountPerPage: number,
  paginationCountPerPage: number,
  currentPage: number
) => {
  const [paginations, setPaginations] = useState<number[] | null>();
  const [leftDisable, setLeftDisable] = useState(true);
  const [rightDisable, setRightDisable] = useState(false);
  const totalPageCount = totalCount / dataCountPerPage;
  const currentPageGroup = Math.ceil(currentPage / paginationCountPerPage);
  const totalPageGroup = Math.ceil(totalPageCount / paginationCountPerPage);

  const isDisabledPrev = () => {
    if (currentPageGroup === 1) {
      return true;
    }

    return false;
  };

  const isDisabledNext = () => {
    if (currentPageGroup >= totalPageGroup) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setPaginations(getPagination(5, 10, currentPage, totalCount));
    setLeftDisable(isDisabledPrev());
    setRightDisable(isDisabledNext());
  }, [currentPage]);

  return {
    currentPage,
    paginations,
    leftDisable,
    rightDisable,
    currentPageGroup,
  };
};

export default usePagination;
