import React, { useEffect, useState } from 'react';
import Router from "next/router";
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { signinPassState, signinState, signinValueState } from '../utilities/atom';
import { IResponseLogin, requestPostLogin } from "../utilities/apiFunc";

const LoginButton = () => {
  const [isSignInPass, setIsSignInPass] = useRecoilState(signinPassState);
  const [userSiginData, setUserSiginData] = useRecoilState(signinState);
  const [signinValue, setSigninValue] = useRecoilState(signinValueState);
  const [pass, setPass] = useState(false);

  useEffect(() => {
    const isPass = isSignInPass.userId && isSignInPass.password ? true : false;
    setPass(isPass);
  }, [isSignInPass]);

  const handleSignin = () => {
    const requestData = {
      id: signinValue.id,
      password: signinValue.password,
    };

    requestPostLogin(requestData).then(resData => {
      if (!resData.status) {
        console.error("api 404 error => ", resData);
        return false;
      }

      setUserSiginData({ isSignin: true, ...resData.data as IResponseLogin });
      localStorage.hausAuth = JSON.stringify(resData.data);

      Router.push("/");
    });
  };

  return (
    <Button
      type='button'
      onClick={handleSignin}
      disabled={!pass}
    >로그인</Button>
  )
};

const Button = styled.button`
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

export default LoginButton;
