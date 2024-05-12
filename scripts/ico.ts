import * as anchor from "@project-serum/anchor";
import { getProvider, icoProgramInterface } from "./solanaService";
import { Ico } from "../target/types/ico";
import { Program } from "@project-serum/anchor";
import { BN } from "bn.js";
import {
  TOKEN_2022_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  AdminAddress,
  MAINTAINERS,
  CONFIG,
  MINT,
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

const addSubAdmins = async () => {
  await program.methods
    .addSubAdminAccounts([
      new PublicKey("ArZEdFt7rq9Eoc1T4DoppEYh9vrdBHgLATxsFKRytfxr"),
    ])
    .accounts({
      maintainers: pdaMaintainers,
      authority: AdminAddress,
    })
    .rpc();
};

const initIcoProgram = async () => {
  await program.methods
    .init([])
    .accounts({
      maintainers: pdaMaintainers,
      whitelist: pdaWhitelist,
      authority: AdminAddress,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
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
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

const getBaseKeys = async () => {
  console.log("mint", mintAccount.toString());
  console.log("config", pdaConfig.toString());
  console.log("maintainers", pdaMaintainers.toString());
  console.log("pdaWhitelist", pdaWhitelist.toString());
  console.log("pdaEscrow", pdaEscrow.toString());
  console.log("pdaEscrowKey", pdaEscrowKey.toString());
  console.log("pdaVault", pdaVault.toString());

  // let supply = await provider.connection.getTokenSupply(mintAccount);
  // console.log(Number(supply.value.amount));
};

const fetchBalances = async () => {
  let user = new PublicKey("ArZEdFt7rq9Eoc1T4DoppEYh9vrdBHgLATxsFKRytfxr");
  let userATA = await getAssociatedTokenAddress(
    mintAccount,
    user,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );
  console.log("user: ", user.toString());
  console.log("ata: ", userATA.toString());

  let supply = (await provider.connection.getTokenSupply(mintAccount)).value
    .amount;

  let userAccountBalance = Number(
    (
      await getAccount(
        provider.connection,
        userATA,
        undefined,
        TOKEN_2022_PROGRAM_ID,
      )
    ).amount,
  );

  console.log("supply: ", supply);
  console.log("user balance: ", userAccountBalance);
};

const fetchContractBalances = async () => {
  let escrowBalance = (
    await getAccount(
      provider.connection,
      pdaEscrow,
      undefined,
      TOKEN_2022_PROGRAM_ID,
    )
  ).amount;

  let vaultBalance = (
    await getAccount(
      provider.connection,
      pdaVault,
      undefined,
      TOKEN_2022_PROGRAM_ID,
    )
  ).amount;

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
      SystemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

const mint = async () => {
  // let user = new PublicKey("ArZEdFt7rq9Eoc1T4DoppEYh9vrdBHgLATxsFKRytfxr");

  let tokenParams = {
    name: TEST_TOKEN,
    amount: new BN((1000000 * LAMPORTS_PER_SOL * 40) / 100),
  };

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
    undefined,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );

  await program.methods
    .mintToken(tokenParams)
    .accounts({
      maintainers: pdaMaintainers,
      mintAccount,
      toAccount: userATA.address,
      authority: AdminAddress,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
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
    undefined,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );

  let vaultAta = await getAssociatedTokenAddress(
    mintAccount,
    user,
    undefined,
    TOKEN_2022_PROGRAM_ID,
  );

  let buyWithSolParams = {
    token: TEST_TOKEN,
    solAmount: new BN(1 * LAMPORTS_PER_SOL),
  };

  await program.methods
    .buyWithSol(buyWithSolParams)
    .accounts({
      mintAccount,
      config: pdaConfig,
      user: AdminAddress,
      whitelist: pdaWhitelist,
      escrowAccount: pdaEscrow,
      escrowKey: pdaEscrowKey,
      adminAccount: AdminAddress,
      vaultAccount: pdaVault,
      userAta: userATA.address,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
};

export {
  fetchMaintainers,
  updateTokenProgramAdmin,
  initIcoProgram,
  addSubAdmins,
  createToken,
  initResources,
  mint,
  fetchBalances,
  buyWithSol,
  getBaseKeys,
  fetchContractBalances,
  setConfig,
  setEscrow,
};
