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
import { findMasterEditionPda } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type FreezeDelegatedAccountInstructionAccounts = {
  /** Delegate */
  delegate: Signer;
  /** Token account to freeze */
  tokenAccount: PublicKey | Pda;
  /** Edition */
  edition?: PublicKey | Pda;
  /** Token mint */
  mint: PublicKey | Pda;
  /** Token Program */
  tokenProgram?: PublicKey | Pda;
};

// Data.
export type FreezeDelegatedAccountInstructionData = { discriminator: number };

export type FreezeDelegatedAccountInstructionDataArgs = {};

export function getFreezeDelegatedAccountInstructionDataSerializer(): Serializer<
  FreezeDelegatedAccountInstructionDataArgs,
  FreezeDelegatedAccountInstructionData
> {
  return mapSerializer<
    FreezeDelegatedAccountInstructionDataArgs,
    any,
    FreezeDelegatedAccountInstructionData
  >(
    struct<FreezeDelegatedAccountInstructionData>([['discriminator', u8()]], {
      description: 'FreezeDelegatedAccountInstructionData',
    }),
    (value) => ({ ...value, discriminator: 26 })
  ) as Serializer<
    FreezeDelegatedAccountInstructionDataArgs,
    FreezeDelegatedAccountInstructionData
  >;
}

// Instruction.
export function freezeDelegatedAccount(
  context: Pick<Context, 'eddsa' | 'programs'>,
  input: FreezeDelegatedAccountInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    delegate: {
      index: 0,
      isWritable: true as boolean,
      value: input.delegate ?? null,
    },
    tokenAccount: {
      index: 1,
      isWritable: true as boolean,
      value: input.tokenAccount ?? null,
    },
    edition: {
      index: 2,
      isWritable: false as boolean,
      value: input.edition ?? null,
    },
    mint: { index: 3, isWritable: false as boolean, value: input.mint ?? null },
    tokenProgram: {
      index: 4,
      isWritable: false as boolean,
      value: input.tokenProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.edition.value) {
    resolvedAccounts.edition.value = findMasterEditionPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
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
  const data = getFreezeDelegatedAccountInstructionDataSerializer().serialize(
    {}
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
