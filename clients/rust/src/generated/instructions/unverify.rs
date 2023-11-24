//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::VerificationArgs;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;

/// Accounts.
pub struct Unverify {
    /// Creator to verify, collection (or metadata if parent burned) update authority or delegate
    pub authority: solana_program::pubkey::Pubkey,
    /// Delegate record PDA
    pub delegate_record: Option<solana_program::pubkey::Pubkey>,
    /// Metadata account
    pub metadata: solana_program::pubkey::Pubkey,
    /// Mint of the Collection
    pub collection_mint: Option<solana_program::pubkey::Pubkey>,
    /// Metadata Account of the Collection
    pub collection_metadata: Option<solana_program::pubkey::Pubkey>,
    /// System program
    pub system_program: solana_program::pubkey::Pubkey,
    /// Instructions sysvar account
    pub sysvar_instructions: solana_program::pubkey::Pubkey,
}

impl Unverify {
    pub fn instruction(
        &self,
        args: UnverifyInstructionArgs,
    ) -> solana_program::instruction::Instruction {
        self.instruction_with_remaining_accounts(args, &[])
    }
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction_with_remaining_accounts(
        &self,
        args: UnverifyInstructionArgs,
        remaining_accounts: &[solana_program::instruction::AccountMeta],
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(7 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.authority,
            true,
        ));
        if let Some(delegate_record) = self.delegate_record {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                delegate_record,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.metadata,
            false,
        ));
        if let Some(collection_mint) = self.collection_mint {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                collection_mint,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(collection_metadata) = self.collection_metadata {
            accounts.push(solana_program::instruction::AccountMeta::new(
                collection_metadata,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.sysvar_instructions,
            false,
        ));
        accounts.extend_from_slice(remaining_accounts);
        let mut data = UnverifyInstructionData::new().try_to_vec().unwrap();
        let mut args = args.try_to_vec().unwrap();
        data.append(&mut args);

        solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
struct UnverifyInstructionData {
    discriminator: u8,
}

impl UnverifyInstructionData {
    fn new() -> Self {
        Self { discriminator: 53 }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct UnverifyInstructionArgs {
    pub verification_args: VerificationArgs,
}

/// Instruction builder for `Unverify`.
///
/// ### Accounts:
///
///   0. `[signer]` authority
///   1. `[optional]` delegate_record
///   2. `[writable]` metadata
///   3. `[optional]` collection_mint
///   4. `[writable, optional]` collection_metadata
///   5. `[optional]` system_program (default to `11111111111111111111111111111111`)
///   6. `[optional]` sysvar_instructions (default to `Sysvar1nstructions1111111111111111111111111`)
#[derive(Default)]
pub struct UnverifyBuilder {
    authority: Option<solana_program::pubkey::Pubkey>,
    delegate_record: Option<solana_program::pubkey::Pubkey>,
    metadata: Option<solana_program::pubkey::Pubkey>,
    collection_mint: Option<solana_program::pubkey::Pubkey>,
    collection_metadata: Option<solana_program::pubkey::Pubkey>,
    system_program: Option<solana_program::pubkey::Pubkey>,
    sysvar_instructions: Option<solana_program::pubkey::Pubkey>,
    verification_args: Option<VerificationArgs>,
    __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl UnverifyBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    /// Creator to verify, collection (or metadata if parent burned) update authority or delegate
    #[inline(always)]
    pub fn authority(&mut self, authority: solana_program::pubkey::Pubkey) -> &mut Self {
        self.authority = Some(authority);
        self
    }
    /// `[optional account]`
    /// Delegate record PDA
    #[inline(always)]
    pub fn delegate_record(
        &mut self,
        delegate_record: Option<solana_program::pubkey::Pubkey>,
    ) -> &mut Self {
        self.delegate_record = delegate_record;
        self
    }
    /// Metadata account
    #[inline(always)]
    pub fn metadata(&mut self, metadata: solana_program::pubkey::Pubkey) -> &mut Self {
        self.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Mint of the Collection
    #[inline(always)]
    pub fn collection_mint(
        &mut self,
        collection_mint: Option<solana_program::pubkey::Pubkey>,
    ) -> &mut Self {
        self.collection_mint = collection_mint;
        self
    }
    /// `[optional account]`
    /// Metadata Account of the Collection
    #[inline(always)]
    pub fn collection_metadata(
        &mut self,
        collection_metadata: Option<solana_program::pubkey::Pubkey>,
    ) -> &mut Self {
        self.collection_metadata = collection_metadata;
        self
    }
    /// `[optional account, default to '11111111111111111111111111111111']`
    /// System program
    #[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.system_program = Some(system_program);
        self
    }
    /// `[optional account, default to 'Sysvar1nstructions1111111111111111111111111']`
    /// Instructions sysvar account
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    #[inline(always)]
    pub fn verification_args(&mut self, verification_args: VerificationArgs) -> &mut Self {
        self.verification_args = Some(verification_args);
        self
    }
    /// Add an aditional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: solana_program::instruction::AccountMeta,
    ) -> &mut Self {
        self.__remaining_accounts.push(account);
        self
    }
    /// Add additional accounts to the instruction.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[solana_program::instruction::AccountMeta],
    ) -> &mut Self {
        self.__remaining_accounts.extend_from_slice(accounts);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        let accounts = Unverify {
            authority: self.authority.expect("authority is not set"),
            delegate_record: self.delegate_record,
            metadata: self.metadata.expect("metadata is not set"),
            collection_mint: self.collection_mint,
            collection_metadata: self.collection_metadata,
            system_program: self
                .system_program
                .unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
            sysvar_instructions: self.sysvar_instructions.unwrap_or(solana_program::pubkey!(
                "Sysvar1nstructions1111111111111111111111111"
            )),
        };
        let args = UnverifyInstructionArgs {
            verification_args: self
                .verification_args
                .clone()
                .expect("verification_args is not set"),
        };

        accounts.instruction_with_remaining_accounts(args, &self.__remaining_accounts)
    }
}

/// `unverify` CPI accounts.
pub struct UnverifyCpiAccounts<'a, 'b> {
    /// Creator to verify, collection (or metadata if parent burned) update authority or delegate
    pub authority: &'b solana_program::account_info::AccountInfo<'a>,
    /// Delegate record PDA
    pub delegate_record: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Metadata account
    pub metadata: &'b solana_program::account_info::AccountInfo<'a>,
    /// Mint of the Collection
    pub collection_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Metadata Account of the Collection
    pub collection_metadata: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// System program
    pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Instructions sysvar account
    pub sysvar_instructions: &'b solana_program::account_info::AccountInfo<'a>,
}

/// `unverify` CPI instruction.
pub struct UnverifyCpi<'a, 'b> {
    /// The program to invoke.
    pub __program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Creator to verify, collection (or metadata if parent burned) update authority or delegate
    pub authority: &'b solana_program::account_info::AccountInfo<'a>,
    /// Delegate record PDA
    pub delegate_record: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Metadata account
    pub metadata: &'b solana_program::account_info::AccountInfo<'a>,
    /// Mint of the Collection
    pub collection_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Metadata Account of the Collection
    pub collection_metadata: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// System program
    pub system_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Instructions sysvar account
    pub sysvar_instructions: &'b solana_program::account_info::AccountInfo<'a>,
    /// The arguments for the instruction.
    pub __args: UnverifyInstructionArgs,
}

impl<'a, 'b> UnverifyCpi<'a, 'b> {
    pub fn new(
        program: &'b solana_program::account_info::AccountInfo<'a>,
        accounts: UnverifyCpiAccounts<'a, 'b>,
        args: UnverifyInstructionArgs,
    ) -> Self {
        Self {
            __program: program,
            authority: accounts.authority,
            delegate_record: accounts.delegate_record,
            metadata: accounts.metadata,
            collection_mint: accounts.collection_mint,
            collection_metadata: accounts.collection_metadata,
            system_program: accounts.system_program,
            sysvar_instructions: accounts.sysvar_instructions,
            __args: args,
        }
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], &[])
    }
    #[inline(always)]
    pub fn invoke_with_remaining_accounts(
        &self,
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
    }
    #[inline(always)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed_with_remaining_accounts(
        &self,
        signers_seeds: &[&[&[u8]]],
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(7 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.authority.key,
            true,
        ));
        if let Some(delegate_record) = self.delegate_record {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *delegate_record.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.metadata.key,
            false,
        ));
        if let Some(collection_mint) = self.collection_mint {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *collection_mint.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(collection_metadata) = self.collection_metadata {
            accounts.push(solana_program::instruction::AccountMeta::new(
                *collection_metadata.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.sysvar_instructions.key,
            false,
        ));
        remaining_accounts.iter().for_each(|remaining_account| {
            accounts.push(solana_program::instruction::AccountMeta {
                pubkey: *remaining_account.0.key,
                is_signer: remaining_account.1,
                is_writable: remaining_account.2,
            })
        });
        let mut data = UnverifyInstructionData::new().try_to_vec().unwrap();
        let mut args = self.__args.try_to_vec().unwrap();
        data.append(&mut args);

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(7 + 1 + remaining_accounts.len());
        account_infos.push(self.__program.clone());
        account_infos.push(self.authority.clone());
        if let Some(delegate_record) = self.delegate_record {
            account_infos.push(delegate_record.clone());
        }
        account_infos.push(self.metadata.clone());
        if let Some(collection_mint) = self.collection_mint {
            account_infos.push(collection_mint.clone());
        }
        if let Some(collection_metadata) = self.collection_metadata {
            account_infos.push(collection_metadata.clone());
        }
        account_infos.push(self.system_program.clone());
        account_infos.push(self.sysvar_instructions.clone());
        remaining_accounts
            .iter()
            .for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// Instruction builder for `Unverify` via CPI.
///
/// ### Accounts:
///
///   0. `[signer]` authority
///   1. `[optional]` delegate_record
///   2. `[writable]` metadata
///   3. `[optional]` collection_mint
///   4. `[writable, optional]` collection_metadata
///   5. `[]` system_program
///   6. `[]` sysvar_instructions
pub struct UnverifyCpiBuilder<'a, 'b> {
    instruction: Box<UnverifyCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> UnverifyCpiBuilder<'a, 'b> {
    pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(UnverifyCpiBuilderInstruction {
            __program: program,
            authority: None,
            delegate_record: None,
            metadata: None,
            collection_mint: None,
            collection_metadata: None,
            system_program: None,
            sysvar_instructions: None,
            verification_args: None,
            __remaining_accounts: Vec::new(),
        });
        Self { instruction }
    }
    /// Creator to verify, collection (or metadata if parent burned) update authority or delegate
    #[inline(always)]
    pub fn authority(
        &mut self,
        authority: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authority = Some(authority);
        self
    }
    /// `[optional account]`
    /// Delegate record PDA
    #[inline(always)]
    pub fn delegate_record(
        &mut self,
        delegate_record: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    ) -> &mut Self {
        self.instruction.delegate_record = delegate_record;
        self
    }
    /// Metadata account
    #[inline(always)]
    pub fn metadata(
        &mut self,
        metadata: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Mint of the Collection
    #[inline(always)]
    pub fn collection_mint(
        &mut self,
        collection_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    ) -> &mut Self {
        self.instruction.collection_mint = collection_mint;
        self
    }
    /// `[optional account]`
    /// Metadata Account of the Collection
    #[inline(always)]
    pub fn collection_metadata(
        &mut self,
        collection_metadata: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    ) -> &mut Self {
        self.instruction.collection_metadata = collection_metadata;
        self
    }
    /// System program
    #[inline(always)]
    pub fn system_program(
        &mut self,
        system_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.system_program = Some(system_program);
        self
    }
    /// Instructions sysvar account
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    #[inline(always)]
    pub fn verification_args(&mut self, verification_args: VerificationArgs) -> &mut Self {
        self.instruction.verification_args = Some(verification_args);
        self
    }
    /// Add an additional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: &'b solana_program::account_info::AccountInfo<'a>,
        is_writable: bool,
        is_signer: bool,
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .push((account, is_writable, is_signer));
        self
    }
    /// Add additional accounts to the instruction.
    ///
    /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
    /// and a `bool` indicating whether the account is a signer or not.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .extend_from_slice(accounts);
        self
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let args = UnverifyInstructionArgs {
            verification_args: self
                .instruction
                .verification_args
                .clone()
                .expect("verification_args is not set"),
        };
        let instruction = UnverifyCpi {
            __program: self.instruction.__program,

            authority: self.instruction.authority.expect("authority is not set"),

            delegate_record: self.instruction.delegate_record,

            metadata: self.instruction.metadata.expect("metadata is not set"),

            collection_mint: self.instruction.collection_mint,

            collection_metadata: self.instruction.collection_metadata,

            system_program: self
                .instruction
                .system_program
                .expect("system_program is not set"),

            sysvar_instructions: self
                .instruction
                .sysvar_instructions
                .expect("sysvar_instructions is not set"),
            __args: args,
        };
        instruction.invoke_signed_with_remaining_accounts(
            signers_seeds,
            &self.instruction.__remaining_accounts,
        )
    }
}

struct UnverifyCpiBuilderInstruction<'a, 'b> {
    __program: &'b solana_program::account_info::AccountInfo<'a>,
    authority: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    delegate_record: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    metadata: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    collection_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    collection_metadata: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    system_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    sysvar_instructions: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    verification_args: Option<VerificationArgs>,
    /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
    __remaining_accounts: Vec<(
        &'b solana_program::account_info::AccountInfo<'a>,
        bool,
        bool,
    )>,
}
