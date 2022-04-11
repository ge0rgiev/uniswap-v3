import { Record, String } from "runtypes";

export const EnvVarsRecord = Record({
  // Hardhat Configuration
  MAINNET_FORK_URL: String,
  REPORT_GAS: String,

  // Uniswap V3
  UNISWAP_V3_FACTORY: String,
  UNISWAP_V3_FEE_TIER_001: String,
  UNISWAP_V3_FEE_TIER_005: String,
  UNISWAP_V3_FEE_TIER_03: String,
  UNISWAP_V3_FEE_TIER_1: String,
  UNISWAP_V3_POOL_ETH_USDC_500: String,
  UNISWAP_V3_POOL_WBTC_USDC_3000: String,

  // ERC20
  WETH: String,
  WBTC: String,
  USDC: String,
  DAI: String,
  USDT: String,
});

const env = () => EnvVarsRecord.check(process.env);

export { env };
