import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Error with ${res.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, dataUpload) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUpload),
      }),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Error with ${res.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};
