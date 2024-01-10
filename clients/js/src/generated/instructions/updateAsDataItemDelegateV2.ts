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
  Data,
  DataArgs,
  MetadataDelegateRole,
  getAuthorizationDataSerializer,
  getDataSerializer,
} from '../types';

// Accounts.
export type UpdateAsDataItemDelegateV2InstructionAccounts = {
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
export type UpdateAsDataItemDelegateV2InstructionData = {
  discriminator: number;
  updateAsDataItemDelegateV2Discriminator: number;
  data: Option<Data>;
  authorizationData: Option<AuthorizationData>;
};

export type UpdateAsDataItemDelegateV2InstructionDataArgs = {
  data?: OptionOrNullable<DataArgs>;
  authorizationData?: OptionOrNullable<AuthorizationDataArgs>;
};

export function getUpdateAsDataItemDelegateV2InstructionDataSerializer(): Serializer<
  UpdateAsDataItemDelegateV2InstructionDataArgs,
  UpdateAsDataItemDelegateV2InstructionData
> {
  return mapSerializer<
    UpdateAsDataItemDelegateV2InstructionDataArgs,
    any,
    UpdateAsDataItemDelegateV2InstructionData
  >(
    struct<UpdateAsDataItemDelegateV2InstructionData>(
      [
        ['discriminator', u8()],
        ['updateAsDataItemDelegateV2Discriminator', u8()],
        ['data', option(getDataSerializer())],
        ['authorizationData', option(getAuthorizationDataSerializer())],
      ],
      { description: 'UpdateAsDataItemDelegateV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 50,
      updateAsDataItemDelegateV2Discriminator: 6,
      data: value.data ?? none(),
      authorizationData: value.authorizationData ?? none(),
    })
  ) as Serializer<
    UpdateAsDataItemDelegateV2InstructionDataArgs,
    UpdateAsDataItemDelegateV2InstructionData
  >;
}

// Extra Args.
export type UpdateAsDataItemDelegateV2InstructionExtraArgs = {
  updateAuthority: PublicKey;
};

// Args.
export type UpdateAsDataItemDelegateV2InstructionArgs = PickPartial<
  UpdateAsDataItemDelegateV2InstructionDataArgs &
    UpdateAsDataItemDelegateV2InstructionExtraArgs,
  'updateAuthority'
>;

// Instruction.
export function updateAsDataItemDelegateV2(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: UpdateAsDataItemDelegateV2InstructionAccounts &
    UpdateAsDataItemDelegateV2InstructionArgs
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
  const resolvedArgs: UpdateAsDataItemDelegateV2InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedArgs.updateAuthority) {
    resolvedArgs.updateAuthority = context.identity.publicKey;
  }
  if (!resolvedAccounts.delegateRecord.value) {
    resolvedAccounts.delegateRecord.value = findMetadataDelegateRecordPda(
      context,
      {
        delegateRole: MetadataDelegateRole.DataItem,
        updateAuthority: expectSome(resolvedArgs.updateAuthority),
        delegate: expectPublicKey(resolvedAccounts.authority.value),
        mint: expectPublicKey(resolvedAccounts.mint.value),
      }
    );
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
          'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
          'mplTokenAuthRules'
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
    getUpdateAsDataItemDelegateV2InstructionDataSerializer().serialize(
      resolvedArgs as UpdateAsDataItemDelegateV2InstructionDataArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
