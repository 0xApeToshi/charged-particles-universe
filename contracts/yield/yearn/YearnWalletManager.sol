// SPDX-License-Identifier: MIT

// YearnWalletManager.sol -- Charged Particles
// Copyright (c) 2019, 2020 Rob Secord <robsecord.eth>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

pragma solidity 0.6.12;

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";

import "../../lib/WalletManagerBase.sol";
import "./YearnSmartWallet.sol";

/**
 * @notice Wallet Manager for yEarn
 * @dev Non-upgradeable Contract
 */
contract YearnWalletManager is Initializable/*, WalletManagerBase*/ {

  function initialize() public initializer {
    // WalletManagerBase.initializeBase();

    // _walletTemplate = address(new YearnSmartWallet());
  }



  /***********************************|
  |         Private Functions         |
  |__________________________________*/


  /**
    * @dev todo..
    */
  // function _createWallet(
  //   uint256 _uuid
  // )
  //   internal
  //   returns (address)
  // {
  //   address newWallet = _createClone(_walletTemplate);
  //   YearnSmartWallet(newWallet).initialize();

  //   emit NewSmartWallet(_uuid, newWallet);
  //   return newWallet;
  // }
}