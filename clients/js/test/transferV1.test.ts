import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-essentials';
import { PublicKey, generateSigner, publicKey } from '@metaplex-foundation/umi';
import test from 'ava';
import {
  DigitalAssetWithToken,
  TokenStandard,
  TokenState,
  fetchDigitalAssetWithAssociatedToken,
  transferV1,
} from '../src';
import { createDigitalAssetWithToken, createUmi } from './_setup';

test('it can transfer a NonFungible', async (t) => {
  // Given a NonFungible that belongs to owner A.
  const umi = await createUmi();
  const ownerA = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenOwner: ownerA.publicKey,
  });

  // When we transfer the asset to owner B.
  const ownerB = generateSigner(umi).publicKey;
  await transferV1(umi, {
    mint,
    authority: ownerA,
    tokenOwner: ownerA.publicKey,
    destinationOwner: ownerB,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  // Then the asset is now owned by owner B.
  const da = await fetchDigitalAssetWithAssociatedToken(umi, mint, ownerB);
  t.like(da, <DigitalAssetWithToken>{
    mint: {
      publicKey: publicKey(mint),
      supply: 1n,
    },
    token: {
      publicKey: findAssociatedTokenPda(umi, {
        mint,
        owner: ownerB,
      }) as PublicKey,
      owner: ownerB,
      amount: 1n,
    },
  });
});

test('it can transfer a ProgrammableNonFungible', async (t) => {
  // Given a ProgrammableNonFungible that belongs to owner A.
  const umi = await createUmi();
  const ownerA = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenOwner: ownerA.publicKey,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  });

  // When we transfer the asset to owner B.
  const ownerB = generateSigner(umi).publicKey;
  await transferV1(umi, {
    mint,
    authority: ownerA,
    tokenOwner: ownerA.publicKey,
    destinationOwner: ownerB,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  }).sendAndConfirm(umi);

  // Then the asset is now owned by owner B.
  const da = await fetchDigitalAssetWithAssociatedToken(umi, mint, ownerB);
  t.like(da, <DigitalAssetWithToken>{
    mint: {
      publicKey: publicKey(mint),
      supply: 1n,
    },
    token: {
      publicKey: findAssociatedTokenPda(umi, {
        mint,
        owner: ownerB,
      }) as PublicKey,
      owner: ownerB,
      amount: 1n,
    },
    tokenRecord: {
      state: TokenState.Unlocked,
    },
  });
});

test('it can transfer a Fungible', async (t) => {
  // Given a Fungible such that owner A owns 42 tokens.
  const umi = await createUmi();
  const ownerA = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenOwner: ownerA.publicKey,
    tokenStandard: TokenStandard.Fungible,
    amount: 42,
  });

  // When we transfer 10 tokens to owner B.
  const ownerB = generateSigner(umi).publicKey;
  await transferV1(umi, {
    mint,
    authority: ownerA,
    tokenOwner: ownerA.publicKey,
    destinationOwner: ownerB,
    tokenStandard: TokenStandard.Fungible,
    amount: 10,
  }).sendAndConfirm(umi);

  // Then owner A has 32 tokens
  const assetA = await fetchDigitalAssetWithAssociatedToken(
    umi,
    mint,
    ownerA.publicKey
  );
  t.like(assetA, <DigitalAssetWithToken>{
    mint: { publicKey: publicKey(mint), supply: 42n },
    token: { owner: publicKey(ownerA), amount: 32n },
  });

  // And owner B has 10 tokens.
  const assetB = await fetchDigitalAssetWithAssociatedToken(umi, mint, ownerB);
  t.like(assetB, <DigitalAssetWithToken>{
    mint: { publicKey: publicKey(mint), supply: 42n },
    token: { owner: publicKey(ownerB), amount: 10n },
  });
});

test('it can transfer a FungibleAsset', async (t) => {
  // Given a FungibleAsset such that owner A owns 42 tokens.
  const umi = await createUmi();
  const ownerA = generateSigner(umi);
  const { publicKey: mint } = await createDigitalAssetWithToken(umi, {
    tokenOwner: ownerA.publicKey,
    tokenStandard: TokenStandard.FungibleAsset,
    amount: 42,
  });

  // When we transfer 10 tokens to owner B.
  const ownerB = generateSigner(umi).publicKey;
  await transferV1(umi, {
    mint,
    authority: ownerA,
    tokenOwner: ownerA.publicKey,
    destinationOwner: ownerB,
    tokenStandard: TokenStandard.FungibleAsset,
    amount: 10,
  }).sendAndConfirm(umi);

  // Then owner A has 32 tokens
  const assetA = await fetchDigitalAssetWithAssociatedToken(
    umi,
    mint,
    ownerA.publicKey
  );
  t.like(assetA, <DigitalAssetWithToken>{
    mint: { publicKey: publicKey(mint), supply: 42n },
    token: { owner: publicKey(ownerA), amount: 32n },
  });

  // And owner B has 10 tokens.
  const assetB = await fetchDigitalAssetWithAssociatedToken(umi, mint, ownerB);
  t.like(assetB, <DigitalAssetWithToken>{
    mint: { publicKey: publicKey(mint), supply: 42n },
    token: { owner: publicKey(ownerB), amount: 10n },
  });
});
