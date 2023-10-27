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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  findMasterEditionPda,
  findMetadataPda,
  findTokenRecordPda,
} from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type MigrateInstructionAccounts = {
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
  /** Token account */
  token: PublicKey | Pda;
  /** Token account owner */
  tokenOwner: PublicKey | Pda;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Payer */
  payer?: Signer;
  /** Update authority */
  authority?: Signer;
  /** Collection metadata account */
  collectionMetadata: PublicKey | Pda;
  /** Delegate record account */
  delegateRecord: PublicKey | Pda;
  /** Token record account */
  tokenRecord?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Instruction sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type MigrateInstructionData = { discriminator: number };

export type MigrateInstructionDataArgs = {};

export function getMigrateInstructionDataSerializer(): Serializer<
  MigrateInstructionDataArgs,
  MigrateInstructionData
> {
  return mapSerializer<MigrateInstructionDataArgs, any, MigrateInstructionData>(
    struct<MigrateInstructionData>([['discriminator', u8()]], {
      description: 'MigrateInstructionData',
    }),
    (value) => ({ ...value, discriminator: 48 })
  ) as Serializer<MigrateInstructionDataArgs, MigrateInstructionData>;
}

// Instruction.
export function migrate(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: MigrateInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    edition: { index: 1, isWritable: true, value: input.edition ?? null },
    token: { index: 2, isWritable: true, value: input.token ?? null },
    tokenOwner: {
      index: 3,
      isWritable: false,
      value: input.tokenOwner ?? null,
    },
    mint: { index: 4, isWritable: false, value: input.mint ?? null },
    payer: { index: 5, isWritable: true, value: input.payer ?? null },
    authority: { index: 6, isWritable: false, value: input.authority ?? null },
    collectionMetadata: {
      index: 7,
      isWritable: false,
      value: input.collectionMetadata ?? null,
    },
    delegateRecord: {
      index: 8,
      isWritable: false,
      value: input.delegateRecord ?? null,
    },
    tokenRecord: {
      index: 9,
      isWritable: true,
      value: input.tokenRecord ?? null,
    },
    systemProgram: {
      index: 10,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 11,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    splTokenProgram: {
      index: 12,
      isWritable: false,
      value: input.splTokenProgram ?? null,
    },
    authorizationRulesProgram: {
      index: 13,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 14,
      isWritable: false,
      value: input.authorizationRules ?? null,
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
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.tokenRecord.value) {
    resolvedAccounts.tokenRecord.value = findTokenRecordPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
      token: expectPublicKey(resolvedAccounts.token.value),
    });
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
  if (!resolvedAccounts.splTokenProgram.value) {
    resolvedAccounts.splTokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.splTokenProgram.isWritable = false;
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
  const data = getMigrateInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
