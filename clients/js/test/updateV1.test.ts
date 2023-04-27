import { some } from '@metaplex-foundation/umi';
import test from 'ava';
import {
  fetchMetadata,
  findMetadataPda,
  Metadata,
  TokenStandard,
  updateV1,
} from '../src';
import {
  createDigitalAsset,
  createUmi,
  NON_EDITION_TOKEN_STANDARDS,
} from './_setup';

NON_EDITION_TOKEN_STANDARDS.forEach((tokenStandard) => {
  test(`it can update a ${tokenStandard}`, async (t) => {
    // Given an existing asset.
    const umi = await createUmi();
    const mint = await createDigitalAsset(umi, {
      name: 'Asset #1',
      tokenStandard: TokenStandard[tokenStandard],
    });
    const initialMetadata = findMetadataPda(umi, { mint: mint.publicKey });
    const initialMetadataAccount = await fetchMetadata(umi, initialMetadata);

    // When we update the name of the asset.
    await updateV1(umi, {
      mint: mint.publicKey,
      data: some({ ...initialMetadataAccount, name: 'Asset #2' }),
    }).sendAndConfirm(umi);

    // Then the account data was updated.
    const updatedMetadataAccount = await fetchMetadata(umi, initialMetadata);
    t.like(updatedMetadataAccount, <Metadata>{
      name: 'Asset #2',
    });
  });
});
