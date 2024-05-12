import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  getAccount,
  mintToChecked,
  createMint,
} from "@solana/spl-token";
import { BN } from "bn.js";
import { assert } from "chai";
import { Ico } from "../target/types/ico";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { it } from "node:test";

// Create test keypairs
const admin = anchor.web3.Keypair.generate();
const payer = anchor.web3.Keypair.generate();
const user1 = anchor.web3.Keypair.generate();
const user2 = anchor.web3.Keypair.generate();
const vault = anchor.web3.Keypair.generate();
const mintAuthority = anchor.web3.Keypair.generate();

// Create constant amount fields
const MINT_AMOUNT = 1_000_000 * LAMPORTS_PER_SOL;
const TOKEN_AMOUNT = new BN(150);

// Constant seeds
const MAINTAINERS = Buffer.from("maintainers");
const CONFIG = Buffer.from("config");
const WHITELIST = Buffer.from("whitelist");
const VAULT = Buffer.from("vault");
const ESCROW = Buffer.from("escrow");
const ESCROW_KEY = Buffer.from("escrow_key");

describe("ico", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Ico as Program<Ico>;

  // Declare PDAs
  let mintAccount = null;

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

  const confirmTransaction = async (tx) => {
    const latestBlockHash = await provider.connection.getLatestBlockhash();

    await provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: tx,
    });
  };

  const setEscrow = async (address) => {
    let setEscrow = await program.methods
      .updateEscrow(address)
      .accounts({
        maintainers: pdaMaintainers,
        escrowKey: pdaEscrowKey,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(setEscrow);
  };

  const transfer = async (transferParams, fromATA, toATA) => {
    // Test transfer token instruction
    let transferToken = await program.methods
      .transferTokens(transferParams)
      .accounts({
        config: pdaConfig,
        whitelist: pdaWhitelist,
        mintAccount,
        escrowAccount: pdaEscrow,
        fromAccount: fromATA,
        toAccount: toATA,
        authority: user1.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user1])
      .rpc();

    await confirmTransaction(transferToken);
  };

  const manageWhitelists = async (updateType, users) => {
    let manageWhitelist = await program.methods
      .manangeWhitelistUsers(updateType, users)
      .accounts({
        maintainers: pdaMaintainers,
        whitelist: pdaWhitelist,
        authority: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(manageWhitelist);
  };

  const buyWithSol = async (solAmount, user, userAta) => {
    let buyWithSol = await program.methods
      .buyWithSol(solAmount)
      .accounts({
        mintAccount,
        config: pdaConfig,
        user: user.publicKey,
        whitelist: pdaWhitelist,
        escrowAccount: pdaEscrow,
        escrowKey: pdaEscrowKey,
        receiver: vault.publicKey,
        userAta,
        vaultAccount: pdaVault,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    await confirmTransaction(buyWithSol);
  };

  it("Initialize test accounts", async () => {
    // Airdrop sol to the test users
    let adminSol = await provider.connection.requestAirdrop(
      admin.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(adminSol);

    let payerSol = await provider.connection.requestAirdrop(
      payer.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(payerSol);

    let user1Sol = await provider.connection.requestAirdrop(
      user1.publicKey,
      1000 * anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(user1Sol);

    let user2Sol = await provider.connection.requestAirdrop(
      user2.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(user2Sol);

    let mintAuthoritySol = await provider.connection.requestAirdrop(
      mintAuthority.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(mintAuthoritySol);

    let vaultSol = await provider.connection.requestAirdrop(
      vault.publicKey,
      anchor.web3.LAMPORTS_PER_SOL,
    );
    await confirmTransaction(vaultSol);

    // Create mint token with decimals
    mintAccount = await createMint(
      provider.connection,
      payer,
      mintAuthority.publicKey,
      null,
      9,
    );
  });

  it("Initialize global account", async () => {
    let initParams = {
      royalty: 1,
      tokensPerSol: TOKEN_AMOUNT,
      whitelists: [payer.publicKey],
    };

    // Test initialize instruction
    let init = await program.methods
      .init(initParams)
      .accounts({
        maintainers: pdaMaintainers,
        config: pdaConfig,
        whitelist: pdaWhitelist,
        vaultAccount: pdaVault,
        escrowKey: pdaEscrowKey,
        escrowAccount: pdaEscrow,
        receiver: vault.publicKey,
        mintAccount,
        authority: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(init);

    let maintainers = await program.account.maintainers.fetch(pdaMaintainers);
    assert.equal(maintainers.admin.toString(), admin.publicKey.toString());
    assert.isTrue(
      JSON.stringify(maintainers.subAdmins).includes(
        JSON.stringify(admin.publicKey),
      ),
    );

    let whitelist = await program.account.whitelistedUser.fetch(pdaWhitelist);
    assert.isTrue(
      JSON.stringify(whitelist.users).includes(JSON.stringify(payer.publicKey)),
    );

    let escrowKey = await program.account.escrowKey.fetch(pdaEscrowKey);
    assert.equal(escrowKey.key.toBase58(), vault.publicKey.toBase58());

    let config = await program.account.configuration.fetch(pdaConfig);
    assert.equal(Number(config.tokensPerSol), Number(initParams.tokensPerSol));
    assert.equal(config.royalty, initParams.royalty);
  });

  it("Test Buy with Sol Token", async () => {
    // Creating associated token for user1 and Test
    let user1ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      payer,
      mintAccount,
      user1.publicKey,
    );

    let user1TokenAccount = await getAccount(
      provider.connection,
      user1ATA.address,
    );
    let user1TokenBalanceBefore = Number(user1TokenAccount.amount);
    let user1SolBalanceBefore = await provider.connection.getBalance(
      user1.publicKey,
    );

    let escrowTokenAccount = await getAccount(provider.connection, pdaEscrow);
    let escrowTokenBalanceBefore = Number(escrowTokenAccount.amount);

    // Mint tokens to user
    await mintToChecked(
      provider.connection,
      payer,
      mintAccount,
      pdaVault,
      mintAuthority,
      MINT_AMOUNT,
      9,
    );

    let vaultTokenAccount = await getAccount(provider.connection, pdaVault);
    let vaultTokenBalanceBefore = Number(vaultTokenAccount.amount);

    let vaultBalanceBefore = await provider.connection.getBalance(
      vault.publicKey,
    );

    let solAmount = new BN(LAMPORTS_PER_SOL);

    await buyWithSol(solAmount, user1, user1ATA.address);

    user1TokenAccount = await getAccount(provider.connection, user1ATA.address);
    let user1TokenBalanceAfter = Number(user1TokenAccount.amount);
    let user1SolBalanceAfter = await provider.connection.getBalance(
      user1.publicKey,
    );

    escrowTokenAccount = await getAccount(provider.connection, pdaEscrow);
    let escrowTokenBalanceAfter = Number(escrowTokenAccount.amount);

    vaultTokenAccount = await getAccount(provider.connection, pdaVault);
    let vaultTokenBalanceAfter = Number(vaultTokenAccount.amount);

    let vaultBalanceAfter = await provider.connection.getBalance(
      vault.publicKey,
    );

    // Check balances after buy
    assert.equal(
      user1SolBalanceAfter,
      user1SolBalanceBefore - Number(solAmount),
    );
    assert.equal(vaultBalanceAfter, vaultBalanceBefore + Number(solAmount));

    let config = await program.account.configuration.fetch(pdaConfig);

    let tokenAmount = Number(solAmount) * Number(config.tokensPerSol);
    let royaltyAmount = (config.royalty * tokenAmount) / 100;
    let transferrableAmount = tokenAmount - royaltyAmount;

    assert.equal(
      user1TokenBalanceAfter,
      user1TokenBalanceBefore + transferrableAmount,
    );
    assert.equal(
      vaultTokenBalanceAfter,
      vaultTokenBalanceBefore - (transferrableAmount + royaltyAmount),
    );
    assert.equal(
      escrowTokenBalanceAfter,
      escrowTokenBalanceBefore + royaltyAmount,
    );
  });

  it("Test Transfer Token", async () => {
    let transferParams = {
      toAccount: user1.publicKey,
      amount: new BN(50 * LAMPORTS_PER_SOL),
    };

    // Creating associated token for user1 and Test
    let user1ATA = await getAssociatedTokenAddress(
      mintAccount,
      user1.publicKey,
    );

    let user1Account = await getAccount(provider.connection, user1ATA);
    let user1BalanceBeforeTransfer = Number(user1Account.amount);

    let user2ATA = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      payer,
      mintAccount,
      user2.publicKey,
    );

    let user2Account = await getAccount(provider.connection, user2ATA.address);
    let user2BalanceBeforeTransfer = Number(user2Account.amount);

    let escrowTokenAccount = await getAccount(provider.connection, pdaEscrow);
    let escrowTokenBalanceBefore = Number(escrowTokenAccount.amount);

    await transfer(transferParams, user1ATA, user2ATA.address);

    user1Account = await getAccount(provider.connection, user1ATA);
    let user1BalanceAfterTransfer = Number(user1Account.amount);

    user2Account = await getAccount(provider.connection, user2ATA.address);
    let user2BalanceAfterTransfer = Number(user2Account.amount);

    escrowTokenAccount = await getAccount(provider.connection, pdaEscrow);
    let escrowTokenBalanceAfter = Number(escrowTokenAccount.amount);

    let config = await program.account.configuration.fetch(pdaConfig);
    let royaltyAmount = (config.royalty * Number(transferParams.amount)) / 100;
    let transferrableAmount = Number(transferParams.amount) - royaltyAmount;

    // Check balances after transfer
    assert.equal(
      user1BalanceAfterTransfer,
      user1BalanceBeforeTransfer - Number(transferParams.amount),
    );
    assert.equal(
      user2BalanceAfterTransfer,
      user2BalanceBeforeTransfer + Number(transferrableAmount),
    );
    assert.equal(
      escrowTokenBalanceAfter,
      escrowTokenBalanceBefore + royaltyAmount,
    );
  });

  it("Test Claim", async () => {
    let escrowAccountBalanceBefore = (
      await getAccount(provider.connection, pdaEscrow)
    ).amount;

    let userATA = await getAssociatedTokenAddress(mintAccount, user2.publicKey);
    let userAccountBalanceBefore = (
      await getAccount(provider.connection, userATA)
    ).amount;

    let claim = await program.methods
      .claim()
      .accounts({
        maintainers: pdaMaintainers,
        mintAccount: mintAccount,
        escrowAccount: pdaEscrow,
        toAccount: userATA,
        authority: admin.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(claim);

    let escrowAccountBalanceAfter = (
      await getAccount(provider.connection, pdaEscrow)
    ).amount;

    let userAccountBalanceAfter = (
      await getAccount(provider.connection, userATA)
    ).amount;

    // Checking balances
    assert.equal(Number(escrowAccountBalanceAfter), 0);
    assert.equal(
      Number(userAccountBalanceAfter),
      Number(userAccountBalanceBefore) + Number(escrowAccountBalanceBefore),
    );
  });

  it("Test Update Escrow Account", async () => {
    let escrow = await program.account.escrowKey.fetch(pdaEscrowKey);
    assert.equal(escrow.key.toBase58(), vault.publicKey.toBase58());

    await setEscrow(user2.publicKey);

    escrow = await program.account.escrowKey.fetch(pdaEscrowKey);
    assert.equal(escrow.key.toBase58(), user2.publicKey.toBase58());
  });

  it("Test Update Admin", async () => {
    let oldAdmin = (await program.account.maintainers.fetch(pdaMaintainers))
      .admin;
    assert.equal(oldAdmin.toString(), admin.publicKey.toString());

    let updateAdmin = await program.methods
      .manageAdmin(user1.publicKey)
      .accounts({
        maintainers: pdaMaintainers,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(updateAdmin);

    let newAdmin = (await program.account.maintainers.fetch(pdaMaintainers))
      .admin;
    assert.equal(newAdmin.toString(), user1.publicKey.toString());

    updateAdmin = await program.methods
      .manageAdmin(admin.publicKey)
      .accounts({
        maintainers: pdaMaintainers,
        authority: user1.publicKey,
      })
      .signers([user1])
      .rpc();

    await confirmTransaction(updateAdmin);
    newAdmin = (await program.account.maintainers.fetch(pdaMaintainers)).admin;
    assert.equal(oldAdmin.toString(), admin.publicKey.toString());
  });

  it("Test Add Sub Admins", async () => {
    let addSubAdmins = await program.methods
      .addSubAdminAccounts([user1.publicKey])
      .accounts({
        maintainers: pdaMaintainers,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(addSubAdmins);

    let maintainers = await program.account.maintainers.fetch(pdaMaintainers);
    assert.isTrue(
      JSON.stringify(maintainers.subAdmins).includes(
        JSON.stringify(user1.publicKey),
      ),
    );
  });

  it("Test Remove Sub Admins", async () => {
    let removeSubAdmins = await program.methods
      .removeSubAdminAccounts([user1.publicKey])
      .accounts({
        maintainers: pdaMaintainers,
        authority: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(removeSubAdmins);

    let maintainers = await program.account.maintainers.fetch(pdaMaintainers);
    assert.isFalse(
      JSON.stringify(maintainers.subAdmins).includes(
        JSON.stringify(user1.publicKey),
      ),
    );
  });

  it("Test Update Royalty", async () => {
    let royalty = 2;

    let updateRoyalty = await program.methods
      .updateRoyalty(royalty)
      .accounts({
        maintainers: pdaMaintainers,
        config: pdaConfig,
        caller: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(updateRoyalty);

    let newRoyalty = (await program.account.configuration.fetch(pdaConfig))
      .royalty;
    assert.equal(newRoyalty, royalty);
  });

  it("Test Update Tokens Per Sol Value", async () => {
    let tokensPerSol = new BN(1000);

    let updateTokensPerSol = await program.methods
      .updateTokensPerSol(tokensPerSol)
      .accounts({
        maintainers: pdaMaintainers,
        config: pdaConfig,
        caller: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    await confirmTransaction(updateTokensPerSol);

    let config = await program.account.configuration.fetch(pdaConfig);
    assert.equal(Number(config.tokensPerSol), Number(tokensPerSol));
  });

  it("Test add to whitelist", async () => {
    let users = [user1.publicKey, user2.publicKey];
    let updateType = { add: {} };

    // Check before whitelisting
    let whitelist = await program.account.whitelistedUser.fetch(pdaWhitelist);
    assert.equal(whitelist.users.length, 1);

    await manageWhitelists(updateType, users);

    // Check after whitelisting
    whitelist = await program.account.whitelistedUser.fetch(pdaWhitelist);
    assert.equal(whitelist.users.length, 3);
    assert.isTrue(
      JSON.stringify(whitelist.users).includes(JSON.stringify(payer.publicKey)),
    );
    assert.isTrue(
      JSON.stringify(whitelist.users).includes(JSON.stringify(user1.publicKey)),
    );
    assert.isTrue(
      JSON.stringify(whitelist.users).includes(JSON.stringify(user2.publicKey)),
    );
  });

  it("Test remove from whitelist", async () => {
    let users = [user1.publicKey, user2.publicKey];
    let updateType = { remove: {} };

    // Check before whitelisting
    let whitelist = await program.account.whitelistedUser.fetch(pdaWhitelist);
    assert.equal(whitelist.users.length, 3);

    await manageWhitelists(updateType, users);

    // Check after whitelisting
    whitelist = await program.account.whitelistedUser.fetch(pdaWhitelist);
    assert.equal(whitelist.users.length, 1);
    assert.isTrue(
      JSON.stringify(whitelist.users).includes(JSON.stringify(payer.publicKey)),
    );
    assert.isFalse(
      JSON.stringify(whitelist.users).includes(JSON.stringify(user1.publicKey)),
    );
    assert.isFalse(
      JSON.stringify(whitelist.users).includes(JSON.stringify(user2.publicKey)),
    );
  });
});
