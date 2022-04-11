import { ethers } from "hardhat";

import { ERC20, uniswap } from "../../utils/constants";

const data = { ERC20, uniswap: uniswap.v3 };

const prepareDeploy = (data: any) => async () => {
  const { factory } = data.uniswap;

  const uniswapV3Library = await (
    await ethers.getContractFactory("UniswapV3Library")
  ).deploy();

  const twapOracle = await (
    await ethers.getContractFactory("TwapOracle", {
      libraries: {
        UniswapV3Library: uniswapV3Library.address,
      },
    })
  ).deploy(factory);

  return { twapOracle };
};

const deploy = prepareDeploy(data);

export { deploy, data };
