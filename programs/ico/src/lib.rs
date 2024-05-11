use crate::{constants::*, enums::*, errors::*, events::*, instructions::*, states::*, structs::*};
use anchor_lang::{
    prelude::*,
    solana_program::{account_info::AccountInfo, program::invoke, rent::Rent, sysvar::Sysvar},
    Lamports,
};
use anchor_spl::token::{self, Mint, Token, TokenAccount, TransferChecked};

mod constants;
mod enums;
mod errors;
mod events;
mod instructions;
mod states;
mod structs;

declare_id!("CCazZm7etsEJ8ncqG9PnWPLg4wgaHBgtQwD1GAPsboxt");

#[program]
pub mod ico {
    use super::*;

    pub fn init(ctx: Context<Initialize>, params: InitParams) -> Result<()> {
        instructions::initialize(ctx, params)
    }

    pub fn manage_admin(ctx: Context<UpdateAdmin>, address: Pubkey) -> Result<()> {
        instructions::update_admin(ctx, address)
    }

    pub fn add_sub_admin_accounts(
        ctx: Context<UpdateSubAdmins>,
        addresses: Vec<Pubkey>,
    ) -> Result<()> {
        instructions::add_sub_admins(ctx, addresses)
    }

    pub fn remove_sub_admin_accounts(
        ctx: Context<UpdateSubAdmins>,
        addresses: Vec<Pubkey>,
    ) -> Result<()> {
        instructions::remove_sub_admins(ctx, addresses)
    }

    pub fn manange_whitelist_users(
        ctx: Context<WhitelistUser>,
        update_type: UpdateType,
        users: Vec<Pubkey>,
    ) -> Result<()> {
        instructions::manange_whitelist(ctx, update_type, users)
    }

    pub fn transfer_tokens(ctx: Context<TransferTokens>, params: TransferParams) -> Result<()> {
        instructions::transfer(ctx, params)
    }

    pub fn claim(ctx: Context<ClaimTokens>, token: String) -> Result<()> {
        instructions::claim_royalty(ctx, token)
    }

    pub fn update_royalty(
        ctx: Context<UpdateTokenConfig>,
        token: String,
        royalty: u8,
    ) -> Result<()> {
        instructions::update_royalty_percentage(ctx, token, royalty)
    }

    pub fn update_tokens_per_sol(
        ctx: Context<UpdateTokenConfig>,
        token: String,
        tokens_per_sol: u64,
    ) -> Result<()> {
        instructions::update_token_per_sol(ctx, token, tokens_per_sol)
    }

    pub fn buy_with_sol(ctx: Context<BuyWithSol>, params: BuyWithSolParams) -> Result<()> {
        instructions::buy_token_with_sol(ctx, params)
    }

    pub fn update_escrow(ctx: Context<SetEscrow>, address: Pubkey) -> Result<()> {
        instructions::set_escrow(ctx, address)
    }
}
