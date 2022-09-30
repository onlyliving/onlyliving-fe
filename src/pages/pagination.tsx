import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import { requestGetProducts, IResponseProducts } from "../utilities/apiFunc";

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [apiResDataProducts, setApiResDataProducts] = useState<IResponseProducts | null>();
  useEffect(() => {
    if (page) {
      requestGetProducts({
        page: Number(page),
        size: 10
      }).then(resData => {
        if (resData.status) {
          setApiResDataProducts(resData.result as IResponseProducts)
        }
      });

    }

  }, [page]);

  return (
    <>
      <Header />
      <Container>
        <Heading>페이지네이션 페이지</Heading>
        {
          apiResDataProducts ?
            <>

              <ProductList products={apiResDataProducts.data.products.slice(0, 10)} />
              <Pagination totalCount={apiResDataProducts.data.totalCount} />
            </> :
            <p>존재하지 않는 페이지입니다.</p>
        }
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
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
