/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
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
import { resolveMasterEdition } from '../../hooked';
import { findMetadataPda, findTokenRecordPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';
import { TokenStandardArgs } from '../types';

// Accounts.
export type RevokeStandardV1InstructionAccounts = {
  /** Delegate record account */
  delegateRecord?: PublicKey | Pda;
  /** Owner of the delegated account */
  delegate: PublicKey | Pda;
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Master Edition account */
  masterEdition?: PublicKey | Pda;
  /** Token record account */
  tokenRecord?: PublicKey | Pda;
  /** Mint of metadata */
  mint: PublicKey | Pda;
  /** Token account of mint */
  token?: PublicKey | Pda;
  /** Update authority or token owner */
  authority?: Signer;
  /** Payer */
  payer?: Signer;
  /** System Program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type RevokeStandardV1InstructionData = {
  discriminator: number;
  revokeStandardV1Discriminator: number;
};

export type RevokeStandardV1InstructionDataArgs = {};

export function getRevokeStandardV1InstructionDataSerializer(): Serializer<
  RevokeStandardV1InstructionDataArgs,
  RevokeStandardV1InstructionData
> {
  return mapSerializer<
    RevokeStandardV1InstructionDataArgs,
    any,
    RevokeStandardV1InstructionData
  >(
    struct<RevokeStandardV1InstructionData>(
      [
        ['discriminator', u8()],
        ['revokeStandardV1Discriminator', u8()],
      ],
      { description: 'RevokeStandardV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 45,
      revokeStandardV1Discriminator: 6,
    })
  ) as Serializer<
    RevokeStandardV1InstructionDataArgs,
    RevokeStandardV1InstructionData
  >;
}

// Extra Args.
export type RevokeStandardV1InstructionExtraArgs = {
  tokenStandard: TokenStandardArgs;
  tokenOwner: PublicKey;
};

// Args.
export type RevokeStandardV1InstructionArgs = PickPartial<
  RevokeStandardV1InstructionExtraArgs,
  'tokenOwner'
>;

// Instruction.
export function revokeStandardV1(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: RevokeStandardV1InstructionAccounts & RevokeStandardV1InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    delegateRecord: {
      index: 0,
      isWritable: true,
      value: input.delegateRecord ?? null,
    },
    delegate: { index: 1, isWritable: false, value: input.delegate ?? null },
    metadata: { index: 2, isWritable: true, value: input.metadata ?? null },
    masterEdition: {
      index: 3,
      isWritable: false,
      value: input.masterEdition ?? null,
    },
    tokenRecord: {
      index: 4,
      isWritable: true,
      value: input.tokenRecord ?? null,
    },
    mint: { index: 5, isWritable: false, value: input.mint ?? null },
    token: { index: 6, isWritable: true, value: input.token ?? null },
    authority: { index: 7, isWritable: false, value: input.authority ?? null },
    payer: { index: 8, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 9,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 10,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    splTokenProgram: {
      index: 11,
      isWritable: false,
      value: input.splTokenProgram ?? null,
    },
    authorizationRulesProgram: {
      index: 12,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 13,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: RevokeStandardV1InstructionArgs = { ...input };

  // Default values.
  if (!resolvedArgs.tokenOwner) {
    resolvedArgs.tokenOwner = context.identity.publicKey;
  }
  if (!resolvedAccounts.token.value) {
    resolvedAccounts.token.value = findAssociatedTokenPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
      owner: expectSome(resolvedArgs.tokenOwner),
    });
  }
  if (!resolvedAccounts.delegateRecord.value) {
    resolvedAccounts.delegateRecord.value = findTokenRecordPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
      token: expectPublicKey(resolvedAccounts.token.value),
    });
  }
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.masterEdition.value) {
    resolvedAccounts.masterEdition = {
      ...resolvedAccounts.masterEdition,
      ...resolveMasterEdition(
        context,
        resolvedAccounts,
        resolvedArgs,
        programId,
        false
      ),
    };
  }
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
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
  const data = getRevokeStandardV1InstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
