use super::*;

#[inline(never)]
pub fn update_account_lamports_to_minimum_balance<'info>(
    account: AccountInfo<'info>,
    payer: AccountInfo<'info>,
    system_program: AccountInfo<'info>,
) -> Result<()> {
    let extra_lamports = Rent::get()?.minimum_balance(account.data_len()) - account.get_lamports();
    if extra_lamports > 0 {
        invoke(
            &anchor_lang::solana_program::system_instruction::transfer(
                payer.key,
                account.key,
                extra_lamports,
            ),
            &[payer, account, system_program],
        )?;
    }
    Ok(())
}
