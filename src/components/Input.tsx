import React, { useRef, useState } from "react";
import styled from 'styled-components';
import { handleInputVaild } from '../utilities';
import { useRecoilState } from 'recoil';
import { signinPassState, signinValueState } from '../utilities/atom';

interface Props {
  name: 'userId' | 'password';
  inputTitle: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

const Input: React.FC<Props> = ({
  name,
  inputTitle,
  min,
  max,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVaild, setInputVaild] = useState<{ result: boolean, msg: string }>();
  const [isSignInPass, setIsSignInPass] = useRecoilState(signinPassState);
  const [signinValue, setSigninValue] = useRecoilState(signinValueState);

  return (
    <InputContainer>
      <LabelBox htmlFor={name}>{inputTitle}</LabelBox>
      <InputBox
        type={name === "password" ? "password" : "text"}
        minLength={min}
        maxLength={max}
        id={name}
        name={name}
        onBlur={e => {
          const { result, msg } = handleInputVaild(e, inputTitle);
          setInputVaild(handleInputVaild(e, inputTitle));
          setIsSignInPass({ ...isSignInPass, [name]: result })
          setSigninValue({ ...signinValue, [name === "userId" ? "id" : name]: e.target.value })
        }}

        placeholder={placeholder}
        ref={inputRef}
      />
      <InputMsg className="input-msg input-msg__default">{
        inputVaild?.result === false ? inputVaild.msg : ""
      }</InputMsg>
    </InputContainer>
  )
}

export default Input;

const InputContainer = styled.div`
    margin: 16px auto;
    width: 100%;
`;

const InputBox = styled.input`
    width: 100%;
    display: block;
    padding: 16px;
    margin-top: 8px;
    background: #F7F7FA;
    border-radius: 12px;
`;

const LabelBox = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 13px;
    color: #6C6C7D;
`;

const InputMsg = styled.p`
	margin-top: 8px;
	font-weight: 400;
	font-size: 13px;
	color: #ED4E5C;
`;
