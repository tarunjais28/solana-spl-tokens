import * as web3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import icoProgramIDL from "../target/idl/ico.json";
import receiverProgramIDL from "../target/idl/receiver.json";
import { RECEIVER_PROGRAM_ID, ICO_PROGRAM_ID } from "./constant";
import * as fs from "fs";

export const icoProgramID = new PublicKey(ICO_PROGRAM_ID);
export const receiverProgramID = new PublicKey(RECEIVER_PROGRAM_ID);

export const icoProgramInterface = JSON.parse(JSON.stringify(icoProgramIDL));

export const receiverProgramInterface = JSON.parse(
  JSON.stringify(receiverProgramIDL),
);

const solanaNetwork = web3.clusterApiUrl("devnet");
const opts: any = {
  preflightCommitment: "processed",
};

export const getProvider = (): {
  provider: AnchorProvider;
  connection: web3.Connection;
} => {
  try {
    //Creating a provider, the provider is authenication connection to solana
    const connection = new web3.Connection(
      solanaNetwork,
      opts.preflightCommitment,
    );

    // /// With Private Key
    // const privateKeyWallet = anchor.web3.Keypair.fromSecretKey(
    //   bs58.decode(AdminPrivateKey),
    // );

    /// With config file
    const rawPayerKeypair = JSON.parse(
      fs.readFileSync("/home/tarunjais/.config/solana/id.json", "utf-8"),
    );
    const privateKeyWallet = anchor.web3.Keypair.fromSecretKey(
      Buffer.from(rawPayerKeypair),
    );

    const provider: any = new AnchorProvider(
      connection,
      new NodeWallet(privateKeyWallet),
      opts,
    );
    return { provider, connection };
  } catch (error) {
    console.log("provider:solana", error);
    throw error;
  }
};
