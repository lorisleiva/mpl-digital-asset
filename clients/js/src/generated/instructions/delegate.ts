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
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
} from '@lorisleiva/js-core';
import { findMetadataPda } from '../accounts';
import {
  DelegateArgs,
  DelegateArgsArgs,
  getDelegateArgsSerializer,
} from '../types';

// Accounts.
export type DelegateInstructionAccounts = {
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

// Arguments.
export type DelegateInstructionData = {
  discriminator: number;
  delegateArgs: DelegateArgs;
};

export type DelegateInstructionArgs = { delegateArgs: DelegateArgsArgs };

export function getDelegateInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<DelegateInstructionArgs, DelegateInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    DelegateInstructionArgs,
    DelegateInstructionData,
    DelegateInstructionData
  >(
    s.struct<DelegateInstructionData>(
      [
        ['discriminator', s.u8],
        ['delegateArgs', getDelegateArgsSerializer(context)],
      ],
      'DelegateInstructionArgs'
    ),
    (value) => ({ discriminator: 44, ...value } as DelegateInstructionData)
  ) as Serializer<DelegateInstructionArgs, DelegateInstructionData>;
}

// Instruction.
export function delegate(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: DelegateInstructionAccounts & DelegateInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const delegateRecordAccount = input.delegateRecord;
  const delegateAccount = input.delegate;
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const masterEditionAccount = input.masterEdition;
  const tokenRecordAccount = input.tokenRecord;
  const tokenAccount = input.token;
  const authorityAccount = input.authority ?? context.identity;
  const payerAccount = input.payer ?? context.payer;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };
  const sysvarInstructionsAccount =
    input.sysvarInstructions ??
    publicKey('Sysvar1nstructions1111111111111111111111111');
  const splTokenProgramAccount = input.splTokenProgram;
  const authorizationRulesProgramAccount = input.authorizationRulesProgram;
  const authorizationRulesAccount = input.authorizationRules;

  // Delegate Record (optional).
  if (delegateRecordAccount) {
    keys.push({
      pubkey: delegateRecordAccount,
      isSigner: false,
      isWritable: isWritable(delegateRecordAccount, true),
    });
  }

  // Delegate.
  keys.push({
    pubkey: delegateAccount,
    isSigner: false,
    isWritable: isWritable(delegateAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Master Edition (optional).
  if (masterEditionAccount) {
    keys.push({
      pubkey: masterEditionAccount,
      isSigner: false,
      isWritable: isWritable(masterEditionAccount, false),
    });
  }

  // Token Record (optional).
  if (tokenRecordAccount) {
    keys.push({
      pubkey: tokenRecordAccount,
      isSigner: false,
      isWritable: isWritable(tokenRecordAccount, true),
    });
  }

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Token (optional).
  if (tokenAccount) {
    keys.push({
      pubkey: tokenAccount,
      isSigner: false,
      isWritable: isWritable(tokenAccount, true),
    });
  }

  // Authority.
  signers.push(authorityAccount);
  keys.push({
    pubkey: authorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(authorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: sysvarInstructionsAccount,
    isSigner: false,
    isWritable: isWritable(sysvarInstructionsAccount, false),
  });

  // Spl Token Program (optional).
  if (splTokenProgramAccount) {
    keys.push({
      pubkey: splTokenProgramAccount,
      isSigner: false,
      isWritable: isWritable(splTokenProgramAccount, false),
    });
  }

  // Authorization Rules Program (optional).
  if (authorizationRulesProgramAccount) {
    keys.push({
      pubkey: authorizationRulesProgramAccount,
      isSigner: false,
      isWritable: isWritable(authorizationRulesProgramAccount, false),
    });
  }

  // Authorization Rules (optional).
  if (authorizationRulesAccount) {
    keys.push({
      pubkey: authorizationRulesAccount,
      isSigner: false,
      isWritable: isWritable(authorizationRulesAccount, false),
    });
  }

  // Data.
  const data = getDelegateInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
