require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/tBWrVMWRmFPc5apyPX4E6SCwbdB66Ygh',
      accounts: [
       '9f5b5e0bf826750cbb0c34114ad001f8162b7d125c25260a5813031cd4f53d9e',
      ],
    },
  },
}