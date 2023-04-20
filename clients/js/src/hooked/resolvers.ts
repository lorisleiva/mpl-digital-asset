import {
  ACCOUNT_HEADER_SIZE,
  Context,
  Option,
  Pda,
  PublicKey,
  Signer,
  none,
  publicKey,
  some,
} from '@metaplex-foundation/umi';
import { getMintSize } from '@metaplex-foundation/mpl-essentials';
import { isNonFungible } from '../digitalAsset';
import {
  CollectionDetailsArgs,
  CreatorArgs,
  PrintSupplyArgs,
  TokenStandard,
  collectionDetails,
  findMasterEditionPda,
  getMasterEditionSize,
  getMetadataSize,
  printSupply,
} from '../generated';

export const resolveCollectionDetails = (
  context: any,
  accounts: any,
  args: { isCollection: boolean },
  programId: any
): Option<CollectionDetailsArgs> =>
  args.isCollection ? some(collectionDetails('V1', { size: 0 })) : none();

export const resolveMasterEdition = (
  context: Pick<Context, 'eddsa' | 'serializer' | 'programs'>,
  accounts: { mint: PublicKey | Signer },
  args: { tokenStandard: TokenStandard },
  programId: PublicKey
): PublicKey | Pda =>
  isNonFungible(args.tokenStandard)
    ? findMasterEditionPda(context, { mint: publicKey(accounts.mint) })
    : programId;

export const resolveDecimals = (
  context: any,
  accounts: any,
  args: { tokenStandard: TokenStandard },
  programId: any
): Option<number> => (isNonFungible(args.tokenStandard) ? none() : some(0));

export const resolvePrintSupply = (
  context: any,
  accounts: any,
  args: { tokenStandard: TokenStandard },
  programId: any
): Option<PrintSupplyArgs> =>
  isNonFungible(args.tokenStandard) ? some(printSupply('Zero')) : none();

export const resolveCreators = (
  context: any,
  accounts: { authority: Signer },
  args: any,
  programId: any
): Option<CreatorArgs[]> =>
  some([
    { address: publicKey(accounts.authority), share: 100, verified: true },
  ]);

export const resolveCreateV1Bytes = (
  context: any,
  accounts: any,
  args: { tokenStandard: TokenStandard },
  programId: any
): number => {
  const base = getMintSize() + getMetadataSize() + 2 * ACCOUNT_HEADER_SIZE;
  if (isNonFungible(args.tokenStandard)) {
    return base + getMasterEditionSize() + ACCOUNT_HEADER_SIZE;
  }
  return base;
};