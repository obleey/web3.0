require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/GLPIk8Cr3t0XtkH6PjsJcnWHf60zmfT8",
      accounts: [
        "6b9092e4f71f176b21b8b97146cab8ccdbf0b41f97229b18edfef9228e6a7b09",
      ],
    },
  },
};
