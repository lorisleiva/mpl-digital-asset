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
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import { DataV2, DataV2Args, getDataV2Serializer } from '../types';

// Accounts.
export type UpdateMetadataAccountV2InstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Update authority key */
  updateAuthority?: Signer;
};

// Data.
export type UpdateMetadataAccountV2InstructionData = {
  discriminator: number;
  data: Option<DataV2>;
  newUpdateAuthority: Option<PublicKey>;
  primarySaleHappened: Option<boolean>;
  isMutable: Option<boolean>;
};

export type UpdateMetadataAccountV2InstructionDataArgs = {
  data?: OptionOrNullable<DataV2Args>;
  newUpdateAuthority?: OptionOrNullable<PublicKey>;
  primarySaleHappened?: OptionOrNullable<boolean>;
  isMutable?: OptionOrNullable<boolean>;
};

export function getUpdateMetadataAccountV2InstructionDataSerializer(): Serializer<
  UpdateMetadataAccountV2InstructionDataArgs,
  UpdateMetadataAccountV2InstructionData
> {
  return mapSerializer<
    UpdateMetadataAccountV2InstructionDataArgs,
    any,
    UpdateMetadataAccountV2InstructionData
  >(
    struct<UpdateMetadataAccountV2InstructionData>(
      [
        ['discriminator', u8()],
        ['data', option(getDataV2Serializer())],
        ['newUpdateAuthority', option(publicKeySerializer())],
        ['primarySaleHappened', option(bool())],
        ['isMutable', option(bool())],
      ],
      { description: 'UpdateMetadataAccountV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 15,
      data: value.data ?? none(),
      newUpdateAuthority: value.newUpdateAuthority ?? none(),
      primarySaleHappened: value.primarySaleHappened ?? none(),
      isMutable: value.isMutable ?? none(),
    })
  ) as Serializer<
    UpdateMetadataAccountV2InstructionDataArgs,
    UpdateMetadataAccountV2InstructionData
  >;
}

// Args.
export type UpdateMetadataAccountV2InstructionArgs =
  UpdateMetadataAccountV2InstructionDataArgs;

// Instruction.
export function updateMetadataAccountV2(
  context: Pick<Context, 'identity' | 'programs'>,
  input: UpdateMetadataAccountV2InstructionAccounts &
    UpdateMetadataAccountV2InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    updateAuthority: {
      index: 1,
      isWritable: false,
      value: input.updateAuthority ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateMetadataAccountV2InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.updateAuthority.value) {
    resolvedAccounts.updateAuthority.value = context.identity;
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
  const data = getUpdateMetadataAccountV2InstructionDataSerializer().serialize(
    resolvedArgs as UpdateMetadataAccountV2InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
