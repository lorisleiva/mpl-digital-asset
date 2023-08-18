//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::Collection;
use crate::generated::types::CollectionDetails;
use crate::generated::types::Creator;
use crate::generated::types::PrintSupply;
use crate::generated::types::TokenStandard;
use crate::generated::types::Uses;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;
use solana_program::pubkey::Pubkey;

/// Accounts.
pub struct CreateV1 {
    /// Unallocated metadata account with address as pda of ['metadata', program id, mint id]
    pub metadata: solana_program::pubkey::Pubkey,
    /// Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition']
    pub master_edition: Option<solana_program::pubkey::Pubkey>,
    /// Mint of token asset
    pub mint: (solana_program::pubkey::Pubkey, bool),
    /// Mint authority
    pub authority: solana_program::pubkey::Pubkey,
    /// Payer
    pub payer: solana_program::pubkey::Pubkey,
    /// Update authority for the metadata account
    pub update_authority: (solana_program::pubkey::Pubkey, bool),
    /// System program
    pub system_program: solana_program::pubkey::Pubkey,
    /// Instructions sysvar account
    pub sysvar_instructions: solana_program::pubkey::Pubkey,
    /// SPL Token program
    pub spl_token_program: solana_program::pubkey::Pubkey,
}

impl CreateV1 {
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction(
        &self,
        args: CreateV1InstructionArgs,
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(9);
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.metadata,
            false,
        ));
        if let Some(master_edition) = self.master_edition {
            accounts.push(solana_program::instruction::AccountMeta::new(
                master_edition,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.mint.0,
            self.mint.1,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.authority,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.payer, true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.update_authority.0,
            self.update_authority.1,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.sysvar_instructions,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.spl_token_program,
            false,
        ));

        solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data: args.try_to_vec().unwrap(),
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateV1InstructionArgs {
    discriminator: u8,
    create_v1_discriminator: u8,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub creators: Option<Vec<Creator>>,
    pub primary_sale_happened: bool,
    pub is_mutable: bool,
    pub token_standard: TokenStandard,
    pub collection: Option<Collection>,
    pub uses: Option<Uses>,
    pub collection_details: Option<CollectionDetails>,
    pub rule_set: Option<Pubkey>,
    pub decimals: Option<u8>,
    pub print_supply: Option<PrintSupply>,
}

impl CreateV1InstructionArgs {
    pub fn new(
        name: String,
        uri: String,
        seller_fee_basis_points: u16,
        creators: Option<Vec<Creator>>,
        token_standard: TokenStandard,
    ) -> Self {
        Self {
            discriminator: 42,
            create_v1_discriminator: 0,
            name,
            symbol: String::from(""),
            uri,
            seller_fee_basis_points,
            creators,
            primary_sale_happened: false,
            is_mutable: true,
            token_standard,
            collection: None,
            uses: None,
            collection_details: None,
            rule_set: None,
            decimals: None,
            print_supply: None,
        }
    }
}

/// Instruction builder.
#[derive(Default)]
pub struct CreateV1Builder {
    metadata: Option<solana_program::pubkey::Pubkey>,
    master_edition: Option<solana_program::pubkey::Pubkey>,
    mint: Option<(solana_program::pubkey::Pubkey, bool)>,
    authority: Option<solana_program::pubkey::Pubkey>,
    payer: Option<solana_program::pubkey::Pubkey>,
    update_authority: Option<(solana_program::pubkey::Pubkey, bool)>,
    system_program: Option<solana_program::pubkey::Pubkey>,
    sysvar_instructions: Option<solana_program::pubkey::Pubkey>,
    spl_token_program: Option<solana_program::pubkey::Pubkey>,
    name: Option<String>,
    symbol: Option<String>,
    uri: Option<String>,
    seller_fee_basis_points: Option<u16>,
    creators: Option<Vec<Creator>>,
    primary_sale_happened: Option<bool>,
    is_mutable: Option<bool>,
    token_standard: Option<TokenStandard>,
    collection: Option<Collection>,
    uses: Option<Uses>,
    collection_details: Option<CollectionDetails>,
    rule_set: Option<Pubkey>,
    decimals: Option<u8>,
    print_supply: Option<PrintSupply>,
}

impl CreateV1Builder {
    pub fn new() -> Self {
        Self::default()
    }
    /// Unallocated metadata account with address as pda of ['metadata', program id, mint id]
    #[inline(always)]
    pub fn metadata(&mut self, metadata: solana_program::pubkey::Pubkey) -> &mut Self {
        self.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition']
    #[inline(always)]
    pub fn master_edition(&mut self, master_edition: solana_program::pubkey::Pubkey) -> &mut Self {
        self.master_edition = Some(master_edition);
        self
    }
    /// Mint of token asset
    #[inline(always)]
    pub fn mint(&mut self, mint: solana_program::pubkey::Pubkey, as_signer: bool) -> &mut Self {
        self.mint = Some((mint, as_signer));
        self
    }
    /// Mint authority
    #[inline(always)]
    pub fn authority(&mut self, authority: solana_program::pubkey::Pubkey) -> &mut Self {
        self.authority = Some(authority);
        self
    }
    /// Payer
    #[inline(always)]
    pub fn payer(&mut self, payer: solana_program::pubkey::Pubkey) -> &mut Self {
        self.payer = Some(payer);
        self
    }
    /// Update authority for the metadata account
    #[inline(always)]
    pub fn update_authority(
        &mut self,
        update_authority: solana_program::pubkey::Pubkey,
        as_signer: bool,
    ) -> &mut Self {
        self.update_authority = Some((update_authority, as_signer));
        self
    }
    /// System program
    #[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.system_program = Some(system_program);
        self
    }
    /// Instructions sysvar account
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    /// SPL Token program
    #[inline(always)]
    pub fn spl_token_program(
        &mut self,
        spl_token_program: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.spl_token_program = Some(spl_token_program);
        self
    }
    #[inline(always)]
    pub fn name(&mut self, name: String) -> &mut Self {
        self.name = Some(name);
        self
    }
    #[inline(always)]
    pub fn symbol(&mut self, symbol: String) -> &mut Self {
        self.symbol = Some(symbol);
        self
    }
    #[inline(always)]
    pub fn uri(&mut self, uri: String) -> &mut Self {
        self.uri = Some(uri);
        self
    }
    #[inline(always)]
    pub fn seller_fee_basis_points(&mut self, seller_fee_basis_points: u16) -> &mut Self {
        self.seller_fee_basis_points = Some(seller_fee_basis_points);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn creators(&mut self, creators: Vec<Creator>) -> &mut Self {
        self.creators = Some(creators);
        self
    }
    #[inline(always)]
    pub fn primary_sale_happened(&mut self, primary_sale_happened: bool) -> &mut Self {
        self.primary_sale_happened = Some(primary_sale_happened);
        self
    }
    #[inline(always)]
    pub fn is_mutable(&mut self, is_mutable: bool) -> &mut Self {
        self.is_mutable = Some(is_mutable);
        self
    }
    #[inline(always)]
    pub fn token_standard(&mut self, token_standard: TokenStandard) -> &mut Self {
        self.token_standard = Some(token_standard);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection(&mut self, collection: Collection) -> &mut Self {
        self.collection = Some(collection);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn uses(&mut self, uses: Uses) -> &mut Self {
        self.uses = Some(uses);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection_details(&mut self, collection_details: CollectionDetails) -> &mut Self {
        self.collection_details = Some(collection_details);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn rule_set(&mut self, rule_set: Pubkey) -> &mut Self {
        self.rule_set = Some(rule_set);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn decimals(&mut self, decimals: u8) -> &mut Self {
        self.decimals = Some(decimals);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn print_supply(&mut self, print_supply: PrintSupply) -> &mut Self {
        self.print_supply = Some(print_supply);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> solana_program::instruction::Instruction {
        let accounts = CreateV1 {
            metadata: self.metadata.expect("metadata is not set"),
            master_edition: self.master_edition,
            mint: self.mint.expect("mint is not set"),
            authority: self.authority.expect("authority is not set"),
            payer: self.payer.expect("payer is not set"),
            update_authority: self.update_authority.expect("update_authority is not set"),
            system_program: self
                .system_program
                .unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
            sysvar_instructions: self.sysvar_instructions.unwrap_or(solana_program::pubkey!(
                "Sysvar1nstructions1111111111111111111111111"
            )),
            spl_token_program: self.spl_token_program.unwrap_or(solana_program::pubkey!(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            )),
        };
        let mut args = CreateV1InstructionArgs::new(
            self.name.clone().expect("name is not set"),
            self.uri.clone().expect("uri is not set"),
            self.seller_fee_basis_points
                .clone()
                .expect("seller_fee_basis_points is not set"),
            self.creators.clone(),
            self.token_standard
                .clone()
                .expect("token_standard is not set"),
        );
        if let Some(symbol) = &self.symbol {
            args.symbol = symbol.clone();
        }
        if let Some(primary_sale_happened) = &self.primary_sale_happened {
            args.primary_sale_happened = primary_sale_happened.clone();
        }
        if let Some(is_mutable) = &self.is_mutable {
            args.is_mutable = is_mutable.clone();
        }
        args.collection = self.collection.clone();
        args.uses = self.uses.clone();
        args.collection_details = self.collection_details.clone();
        args.rule_set = self.rule_set.clone();
        args.decimals = self.decimals.clone();
        args.print_supply = self.print_supply.clone();

        accounts.instruction(args)
    }
}

/// `create_v1` CPI instruction.
pub struct CreateV1Cpi<'a> {
    /// The program to invoke.
    pub __program: &'a solana_program::account_info::AccountInfo<'a>,
    /// Unallocated metadata account with address as pda of ['metadata', program id, mint id]
    pub metadata: &'a solana_program::account_info::AccountInfo<'a>,
    /// Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition']
    pub master_edition: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// Mint of token asset
    pub mint: (&'a solana_program::account_info::AccountInfo<'a>, bool),
    /// Mint authority
    pub authority: &'a solana_program::account_info::AccountInfo<'a>,
    /// Payer
    pub payer: &'a solana_program::account_info::AccountInfo<'a>,
    /// Update authority for the metadata account
    pub update_authority: (&'a solana_program::account_info::AccountInfo<'a>, bool),
    /// System program
    pub system_program: &'a solana_program::account_info::AccountInfo<'a>,
    /// Instructions sysvar account
    pub sysvar_instructions: &'a solana_program::account_info::AccountInfo<'a>,
    /// SPL Token program
    pub spl_token_program: &'a solana_program::account_info::AccountInfo<'a>,
    /// The arguments for the instruction.
    pub __args: CreateV1InstructionArgs,
}

impl<'a> CreateV1Cpi<'a> {
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(9);
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.metadata.key,
            false,
        ));
        if let Some(master_edition) = self.master_edition {
            accounts.push(solana_program::instruction::AccountMeta::new(
                *master_edition.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.mint.0.key,
            self.mint.1,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.authority.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.payer.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.update_authority.0.key,
            self.update_authority.1,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.sysvar_instructions.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.spl_token_program.key,
            false,
        ));

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data: self.__args.try_to_vec().unwrap(),
        };
        let mut account_infos = Vec::with_capacity(9 + 1);
        account_infos.push(self.__program.clone());
        account_infos.push(self.metadata.clone());
        if let Some(master_edition) = self.master_edition {
            account_infos.push(master_edition.clone());
        }
        account_infos.push(self.mint.0.clone());
        account_infos.push(self.authority.clone());
        account_infos.push(self.payer.clone());
        account_infos.push(self.update_authority.0.clone());
        account_infos.push(self.system_program.clone());
        account_infos.push(self.sysvar_instructions.clone());
        account_infos.push(self.spl_token_program.clone());

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// `create_v1` CPI instruction builder.
pub struct CreateV1CpiBuilder<'a> {
    instruction: Box<CreateV1CpiBuilderInstruction<'a>>,
}

impl<'a> CreateV1CpiBuilder<'a> {
    pub fn new(program: &'a solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(CreateV1CpiBuilderInstruction {
            __program: program,
            metadata: None,
            master_edition: None,
            mint: None,
            authority: None,
            payer: None,
            update_authority: None,
            system_program: None,
            sysvar_instructions: None,
            spl_token_program: None,
            name: None,
            symbol: None,
            uri: None,
            seller_fee_basis_points: None,
            creators: None,
            primary_sale_happened: None,
            is_mutable: None,
            token_standard: None,
            collection: None,
            uses: None,
            collection_details: None,
            rule_set: None,
            decimals: None,
            print_supply: None,
        });
        Self { instruction }
    }
    /// Unallocated metadata account with address as pda of ['metadata', program id, mint id]
    #[inline(always)]
    pub fn metadata(
        &mut self,
        metadata: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition']
    #[inline(always)]
    pub fn master_edition(
        &mut self,
        master_edition: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.master_edition = Some(master_edition);
        self
    }
    /// Mint of token asset
    #[inline(always)]
    pub fn mint(
        &mut self,
        mint: &'a solana_program::account_info::AccountInfo<'a>,
        as_signer: bool,
    ) -> &mut Self {
        self.instruction.mint = Some((mint, as_signer));
        self
    }
    /// Mint authority
    #[inline(always)]
    pub fn authority(
        &mut self,
        authority: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authority = Some(authority);
        self
    }
    /// Payer
    #[inline(always)]
    pub fn payer(&mut self, payer: &'a solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.payer = Some(payer);
        self
    }
    /// Update authority for the metadata account
    #[inline(always)]
    pub fn update_authority(
        &mut self,
        update_authority: &'a solana_program::account_info::AccountInfo<'a>,
        as_signer: bool,
    ) -> &mut Self {
        self.instruction.update_authority = Some((update_authority, as_signer));
        self
    }
    /// System program
    #[inline(always)]
    pub fn system_program(
        &mut self,
        system_program: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.system_program = Some(system_program);
        self
    }
    /// Instructions sysvar account
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    /// SPL Token program
    #[inline(always)]
    pub fn spl_token_program(
        &mut self,
        spl_token_program: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.spl_token_program = Some(spl_token_program);
        self
    }
    #[inline(always)]
    pub fn name(&mut self, name: String) -> &mut Self {
        self.instruction.name = Some(name);
        self
    }
    #[inline(always)]
    pub fn symbol(&mut self, symbol: String) -> &mut Self {
        self.instruction.symbol = Some(symbol);
        self
    }
    #[inline(always)]
    pub fn uri(&mut self, uri: String) -> &mut Self {
        self.instruction.uri = Some(uri);
        self
    }
    #[inline(always)]
    pub fn seller_fee_basis_points(&mut self, seller_fee_basis_points: u16) -> &mut Self {
        self.instruction.seller_fee_basis_points = Some(seller_fee_basis_points);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn creators(&mut self, creators: Vec<Creator>) -> &mut Self {
        self.instruction.creators = Some(creators);
        self
    }
    #[inline(always)]
    pub fn primary_sale_happened(&mut self, primary_sale_happened: bool) -> &mut Self {
        self.instruction.primary_sale_happened = Some(primary_sale_happened);
        self
    }
    #[inline(always)]
    pub fn is_mutable(&mut self, is_mutable: bool) -> &mut Self {
        self.instruction.is_mutable = Some(is_mutable);
        self
    }
    #[inline(always)]
    pub fn token_standard(&mut self, token_standard: TokenStandard) -> &mut Self {
        self.instruction.token_standard = Some(token_standard);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection(&mut self, collection: Collection) -> &mut Self {
        self.instruction.collection = Some(collection);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn uses(&mut self, uses: Uses) -> &mut Self {
        self.instruction.uses = Some(uses);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection_details(&mut self, collection_details: CollectionDetails) -> &mut Self {
        self.instruction.collection_details = Some(collection_details);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn rule_set(&mut self, rule_set: Pubkey) -> &mut Self {
        self.instruction.rule_set = Some(rule_set);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn decimals(&mut self, decimals: u8) -> &mut Self {
        self.instruction.decimals = Some(decimals);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn print_supply(&mut self, print_supply: PrintSupply) -> &mut Self {
        self.instruction.print_supply = Some(print_supply);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> CreateV1Cpi<'a> {
        let mut args = CreateV1InstructionArgs::new(
            self.instruction.name.clone().expect("name is not set"),
            self.instruction.uri.clone().expect("uri is not set"),
            self.instruction
                .seller_fee_basis_points
                .clone()
                .expect("seller_fee_basis_points is not set"),
            self.instruction.creators.clone(),
            self.instruction
                .token_standard
                .clone()
                .expect("token_standard is not set"),
        );
        if let Some(symbol) = &self.instruction.symbol {
            args.symbol = symbol.clone();
        }
        if let Some(primary_sale_happened) = &self.instruction.primary_sale_happened {
            args.primary_sale_happened = primary_sale_happened.clone();
        }
        if let Some(is_mutable) = &self.instruction.is_mutable {
            args.is_mutable = is_mutable.clone();
        }
        args.collection = self.instruction.collection.clone();
        args.uses = self.instruction.uses.clone();
        args.collection_details = self.instruction.collection_details.clone();
        args.rule_set = self.instruction.rule_set.clone();
        args.decimals = self.instruction.decimals.clone();
        args.print_supply = self.instruction.print_supply.clone();

        CreateV1Cpi {
            __program: self.instruction.__program,

            metadata: self.instruction.metadata.expect("metadata is not set"),

            master_edition: self.instruction.master_edition,

            mint: self.instruction.mint.expect("mint is not set"),

            authority: self.instruction.authority.expect("authority is not set"),

            payer: self.instruction.payer.expect("payer is not set"),

            update_authority: self
                .instruction
                .update_authority
                .expect("update_authority is not set"),

            system_program: self
                .instruction
                .system_program
                .expect("system_program is not set"),

            sysvar_instructions: self
                .instruction
                .sysvar_instructions
                .expect("sysvar_instructions is not set"),

            spl_token_program: self
                .instruction
                .spl_token_program
                .expect("spl_token_program is not set"),
            __args: args,
        }
    }
}

struct CreateV1CpiBuilderInstruction<'a> {
    __program: &'a solana_program::account_info::AccountInfo<'a>,
    metadata: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    master_edition: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    mint: Option<(&'a solana_program::account_info::AccountInfo<'a>, bool)>,
    authority: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    payer: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    update_authority: Option<(&'a solana_program::account_info::AccountInfo<'a>, bool)>,
    system_program: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    sysvar_instructions: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    spl_token_program: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    name: Option<String>,
    symbol: Option<String>,
    uri: Option<String>,
    seller_fee_basis_points: Option<u16>,
    creators: Option<Vec<Creator>>,
    primary_sale_happened: Option<bool>,
    is_mutable: Option<bool>,
    token_standard: Option<TokenStandard>,
    collection: Option<Collection>,
    uses: Option<Uses>,
    collection_details: Option<CollectionDetails>,
    rule_set: Option<Pubkey>,
    decimals: Option<u8>,
    print_supply: Option<PrintSupply>,
}