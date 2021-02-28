const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const sleep = require('sleep-promise');

require('./chaiMatchers');

const toWei = ethers.utils.parseEther;
const toEth = ethers.utils.formatEther;
const toBN = ethers.BigNumber.from;
const toStr = (val) => ethers.utils.toUtf8String(val).replace(/\0/g, '');
const weiPerEth = ethers.constants.WeiPerEther;

const txOverrides = (options = {}) => ({gasLimit: 15000000, ...options});

const log = (...args) => {
  console.log(...args);
  return async (delay = 0) => (delay && await sleep(delay * 1000));
};

const chainIdByName = (chainName) => {
  switch (_.toLower(chainName)) {
    case 'mainnet': return 1;
    case 'ropsten': return 3;
    case 'rinkeby': return 4;
    case 'kovan': return 42;
    case 'hardhat': return 31337;
    case 'coverage': return 31337;
    default: return 0;
  }
};

const chainNameById = (chainId) => {
  switch (parseInt(chainId, 10)) {
    case 1: return 'Mainnet';
    case 3: return 'Ropsten';
    case 4: return 'Rinkeby';
    case 42: return 'Kovan';
    case 31337: return 'Hardhat';
    default: return 'Unknown';
  }
};

const blockTimeFromDate = (dateStr) => {
  return Date.parse(dateStr) / 1000;
};

const ensureDirectoryExistence = (filePath) => {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const saveDeploymentData = (chainId, deployData) => {
  const network = chainNameById(chainId).toLowerCase();
  const deployPath = path.join(__dirname, '..', 'deployments', network);

  _.forEach(_.keys(deployData), (contractName) => {
    const filename = `${deployPath}/${contractName}.json`;

    let existingData = {};
    if (fs.existsSync(filename)) {
      existingData = JSON.parse(fs.readFileSync(filename));
    }

    const newData = _.merge(existingData, deployData[contractName]);
    ensureDirectoryExistence(filename);
    fs.writeFileSync(filename, JSON.stringify(newData, null, "\t"));
  });
};

const getContractAbi = (contractName) => {
  const buildPath = path.join(__dirname, '..', 'abis');
  const filename = `${buildPath}/${contractName}.json`;
  const contractJson = require(filename);
  return contractJson;
};

const getDeployData = (contractName, chainId = 31337) => {
  const network = chainNameById(chainId).toLowerCase();
  const deployPath = path.join(__dirname, '..', 'deployments', network);
  const filename = `${deployPath}/${contractName}.json`;
  const contractJson = require(filename);
  return contractJson;
}

const getTxGasCost = ({deployTransaction}) => {
  const gasCost = toEth(deployTransaction.gasLimit.mul(deployTransaction.gasPrice));
  return `${gasCost} ETH`;
};


const presets = {
  ChargedParticles: {
    tempLockExpiryBlocks: toBN('5760'), // 1 Day == 86400 / 15
    maxDeposits: [ // Temporary limit; remove after launch proves successful
      {assetTokenId: 'Aave.v2.dai', amount: toWei('10000')}, // DAI
    ]
  },
  Lepton: {
    maxMintPerTx: toBN('10'),
    types: [
      {
        name        : 'Electron Neutrino',
        tokenUri    : 'https://ipfs.io/ipfs/QmSSuNTA5F9vhwxYHazVf8rBKY3ZFLq7yUtYtKZD32RX3L',
        price       : toWei('0.3'),
        supply      : toBN('721'),
        multiplier  : toBN('110'),  // 1.1%
        bonus       : toBN('0'),
      },
      {
        name        : 'Muon Neutrino',
        tokenUri    : 'https://ipfs.io/ipfs/QmToEVPsjpyBFDYWRMMDZP9x2xNpRGFYWD4TT7UKqY3dAw',
        price       : toWei('0.9'),
        supply      : toBN('401'),
        multiplier  : toBN('130'),  // 1.3%
        bonus       : toBN('1'),
      },
      {
        name        : 'Tau Neutrino',
        tokenUri    : 'https://ipfs.io/ipfs/QmP9ive1Wufav2VHeC24JSEtA326nYVJnxTUF6qJq6qyP5  ',
        price       : toWei('1.7'),
        supply      : toBN('301'),
        multiplier  : toBN('150'),  // 1.5%
        bonus       : toBN('2'),
      },
      {
        name        : 'Electron',
        tokenUri    : 'https://ipfs.io/ipfs/QmTex8M3otqgyhKRrS75z6RSXnBkHQwQBbwWALjnQ956S1',
        price       : toWei('2.9'),
        supply      : toBN('201'),
        multiplier  : toBN('180'),  // 1.8%
        bonus       : toBN('4'),
      },
      {
        name        : 'Muon',
        tokenUri    : 'https://ipfs.io/ipfs/QmVxPucxAaVFtEucoZNKPhjcdm7STmbDC51P9fq9xsTtYM',
        price       : toWei('5.1'),
        supply      : toBN('88'),
        multiplier  : toBN('230'),  // 2.3%
        bonus       : toBN('8'),
      },
      {
        name        : 'Tau',
        tokenUri    : 'https://ipfs.io/ipfs/QmeaDyfTrTN1GmCqSSDWMDDZ86Y6mLzfiB8RfUifc6CEex',
        price       : toWei('21'),
        supply      : toBN('21'),
        multiplier  : toBN('310'),  // 3.1%
        bonus       : toBN('16'),
      },
    ]
  },
  Ion: {
    universeMaxSupply: toWei('40000000'), // 40% of 100 Million (Community Liquidity Mining Portion)
    rewardsForAssetTokens: [
      {assetTokenId: 'Aave.v2.dai', multiplier: '5000'}, // DAI (50% of Interest in Ion)
    ],
    timelocks: [
      {
        receiver: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',  // Testing - Account 3
        portions: [
          {amount: weiPerEth.mul('1000'), releaseDate: blockTimeFromDate('27 Dec 2021 00:00:00 GMT')},
          {amount: weiPerEth.mul('1000'), releaseDate: blockTimeFromDate('28 Dec 2021 00:00:00 GMT')},
          {amount: weiPerEth.mul('1000'), releaseDate: blockTimeFromDate('29 Dec 2021 00:00:00 GMT')},
        ]
      },
      {
        receiver: '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',  // Testing - Account 4
        portions: [
          {amount: weiPerEth.mul('5000'), releaseDate: blockTimeFromDate('27 Dec 2021 00:00:00 GMT')},
          {amount: weiPerEth.mul('5000'), releaseDate: blockTimeFromDate('28 Dec 2021 00:00:00 GMT')},
          {amount: weiPerEth.mul('5000'), releaseDate: blockTimeFromDate('29 Dec 2021 00:00:00 GMT')},
        ]
      },
    ],
  },
  Aave: {
    referralCode: {
      1: '',
      42: '',
      31337: '',
    },
    v2: {
      dai: {
        1: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // mainnet
        42: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD', // kovan
        31337: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // Hardhat - Forked Mainnet
      },
      lendingPoolProvider: {
        1: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5', // mainnet
        42: '0x652B2937Efd0B5beA1c8d54293FC1289672AFC6b', // kovan
        31337: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5', // Hardhat - Forked Mainnet
      }
    }
  },
  Compound: {
    dai: {
      1: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', // mainnet
      42: '0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD', // kovan
      31337: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', // Hardhat - Forked Mainnet
    },
    comptroller: {
      1: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B', // mainnet
      42: '0x5eAe89DC1C671724A672ff0630122ee834098657', // kovan
      31337: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B', // Hardhat - Forked Mainnet
    }
  }
};


module.exports = {
  txOverrides,
  chainNameById,
  chainIdByName,
  saveDeploymentData,
  getContractAbi,
  getDeployData,
  getTxGasCost,
  log,
  presets,
  toWei,
  toEth,
  toBN,
  toStr,
};
