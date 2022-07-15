export const decimals = {
    Note: 18,
    CANTO: 18,
    USDC: 6,
    USDT: 6, 
    ETH: 18,
    ATOM: 18,
    
    cNote: 18,
    cCANTO: 18,
    cUSDC: 18,
    cUSDT: 18,
    cETH: 18,
    cATOM: 18,
  
    CantoNoteLP: 18,
    cCantoNoteLP: 18,
    CantoAtomLP: 18,
    cCantoAtomLP: 18,
    NoteUSDCLP: 18,
    cNoteUSDCLP: 18,
    NoteUSDTLP: 18,
    cNoteUSDTLP: 18,
    CantoETHLP: 18,
    cCantoETHLP: 18,
  
  };
  export const address = {
    testnet: {
      CantoNoteLP: "0x652b28aa30EAD510B1609B358ce3BDF832BA4951",
      cCantoNoteLP: "0xa2e657acF2B38fE78b418291C3391000bcd5294C",
      CantoAtomLP: "0x3f0AC85d5C1cEe99E3146A01f1da88B62004F1fC",
      cCantoAtomLP: "0x56173A5b077b48c570656DD87C1BbF7359750Fa8",
      NoteUSDCLP: "0x2Fa268AF4517F34Fb747a042A4F97f1E47e52feA",
      cNoteUSDCLP: "0x6007fe57a1A3d94Cc83adD2039Ae8013018f6a9C",
      NoteUSDTLP: "0x0823cB8AADB5b430Cc2A8B834F3EE7710533EE14",
      cNoteUSDTLP: "0xE99D65a4c4Ff2e291c0A1963827AEC495847FE9d",
      CantoETHLP: "0x5D16Dc43E0070d3298dEE8f82961af197E61a71B",
      cCantoETHLP: "0x65d6e8E6c9dc999489D4003CC44ce1e12Fbe153A",
      
      Comptroller:  "0xAE8A689c851373f3E8C560A051635150dCA57293",
      Note:  "0x61cBB6b576f4Dd9fA5A785dC427F51AaF55057f2",
      USDC: "0x673098aeC6D2D76899Edf5e8d51dBa6139fD79e3",
      USDT: "0x033E1A115F7179a782b26Bc26Cff08394a4C39Ae",
      ATOM: "0x59C84D5F064c8089D52E3C7e9b7C0D41AAcf92Fb",
      ETH: "0x89e02E3D5Cb30d6e965d2E79cc90A144f36DCc5b",
      CNote:  "0x21e53398bE9f76B0FF9367d8c03AEa00d7bf22e2",
      CUSDC:  "0xA21c7AD1b9F0d78Aa8DBB33bB5b42B507eDfe103",
      CUSDT:  "0x9FFaCb2E15c5aBe67FA3A5E5750d00b2C5979E42",
      CATOM:  "0x533679D8ceFBa88669882B8A92bf0c7f4286b438",
      CETH:  "0x8Da7C68e20f0173074ad52AcCfF981DA248aa4b4",
      CCanto:  "0x2dBA152f6Bd3822F088BA190AA0Bdc183682dE11",
      WETH:  "0x14E32aDCe6bEA9c5a60328838EAC739B2fb15C4e",
      PriceFeed:  "0x8a075a3689a3D9e5Ed9443156573077Fa9175AAD",
    }
  };
  
  export const cTokensBase = [
    {
      name: "Canto Note",
      symbol: "cNote",
      address: address.testnet.CNote,
      decimals: decimals.cNote,
      underlying_name: "Note",
      underlying_symbol: "NOTE",
      underlying_address: address.testnet.Note,
      underlying_decimals: decimals.Note,
    //   icon: icons.Note,
    },
    {
      name: "Canto Canto",
      symbol: "cCanto",
      address: address.testnet.CCanto,
      decimals: decimals.cCANTO,
      underlying_name: "Canto",
      underlying_symbol: "CANTO",
      underlying_address: address.testnet.USDC, //TODO : fix underlying
      underlying_decimals: decimals.CANTO,
    // //   icon: icons.CANTO,
    },
    {
      name: "Canto UDSC",
      symbol: "cUSDC",
      address: address.testnet.CUSDC,
      decimals: decimals.cUSDC,
      underlying_name: "USDC",
      underlying_symbol: "USDC",
      underlying_address: address.testnet.USDC, 
      underlying_decimals: decimals.USDC,
    // //   icon: icons.USDC,
    },
    {
      name: "Canto USDT",
      symbol: "cUSDT",
      address: address.testnet.CUSDT,
      decimals: decimals.cUSDT,
      underlying_name: "USDT",
      underlying_symbol: "USDT",
      underlying_address: address.testnet.USDT, 
      underlying_decimals: decimals.USDT,
    // //   icon: icons.USDT,
    },
    {
      name: "Canto ETH",
      symbol: "cETH",
      address: address.testnet.CETH,
      decimals: decimals.cETH,
      underlying_name: "ETH",
      underlying_symbol: "ETH",
      underlying_address: address.testnet.ETH, 
      underlying_decimals: decimals.ETH,
    // //   icon: icons.ETH,
    },
    {
      name: "Canto ATOM",
      symbol: "cATOM",
      address: address.testnet.CATOM,
      decimals: decimals.cATOM,
      underlying_name: "ATOM",
      underlying_symbol: "ATOM",
      underlying_address: address.testnet.ATOM, 
      underlying_decimals: decimals.ATOM,
    // //   icon: icons.ETH,
    },
    {
      name: "cCantoNoteCLP",
      symbol: "cCANTONoteCLP",
      address: address.testnet.cCantoNoteLP,
      decimals: decimals.cCantoNoteLP,
      underlying_name: "CantoNoteLP",
      underlying_symbol: "CantoNoteLP",
      underlying_address: address.testnet.CantoNoteLP, 
      underlying_decimals: decimals.CantoNoteLP,
    // //   icon: icons.CantoNoteLP,
    },
    {
      name: "cNoteUSDCLP",
      symbol: "cNoteUSDCLP",
      address: address.testnet.cNoteUSDCLP,
      decimals: decimals.cNoteUSDCLP,
      underlying_name: "NoteUSDCLP",
      underlying_symbol: "NoteUSDCLP",
      underlying_address: address.testnet.NoteUSDCLP, 
      underlying_decimals: decimals.NoteUSDCLP,
    // //   icon: icons.USDCNoteLP,
    },
    {
      name: "cNoteUSDTLP",
      symbol: "cNoteUSDTLP",
      address: address.testnet.cNoteUSDTLP,
      decimals: decimals.cNoteUSDTLP,
      underlying_name: "NoteUSDTLP",
      underlying_symbol: "NoteUSDTLP",
      underlying_address: address.testnet.NoteUSDTLP, 
      underlying_decimals: decimals.NoteUSDTLP,
    // //   icon: icons.USDTNoteLP,
    },
    {
      name: "ccantoAtomLP",
      symbol: "ccantoAtomLP",
      address: address.testnet.cCantoAtomLP,
      decimals: decimals.cCantoAtomLP,
      underlying_name: "cantoAtomLP",
      underlying_symbol: "cantoAtomLP",
      underlying_address: address.testnet.CantoAtomLP, 
      underlying_decimals: decimals.CantoAtomLP,
    // //   icon: icons.CantoAtomLP,
    },
    {
      name: "cCantoETHLP",
      symbol: "cCantoETHLP",
      address: address.testnet.cCantoETHLP,
      decimals: decimals.cCantoETHLP,
      underlying_name: "CantoETHLP",
      underlying_symbol: "CantoETHLP",
      underlying_address: address.testnet.CantoETHLP, 
      underlying_decimals: decimals.CantoETHLP,
    // //   icon: icons.CantoETHLP,
    }
  ];

  export async function addTokens() {
    try {
      cTokensBase.forEach(async (token) => {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        // @ts-ignore
        await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: token.underlying_address, // The address that the token is at.
              symbol: token.underlying_symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: token.underlying_decimals, // The number of decimals in the token
              image: "https://raw.githubusercontent.com/Canto-Network/list/main/logos/token-logos/token/aqua.png?token=GHSAT0AAAAAABVRJKF3XSMZ3UXTTO3BBWKQYV2L7AQ", // A string url of the token logo
            },
          },
        });
        // @ts-ignore
        await ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: token.address, // The address that the token is at.
              symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: token.decimals, // The number of decimals in the token
            //   image: token.icon, // A string url of the token logo
            },
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  export async function addTestnetToMetamask() {
    //@ts-ignore
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x1E35",
            chainName: "Canto Testnet",
            nativeCurrency: {
              name: "Canto Coin",
              symbol: "CANTO",
              decimals: 18,
            },
            rpcUrls: ['https://165.227.101.131:8545/'],
            // blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error);
      });
  }