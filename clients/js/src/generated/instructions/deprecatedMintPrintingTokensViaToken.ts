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
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';
import {
  MintPrintingTokensViaTokenArgs,
  MintPrintingTokensViaTokenArgsArgs,
  getMintPrintingTokensViaTokenArgsSerializer,
} from '../types';

// Accounts.
export type DeprecatedMintPrintingTokensViaTokenInstructionAccounts = {
  /** Destination account */
  destination: PublicKey;
  /** Token account containing one time authorization token */
  token: PublicKey;
  /** One time authorization mint */
  oneTimePrintingAuthorizationMint: PublicKey;
  /** Printing mint */
  printingMint: PublicKey;
  /** Burn authority */
  burnAuthority: Signer;
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey;
  /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
  masterEdition: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** Rent */
  rent?: PublicKey;
};

// Data.
export type DeprecatedMintPrintingTokensViaTokenInstructionData = {
  discriminator: number;
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgs;
};

export type DeprecatedMintPrintingTokensViaTokenInstructionDataArgs = {
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgsArgs;
};

export function getDeprecatedMintPrintingTokensViaTokenInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
  DeprecatedMintPrintingTokensViaTokenInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
    DeprecatedMintPrintingTokensViaTokenInstructionData,
    DeprecatedMintPrintingTokensViaTokenInstructionData
  >(
    s.struct<DeprecatedMintPrintingTokensViaTokenInstructionData>(
      [
        ['discriminator', s.u8()],
        [
          'mintPrintingTokensViaTokenArgs',
          getMintPrintingTokensViaTokenArgsSerializer(context),
        ],
      ],
      { description: 'DeprecatedMintPrintingTokensViaTokenInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 8,
      } as DeprecatedMintPrintingTokensViaTokenInstructionData)
  ) as Serializer<
    DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
    DeprecatedMintPrintingTokensViaTokenInstructionData
  >;
}

// Args.
export type DeprecatedMintPrintingTokensViaTokenInstructionArgs =
  DeprecatedMintPrintingTokensViaTokenInstructionDataArgs;

// Instruction.
export function deprecatedMintPrintingTokensViaToken(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: DeprecatedMintPrintingTokensViaTokenInstructionAccounts &
    DeprecatedMintPrintingTokensViaTokenInstructionArgs
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
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'tokenProgram',
    input.tokenProgram ?? {
      ...context.programs.getPublicKey(
        'splToken',
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'rent',
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111')
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Destination.
  keys.push({
    pubkey: resolvedAccounts.destination,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.destination, true),
  });

  // Token.
  keys.push({
    pubkey: resolvedAccounts.token,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.token, true),
  });

  // One Time Printing Authorization Mint.
  keys.push({
    pubkey: resolvedAccounts.oneTimePrintingAuthorizationMint,
    isSigner: false,
    isWritable: isWritable(
      resolvedAccounts.oneTimePrintingAuthorizationMint,
      true
    ),
  });

  // Printing Mint.
  keys.push({
    pubkey: resolvedAccounts.printingMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.printingMint, true),
  });

  // Burn Authority.
  signers.push(resolvedAccounts.burnAuthority);
  keys.push({
    pubkey: resolvedAccounts.burnAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.burnAuthority, false),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, false),
  });

  // Master Edition.
  keys.push({
    pubkey: resolvedAccounts.masterEdition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.masterEdition, false),
  });

  // Token Program.
  keys.push({
    pubkey: resolvedAccounts.tokenProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenProgram, false),
  });

  // Rent.
  keys.push({
    pubkey: resolvedAccounts.rent,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.rent, false),
  });

  // Data.
  const data =
    getDeprecatedMintPrintingTokensViaTokenInstructionDataSerializer(
      context
    ).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
