import { atom } from 'recoil';

export const cryptoKeyState = atom({
  key: "cryptoKeyState",
  default: {
    key: null,
    salt: null
  }
});