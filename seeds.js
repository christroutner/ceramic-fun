/*
  Demonstrates how to generate a new DID seed, then save that seed as a hex
  string, and finally how to restore the hex to a seed that can be used.

  Based on this ed25519 Key DID provider library:
  https://www.npmjs.com/package/key-did-provider-ed25519
  Which uses 32 byte Uint8Arrays as a seed.

  Inspired by this Ceramic documentation on this DID provider:
  https://developers.ceramic.network/authentication/key-did/provider/#installation
*/

import { randomBytes } from "@stablelib/random";

// Create a new seed and convert it to a hexidecimal string.
function createSeed() {
  try {
    const seed = randomBytes(32);
    console.log("Initial seed: ", seed);

    const hexStr = Buffer.from(seed).toString("hex");
    console.log(`hex string: ${hexStr}`);
  } catch (err) {
    console.error(err);
  }
}
// createSeed();

// Convert a previously saved hex string into a seed.
function loadSeed() {
  try {
    const hex =
      "63aad6ce43ed2c59e1e915b150b2e28f6e9fdbf898c89044fee8501f4377be96";
    console.log(`Starting hex: ${hex}`);

    const seed = Uint8Array.from(Buffer.from(hex, "hex"));
    console.log("seed: ", seed);
  } catch (err) {
    console.error(err);
  }
}
loadSeed();
