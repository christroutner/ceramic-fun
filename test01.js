/*
 */

// Global npm packages
import { CeramicClient } from "@ceramicnetwork/http-client";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { DID } from "dids";
import { TileDocument } from "@ceramicnetwork/stream-tile";
// const ThreeIdProvider = require("3id-did-provider");
import { randomBytes } from "@stablelib/random";

// Handle CommonJS packages.
import threeIdProvider from "3id-did-provider";
const ThreeIdProvider = threeIdProvider.default;

// Local libraries
import config from "./config.js";

// Constants
const API_URL = config.ceramicHost;

async function start() {
  try {
    console.log("hello world");

    const ceramic = new CeramicClient(API_URL);

    // Instance a DID resolver.
    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(ceramic)
    };
    const did = new DID({ resolver });
    ceramic.did = did;

    await ceramic.did.authenticate();

    console.log(`DID ID: ${ceramic.did.id.toString()}`);

    // Load the stream itself
    // const streamId =
    //   "kjzl6cwe1jw149oxx185e2mtxanxug96pxnxy01ilmicgyaku4tdjedui6lhr4y";
    // const stream = await ceramic.loadStream(streamId);
    // console.log("stream: ", stream);

    // Load a specific commit
    // const commitId =
    //   "k3y52l7qbv1frycxd6wpyc2qcsru8ojlbsfe9dsas9s2gojv86a8w9yagxawu8z5s";
    // const stream = await ceramic.loadStream(commitId);
    // console.log("stream: ", stream);

    // const provider = await getProvider(ceramic);
    // ceramic.did.setProvider(provider);
    // await ceramic.did.authenticate();
    // console.log(`DID ID: ${ceramic.did.id.toString()}`);

    // const content = { foo: "bar", cnt: 0 };
    //
    // const doc = await TileDocument.create(ceramic, content);
    // const streamId = doc.id.toString();
    // console.log(`TileDocument created with Stream ID: ${streamId}`);
  } catch (err) {
    console.log(err);
  }
}
start();

// Simulate a 3ID provider
async function getProvider(ceramic) {
  try {
    const getPermission = async request => {
      console.log("request: ", request);
      return request.payload.paths;
    };

    const seed = randomBytes(32);

    const authId = "myAuthenticationMethod";

    const threeId = await ThreeIdProvider.create({
      getPermission,
      seed,
      ceramic
    });
    const provider = threeId.getDidProvider();

    return provider;
  } catch (err) {
    console.error("Error in getProvider(): ", err);
    throw err;
  }
}
