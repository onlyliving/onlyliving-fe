import { requestPOST, requestGET } from './index';

interface IRequestLogin {
  id: string;
  password: string;
}

export interface IUserSigninData {
  accessToken: string;
  user: {
    ID: string;
    NAME: string;
  };
}
export interface IResponseLogin {
  data: IUserSigninData;
}

export const requestPostLogin = (
  requestData: IRequestLogin
): Promise<{
  status: boolean;
  data: IResponseLogin | IResponseError;
}> => {
  console.log('> requestPostLogin');
  return new Promise((resolve, reject) => {
    requestPOST('/login', requestData, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseLogin,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseError,
        });
      }
    });
  });
};

export interface IResponseUserInfo {
  data: {
    user: {
      id: string;
      name: string;
    };
  };
}

interface IResponseError {
  error: {
    message: string;
  };
}

export const requestGetUserInfo = (urlQueryData: {
  userId: string;
}): Promise<{
  status: boolean;
  data: IResponseUserInfo | IResponseError;
}> => {
  console.log('> requestGetUserInfo');
  const { userId } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/users/${userId}`, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseUserInfo,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseError,
        });
      }
    });
  });
};

interface IProduct {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
}

interface IResponseProducts {
  data: {
    totalCount: number;
    products: IProduct[];
  };
}

export const requestGetProducts = (urlQueryData: {
  page: number;
  size: number;
}): Promise<{
  status: boolean;
  result: IResponseProducts | IResponseError;
}> => {
  console.log('> requestGetProducts');
  const { page, size } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/products?page=${page}&size=${size}`, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          result: resData as IResponseProducts,
        });
      } else {
        resolve({
          status: true,
          result: resData as IResponseError,
        });
      }
    });
  });
};

interface IResponseProductDetail {
  data: {
    product: IProduct;
  };
}

export const requestGetProductDetail = (urlQueryData: {
  productId: string;
}): Promise<{
  status: boolean;
  data: IResponseProductDetail | IResponseError;
}> => {
  console.log('> requestGetProductDetail');
  const { productId } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/products/${productId}`, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseProductDetail,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseError,
        });
      }
    });
  });
};
