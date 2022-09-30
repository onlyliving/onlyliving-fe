import { requestPOST, requestGET } from './index';

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

export const requestPostLogin = (requestData: {
  id: string;
  password: string;
}): Promise<{
  status: boolean;
  data: IResponseLogin | IResponseError;
}> => {
  return new Promise((resolve, reject) => {
    requestPOST('/login', requestData, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseError,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseLogin,
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
  const { userId } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/users/${userId}`, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseError,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseUserInfo,
        });
      }
    });
  });
};

export interface IProduct {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
}

export interface IResponseProducts {
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
  const { page, size } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/products?page=${page}&size=${size}`, (status, resData) => {
      console.log(`%c /products?page=${page}&size=${size}`, 'color:yellow');
      if (status === 404) {
        resolve({
          status: false,
          result: resData as IResponseError,
        });
      } else {
        resolve({
          status: true,
          result: resData as IResponseProducts,
        });
      }
    });
  });
};

export interface IResponseProductDetail {
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
  const { productId } = urlQueryData;
  return new Promise((resolve, reject) => {
    requestGET(`/products/${productId}`, (status, resData) => {
      if (status === 404) {
        resolve({
          status: false,
          data: resData as IResponseError,
        });
      } else {
        resolve({
          status: true,
          data: resData as IResponseProductDetail,
        });
      }
    });
  });
};
