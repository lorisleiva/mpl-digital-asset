/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  none,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bool,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  string,
  struct,
  u16,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';
import {
  AuthorizationData,
  AuthorizationDataArgs,
  CollectionDetailsToggle,
  CollectionDetailsToggleArgs,
  CollectionToggle,
  CollectionToggleArgs,
  Creator,
  CreatorArgs,
  RuleSetToggle,
  RuleSetToggleArgs,
  TokenStandard,
  TokenStandardArgs,
  UsesToggle,
  UsesToggleArgs,
  collectionDetailsToggle,
  collectionToggle,
  getAuthorizationDataSerializer,
  getCollectionDetailsToggleSerializer,
  getCollectionToggleSerializer,
  getCreatorSerializer,
  getRuleSetToggleSerializer,
  getTokenStandardSerializer,
  getUsesToggleSerializer,
  ruleSetToggle,
  usesToggle,
} from '../types';

// Accounts.
export type UpdateAsUpdateAuthorityV2InstructionAccounts = {
  /** Update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey | Pda;
  /** Token account */
  token?: PublicKey | Pda;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
  /** Payer */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type UpdateAsUpdateAuthorityV2InstructionData = {
  discriminator: number;
  updateAsUpdateAuthorityV2Discriminator: number;
  newUpdateAuthority: Option<PublicKey>;
  data: Option<{
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Option<Array<Creator>>;
  }>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
  collection: CollectionToggle;
  collectionDetails: CollectionDetailsToggle;
  uses: UsesToggle;
  ruleSet: RuleSetToggle;
  tokenStandard: Option<TokenStandard>;
  authorizationData: Option<AuthorizationData>;
};

export type UpdateAsUpdateAuthorityV2InstructionDataArgs = {
  newUpdateAuthority?: OptionOrNullable<PublicKey>;
  data?: OptionOrNullable<{
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: OptionOrNullable<Array<CreatorArgs>>;
  }>;
  primarySaleHappened?: OptionOrNullable<boolean>;
  isMutable?: OptionOrNullable<boolean>;
  collection?: CollectionToggleArgs;
  collectionDetails?: CollectionDetailsToggleArgs;
  uses?: UsesToggleArgs;
  ruleSet?: RuleSetToggleArgs;
  tokenStandard?: OptionOrNullable<TokenStandardArgs>;
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUpdateAsUpdateAuthorityV2InstructionDataSerializer(): Serializer<
  UpdateAsUpdateAuthorityV2InstructionDataArgs,
  UpdateAsUpdateAuthorityV2InstructionData
> {
  return mapSerializer<
    UpdateAsUpdateAuthorityV2InstructionDataArgs,
    any,
    UpdateAsUpdateAuthorityV2InstructionData
  >(
    struct<UpdateAsUpdateAuthorityV2InstructionData>(
      [
        ['discriminator', u8()],
        ['updateAsUpdateAuthorityV2Discriminator', u8()],
        ['newUpdateAuthority', option(publicKeySerializer())],
        [
          'data',
          option(
            struct<any>([
              ['name', string()],
              ['symbol', string()],
              ['uri', string()],
              ['sellerFeeBasisPoints', u16()],
              ['creators', option(array(getCreatorSerializer()))],
            ])
          ),
        ],
        ['primarySaleHappened', option(bool())],
        ['isMutable', option(bool())],
        ['collection', getCollectionToggleSerializer()],
        ['collectionDetails', getCollectionDetailsToggleSerializer()],
        ['uses', getUsesToggleSerializer()],
        ['ruleSet', getRuleSetToggleSerializer()],
        ['tokenStandard', option(getTokenStandardSerializer())],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'UpdateAsUpdateAuthorityV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 50,
      updateAsUpdateAuthorityV2Discriminator: 1,
      newUpdateAuthority: value.newUpdateAuthority ?? none(),
      data: value.data ?? none(),
      primarySaleHappened: value.primarySaleHappened ?? none(),
      isMutable: value.isMutable ?? none(),
      collection: value.collection ?? collectionToggle('None'),
      collectionDetails:
        value.collectionDetails ?? collectionDetailsToggle('None'),
      uses: value.uses ?? usesToggle('None'),
      ruleSet: value.ruleSet ?? ruleSetToggle('None'),
      tokenStandard: value.tokenStandard ?? none(),
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<
    UpdateAsUpdateAuthorityV2InstructionDataArgs,
    UpdateAsUpdateAuthorityV2InstructionData
  >;
}

// Args.
export type UpdateAsUpdateAuthorityV2InstructionArgs =
  UpdateAsUpdateAuthorityV2InstructionDataArgs;

// Instruction.
export function updateAsUpdateAuthorityV2(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: UpdateAsUpdateAuthorityV2InstructionAccounts &
    UpdateAsUpdateAuthorityV2InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    authority: { index: 0, isWritable: false, value: input.authority ?? null },
    delegateRecord: {
      index: 1,
      isWritable: false,
      value: input.delegateRecord ?? null,
    },
    token: { index: 2, isWritable: false, value: input.token ?? null },
    mint: { index: 3, isWritable: false, value: input.mint ?? null },
    metadata: { index: 4, isWritable: true, value: input.metadata ?? null },
    edition: { index: 5, isWritable: false, value: input.edition ?? null },
    payer: { index: 6, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 7,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 8,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authorizationRulesProgram: {
      index: 9,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 10,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: UpdateAsUpdateAuthorityV2InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.sysvarInstructions.value) {
    resolvedAccounts.sysvarInstructions.value = publicKey(
      'Sysvar1nstructions1111111111111111111111111'
    );
  }
  if (!resolvedAccounts.authorizationRulesProgram.value) {
    if (resolvedAccounts.authorizationRules.value) {
      resolvedAccounts.authorizationRulesProgram.value =
        context.programs.getPublicKey(
          'mplTokenAuthRules',
          'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
        );
      resolvedAccounts.authorizationRulesProgram.isWritable = false;
    }
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data =
    getUpdateAsUpdateAuthorityV2InstructionDataSerializer().serialize(
      resolvedArgs as UpdateAsUpdateAuthorityV2InstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
