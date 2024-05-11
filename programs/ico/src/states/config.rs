use super::*;

#[account]
pub struct Configuration {
    /// Royalty
    pub royalty: u8,

    /// Token to be distributed per Sol
    pub tokens_per_sol: u64,
}
