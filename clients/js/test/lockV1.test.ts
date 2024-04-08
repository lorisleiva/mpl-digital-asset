import { setComputeUnitLimit, TokenState as SplTokenState } from '@metaplex-foundation/mpl-toolbox';
import { generateSigner, percentAmount } from '@metaplex-foundation/umi';
import test from 'ava';
import {
  DigitalAssetWithToken,
  TokenStandard,
  TokenState,
  delegateStandardV1,
  delegateUtilityV1,
  fetchDigitalAssetWithAssociatedToken,
  lockV1,
  printSupply,
  printV2,
} from '../src';
import {
  FUNGIBLE_TOKEN_STANDARDS,
  createDigitalAssetWithToken,
  createUmi,
} from './_setup';

test('it can lock a ProgrammableNonFungible', async (t) => {
  // Given a ProgrammableNonFungible with a utility delegate.
  const umi = await createUmi();
  const owner = umi.identity.publicKey;
  const utilityDelegate = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  });
  await delegateUtilityV1(umi, {
    mint,
    delegate: utilityDelegate.publicKey,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  }).sendAndConfirm(umi);
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
    DigitalAssetWithToken
    >{ tokenRecord: { state: TokenState.Unlocked } });

  // When the utility delegate locks the asset.
  await lockV1(umi, {
    mint,
    authority: utilityDelegate,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  }).sendAndConfirm(umi);

  // Then the token state was successfully updated.
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
    DigitalAssetWithToken
    >{ tokenRecord: { state: TokenState.Locked } });
});

test('it can lock a ProgrammableNonFungibleEdition', async (t) => {
  // Given a ProgrammableNonFungible with a utility delegate.
  const umi = await createUmi();
  const utilityDelegate = generateSigner(umi);
  const originalOwner = generateSigner(umi);
  const originalMint = await createDigitalAssetWithToken(umi, {
    name: 'My NFT',
    symbol: 'MNFT',
    uri: 'https://example.com/nft.json',
    sellerFeeBasisPoints: percentAmount(5.42),
    tokenOwner: originalOwner.publicKey,
    printSupply: printSupply('Limited', [10]),
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  });

  // When we print a new edition of the asset.
  const editionMint = generateSigner(umi);
  const editionOwner = generateSigner(umi);
  await printV2(umi, {
    masterTokenAccountOwner: originalOwner,
    masterEditionMint: originalMint.publicKey,
    editionMint,
    editionTokenAccountOwner: editionOwner.publicKey,
    editionNumber: 1,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  }).prepend(setComputeUnitLimit(umi, {
    units: 400000,
  })).sendAndConfirm(umi);

  const editionAsset = await fetchDigitalAssetWithAssociatedToken(
    umi,
    editionMint.publicKey,
    editionOwner.publicKey
  );

  await delegateUtilityV1(umi, {
    mint: editionMint.publicKey,
    delegate: utilityDelegate.publicKey,
    tokenStandard: TokenStandard.ProgrammableNonFungibleEdition,
    token: editionAsset.token.publicKey,
    tokenRecord: editionAsset.tokenRecord?.publicKey,
    authority: editionOwner,
  }).sendAndConfirm(umi);
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, editionMint.publicKey, editionOwner.publicKey), <
    DigitalAssetWithToken
    >{ tokenRecord: { state: TokenState.Unlocked } });

  // When the utility delegate locks the asset.
  await lockV1(umi, {
    mint: editionMint.publicKey,
    authority: utilityDelegate,
    tokenStandard: TokenStandard.ProgrammableNonFungibleEdition,
    token: editionAsset.token.publicKey,
    tokenRecord: editionAsset.tokenRecord?.publicKey,
    payer: editionOwner,
  }).sendAndConfirm(umi);

  // Then the token state was successfully updated.
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, editionMint.publicKey, editionOwner.publicKey), <
    DigitalAssetWithToken
    >{ tokenRecord: { state: TokenState.Locked } });
});

test('it can freeze a NonFungible', async (t) => {
  // Given a NonFungible with a standard delegate.
  const umi = await createUmi();
  const owner = umi.identity.publicKey;
  const standardDelegate = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi);
  await delegateStandardV1(umi, {
    mint,
    delegate: standardDelegate.publicKey,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
    DigitalAssetWithToken
    >{ token: { state: SplTokenState.Initialized }, tokenRecord: undefined });

  // When the standard delegate locks the asset.
  await lockV1(umi, {
    mint,
    authority: standardDelegate,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  // Then the token state of the token account was successfully updated.
  t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
    DigitalAssetWithToken
    >{ token: { state: SplTokenState.Frozen }, tokenRecord: undefined });
});

FUNGIBLE_TOKEN_STANDARDS.forEach((tokenStandard) => {
  test(`it can freeze a ${tokenStandard}`, async (t) => {
    // Given a fungible with the identity as the freeze authority of the mint.
    const umi = await createUmi();
    const freezeAuthority = umi.identity;
    const owner = umi.identity.publicKey;
    const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
      tokenStandard: TokenStandard[tokenStandard],
    });
    t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
      DigitalAssetWithToken
      >{ token: { state: SplTokenState.Initialized }, tokenRecord: undefined });

    // When the freeze authority locks the asset.
    await lockV1(umi, {
      mint,
      authority: freezeAuthority,
      tokenStandard: TokenStandard[tokenStandard],
    }).sendAndConfirm(umi);

    // Then the token state of the token account was successfully updated.
    t.like(await fetchDigitalAssetWithAssociatedToken(umi, mint, owner), <
      DigitalAssetWithToken
      >{ token: { state: SplTokenState.Frozen }, tokenRecord: undefined });
  });
});
