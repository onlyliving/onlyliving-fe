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
      <Form>
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
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;
