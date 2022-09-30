import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { addComma } from "../../utilities/index";

import { requestGetProductDetail, IResponseProductDetail, IProduct } from "../../utilities/apiFunc";

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<IProduct | undefined>();

  useEffect(() => {
    if (id && typeof (id) === "string") {
      requestGetProductDetail({ productId: id }).then(resData => {
        if (resData.status) {
          const responseData = resData.data as IResponseProductDetail;
          setProduct(responseData.data.product);
        }

      })
    }
  }, [id]);

  return (
    <>
      <Header />
      <Main>
        <Heading>상품 상세 페이지</Heading>
        {
          product ?
            <div>
              <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} alt="상품 이미지" />
              <ProductInfoWrapper>
                <Name>{product.name}</Name>
                <Price>{addComma(product.price.toString())}원</Price>
              </ProductInfoWrapper>
            </div>
            :
            <EmptyData>존재하지 않는 상품입니다.</EmptyData>
        }
      </Main>
    </>
  );
};

export default ProductDetailPage;

const Main = styled.main`
  position:relative;
`;

const EmptyData = styled.p`
  display: flex;
  height: calc(100vh - 97.5px);
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.img`
  width: 100%;
`;

const ProductInfoWrapper = styled.ul`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.li`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.li`
  font-size: 18px;
  margin-top: 8px;
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
`
