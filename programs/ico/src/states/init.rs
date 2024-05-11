use super::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct InitParams {
    /// Royalty
    pub royalty: u8,

    /// Token to be distributed per Sol
    pub tokens_per_sol: u64,

    /// Whitelist accounts
    pub whitelists: Vec<Pubkey>,
}
