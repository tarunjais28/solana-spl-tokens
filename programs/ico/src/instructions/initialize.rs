use super::*;

/// Function to initialize the contract
pub fn initialize(ctx: Context<Initialize>, params: InitParams) -> Result<()> {
    let caller = ctx.accounts.authority.to_account_info().key();
    let maintainers = &mut ctx.accounts.maintainers;
    maintainers.save(caller);

    let config = &mut ctx.accounts.config;
    config.royalty = params.royalty;
    config.tokens_per_sol = params.tokens_per_sol;

    let whitelist = &mut ctx.accounts.whitelist;
    whitelist.save(params.whitelists);

    let escrow = &mut ctx.accounts.escrow_key;
    escrow.key = ctx.accounts.receiver.key();

    // transfer minimum rent to mint account
    update_account_lamports_to_minimum_balance(
        ctx.accounts.mint_account.to_account_info(),
        ctx.accounts.authority.to_account_info(),
        ctx.accounts.system_program.to_account_info(),
    )?;

    // Emit init event
    emit!(InitEvent {
        admin: caller,
        sub_admin: caller
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(params: InitParams)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [MAINTAINERS_TAG],
        bump,
        payer = authority,
        space = std::mem::size_of::<Maintainers>() + 32
    )]
    pub maintainers: Box<Account<'info, Maintainers>>,

    #[account(
        init,
        seeds = [CONFIG_TAG],
        bump,
        payer = authority,
        space = std::mem::size_of::<Configuration>() + 8
    )]
    pub config: Box<Account<'info, Configuration>>,

    /// CHECK: Whitelist
    #[account(
        init,
        seeds = [WHITELIST_TAG],
        bump,
        payer = authority,
        space = std::mem::size_of::<WhitelistedUser>() + (params.whitelists.len() * 32),
    )]
    pub whitelist: Box<Account<'info, WhitelistedUser>>,

    /// CHECK: Receiver account
    pub receiver: AccountInfo<'info>,

    #[account(
        init,
        token::mint = mint_account,
        token::authority = escrow_account,
        seeds = [ESCROW_TAG],
        bump,
        payer = authority,
    )]
    pub escrow_account: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        token::mint = mint_account,
        token::authority = vault_account,
        seeds = [VAULT_TAG],
        bump,
        payer = authority,
    )]
    pub vault_account: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        seeds = [ESCROW_KEY_TAG],
        bump,
        payer = authority,
        space = std::mem::size_of::<EscrowKey>() + 32
    )]
    pub escrow_key: Box<Account<'info, EscrowKey>>,

    #[account(mut)]
    pub mint_account: Box<Account<'info, Mint>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}
