/*
  Generate a seed that works as a private key.
*/

import { randomBytes } from "@stablelib/random";

function createSeed() {
  try {
    const seed = randomBytes(32);
    console.log(`seed: ${seed.toString(16)}`);
  } catch (err) {
    console.error(err);
  }
}
createSeed();
