use super::*;

/// Function to transfer the tokens
///
/// This function can throw following errors:
///   - Amount Can't Be Zero (when user passes 0 amount for mint).
pub fn buy_token_with_sol(ctx: Context<BuyWithSol>, sol_amount: u64) -> Result<()> {
    let seeds = &[VAULT_TAG, &[ctx.bumps.vault_account]];
    let signer = [&seeds[..]];

    let cpi_program = ctx.accounts.system_program.to_account_info();

    // Transfer sols
    let cpi_accounts = anchor_lang::system_program::Transfer {
        from: ctx.accounts.user.to_account_info(),
        to: ctx.accounts.receiver.to_account_info(),
    };
    anchor_lang::system_program::transfer(
        CpiContext::new_with_signer(cpi_program.clone(), cpi_accounts, &signer),
        sol_amount,
    )?;

    // Sending royalty tokens from vault account to escrow account
    let mut cpi_accounts = TransferChecked {
        to: ctx.accounts.escrow_account.to_account_info(),
        authority: ctx.accounts.vault_account.to_account_info(),
        from: ctx.accounts.vault_account.to_account_info(),
        mint: ctx.accounts.mint_account.to_account_info(),
    };

    let tokens_per_sol = ctx.accounts.config.tokens_per_sol;
    let user = ctx.accounts.user.key();
    let royalty = ctx.accounts.config.royalty;
    let token_amount = sol_amount * tokens_per_sol;
    let whitelist = &mut ctx.accounts.whitelist;

    let transferrable_amount = if whitelist.users.contains(&user) {
        token_amount
    } else {
        let royalty_amount = (royalty as u64) * token_amount / 100;

        // Transfer tokens from vault account to escrow account
        token::transfer_checked(
            CpiContext::new_with_signer(cpi_program.clone(), cpi_accounts, &signer),
            royalty_amount,
            ctx.accounts.mint_account.decimals,
        )?;

        token_amount - royalty_amount
    };

    // Transfer tokens from vault account to user account
    cpi_accounts = TransferChecked {
        mint: ctx.accounts.mint_account.to_account_info(),
        to: ctx.accounts.user_ata.to_account_info(),
        authority: ctx.accounts.vault_account.to_account_info(),
        from: ctx.accounts.vault_account.to_account_info(),
    };

    token::transfer_checked(
        CpiContext::new_with_signer(cpi_program, cpi_accounts, &signer),
        transferrable_amount,
        ctx.accounts.mint_account.decimals,
    )?;

    // Emit buy with sol event
    emit!(BuyWithSolEvent {
        sol_amount: sol_amount,
        token_amount
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct BuyWithSol<'info> {
    #[account(mut)]
    pub mint_account: Box<Account<'info, Mint>>,

    #[account(
        seeds = [CONFIG_TAG],
        bump,
    )]
    pub config: Box<Account<'info, Configuration>>,

    #[account(
        seeds = [WHITELIST_TAG],
        bump,
    )]
    pub whitelist: Box<Account<'info, WhitelistedUser>>,

    /// CHECK: Account that holds royalty tokens
    #[account(
        mut,
        seeds = [ESCROW_TAG],
        bump,
    )]
    pub escrow_account: Box<Account<'info, TokenAccount>>,

    /// CHECK: Account that holds token supply for distribution
    #[account(
        mut,
        seeds = [VAULT_TAG],
        bump,
    )]
    pub vault_account: Box<Account<'info, TokenAccount>>,

    /// CHECK: Receiver account holding sols
    #[account(
        mut,
        constraint = escrow_key.key == receiver.key() @CustomError::UnknownReceiver
    )]
    pub receiver: AccountInfo<'info>,

    /// CHECK: Escrow key to validate valid sol receiver account
    #[account(
        mut,
        seeds = [ESCROW_KEY_TAG],
        bump,
    )]
    pub escrow_key: Box<Account<'info, EscrowKey>>,

    /// CHECK: This is the token account that we want to transfer tokens from
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: This is the token account that we want to transfer tokens from
    #[account(mut)]
    pub user_ata: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
