const password = "1234";

export function getRandomBytes(amount: number = 16) {
  return window.crypto.getRandomValues(new Uint8Array(amount));
}

export async function deriveKey(pass: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = (new TextEncoder()).encode(pass);
  const imported = await window.crypto.subtle.importKey(
    "raw",
    enc,
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
  return window.crypto.subtle.deriveKey(
    {
      "name": "PBKDF2",
      salt,
      "iterations": 100000,
      "hash": "SHA-256"
    },
    imported,
    { "name": "AES-CTR", "length": 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(key: CryptoKey, text: string): Promise<[Uint8Array, Uint8Array]> {
  const encoded = (new TextEncoder()).encode(text);
  const counter = window.crypto.getRandomValues(new Uint8Array(16));
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter,
      length: 64
    },
    key,
    encoded
  );
  return [counter, new Uint8Array(ciphertext)];
}

export async function decrypt(key: CryptoKey, counter: Uint8Array, ciphertext: Uint8Array) {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-CTR",
      counter,
      length: 64
    },
    key,
    ciphertext
  );
  return (new TextDecoder()).decode(decrypted);
}