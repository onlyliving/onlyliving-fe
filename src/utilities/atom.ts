import { atom } from 'recoil';
import { IUserSigninData } from './apiFunc';

interface IPassState {
  userId: boolean;
  password: boolean;
}

export const signinPassState = atom<IPassState>({
  key: 'signinPassState',
  default: {
    userId: false,
    password: false,
  },
});

interface ISigninValueState {
  id: string;
  password: string;
}
export const signinValueState = atom<ISigninValueState>({
  key: 'signinValueState',
  default: {
    id: '',
    password: '',
  },
});

interface ISigininState {
  isSignin: boolean;
  data?: IUserSigninData;
}

export const signinState = atom<ISigininState>({
  key: 'signinState',
  default: {
    isSignin: false,
  },
});
