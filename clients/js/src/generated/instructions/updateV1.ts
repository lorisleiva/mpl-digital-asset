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
  bool,
  mapSerializer,
  option,
  publicKey as publicKeySerializer,
  struct,
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
  Data,
  DataArgs,
  RuleSetToggle,
  RuleSetToggleArgs,
  UsesToggle,
  UsesToggleArgs,
  collectionDetailsToggle,
  collectionToggle,
  getAuthorizationDataSerializer,
  getCollectionDetailsToggleSerializer,
  getCollectionToggleSerializer,
  getDataSerializer,
  getRuleSetToggleSerializer,
  getUsesToggleSerializer,
  ruleSetToggle,
  usesToggle,
} from '../types';

// Accounts.
export type UpdateV1InstructionAccounts = {
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
export type UpdateV1InstructionData = {
  discriminator: number;
  updateV1Discriminator: number;
  newUpdateAuthority: Option<PublicKey>;
  data: Option<Data>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
  collection: CollectionToggle;
  collectionDetails: CollectionDetailsToggle;
  uses: UsesToggle;
  ruleSet: RuleSetToggle;
  authorizationData: Option<AuthorizationData>;
};

export type UpdateV1InstructionDataArgs = {
  newUpdateAuthority?: OptionOrNullable<PublicKey>;
  data?: OptionOrNullable<DataArgs>;
  primarySaleHappened?: OptionOrNullable<boolean>;
  isMutable?: OptionOrNullable<boolean>;
  collection?: CollectionToggleArgs;
  collectionDetails?: CollectionDetailsToggleArgs;
  uses?: UsesToggleArgs;
  ruleSet?: RuleSetToggleArgs;
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUpdateV1InstructionDataSerializer(): Serializer<
  UpdateV1InstructionDataArgs,
  UpdateV1InstructionData
> {
  return mapSerializer<
    UpdateV1InstructionDataArgs,
    any,
    UpdateV1InstructionData
  >(
    struct<UpdateV1InstructionData>(
      [
        ['discriminator', u8()],
        ['updateV1Discriminator', u8()],
        ['newUpdateAuthority', option(publicKeySerializer())],
        ['data', option(getDataSerializer())],
        ['primarySaleHappened', option(bool())],
        ['isMutable', option(bool())],
        ['collection', getCollectionToggleSerializer()],
        ['collectionDetails', getCollectionDetailsToggleSerializer()],
        ['uses', getUsesToggleSerializer()],
        ['ruleSet', getRuleSetToggleSerializer()],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'UpdateV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 50,
      updateV1Discriminator: 0,
      newUpdateAuthority: value.newUpdateAuthority ?? none(),
      data: value.data ?? none(),
      primarySaleHappened: value.primarySaleHappened ?? none(),
      isMutable: value.isMutable ?? none(),
      collection: value.collection ?? collectionToggle('None'),
      collectionDetails:
        value.collectionDetails ?? collectionDetailsToggle('None'),
      uses: value.uses ?? usesToggle('None'),
      ruleSet: value.ruleSet ?? ruleSetToggle('None'),
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<UpdateV1InstructionDataArgs, UpdateV1InstructionData>;
}

// Args.
export type UpdateV1InstructionArgs = UpdateV1InstructionDataArgs;

// Instruction.
export function updateV1(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: UpdateV1InstructionAccounts & UpdateV1InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    authority: {
      index: 0,
      isWritable: false as boolean,
      value: input.authority ?? null,
    },
    delegateRecord: {
      index: 1,
      isWritable: false as boolean,
      value: input.delegateRecord ?? null,
    },
    token: {
      index: 2,
      isWritable: false as boolean,
      value: input.token ?? null,
    },
    mint: { index: 3, isWritable: false as boolean, value: input.mint ?? null },
    metadata: {
      index: 4,
      isWritable: true as boolean,
      value: input.metadata ?? null,
    },
    edition: {
      index: 5,
      isWritable: false as boolean,
      value: input.edition ?? null,
    },
    payer: {
      index: 6,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 7,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 8,
      isWritable: false as boolean,
      value: input.sysvarInstructions ?? null,
    },
    authorizationRulesProgram: {
      index: 9,
      isWritable: false as boolean,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 10,
      isWritable: false as boolean,
      value: input.authorizationRules ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateV1InstructionArgs = { ...input };

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
  const data = getUpdateV1InstructionDataSerializer().serialize(
    resolvedArgs as UpdateV1InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
