/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';

// Accounts.
export type SignMetadataInstructionAccounts = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey;
  /** Creator */
  creator: Signer;
};

// Data.
export type SignMetadataInstructionData = { discriminator: number };

export type SignMetadataInstructionDataArgs = {};

export function getSignMetadataInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<SignMetadataInstructionDataArgs, SignMetadataInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    SignMetadataInstructionDataArgs,
    SignMetadataInstructionData,
    SignMetadataInstructionData
  >(
    s.struct<SignMetadataInstructionData>([['discriminator', s.u8()]], {
      description: 'SignMetadataInstructionData',
    }),
    (value) => ({ ...value, discriminator: 7 } as SignMetadataInstructionData)
  ) as Serializer<SignMetadataInstructionDataArgs, SignMetadataInstructionData>;
}

// Instruction.
export function signMetadata(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: SignMetadataInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvedAccounts: any = { ...input };

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Creator.
  signers.push(resolvedAccounts.creator);
  keys.push({
    pubkey: resolvedAccounts.creator.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.creator, false),
  });

  // Data.
  const data = getSignMetadataInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
