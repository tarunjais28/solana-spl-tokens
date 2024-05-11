import { PublicKey } from "@solana/web3.js";

export const TOKEN_PROGRAM_ID: string =
  "CCazZm7etsEJ8ncqG9PnWPLg4wgaHBgtQwD1GAPsboxt";

export const RECEIVER_PROGRAM_ID: string =
  "A5nYM6ba7vZEsKijDtfKLVcfEG4S2Ec5kJ4AjAv5qSRK";

export const AdminAddress: PublicKey = new PublicKey(
  "FDFAEes1Tc4WbZeD6aJ25VHPUiUJVFDzUW3abiDRKmXD",
);

export const MINT = Buffer.from("mint");
export const MAINTAINERS = Buffer.from("maintainers");
export const CONFIG = Buffer.from("config");
export const PARTIAL_FREEZE = Buffer.from("partial_freeze");
export const EXECUTER = Buffer.from("executer");
export const THRESHOLD = Buffer.from("threshold");
export const VALIDATORS = Buffer.from("validators");
export const RECEIVED = Buffer.from("received");
export const VOTES = Buffer.from("votes");
export const PAYLOAD = Buffer.from("payload");
export const TEST_TOKEN = "Mad Panda";
export const TEST = Buffer.from(TEST_TOKEN);
export const WHITELIST = Buffer.from("whitelist");
export const ESCROW = Buffer.from("escrow");
export const VAULT = Buffer.from("vault");
export const USER_DATA = Buffer.from("user_data");
