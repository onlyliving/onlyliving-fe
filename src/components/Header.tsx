import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRecoilState } from "recoil";
import { signinState } from '../utilities/atom';

const Header: React.FC = () => {
  const [userSiginData, setUserSiginData] = useRecoilState(signinState);

  const handleLogout = () => {
    setUserSiginData({ isSignin: false });
  }

  return (
    <HeaderBox>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {
        userSiginData.isSignin && userSiginData.data ?
          <LoginBox>
            <UserName>
              {userSiginData.data.user.NAME}
            </UserName>
            <LoginBtn type="button" onClick={handleLogout}>logout</LoginBtn>
          </LoginBox>
          :
          <Link href='/login'>
            <LoginBox>
              <LoginBtn type="button">login</LoginBtn>
            </LoginBox>
          </Link>
      }
    </HeaderBox>
  )
};

export default Header;

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const LoginBox = styled.div`
  text-align: right;
	font-size: 20px;
`;

const UserName = styled.em`
  color: #747474;
  display: block;
  font-size: 18px;
`;

const LoginBtn = styled.button`
  font-weight: 700;
  cursor: pointer
`;
