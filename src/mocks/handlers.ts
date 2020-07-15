import { rest } from 'msw';
import { getRandomBytes } from '../crypto';
import * as localForage from 'localforage';

export const handlers = [
  rest.get('/salt', async (req, res, ctx) => {
    let salt: Uint8Array = await localForage.getItem("mock-master-salt");
    if (!salt) {
      salt = getRandomBytes();
      localForage.setItem("mock-master-salt", salt);
    }

    return res(
      ctx.status(200),
      ctx.json({
        salt: Array.from(salt)
      })
    )
  })

];
