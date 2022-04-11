// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

/**
 * @title UniswapV3 Library
 * Features:
 *   # Get UniswapV3 Pool address
 * @author ge0rgiev
 **/
library UniswapV3Library {
    struct V3Pool {
        address poolAddress;
        uint128 liquidity;
    }

    /**
     * @notice Returns the Uniswap V3 Pool address
     * @param tokenA first token address
     * @param tokenB second token address
     * @param fee fee tier - 100 | 500 | 3000 | 10000
     */
    function getPoolAddress(
        IUniswapV3Factory factory,
        address tokenA,
        address tokenB,
        uint24 fee
    ) public view returns (address pool) {
        int24 feeAmountTickSpacing = factory.feeAmountTickSpacing(fee);
        require(feeAmountTickSpacing > 0, "UniswapV3Library: INVALID_FEE");
        pool = factory.getPool(tokenA, tokenB, fee);
    }

    /**
     * @notice Returns the Uniswap V3 most liquid pool
     * @param factory UniswapV3Factory Instance
     * @param tokenA first token address
     * @param tokenB second token address
     * @param fees list of fee tiers
     */
    function getBiggestPoolAddress(
        IUniswapV3Factory factory,
        address tokenA,
        address tokenB,
        uint24[] memory fees
    ) public view returns (address) {
        uint256 feesLength = fees.length;
        V3Pool memory biggestPool;

        for (uint256 i = 0; i < feesLength; ) {
            int24 feeAmountTickSpacing = factory.feeAmountTickSpacing(fees[i]);
            require(feeAmountTickSpacing > 0, "UniswapV3Library: INVALID_FEE");

            address pool = factory.getPool(tokenA, tokenB, fees[i]);
            require(pool > address(0), "UniswapV3Library: ZERO_ADDRESS");

            uint128 liquidity = IUniswapV3Pool(pool).liquidity();

            if (biggestPool.liquidity < liquidity) {
                biggestPool.poolAddress = pool;
                biggestPool.liquidity = liquidity;
            }
            unchecked {
                ++i;
            }
        }

        return biggestPool.poolAddress;
    }
}
