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
import { resolveIsNonFungible } from '../../hooked';
import {
  findMasterEditionPda,
  findMetadataDelegateRecordPda,
  findMetadataPda,
  findTokenRecordPda,
} from '../accounts';
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
  TokenStandard,
  TokenStandardArgs,
  getAuthorizationDataSerializer,
} from '../types';

// Accounts.
export type DelegateCollectionItemV1InstructionAccounts = {
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
export type DelegateCollectionItemV1InstructionData = {
  discriminator: number;
  delegateCollectionItemV1Discriminator: number;
  authorizationData: Option<AuthorizationData>;
};

export type DelegateCollectionItemV1InstructionDataArgs = {
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getDelegateCollectionItemV1InstructionDataSerializer(): Serializer<
  DelegateCollectionItemV1InstructionDataArgs,
  DelegateCollectionItemV1InstructionData
> {
  return mapSerializer<
    DelegateCollectionItemV1InstructionDataArgs,
    any,
    DelegateCollectionItemV1InstructionData
  >(
    struct<DelegateCollectionItemV1InstructionData>(
      [
        ['discriminator', u8()],
        ['delegateCollectionItemV1Discriminator', u8()],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'DelegateCollectionItemV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 44,
      delegateCollectionItemV1Discriminator: 11,
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<
    DelegateCollectionItemV1InstructionDataArgs,
    DelegateCollectionItemV1InstructionData
  >;
}

// Extra Args.
export type DelegateCollectionItemV1InstructionExtraArgs = {
  tokenStandard: TokenStandardArgs;
  updateAuthority: PublicKey;
};

// Args.
export type DelegateCollectionItemV1InstructionArgs = PickPartial<
  DelegateCollectionItemV1InstructionDataArgs &
    DelegateCollectionItemV1InstructionExtraArgs,
  'updateAuthority'
>;

// Instruction.
export function delegateCollectionItemV1(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: DelegateCollectionItemV1InstructionAccounts &
    DelegateCollectionItemV1InstructionArgs
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
  const resolvedArgs: DelegateCollectionItemV1InstructionArgs = { ...input };

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
        delegateRole: MetadataDelegateRole.CollectionItem,
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
    if (
      resolveIsNonFungible(
        context,
        resolvedAccounts,
        resolvedArgs,
        programId,
        false
      )
    ) {
      resolvedAccounts.masterEdition.value = findMasterEditionPda(context, {
        mint: expectPublicKey(resolvedAccounts.mint.value),
      });
    }
  }
  if (!resolvedAccounts.tokenRecord.value) {
    if (resolvedArgs.tokenStandard === TokenStandard.ProgrammableNonFungible) {
      resolvedAccounts.tokenRecord.value = findTokenRecordPda(context, {
        mint: expectPublicKey(resolvedAccounts.mint.value),
        token: expectPublicKey(resolvedAccounts.token.value),
      });
    }
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
  const data = getDelegateCollectionItemV1InstructionDataSerializer().serialize(
    resolvedArgs as DelegateCollectionItemV1InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
