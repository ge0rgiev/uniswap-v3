//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../libraries/OracleLibrary.sol";
import "../libraries/UniswapV3Library.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

/**
 * @title UniswapV3 TWAP
 * Features:
 *   # Get UniswapV3 Pool address
 *   # Get UniswapV3 the most liquid Pool address
 *   # Get TWAP Price
 * @author ge0rgiev
 **/
contract TwapOracle {
    /** @notice UniswapV3 Factory address */
    IUniswapV3Factory public factory;

    /** @notice Construct and initialize the UniswapV3 TWAP **/
    constructor(IUniswapV3Factory _factory) {
        factory = IUniswapV3Factory(_factory);
    }

    /**
     * @notice Returns the Uniswap V3 Pool address
     * @param tokenA first token address
     * @param tokenB second token address
     * @param fee fee tier -> 100 - 0.01% | 500 - 0.05% | 3000 - 0.3% | 10000 - 1%
     */
    function getPoolAddress(
        address tokenA,
        address tokenB,
        uint24 fee
    ) public view returns (address pool) {
        pool = UniswapV3Library.getPoolAddress(factory, tokenA, tokenB, fee);
    }

    function getPoolLiquidity(address uniswapV3Pool)
        public
        view
        returns (uint128 liquidity)
    {
        require(uniswapV3Pool > address(0), "TwapOracle: ZERO_ADDRESS");
        liquidity = IUniswapV3Pool(uniswapV3Pool).liquidity();
    }

    /**
     * @notice Returns the Uniswap V3 Pool with biggest liquidity
     * @param tokenA first token address
     * @param tokenB second token address
     * @param fees list of fee tiers
     */
    function getMaxLiquidityPoolAddress(
        address tokenA,
        address tokenB,
        uint24[] memory fees
    ) public view returns (address pool) {
        pool = UniswapV3Library.getBiggestPoolAddress(
            factory,
            tokenA,
            tokenB,
            fees
        );
    }

    /**
     * @notice Returns the TWAP
     * @param uniswapV3Pool pool address
     * @param twapInterval interval in seconds
     * @param baseToken from asset
     * @param quoteToken to asset
     */
    function getPrice(
        address uniswapV3Pool,
        uint32 twapInterval,
        address baseToken,
        address quoteToken
    ) public view returns (uint256 quoteAmount) {
        (int24 arithmeticMeanTick, ) = OracleLibrary.consult(
            uniswapV3Pool,
            twapInterval
        );
        quoteAmount = OracleLibrary.getQuoteAtTick(
            arithmeticMeanTick,
            uint128(10**IERC20Metadata(baseToken).decimals()),
            baseToken,
            quoteToken
        );
    }
}
