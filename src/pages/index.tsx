import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const HomePage: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem("infiniteScrollData")
    localStorage.removeItem("infiniteScrollPosY");
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Heading>메인 페이지</Heading>
        <Link href='/pagination?page=1'>
          <StyledLink type="button">pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink type="button">infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.button`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  & + & {
    margin-top: 40px;
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
