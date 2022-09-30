import styled from 'styled-components';
import { IProduct } from '../utilities/apiFunc';
import ProductItem from './ProductItem';
import React, { useRef, useEffect } from "react";

interface IProductList {
  products: IProduct[];
};

const lazyLoad = (target: any) => {
  const io = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      const isIntersecting = entry.isIntersecting;

      if (isIntersecting) {
        const img = entry.target.querySelector("img") as HTMLImageElement;
        const src = img.getAttribute("data-lazy") as string;
        img.setAttribute("src", src);
        img.classList.add("fade");
        observer.disconnect();
      }
    })
  });

  io.observe(target);
}

const ProductList = ({ products }: IProductList) => {
  const viewport = useRef(null);

  useEffect(() => {
    if (viewport.current) {
      Array.from(document.querySelectorAll(".js-box")).forEach(lazyLoad)
    }

  }, [products]);

  return (
    <Container ref={viewport}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Container>
  )
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
