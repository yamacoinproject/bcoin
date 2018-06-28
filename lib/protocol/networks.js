/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('bn.js');

const network = exports;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'dnsseed.yama-co.in'
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xc085a5f1;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 8543;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 0;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 1460;

/**
 * Genesis block header.
 * @const {Object}
 */

main.genesis = {
  version: 4,
  hash: '81597128a47d5bb01ffe144d7e0fbb726f2d8e4ef8c531ed26e234ed10000000',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    'a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c08',
  time: 1522681200,
  bits: 0x1e00ffff,
  nonce: 4454047,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0400000000000000000000000000000000000000000000000000000000000000000000'
  + '00a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c087045'
  + 'c25affff001e9ff6430001020000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff310004ffff001e0104284865206973207265'
  + '6e646572696e672070617374612073696e63652030332f4170722f323031382effffff'
  + 'ff01a3e42e01000000001976a914a8afa48c98f70c3ccbc173fcdd49b6c62e24032688'
  + 'ac00000000';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 0x1e00ffff,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '00000000000000000000000000000000000000000000000000007879d1b57672', // height: 101600
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 10 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 10,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 0,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: null,

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 0,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: null,

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 0,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: null,

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 16128; // 80% of 20160

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 20160; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: -1, // ALWAYS_ACTICVE
    timeout: 0x7fffffff, // NO_TIMEOUT
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1, // ALWAYS_ACTICVE
    timeout: 0x7fffffff, // NO_TIMEOUT
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff, // disabled
    timeout: 0xffffffff,
    threshold: 269, // 80%
    window: 336, // ~2.33 days
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.segsignal,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 28,
  scripthash: 78,
  bech32: 'xyc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 8712;

/**
 * Default wallet port.
 * @const {Number}
 * @default
 */

main.walletPort = 8544;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 0;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 0;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'dnsseed.testnet.yama-co.in'
];

testnet.magic = 0xc187a5f1;

testnet.port = 17778;

testnet.checkpointMap = {};

testnet.lastCheckpoint = 0;

testnet.halvingInterval = 1460;

testnet.genesis = {
  version: 4,
  hash: 'bf4a75245d1b8c096ab8a41a0eebe3e4b090f3855c90584d05a4616e3d000000',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    'a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c08',
  time: 1522681200,
  bits: 0x1e00ffff,
  nonce: 5990674,
  height: 0
};

testnet.genesisBlock =
  '0400000000000000000000000000000000000000000000000000000000000000000000'
  + '00a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c087045'
  + 'c25affff001e12695b0001020000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff310004ffff001e0104284865206973207265'
  + '6e646572696e672070617374612073696e63652030332f4170722f323031382effffff'
  + 'ff01a3e42e01000000001976a914a8afa48c98f70c3ccbc173fcdd49b6c62e24032688'
  + 'ac00000000';

testnet.pow = {
  limit: new BN(
    '0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 0x1e00ffff,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000036945cf1c10', // height: 32800
    'hex'
  ),
  targetTimespan: 10 * 60,
  targetSpacing: 60,
  retargetInterval: 10,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 0,
  bip34hash: null,
  bip65height: 0,
  bip65hash: null,
  bip66height: 0,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 13104; // 65% for testchains

testnet.minerWindow = 20160; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: -1, // ALWAYS_ACTICVE
    timeout: 0x7fffffff, // NO_TIMEOUT
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1, // ALWAYS_ACTICVE
    timeout: 0x7fffffff, // NO_TIMEOUT
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.segsignal,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash:  87,
  scripthash: 140,
  bech32: 'txyc'
};

testnet.requireStandard = false;

testnet.rpcPort = 18712;

testnet.walletPort = 18544;

testnet.minRelay = 0;

testnet.feeRate = 0;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.magic = 0xc289a5f1;

regtest.port = 27778;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 146;

regtest.genesis = {
  version: 4,
  hash: '2dec09207595cf7ca4723e33370c4a99c4515bb1cd6f8b1c825bda8b95388b00',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    'a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c08',
  time: 1522681200,
  bits: 0x207fffff,
  nonce: 77361,
  height: 0
};

regtest.genesisBlock =
  '0400000000000000000000000000000000000000000000000000000000000000000000'
  + '00a49026712f1e8636f3f52d69b8b8e711aefc5f9dc002d56a695b73a851262c087045'
  + 'c25affff7f20312e010001020000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff310004ffff001e0104284865206973207265'
  + '6e646572696e672070617374612073696e63652030332f4170722f323031382effffff'
  + 'ff01a3e42e01000000001976a914a8afa48c98f70c3ccbc173fcdd49b6c62e24032688'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 0x207fffff,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 10 * 60,
  targetSpacing: 60,
  retargetInterval: 10,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 936; // 65% for testchains

regtest.minerWindow = 1440; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1, // ALWAYS_ACTIVE
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash:  87,
  scripthash: 140,
  bech32: 'xycrt'
};

regtest.requireStandard = false;

regtest.rpcPort = 28712;

regtest.walletPort = 28544;

regtest.minRelay = 0;

regtest.feeRate = 0;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
