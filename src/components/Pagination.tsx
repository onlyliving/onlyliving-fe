import React, { useEffect, useState } from 'react';
import Router, { useRouter } from "next/router";
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface IPagination {
  totalCount: number
}

const getPaginations = (
  paginationCountPerPage: number,
  dataCountPerPage: number,
  currentPage: number,
  dataTotalCount: number
) => {
  const pageGroup = Math.ceil(currentPage / paginationCountPerPage);
  const first = (paginationCountPerPage * (pageGroup - 1)) + 1;
  const last = first + paginationCountPerPage;
  const totalPageCount = dataTotalCount / dataCountPerPage;

  let paginations = [];

  for (let i = first; i < last; i++) {
    paginations.push(i);

    if (currentPage > totalPageCount) {
      break;
    }
  }

  return paginations
};

const Pagination: React.FC<IPagination> = ({
  totalCount
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(router.query.page));
  const [pageList, setPageList] = useState<number[] | null>();
  const [leftDisable, setLeftDisable] = useState(true);
  const [rightDisable, setRightDisable] = useState(false);
  console.log("currentPage => ", currentPage)
  console.log("pageList => ", pageList);

  /**
   *
   * e.g.
   * currentPage : 현재 페이지 7
   * totalDataCount (totalCount) : 총 데이터 수 -> 105
   * dataCountPerPage : 페이지당 보여지는 데이터 수 -> 10
   * totalPageCount : 총 페이지 수 -> 105 / 10 -> 올림해서 11 페이지
   * paginationCountPerPage : 페이지당 보여지는 페이지번호 수 -> 5
   * currentPageGroup : 현재 페이지 그룹 -> 2
   * totalPageGroup : 총 페이지 그룹 -> 3
   */
  const dataCountPerPage = 10;
  const paginationCountPerPage = 5;
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
    setPageList(getPaginations(5, 10, currentPage, totalCount))
    Router.push(`/pagination?page=${currentPage}`);

    setLeftDisable(isDisabledPrev());
    setRightDisable(isDisabledNext());


  }, [currentPage]);

  const handlePaginationBtn = (event: React.MouseEvent) => {
    const targetBtn = event.target as HTMLButtonElement;
    const targetValue = Number(targetBtn.getAttribute("data-value") as string);
    setCurrentPage(targetValue);
  };

  const handlePaginationArrowBtn = (buttonType: 'prev' | 'next',) => {
    const activePageGroup = buttonType === 'prev' ? currentPageGroup - 1 : currentPageGroup + 1;
    const firstButtonNumber = paginationCountPerPage * (activePageGroup - 1) + 1;
    const lastButtonNumber = firstButtonNumber + paginationCountPerPage;
    const nextActivePage = lastButtonNumber;
    const currentPage = buttonType === 'prev' ? nextActivePage - 1 : firstButtonNumber;
    setCurrentPage(currentPage);
  };


  return (
    <Container>
      <Button
        type="button"
        onClick={e => handlePaginationArrowBtn("prev")}
        disabled={leftDisable}
      >
        이전 페이지
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageList?.map((page) => (
          <Page
            type="button"
            key={page}
            data-value={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={handlePaginationBtn}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button
        type="button"
        onClick={e => handlePaginationArrowBtn("next")}
        disabled={rightDisable}
      >
        다음 페이지
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;s
  height: 32px;
  text-indent: -9999px;
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
