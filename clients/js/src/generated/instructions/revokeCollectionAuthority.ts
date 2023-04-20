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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findMetadataPda } from '../accounts';

// Accounts.
export type RevokeCollectionAuthorityInstructionAccounts = {
  /** Collection Authority Record PDA */
  collectionAuthorityRecord: PublicKey;
  /** Delegated Collection Authority */
  delegateAuthority: PublicKey;
  /** Update Authority, or Delegated Authority, of Collection NFT */
  revokeAuthority: Signer;
  /** Metadata account */
  metadata?: PublicKey;
  /** Mint of Metadata */
  mint: PublicKey;
};

// Data.
export type RevokeCollectionAuthorityInstructionData = {
  discriminator: number;
};

export type RevokeCollectionAuthorityInstructionDataArgs = {};

export function getRevokeCollectionAuthorityInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  RevokeCollectionAuthorityInstructionDataArgs,
  RevokeCollectionAuthorityInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    RevokeCollectionAuthorityInstructionDataArgs,
    RevokeCollectionAuthorityInstructionData,
    RevokeCollectionAuthorityInstructionData
  >(
    s.struct<RevokeCollectionAuthorityInstructionData>(
      [['discriminator', s.u8()]],
      { description: 'RevokeCollectionAuthorityInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 24,
      } as RevokeCollectionAuthorityInstructionData)
  ) as Serializer<
    RevokeCollectionAuthorityInstructionDataArgs,
    RevokeCollectionAuthorityInstructionData
  >;
}

// Instruction.
export function revokeCollectionAuthority(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa'>,
  input: RevokeCollectionAuthorityInstructionAccounts
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
  resolvedAccounts.metadata =
    resolvedAccounts.metadata ??
    findMetadataPda(context, { mint: publicKey(resolvedAccounts.mint) });

  // Collection Authority Record.
  keys.push({
    pubkey: resolvedAccounts.collectionAuthorityRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionAuthorityRecord, true),
  });

  // Delegate Authority.
  keys.push({
    pubkey: resolvedAccounts.delegateAuthority,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.delegateAuthority, true),
  });

  // Revoke Authority.
  signers.push(resolvedAccounts.revokeAuthority);
  keys.push({
    pubkey: resolvedAccounts.revokeAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.revokeAuthority, true),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, false),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, false),
  });

  // Data.
  const data = getRevokeCollectionAuthorityInstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
