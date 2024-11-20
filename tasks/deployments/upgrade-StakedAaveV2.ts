import { task } from 'hardhat/config';

import { eContractid, eEthereumNetwork, tEthereumAddress } from '../../helpers/types';
import { registerContractInJsonDb } from '../../helpers/contracts-helpers';
import {
  getAaveTokenPerNetwork,
  getCooldownSecondsPerNetwork,
  getUnstakeWindowPerNetwork,
  getAaveAdminPerNetwork,
  getDistributionDurationPerNetwork,
  getAaveIncentivesVaultPerNetwork,
  ZERO_ADDRESS,
  STAKED_AAVE_NAME,
  STAKED_AAVE_DECIMALS,
  STAKED_AAVE_SYMBOL,
  getEmissionManagerPerNetwork,
  getStakedAaveProxyPerNetwork,
} from '../../helpers/constants';
import {
  deployStakedAave,
  deployInitializableAdminUpgradeabilityProxy,
  deployStakedAaveV2,
  getStakedAaveProxy,
} from '../../helpers/contracts-accessors';
import { checkVerification } from '../../helpers/etherscan-verification';
import { waitForTx } from '../../helpers/misc-utils';

const { StakedAave, StakedAaveV2, StakedAaveImpl, StakedAaveV2Impl } = eContractid;

task(`upgrade-${StakedAave}`, `Upgrade the ${StakedAave} proxy contract`)
  .addFlag('verify', 'Verify StakedAave contract via Etherscan API.')
  .addOptionalParam(
    'vaultAddress',
    'Use AaveIncentivesVault address by param instead of configuration.'
  )
  .addOptionalParam('aaveAddress', 'Use AaveToken address by param instead of configuration.')
  .setAction(async ({ verify, vaultAddress, aaveAddress }, localBRE) => {
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
    console.log(`\n- ${StakedAaveV2} deployment`);

    console.log(`\tDeploying ${StakedAaveV2} implementation ...`);
    const stakedAaveV2Impl = await deployStakedAaveV2(
      [
        aaveAddress || getAaveTokenPerNetwork(network),
        aaveAddress || getAaveTokenPerNetwork(network),
        getCooldownSecondsPerNetwork(network),
        getUnstakeWindowPerNetwork(network),
        vaultAddress || getAaveIncentivesVaultPerNetwork(network),
        getEmissionManagerPerNetwork(network),
        getDistributionDurationPerNetwork(network),
      ],
      verify
    );
    await stakedAaveV2Impl.deployTransaction.wait();
    await registerContractInJsonDb(StakedAaveV2Impl, stakedAaveV2Impl);

    console.log(
      `\tFinished ${StakedAaveV2} implementation deployment, deployed to ${stakedAaveV2Impl.address}`
    );

    const stakedAaveProxy = await getStakedAaveProxy(getStakedAaveProxyPerNetwork(network));

    console.log(`\tUpgrading StakedAave proxy ${stakedAaveProxy.address}`);

    const stakedAaveEncodedInitialize = stakedAaveV2Impl.interface.encodeFunctionData('initialize');

    await waitForTx(
      await stakedAaveProxy.functions['upgradeToAndCall(address,bytes)'](
        stakedAaveV2Impl.address,
        stakedAaveEncodedInitialize
      )
    );

    console.log('\tFinished Aave StakedTokenV2 deploy and proxy upgrade');
  });
