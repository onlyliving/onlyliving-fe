import React from 'react';

export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export const addComma = (str: string) => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

export const handleInputVaild = (
  event: React.FocusEvent,
  title: string
): { result: boolean; msg: string } => {
  const targetEl = event.target as HTMLInputElement;
  const getValue = targetEl.value;
  const name = targetEl.name as 'userId' | 'password';

  if (!getValue) {
    return {
      result: false,
      msg: `${title}를 입력해주세요.`,
    };
  }

  if (name === 'userId') {
    if (isVaild(targetEl.value, 'userId')) {
      return {
        result: true,
        msg: '올바른 아이디 형식입니다.',
      };
    }

    return {
      result: false,
      msg: '올바른 아이디 형식으로 입력해주세요.',
    };
  }

  if (isVaild(targetEl.value, 'password')) {
    return {
      result: true,
      msg: '올바른 비밀번호 형식입니다.',
    };
  }

  return {
    result: false,
    msg: '올바른 비밀번호 형식으로 입력헤주세요.',
  };
};

export const isVaild = (str: string, inputName: 'password' | 'userId'): boolean => {
  const REGEX: { [key: string]: RegExp } = {
    userId: /[A-Za-z0-9]{5,30}$/, // 영문 대, 소문자, 숫자만 가능
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$/, // 영문 대문자, 영문 소문자, 숫자 모두 포함되어야 함.
  };

  return REGEX[inputName].test(str);
};

const errorMsg = {
  MSG_SYSTEM_FAIL: '잘못된 접근입니다. 관리자에게 문의주세요.',
  MSG_NETWORK_FAIL: '서버와의 연결에 실패했습니다. 관리자에게 문의주세요.',
};

export const requestGET = (url: string, ackFunc: (status: number, resData: any) => any) => {
  if (!url) {
    alert(errorMsg.MSG_SYSTEM_FAIL);
    return false;
  }

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.send();

  request.onerror = () => {
    alert(errorMsg.MSG_NETWORK_FAIL);
    return false;
  };

  request.onload = async () => {
    if (request.status >= 200 && request.status < 500) {
      if (request.status === 204) {
        return ackFunc(request.status, null);
      }

      return ackFunc(request.status, JSON.parse(request.response));
    }

    return ackFunc(request.status, null);
  };

  request.addEventListener('loadend', () => {
    console.log('%c XHR - GET - LOADEND', 'color:gray');
  });
};

export const requestPOST = (
  url: string,
  data: any,
  ackFunc: (status: number, resData: any) => any
) => {
  console.log(`%c requestPOST function`, 'color:gray');

  if (!url) {
    alert(errorMsg.MSG_SYSTEM_FAIL);
    return false;
  }

  console.log('%c XHR - POST', 'color:gray');

  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(data));

  request.onerror = () => {
    console.error(errorMsg.MSG_NETWORK_FAIL);
    return false;
  };

  request.onload = async () => {
    if (request.status >= 200 && request.status < 500) {
      if (request.status === 204) {
        return ackFunc(request.status, null);
      }

      return ackFunc(request.status, JSON.parse(request.response));
    }
    return ackFunc(request.status, null);
  };

  request.addEventListener('loadend', () => {
    console.log('%c XHR - POST - LOADEND', 'color:gray');
  });
};
