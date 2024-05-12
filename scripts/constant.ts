import { PublicKey } from "@solana/web3.js";

export const ICO_PROGRAM_ID: string =
  "EpVxtDLVHNtLHH1aXgSsCAHs6JAcAz2DwfESLEpiqpKo";

export const RECEIVER_PROGRAM_ID: string =
  "A5nYM6ba7vZEsKijDtfKLVcfEG4S2Ec5kJ4AjAv5qSRK";

export const AdminAddress: PublicKey = new PublicKey(
  "FDFAEes1Tc4WbZeD6aJ25VHPUiUJVFDzUW3abiDRKmXD",
);

export const MINT = Buffer.from("mint");
export const MAINTAINERS = Buffer.from("maintainers");
export const CONFIG = Buffer.from("config");
export const RECEIVED = Buffer.from("received");
export const PAYLOAD = Buffer.from("payload");
export const TEST_TOKEN = "Mad Panda";
export const WHITELIST = Buffer.from("whitelist");
export const ESCROW = Buffer.from("escrow");
export const ESCROW_KEY = Buffer.from("escrow_key");
export const VAULT = Buffer.from("vault");
export const USER_DATA = Buffer.from("user_data");
