import { eEthereumNetwork, eBscNetwork, tEthereumAddress } from './types';
import { getParamPerNetwork } from './misc-utils';

export const MAX_UINT_AMOUNT =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const MOCK_ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const WAD = Math.pow(10, 18).toString();
export const COOLDOWN_SECONDS = '3600'; // 1 hour in seconds
export const UNSTAKE_WINDOW = '1800'; // 30 min in seconds
export const DISTRIBUTION_DURATION = '86400'; // 1 day in seconds

export const STAKED_AAVE_NAME = 'Staked AQUA';
export const STAKED_AAVE_SYMBOL = 'stkAQUA';
export const STAKED_AAVE_DECIMALS = 18;

export const AAVE_GOVERNANCE_V2 = '0xEC568fffba86c094cf06b22134B23074DFE2252c';
export const UPGRADABLE_CRP_FACTORY = '0x1156C30b08DbF16281c803EAe0d52Eee7652f10C';
export const AAVE_TOKEN = '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9';
export const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const REWARDS_VAULT = '0x25f2226b597e8f9514b3f68f00f494cf4f286491';
export const BPOOL_FACTORY = '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd';

export const CRP_IMPLEMENTATION = '0xadc74a134082ea85105258407159fbb428a73782';
export const SHORT_EXECUTOR = '0xee56e2b3d491590b5b31738cc34d5232f378a8d5';
export const LONG_EXECUTOR = '0x61910EcD7e8e942136CE7Fe7943f956cea1CC2f7';
export const PROXY_CRP_ADMIN = SHORT_EXECUTOR;
export const RESERVE_CONTROLER = '0x1E506cbb6721B83B1549fa1558332381Ffa61A93';
export const ZERO_ADDRESS: tEthereumAddress = '0x0000000000000000000000000000000000000000';

// PEI constants
export const PSM_STAKER_PREMIUM = '2';

// just junk mock

export const chainlinkEthUsdAggregatorProxy: Record<string, string> = {
  main: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  [eEthereumNetwork.sepolia]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  [eBscNetwork.main]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
};

export const chainlinkAaveUsdAggregatorProxy: Record<string, string> = {
  main: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
  [eEthereumNetwork.sepolia]: '0x2daE65A4B86B0f4832861a950c87957b8CA2e4FF',
  [eBscNetwork.main]: '0xA8357BF572460fC40f4B0aCacbB2a6A61c89f475',
};

export const RANDOM_ADDRESSES = [
  '0x0000000000000000000000000000000000000221',
  '0x0000000000000000000000000000000000000321',
  '0x0000000000000000000000000000000000000211',
  '0x0000000000000000000000000000000000000251',
  '0x0000000000000000000000000000000000000271',
  '0x0000000000000000000000000000000000000291',
  '0x0000000000000000000000000000000000000321',
  '0x0000000000000000000000000000000000000421',
  '0x0000000000000000000000000000000000000521',
  '0x0000000000000000000000000000000000000621',
  '0x0000000000000000000000000000000000000721',
];

export const getAaveTokenPerNetwork = (network: eEthereumNetwork | eBscNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '0xe4483afcf0d612c011679C76B61F5b0d27bAF93C',
      [eEthereumNetwork.sepolia]: '0x46A69C9C2c123d3A4947c18AbA031EB41409FaDa',
      [eEthereumNetwork.ropsten]: '0x74dA004A1B81b4d0C79F5820f9FF22647cb1dD95',
      [eEthereumNetwork.main]: '0x9c0435779F5E52CEC404D957C9bAa6f7d674C8bA',
      [eBscNetwork.main]: '0xD1Fb55d61c2494ced556536F898D969e2F6Dd2Bf',
    },
    network
  );

export const getCooldownSecondsPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress =>
  getParamPerNetwork<string>(
    {
      [eEthereumNetwork.coverage]: COOLDOWN_SECONDS,
      [eEthereumNetwork.hardhat]: COOLDOWN_SECONDS,
      [eEthereumNetwork.kovan]: '21600', // 6h
      [eEthereumNetwork.sepolia]: '180', // 3min
      [eEthereumNetwork.ropsten]: '180', // 3min
      [eEthereumNetwork.main]: '864000', // 10d
      [eBscNetwork.main]: '864000', // 10d
    },
    network
  );

export const getUnstakeWindowPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress =>
  getParamPerNetwork<string>(
    {
      [eEthereumNetwork.coverage]: UNSTAKE_WINDOW,
      [eEthereumNetwork.hardhat]: UNSTAKE_WINDOW,
      [eEthereumNetwork.kovan]: '10800', // 3h
      [eEthereumNetwork.sepolia]: '240', // 4min
      [eEthereumNetwork.ropsten]: '240', // 4m
      [eEthereumNetwork.main]: '172800', // 2d
      [eBscNetwork.main]: '172800', // 2d
    },
    network
  );

export const getAaveAdminPerNetwork = (network: eEthereumNetwork | eBscNetwork): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '0x8134929c3dcb1b8b82f27f53424b959fb82182f2', // Aave Governance
      [eEthereumNetwork.sepolia]: '0x113107a1165371A71D3747e7C0dB98b181ED0FD7',
      [eEthereumNetwork.ropsten]: '0xEd93e49A2d75beA505fD4D1A0Dff745f69F2E997', // Aave Governance
      [eEthereumNetwork.main]: '0x8a2Efd9A790199F4c94c6effE210fce0B4724f52', // Aave Governance
      [eBscNetwork.main]: '0x28A10C3Cc38FD49024e9AD9f28155bba9410DFeB',
    },
    network
  );

export const getEmissionManagerPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: '0x8134929c3dcb1b8b82f27f53424b959fb82182f2', // Aave Governance
      [eEthereumNetwork.sepolia]: '0x0b6d901Ed06FE8f3f24d7E4F49597B320f5dCA6b',
      [eEthereumNetwork.ropsten]: '0xEd93e49A2d75beA505fD4D1A0Dff745f69F2E997', // Aave Governance
      [eEthereumNetwork.main]: '0x8a2Efd9A790199F4c94c6effE210fce0B4724f52', // Aave Governance
      [eBscNetwork.main]: '0x084126414188735846e4f1851cb3d01d829fa15b',
    },
    network
  );

export const getStakedAaveProxyPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress => {
  return getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: ZERO_ADDRESS,
      [eEthereumNetwork.sepolia]: '0x234753D2Cc86a6Ee8d895caEA93A89c048d987Eb',
      [eEthereumNetwork.ropsten]: ZERO_ADDRESS,
      [eEthereumNetwork.main]: ZERO_ADDRESS,
      [eBscNetwork.main]: '0x5F281bdaD2E6d4af7354054f48609273e874366f',
    },
    network
  );
};

export const getDistributionDurationPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: DISTRIBUTION_DURATION,
      [eEthereumNetwork.hardhat]: DISTRIBUTION_DURATION,
      [eEthereumNetwork.kovan]: '864000',
      [eEthereumNetwork.sepolia]: '864000',
      [eEthereumNetwork.ropsten]: '864000',
      [eEthereumNetwork.main]: '12960000', // 5 months (30 days) in seconds
      [eBscNetwork.main]: '12960000', // 5 months (30 days) in seconds
    },
    network
  );

export const getAaveIncentivesVaultPerNetwork = (
  network: eEthereumNetwork | eBscNetwork
): tEthereumAddress =>
  getParamPerNetwork<tEthereumAddress>(
    {
      [eEthereumNetwork.coverage]: ZERO_ADDRESS,
      [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
      [eEthereumNetwork.kovan]: ZERO_ADDRESS,
      [eEthereumNetwork.sepolia]: '0x0b6d901Ed06FE8f3f24d7E4F49597B320f5dCA6b',
      [eEthereumNetwork.ropsten]: ZERO_ADDRESS,
      [eEthereumNetwork.main]: '0x253f7b06c1d60c1fbbc9d82c301327eb86e3ba81',
      [eBscNetwork.main]: '0xDa1Ab123FC59102215054d97a515E6848A75e93a',
    },
    network
  );
