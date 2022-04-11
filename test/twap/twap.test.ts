/* eslint-disable no-unused-expressions */

import chai from "chai";
import { run } from "hardhat";
import { TwapOracle } from "../../typechain";
import { deploy, data } from "./twap.env";

const { expect } = chai;

describe("UniswapV3 TWAP", async () => {
  let twapOracle: TwapOracle;
  const { ERC20, uniswap } = data;

  before(async () => {
    await run("compile");
    ({ twapOracle } = await deploy());
  });

  describe("WETH/USDC", async () => {
    it("Pools & Liquidity", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.01"], label: "0.01" },
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WETH, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const liquidity = await twapOracle.getPoolLiquidity(poolAddress);
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Liquidity:", liquidity.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);

      await twapOracle
        .getMaxLiquidityPoolAddress(ERC20.WETH, ERC20.USDC, [
          parseInt(uniswap.fees["0.01"]),
          parseInt(uniswap.fees["0.05"]),
          parseInt(uniswap.fees["0.3"]),
          parseInt(uniswap.fees["1"]),
        ])
        .then(async (poolAddress) => {
          console.log(`WETH/USDC Biggest Pool -> ${poolAddress}`);
        });
    });

    it("1 min TWAP", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.01"], label: "0.01" },
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WETH, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60,
              ERC20.WETH,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price (5min) :", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });

    it("10 min TWAP", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.01"], label: "0.01" },
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WETH, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60 * 10,
              ERC20.WETH,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price:", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });

    it("60 min TWAP", async () => {
      const feeTiers = [
        // { fee: uniswap.fees["0.01"], label: "0.01" },
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WETH, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60 * 60,
              ERC20.WETH,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price:", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });
  });

  describe("WBTC/USDC", async () => {
    it("Pools & Liquidity", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WBTC, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const liquidity = await twapOracle.getPoolLiquidity(poolAddress);
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Liquidity:", liquidity.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);

      await twapOracle
        .getMaxLiquidityPoolAddress(ERC20.WBTC, ERC20.USDC, [
          parseInt(uniswap.fees["0.05"]),
          parseInt(uniswap.fees["0.3"]),
          parseInt(uniswap.fees["1"]),
        ])
        .then(async (poolAddress) => {
          console.log(`WBTC/USDC Biggest Pool -> ${poolAddress}`);
        });
    });

    it("1 min TWAP", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WBTC, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60,
              ERC20.WBTC,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price (5min) :", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });

    it("10 min TWAP", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WBTC, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60 * 10,
              ERC20.WBTC,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price:", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });

    it("60 min TWAP", async () => {
      const feeTiers = [
        { fee: uniswap.fees["0.05"], label: "0.05" },
        { fee: uniswap.fees["0.3"], label: "0.30" },
        { fee: uniswap.fees["1"], label: "1.00" },
      ].map(async ({ fee, label }) =>
        twapOracle
          .getPoolAddress(ERC20.WBTC, ERC20.USDC, parseInt(fee))
          .then(async (poolAddress) => {
            const price = await twapOracle.getPrice(
              poolAddress,
              60 * 60,
              ERC20.WBTC,
              ERC20.USDC
            );
            console.log(`Fee Tier ${label}%`);
            console.log("Pool Address:", poolAddress);
            console.log("Price:", price.toString());
            console.log("--- --- --- --- --- ---");
          })
      );
      await Promise.all(feeTiers);
    });
  });
});
