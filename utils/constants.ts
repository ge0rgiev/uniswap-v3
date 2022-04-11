import { env as loadEnv } from "../env";

const env = loadEnv();

const uniswap = {
  v3: {
    factory: env.UNISWAP_V3_FACTORY,
    fees: {
      "0.01": env.UNISWAP_V3_FEE_TIER_001,
      "0.05": env.UNISWAP_V3_FEE_TIER_005,
      "0.3": env.UNISWAP_V3_FEE_TIER_03,
      "1": env.UNISWAP_V3_FEE_TIER_1,
    },
    pools: {
      WETH_USDC: env.UNISWAP_V3_POOL_ETH_USDC_500,
      WBTC_USDC: env.UNISWAP_V3_POOL_WBTC_USDC_3000,
    },
  },
};

const ERC20 = {
  WETH: env.WETH,
  WBTC: env.WBTC,
  USDC: env.USDC,
  USDT: env.USDT,
  DAI: env.DAI,
};

export { ERC20, uniswap };
