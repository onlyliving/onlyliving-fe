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
  console.log("apiResDataProducts => ", apiResDataProducts);
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
