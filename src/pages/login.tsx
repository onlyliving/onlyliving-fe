import type { NextPage } from 'next';
import Router from "next/router";
import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import Input from '../components/Input';
import { useRecoilState } from 'recoil';
import { signinPassState, signinState, signinValueState } from '../utilities/atom';
import { IResponseLogin, requestPostLogin } from "../utilities/apiFunc";

const LoginPage: NextPage = () => {
  const [isSignInPass, setIsSignInPass] = useRecoilState(signinPassState);
  const [userSiginData, setUserSiginData] = useRecoilState(signinState);
  const [signinValue, setSigninValue] = useRecoilState(signinValueState);

  const handleSignin = () => {
    console.log("isSignInPass => ", isSignInPass);
    console.log(" >> (로그인 버튼 클릭) 로그인 이벤트");

    const requestData = {
      id: signinValue.id,
      password: signinValue.password,
    };

    requestPostLogin(requestData).then(resData => {
      console.log("resData => ", resData)
      if (!resData.status) {
        console.error("api 404 error => ", resData);
        return false;
      }

      setUserSiginData({ isSignin: true, ...resData.data as IResponseLogin });
      Router.push("/");
    });
  };

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
        {
          isSignInPass.userId && isSignInPass.password ?
            <LoginButton
              type='button'
              onClick={handleSignin}
            >로그인</LoginButton> :
            <LoginButton
              type='button'
              disabled
            >로그인</LoginButton>
        }
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

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
