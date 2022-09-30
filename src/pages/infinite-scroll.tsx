import type { NextPage } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import { requestGetProducts, IResponseProducts, IProduct } from "../utilities/apiFunc";
import { cloneDeep } from "lodash";
import useDebounce from '../hooks/useDebounce';

const InfiniteScrollPage: NextPage = () => {

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const [productItems, setProductItems] = useState<IProduct[]>();
  const size = 16;
  const viewport = useRef(null);
  const observeTarget = useRef(null);

  const paddingFunction = useDebounce({
    callback: () => {
      localStorage.setItem("infiniteScrollPosY", document.getElementsByClassName("is-scroll")[0]?.scrollTop.toString());
    },
    ms: 100,
  })

  const handleScroll = () => {
    paddingFunction();
  }

  useEffect(() => {
    document.getElementsByClassName("is-scroll")[0]?.addEventListener("scroll", (event) => {
      handleScroll();
    });

  }, [productItems]);


  useEffect(() => {
    if (localStorage.infiniteScrollData) {
      const getInfiniteScrollData = JSON.parse(localStorage.infiniteScrollData);
      const { page, totalCount, productItems } = getInfiniteScrollData;
      setPage(page);
      setTotalCount(totalCount);
      setProductItems(productItems);
    }

    if (localStorage.infiniteScrollPosY) {
      setScrollPositionY(localStorage.infiniteScrollPosY);
    }

  }, []);

  useEffect(() => {
    if (scrollPositionY !== 0 && (productItems && productItems.length !== 0)) {
      document.getElementsByClassName("is-scroll")[0].scrollTop = scrollPositionY;

    }

  }, [scrollPositionY, productItems]);

  useEffect(() => {
    if (productItems && productItems.length !== 0) {
      const totalPage = Math.ceil(totalCount / size);

      console.log("totalPage => ", totalPage);
      console.log("page => ", page);

      const intersectionObserverOptions = {
        root: viewport.current,
        rootMargin: "0px",
        threshold: 0.7,
      };

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        console.log("> handleIntersection");
        entries.forEach(entry => {
          const isIntersecting = entry.isIntersecting;
          const isLastPage = totalPage <= page;

          if (isIntersecting) {
            if (isLastPage) {
              // 마지막 페이지 체크
              console.log("마지막 페이지 입니다.")
              console.log("totalPage => ", totalPage);
              console.log("page => ", page);
              return false;
            }

            let addPage = page;
            addPage++;

            const requestQuery = {
              page: addPage,
              size: size
            };

            setTimeout(() => {
              requestGetProducts(requestQuery).then(resData => {
                if (!resData.status) {
                  console.error("api error");
                  return false;
                }

                // add api
                const responseData = resData.result as IResponseProducts;
                const productsData = responseData.data.products;
                let clonedResponseData = cloneDeep(productItems);
                clonedResponseData.push(...productsData);
                setProductItems(clonedResponseData);
                setPage(requestQuery.page);

                console.log("viewport.current =>", viewport.current);
                console.log(`document.getElementsByClassName("is-scroll")[0].scrollTop => 1`, document.getElementsByClassName("is-scroll")[0].scrollTop);



                const saveData = {
                  page: requestQuery.page,
                  totalCount: totalCount,
                  productItems: clonedResponseData,
                };

                window.localStorage.setItem("infiniteScrollData", JSON.stringify(saveData));
              });

            }, 300);
          }
        })
      };

      const io = new IntersectionObserver(handleIntersection, intersectionObserverOptions);

      if (observeTarget.current) {
        io.observe(observeTarget.current);
      }

      return () => io && io.disconnect();
    }

    if (!localStorage.infiniteScrollData && page === 1) {
      console.log("here");
      requestGetProducts({ page: page, size: size }).then(resData => {
        if (resData.status) {
          const responseData = resData.result as IResponseProducts;
          setTotalCount(responseData.data.totalCount);
          setProductItems(responseData.data.products);
        }
      })
    }


  }, [page, totalCount, productItems]);

  return (
    <>
      <Header />
      {
        productItems && productItems.length !== 0 ?
          <>
            <Container ref={viewport} className="is-scroll">
              <ProductList products={productItems} />
              <div ref={observeTarget}></div>
            </Container>
          </> :
          <div>목록이 없습니다.</div>
      }
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
  overflow-y: scroll;
  height: calc(100vh - 97.5px);
  overflow-x: hidden;

`;
