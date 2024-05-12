use super::*;

/// Function to init resources of the contract
pub fn init_resources(_: Context<InitResources>) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct InitResources<'info> {
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

    #[account(mut)]
    pub mint_account: Box<Account<'info, Mint>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,
}
