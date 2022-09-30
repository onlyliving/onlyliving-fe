import type { NextPage } from 'next';
import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import Input from '../components/Input';
import LoginButton from "../components/LoginButton";

const LoginPage: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Heading>로그인 페이지</Heading>
        <Input
          name='userId'
          inputTitle='아이디'
          min={5}
          max={30}
        />
        <Input
          name='password'
          inputTitle='비밀번호'
          min={8}
          max={30}
        />
        <LoginButton />
      </Main>
    </>
  );
};

export default LoginPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
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
