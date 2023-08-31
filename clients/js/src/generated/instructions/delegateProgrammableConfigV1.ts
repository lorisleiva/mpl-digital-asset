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
  mapSerializer,
  option,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { resolveMasterEdition, resolveTokenRecord } from '../../hooked';
import { findMetadataDelegateRecordPda, findMetadataPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  expectSome,
  getAccountMetasAndSigners,
} from '../shared';
import {
  AuthorizationData,
  AuthorizationDataArgs,
  MetadataDelegateRole,
  TokenStandardArgs,
  getAuthorizationDataSerializer,
} from '../types';

// Accounts.
export type DelegateProgrammableConfigV1InstructionAccounts = {
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
export type DelegateProgrammableConfigV1InstructionData = {
  discriminator: number;
  delegateProgrammableConfigV1Discriminator: number;
  authorizationData: Option<AuthorizationData>;
};

export type DelegateProgrammableConfigV1InstructionDataArgs = {
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getDelegateProgrammableConfigV1InstructionDataSerializer(): Serializer<
  DelegateProgrammableConfigV1InstructionDataArgs,
  DelegateProgrammableConfigV1InstructionData
> {
  return mapSerializer<
    DelegateProgrammableConfigV1InstructionDataArgs,
    any,
    DelegateProgrammableConfigV1InstructionData
  >(
    struct<DelegateProgrammableConfigV1InstructionData>(
      [
        ['discriminator', u8()],
        ['delegateProgrammableConfigV1Discriminator', u8()],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'DelegateProgrammableConfigV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 44,
      delegateProgrammableConfigV1Discriminator: 8,
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<
    DelegateProgrammableConfigV1InstructionDataArgs,
    DelegateProgrammableConfigV1InstructionData
  >;
}

// Extra Args.
export type DelegateProgrammableConfigV1InstructionExtraArgs = {
  tokenStandard: TokenStandardArgs;
  updateAuthority: PublicKey;
};

// Args.
export type DelegateProgrammableConfigV1InstructionArgs = PickPartial<
  DelegateProgrammableConfigV1InstructionDataArgs &
    DelegateProgrammableConfigV1InstructionExtraArgs,
  'updateAuthority'
>;

// Instruction.
export function delegateProgrammableConfigV1(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: DelegateProgrammableConfigV1InstructionAccounts &
    DelegateProgrammableConfigV1InstructionArgs
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
  const resolvedArgs: DelegateProgrammableConfigV1InstructionArgs = {
    ...input,
  };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedArgs.updateAuthority) {
    resolvedArgs.updateAuthority = expectPublicKey(
      resolvedAccounts.authority.value
    );
  }
  if (!resolvedAccounts.delegateRecord.value) {
    resolvedAccounts.delegateRecord.value = findMetadataDelegateRecordPda(
      context,
      {
        mint: expectPublicKey(resolvedAccounts.mint.value),
        delegateRole: MetadataDelegateRole.ProgrammableConfig,
        updateAuthority: expectSome(resolvedArgs.updateAuthority),
        delegate: expectPublicKey(resolvedAccounts.delegate.value),
      }
    );
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
  if (!resolvedAccounts.tokenRecord.value) {
    resolvedAccounts.tokenRecord = {
      ...resolvedAccounts.tokenRecord,
      ...resolveTokenRecord(
        context,
        resolvedAccounts,
        resolvedArgs,
        programId,
        true
      ),
    };
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
    getDelegateProgrammableConfigV1InstructionDataSerializer().serialize(
      resolvedArgs as DelegateProgrammableConfigV1InstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
