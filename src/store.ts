import { atom } from 'recoil';

export const cryptoKeyState = atom<CryptoKey>({
  key: "cryptoKeyState",
  default: null
});