/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMasterEditionPda, findMetadataPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type ResizeInstructionAccounts = {
  /** The metadata account of the digital asset */
  metadata?: PublicKey | Pda;
  /** The master edition or edition account of the digital asset, an uninitialized account for fungible assets */
  edition?: PublicKey | Pda;
  /** Mint of token asset */
  mint: PublicKey | Pda;
  /** The recipient of the excess rent and authority if the authority account is not present */
  payer?: PublicKey | Pda | Signer;
  /** Owner of the asset for (p)NFTs, or mint authority for fungible assets, if different from the payer */
  authority?: Signer;
  /** Token or Associated Token account */
  token?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type ResizeInstructionData = { discriminator: number };

export type ResizeInstructionDataArgs = {};

export function getResizeInstructionDataSerializer(): Serializer<
  ResizeInstructionDataArgs,
  ResizeInstructionData
> {
  return mapSerializer<ResizeInstructionDataArgs, any, ResizeInstructionData>(
    struct<ResizeInstructionData>([['discriminator', u8()]], {
      description: 'ResizeInstructionData',
    }),
    (value) => ({ ...value, discriminator: 56 })
  ) as Serializer<ResizeInstructionDataArgs, ResizeInstructionData>;
}

// Instruction.
export function resize(
  context: Pick<Context, 'eddsa' | 'payer' | 'programs'>,
  input: ResizeInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    metadata: {
      index: 0,
      isWritable: true as boolean,
      value: input.metadata ?? null,
    },
    edition: {
      index: 1,
      isWritable: true as boolean,
      value: input.edition ?? null,
    },
    mint: { index: 2, isWritable: false as boolean, value: input.mint ?? null },
    payer: {
      index: 3,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    authority: {
      index: 4,
      isWritable: false as boolean,
      value: input.authority ?? null,
    },
    token: {
      index: 5,
      isWritable: false as boolean,
      value: input.token ?? null,
    },
    systemProgram: {
      index: 6,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.edition.value) {
    resolvedAccounts.edition.value = findMasterEditionPda(context, {
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
  const data = getResizeInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
