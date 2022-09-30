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
  console.log("id =>", id)

  const [product, setProduct] = useState<IProduct | undefined>();

  useEffect(() => {
    if (id && typeof (id) === "string") {
      requestGetProductDetail({ productId: id }).then(resData => {
        console.log(resData);
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
      {
        product ?
          <Main>
            <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
            <ProductInfoWrapper>
              <Name>{product.name}</Name>
              <Price>{addComma(product.price.toString())}원</Price>
            </ProductInfoWrapper>
          </Main> :
          <Main>
            <EmptyData>존재하지 않는 상품입니다.</EmptyData>
          </Main>
      }
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

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
