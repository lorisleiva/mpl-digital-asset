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
export type RevokeSaleV1InstructionAccounts = {
  /** Delegate record account */
  delegateRecord?: PublicKey;
  /** Owner of the delegated account */
  delegate: PublicKey;
  /** Metadata account */
  metadata?: PublicKey;
  /** Master Edition account */
  masterEdition?: PublicKey;
  /** Token record account */
  tokenRecord?: PublicKey;
  /** Mint of metadata */
  mint: PublicKey;
  /** Token account of mint */
  token?: PublicKey;
  /** Update authority or token owner */
  authority?: Signer;
  /** Payer */
  payer?: Signer;
  /** System Program */
  systemProgram?: PublicKey;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey;
  /** SPL Token Program */
  splTokenProgram?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
};

// Data.
export type RevokeSaleV1InstructionData = {
  discriminator: number;
  revokeSaleV1Discriminator: number;
};

export type RevokeSaleV1InstructionDataArgs = {};

export function getRevokeSaleV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<RevokeSaleV1InstructionDataArgs, RevokeSaleV1InstructionData> {
  const s = context.serializer;
  return mapSerializer<
    RevokeSaleV1InstructionDataArgs,
    RevokeSaleV1InstructionData,
    RevokeSaleV1InstructionData
  >(
    s.struct<RevokeSaleV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['revokeSaleV1Discriminator', s.u8()],
      ],
      { description: 'RevokeSaleV1InstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 45,
        revokeSaleV1Discriminator: 1,
      } as RevokeSaleV1InstructionData)
  ) as Serializer<RevokeSaleV1InstructionDataArgs, RevokeSaleV1InstructionData>;
}

// Instruction.
export function revokeSaleV1(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: RevokeSaleV1InstructionAccounts
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
  resolvedAccounts.delegateRecord =
    resolvedAccounts.delegateRecord ?? programId;
  resolvedAccounts.metadata =
    resolvedAccounts.metadata ??
    findMetadataPda(context, { mint: publicKey(resolvedAccounts.mint) });
  resolvedAccounts.masterEdition = resolvedAccounts.masterEdition ?? programId;
  resolvedAccounts.tokenRecord = resolvedAccounts.tokenRecord ?? programId;
  resolvedAccounts.token = resolvedAccounts.token ?? programId;
  resolvedAccounts.authority = resolvedAccounts.authority ?? context.identity;
  resolvedAccounts.payer = resolvedAccounts.payer ?? context.payer;
  resolvedAccounts.systemProgram = resolvedAccounts.systemProgram ?? {
    ...context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    ),
    isWritable: false,
  };
  resolvedAccounts.sysvarInstructions =
    resolvedAccounts.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  resolvedAccounts.splTokenProgram =
    resolvedAccounts.splTokenProgram ?? programId;
  resolvedAccounts.authorizationRulesProgram =
    resolvedAccounts.authorizationRulesProgram ?? programId;
  resolvedAccounts.authorizationRules =
    resolvedAccounts.authorizationRules ?? programId;

  // Delegate Record.
  keys.push({
    pubkey: resolvedAccounts.delegateRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.delegateRecord, true),
  });

  // Delegate.
  keys.push({
    pubkey: resolvedAccounts.delegate,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.delegate, false),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Master Edition.
  keys.push({
    pubkey: resolvedAccounts.masterEdition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.masterEdition, false),
  });

  // Token Record.
  keys.push({
    pubkey: resolvedAccounts.tokenRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenRecord, true),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, false),
  });

  // Token.
  keys.push({
    pubkey: resolvedAccounts.token,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.token, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: resolvedAccounts.sysvarInstructions,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.sysvarInstructions, false),
  });

  // Spl Token Program.
  keys.push({
    pubkey: resolvedAccounts.splTokenProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.splTokenProgram, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: resolvedAccounts.authorizationRulesProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRulesProgram, false),
  });

  // Authorization Rules.
  keys.push({
    pubkey: resolvedAccounts.authorizationRules,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRules, false),
  });

  // Data.
  const data = getRevokeSaleV1InstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
