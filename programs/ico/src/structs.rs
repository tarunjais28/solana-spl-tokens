use super::*;

/// The struct containing instructions for initialisation
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitParams {
    /// Royalty
    pub royalty: u8,

    /// Token to be distributed per Sol
    pub tokens_per_sol: u64,

    /// Whitelist accounts
    pub whitelists: Vec<Pubkey>,
}

/// The struct containing instructions for transferring tokens
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct TransferParams {
    /// To Token
    pub to_account: Pubkey,

    /// Amount of tokens to be transferred
    pub amount: u64,
}

/// The struct containing instructions for whitelisting
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct WhitelistParams {
    /// User to be whitelisted
    pub user: Pubkey,
}

#[account]
pub struct EscrowKey {
    pub key: Pubkey,
}
