/*
  Create a new TileDocument.
  Uses the seed in config.js to control the write permissions.
*/

// Global npm packages
import { CeramicClient } from "@ceramicnetwork/http-client";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { DID } from "dids";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Ed25519Provider } from "key-did-provider-ed25519";

// Local libraries
import config from "./config.js";

// Constants
const API_URL = config.ceramicHost;

async function start() {
  try {
    // Instantiate Ceramic HTTP JS client. Connect to the cloud node I set up.
    const ceramic = new CeramicClient(API_URL);

    // Instance a DID resolver.
    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic)
    };
    const did = new DID({ resolver });
    ceramic.did = did;

    // Key DID Provider Ed25519
    const seed = Uint8Array.from(Buffer.from(config.seed, "hex"));
    const provider = new Ed25519Provider(seed);
    ceramic.did.setProvider(provider);
    await ceramic.did.authenticate();
    console.log(`DID ID: ${ceramic.did.id.toString()}`);

    // Create the TileDocument
    const doc = await TileDocument.create(ceramic, { hello: "world" });

    console.log(doc.content);

    const streamId = doc.id.toString();
    console.log(`streamId: ${streamId}`);
  } catch (err) {
    console.log(err);
  }
}
start();
