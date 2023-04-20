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
import { findMasterEditionPda, findMetadataPda } from '../accounts';

// Accounts.
export type CreateEscrowAccountInstructionAccounts = {
  /** Escrow account */
  escrow: PublicKey;
  /** Metadata account */
  metadata?: PublicKey;
  /** Mint account */
  mint: PublicKey;
  /** Token account of the token */
  tokenAccount: PublicKey;
  /** Edition account */
  edition?: PublicKey;
  /** Wallet paying for the transaction and new account */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey;
  /** Authority/creator of the escrow account */
  authority?: Signer;
};

// Data.
export type CreateEscrowAccountInstructionData = { discriminator: number };

export type CreateEscrowAccountInstructionDataArgs = {};

export function getCreateEscrowAccountInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateEscrowAccountInstructionDataArgs,
  CreateEscrowAccountInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateEscrowAccountInstructionDataArgs,
    CreateEscrowAccountInstructionData,
    CreateEscrowAccountInstructionData
  >(
    s.struct<CreateEscrowAccountInstructionData>([['discriminator', s.u8()]], {
      description: 'CreateEscrowAccountInstructionData',
    }),
    (value) =>
      ({ ...value, discriminator: 38 } as CreateEscrowAccountInstructionData)
  ) as Serializer<
    CreateEscrowAccountInstructionDataArgs,
    CreateEscrowAccountInstructionData
  >;
}

// Instruction.
export function createEscrowAccount(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'payer'>,
  input: CreateEscrowAccountInstructionAccounts
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
  resolvedAccounts.edition =
    resolvedAccounts.edition ??
    findMasterEditionPda(context, { mint: publicKey(resolvedAccounts.mint) });
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

  // Escrow.
  keys.push({
    pubkey: resolvedAccounts.escrow,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.escrow, true),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, false),
  });

  // Token Account.
  keys.push({
    pubkey: resolvedAccounts.tokenAccount,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenAccount, false),
  });

  // Edition.
  keys.push({
    pubkey: resolvedAccounts.edition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.edition, false),
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

  // Authority (optional).
  if (resolvedAccounts.authority) {
    signers.push(resolvedAccounts.authority);
    keys.push({
      pubkey: resolvedAccounts.authority.publicKey,
      isSigner: true,
      isWritable: isWritable(resolvedAccounts.authority, false),
    });
  }

  // Data.
  const data = getCreateEscrowAccountInstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
