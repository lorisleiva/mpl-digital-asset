use mpl_token_metadata::{
    accounts::{MasterEdition, Metadata},
    instructions::{CreateV1Builder, MintV1Builder},
    types::{PrintSupply, TokenStandard},
};
use solana_program::pubkey::Pubkey;
use solana_program_test::{BanksClientError, ProgramTestContext};
use solana_sdk::{
    signature::{Keypair, Signer},
    transaction::Transaction,
};
use spl_token_2022::extension::ExtensionType;

use crate::setup::TokenManager;

pub struct DigitalAsset {
    pub mint: Keypair,
    pub metadata: Pubkey,
    pub master_edition: Pubkey,
    pub token: Pubkey,
}

impl Default for DigitalAsset {
    fn default() -> Self {
        Self {
            mint: Keypair::new(),
            metadata: Pubkey::default(),
            master_edition: Pubkey::default(),
            token: Pubkey::default(),
        }
    }
}

impl DigitalAsset {
    pub async fn create(
        &mut self,
        context: &mut ProgramTestContext,
        name: String,
        uri: String,
        token_standard: TokenStandard,
        update_authority: &Keypair,
        payer: &Keypair,
    ) -> Result<(), BanksClientError> {
        self.metadata = Metadata::find_pda(&self.mint.pubkey()).0;
        self.master_edition = MasterEdition::find_pda(&self.mint.pubkey()).0;

        let create_ix = CreateV1Builder::new()
            .metadata(self.metadata)
            .master_edition(Some(self.master_edition))
            .mint(self.mint.pubkey(), true)
            .authority(update_authority.pubkey())
            .payer(payer.pubkey())
            .update_authority(update_authority.pubkey(), true)
            .is_mutable(true)
            .primary_sale_happened(false)
            .seller_fee_basis_points(500)
            .print_supply(PrintSupply::Zero)
            .name(name)
            .uri(uri)
            .token_standard(token_standard)
            .spl_token_program(Some(spl_token::ID))
            .instruction();

        let tx = Transaction::new_signed_with_payer(
            &[create_ix],
            Some(&context.payer.pubkey()),
            &[payer, update_authority, &self.mint],
            context.last_blockhash,
        );
        context.banks_client.process_transaction(tx).await
    }

    pub async fn mint(
        &mut self,
        context: &mut ProgramTestContext,
        token_owner: &Pubkey,
        amount: u64,
        update_authority: &Keypair,
        payer: &Keypair,
    ) -> Result<(), BanksClientError> {
        self.token = spl_associated_token_account::get_associated_token_address_with_program_id(
            token_owner,
            &self.mint.pubkey(),
            &spl_token::ID,
        );

        let mint_ix = MintV1Builder::new()
            .token(self.token)
            .token_owner(Some(*token_owner))
            .metadata(self.metadata)
            .master_edition(Some(self.master_edition))
            .mint(self.mint.pubkey())
            .authority(update_authority.pubkey())
            .payer(payer.pubkey())
            .amount(amount)
            .instruction();

        let tx = Transaction::new_signed_with_payer(
            &[mint_ix],
            Some(&context.payer.pubkey()),
            &[payer, update_authority],
            context.last_blockhash,
        );
        context.banks_client.process_transaction(tx).await
    }

    #[allow(clippy::too_many_arguments)]
    pub async fn create_and_mint(
        &mut self,
        context: &mut ProgramTestContext,
        token_standard: TokenStandard,
        update_authority: &Keypair,
        token_owner: &Pubkey,
        amount: u64,
        payer: &Keypair,
    ) -> Result<(), BanksClientError> {
        self.create(
            context,
            String::from("Digial Asset"),
            String::from("https://digital.asset"),
            token_standard,
            update_authority,
            payer,
        )
        .await?;

        self.mint(context, token_owner, amount, update_authority, payer)
            .await?;

        Ok(())
    }

    pub async fn create_default(
        &mut self,
        context: &mut ProgramTestContext,
        token_standard: TokenStandard,
        spl_token_program: Pubkey,
    ) -> Result<(), BanksClientError> {
        let mint_pubkey = self.mint.pubkey();
        let payer_pubkey = context.payer.pubkey();

        let (metadata, _) = Metadata::find_pda(&mint_pubkey);
        let (master_edition, _) = MasterEdition::find_pda(&mint_pubkey);

        let create_ix = CreateV1Builder::new()
            .metadata(metadata)
            .master_edition(Some(master_edition))
            .mint(mint_pubkey, true)
            .authority(payer_pubkey)
            .payer(payer_pubkey)
            .update_authority(payer_pubkey, true)
            .is_mutable(true)
            .primary_sale_happened(false)
            .name(String::from("DigitalAsset"))
            .uri(String::from("http://digital.asset"))
            .seller_fee_basis_points(500)
            .token_standard(token_standard)
            .print_supply(PrintSupply::Zero)
            .spl_token_program(Some(spl_token_program))
            .instruction();

        let tx = Transaction::new_signed_with_payer(
            &[create_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer, &self.mint],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }

    pub async fn create_default_with_mint_extensions(
        &mut self,
        context: &mut ProgramTestContext,
        token_standard: TokenStandard,
        extensions: &[ExtensionType],
    ) -> Result<(), BanksClientError> {
        let mint_pubkey = self.mint.pubkey();
        let payer_pubkey = context.payer.pubkey();

        let token_manager = TokenManager::default();
        token_manager
            .create_mint_with_extensions(
                context,
                &self.mint,
                &payer_pubkey,
                Some(&payer_pubkey),
                0,
                extensions,
            )
            .await
            .unwrap();

        let (metadata, _) = Metadata::find_pda(&mint_pubkey);
        let (master_edition, _) = MasterEdition::find_pda(&mint_pubkey);

        let create_ix = CreateV1Builder::new()
            .metadata(metadata)
            .master_edition(Some(master_edition))
            .mint(mint_pubkey, true)
            .authority(payer_pubkey)
            .payer(payer_pubkey)
            .update_authority(payer_pubkey, true)
            .is_mutable(true)
            .primary_sale_happened(false)
            .name(String::from("DigitalAsset"))
            .uri(String::from("http://digital.asset"))
            .seller_fee_basis_points(500)
            .token_standard(token_standard)
            .print_supply(PrintSupply::Zero)
            .spl_token_program(Some(spl_token_2022::ID))
            .instruction();

        let tx = Transaction::new_signed_with_payer(
            &[create_ix],
            Some(&context.payer.pubkey()),
            &[&context.payer, &self.mint],
            context.last_blockhash,
        );

        context.banks_client.process_transaction(tx).await
    }
}
