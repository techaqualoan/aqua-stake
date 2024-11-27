import { task } from 'hardhat/config';

import { eBscNetwork, eContractid, eEthereumNetwork } from '../../helpers/types';
import { registerContractInJsonDb } from '../../helpers/contracts-helpers';
import {
  chainlinkAaveUsdAggregatorProxy,
  chainlinkEthUsdAggregatorProxy,
  getAaveTokenPerNetwork,
  ZERO_ADDRESS,
} from '../../helpers/constants';
import { deployStakedTokenDataProvider } from '../../helpers/contracts-accessors';
import { checkVerification } from '../../helpers/etherscan-verification';

const { StakedTokenDataProvider, StakedAave } = eContractid;

task(`deploy-${StakedTokenDataProvider}`, `Deploys the ${StakedTokenDataProvider} contract`)
  .addParam('stkAave', `The address of the ${StakedAave} contract.`)
  .addFlag('verify', 'Verify contract via Etherscan API.')
  .setAction(async ({ stkAave: stkAaveAddress, verify }, localBRE) => {
    await localBRE.run('set-dre');

    // If Etherscan verification is enabled, check needed enviroments to prevent loss of gas in failed deployments.
    if (verify) {
      checkVerification();
    }

    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }

    const network = localBRE.network.name as eEthereumNetwork;

    console.log(`\n- ${network} network`);
    console.log(`\n- ${StakedTokenDataProvider} deployment`);
    console.log(`\tDeploying ${StakedTokenDataProvider} implementation ...`);

    const aaveToken = getAaveTokenPerNetwork(network);

    const stakedTokenDataProvider = await deployStakedTokenDataProvider(
      [
        aaveToken,
        stkAaveAddress,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        '0xfc79eb915d2a18c2b796f468f7429426bae45ce9',
        chainlinkEthUsdAggregatorProxy[eBscNetwork.main],
        ZERO_ADDRESS,
      ],
      verify
    );

    await stakedTokenDataProvider.deployTransaction.wait();
    await registerContractInJsonDb(StakedTokenDataProvider, stakedTokenDataProvider);

    console.log('StakedTokenDataProvider deployed to', stakedTokenDataProvider.address);
  });
