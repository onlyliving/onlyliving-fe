import React, { useEffect, useState } from 'react';
import Router, { useRouter } from "next/router";
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from "../hooks/usePagination";

interface IPagination {
  totalCount: number
}

const Pagination: React.FC<IPagination> = ({
  totalCount
}) => {
  const router = useRouter();
  const dataCountPerPage = 10;
  const paginationCountPerPage = 5;
  const [currentPage, setCurrentPage] = useState(Number(router.query.page));

  const {
    paginations,
    leftDisable,
    rightDisable,
    currentPageGroup
  } = usePagination(totalCount, dataCountPerPage, paginationCountPerPage, currentPage);

  useEffect(() => {
    Router.push(`/pagination?page=${currentPage}`);
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
      <Heading>페이지 번호</Heading>
      <Wrap>
        <Button
          type="button"
          onClick={e => handlePaginationArrowBtn("prev")}
          disabled={leftDisable}
        >
          이전 페이지
          <VscChevronLeft />
        </Button>
        <PageWrapper>
          {paginations?.map((page) => (
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
      </Wrap>
    </Container>
  );
};

export default Pagination;

const Container = styled.section`
  margin-top: 40px;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
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
  width: 30px;
  padding: 4px 0;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

const Heading = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
