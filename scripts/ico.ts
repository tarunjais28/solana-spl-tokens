import * as anchor from "@project-serum/anchor";
import {
  getProvider,
  icoProgramID,
  icoProgramInterface,
} from "./solanaService";
import { Ico } from "../target/types/ico";
import { Program } from "@project-serum/anchor";
import { BN } from "bn.js";
import {
  TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  AdminAddress,
  MAINTAINERS,
  CONFIG,
  WHITELIST,
  ESCROW,
  VAULT,
  ESCROW_KEY,
} from "./constant";
import * as fs from "fs";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const { provider }: any = getProvider();
if (!provider) throw new Error("Provider not available");
let program: any = new anchor.Program(
  icoProgramInterface,
  icoProgramID,
  provider,
) as Program<Ico>;

const [pdaMaintainers] = anchor.web3.PublicKey.findProgramAddressSync(
  [MAINTAINERS],
  program.programId,
);

const [pdaEscrow] = anchor.web3.PublicKey.findProgramAddressSync(
  [ESCROW],
  program.programId,
);

const [pdaEscrowKey] = anchor.web3.PublicKey.findProgramAddressSync(
  [ESCROW_KEY],
  program.programId,
);

const [pdaVault] = anchor.web3.PublicKey.findProgramAddressSync(
  [VAULT],
  program.programId,
);

const [pdaWhitelist] = anchor.web3.PublicKey.findProgramAddressSync(
  [WHITELIST],
  program.programId,
);

const [pdaConfig] = anchor.web3.PublicKey.findProgramAddressSync(
  [CONFIG],
  program.programId,
);

const charity = new PublicKey("GNnmzRpoMrHVNwKSZnPNhp4gMT57GseWDGQD2iYvqSBP");
const owner = new PublicKey("C2EgnSismtrSa1mBGmLBpRkemLgZPc5myS5H2AqGKKQE");
const marketing = new PublicKey("4Z2MHbzdpsv5hRrttuoqg7ATPjYX68oSfafWSxx9Yy2Z");
const receiver = new PublicKey("8oxUFYpwHUiPMQtVkeDdyiKLSaHtdG78Gt6Um8fiRhPT");
const ownership = new PublicKey("EHtEt4rTCBexBZz3DWk8Y2znvAoazdqUtQBr8b5NqdfG");
// const mintAccount = new PublicKey(
//   "BXY5wG24dGEKacDPTgN6GfsgdWAhEBvnwKKdnk1JAUan",
// );
const mintAccount = new PublicKey(
  "5vF3FnUWtgfeCupdMDCRBbZYR9tHcAdQDPBNJk3BU2Kr",
);

const addSubAdmins = async () => {
  await program.methods
    .addSubAdminAccounts([ownership])
    .accounts({
      maintainers: pdaMaintainers,
      authority: AdminAddress,
    })
    .rpc();
};

const initIcoProgram = async () => {
  let initParams = {
    royalty: 1,
    tokensPerSol: new BN(150),
    whitelists: [charity, owner, marketing, receiver, ownership],
  };

  // Test initialize instruction
  await program.methods
    .init(initParams)
    .accounts({
      maintainers: pdaMaintainers,
      config: pdaConfig,
      whitelist: pdaWhitelist,
      vaultAccount: pdaVault,
      escrowKey: pdaEscrowKey,
      escrowAccount: pdaEscrow,
      receiver,
      mintAccount,
      authority: AdminAddress,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();
};

const initIcoResources = async () => {
  await program.methods
    .initResourceAccounts()
    .accounts({
      vaultAccount: pdaVault,
      escrowAccount: pdaEscrow,
      mintAccount,
      authority: AdminAddress,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();
};

const fetchMaintainers = async () => {
  let maintainers = await program.account.maintainers.fetch(pdaMaintainers);
  console.log(maintainers.admin.toString());
  console.log(maintainers.subAdmins.toString());
};

const setConfig = async () => {
  let royalty = 1;
  let tokensPerSol = new BN(150);

  await program.methods
    .setConfig(royalty, tokensPerSol)
    .accounts({
      maintainers: pdaMaintainers,
      config: pdaConfig,
      caller: AdminAddress,
    })
    .rpc();
};

const getIcoBaseKeys = async () => {
  console.log("config", pdaConfig.toString());
  console.log("maintainers", pdaMaintainers.toString());
  console.log("pdaWhitelist", pdaWhitelist.toString());
  console.log("pdaEscrow", pdaEscrow.toString());
  console.log("pdaEscrowKey", pdaEscrowKey.toString());
  console.log("pdaVault", pdaVault.toString());
};

const fetchBalances = async () => {
  let userATA = await getAssociatedTokenAddress(mintAccount, AdminAddress);
  console.log("user: ", AdminAddress.toString());
  console.log("ata: ", userATA.toString());

  let supply = (await provider.connection.getTokenSupply(mintAccount)).value
    .amount;

  let userAccountBalance = Number(
    (await getAccount(provider.connection, userATA)).amount,
  );

  console.log("supply: ", supply);
  console.log("user balance: ", userAccountBalance);
};

const fetchContractBalances = async () => {
  let escrowBalance = (await getAccount(provider.connection, pdaEscrow)).amount;

  let vaultBalance = (await getAccount(provider.connection, pdaVault)).amount;

  console.log("escrow balance: ", escrowBalance);
  console.log("vault balance: ", vaultBalance);
};

const updateTokenProgramAdmin = async (admin: PublicKey) => {
  await program.methods
    .manageAdmin(admin)
    .accounts({
      maintainers: pdaMaintainers,
      authority: AdminAddress,
    })
    .rpc();
};

const setEscrow = async () => {
  await program.methods
    .updateEscrow(AdminAddress)
    .accounts({
      maintainers: pdaMaintainers,
      escrowKey: pdaEscrowKey,
      authority: AdminAddress,
    })
    .rpc();
};

const buyWithSol = async () => {
  let user = new PublicKey("ArZEdFt7rq9Eoc1T4DoppEYh9vrdBHgLATxsFKRytfxr");

  const rawPayerKeypair = JSON.parse(
    fs.readFileSync("/home/tarunjais/.config/solana/id.json", "utf-8"),
  );
  const adminKey = anchor.web3.Keypair.fromSecretKey(
    Buffer.from(rawPayerKeypair),
  );

  // Creating associated token for user for Test
  let userATA = await getOrCreateAssociatedTokenAccount(
    provider.connection,
    adminKey,
    mintAccount,
    AdminAddress,
  );

  let solAmount = new BN(LAMPORTS_PER_SOL);

  await program.methods
    .buyWithSol(solAmount)
    .accounts({
      mintAccount,
      config: pdaConfig,
      user: AdminAddress,
      whitelist: pdaWhitelist,
      escrowAccount: pdaEscrow,
      escrowKey: pdaEscrowKey,
      receiver,
      userAta: userATA.address,
      vaultAccount: pdaVault,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

export {
  fetchMaintainers,
  updateTokenProgramAdmin,
  initIcoProgram,
  addSubAdmins,
  fetchBalances,
  buyWithSol,
  getIcoBaseKeys,
  fetchContractBalances,
  setConfig,
  setEscrow,
  initIcoResources,
};
