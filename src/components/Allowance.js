// const Web3 = require('web3');
// const fetch = require('node-fetch');
// // const yesno = require('yesno');

// const chainId = 56;
// const web3RpcUrl = '';
// const walletAddress = '0x127caE3A536527db86F583E97B4af51A1ECacc84'; // Set your wallet address
// const privateKey = process.env.REACT_APP_PRIVATE_KEY; // Set private key of your wallet. Be careful! Don't share this key to anyone!

// const swapParams = {
//     fromTokenAddress: '0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611', // EGG
//     toTokenAddress: '0x9C846D808A41328A209e235B5e3c4E626DAb169E', // FERT
//     amount: '100000000000000000',
//     fromAddress: walletAddress,
//     slippage: 1,
//     disableEstimate: false,
//     allowPartialFill: false,
// };

// const broadcastApiUrl = 'https://tx-gateway.1inch.io/v1.1/' + chainId + '/broadcast';
// const apiBaseUrl = 'https://api.1inch.io/v4.0/' + chainId;
// const web3 = new Web3(web3RpcUrl);

// function apiRequestUrl(methodName, queryParams) {
//     return apiBaseUrl + methodName + '?' + (new URLSearchParams(queryParams)).toString();
// }

// function checkAllowance(tokenAddress, walletAddress) {
//     return fetch(apiRequestUrl('/approve/allowance', {tokenAddress, walletAddress}))
//     .then(res => res.json())
//     .then(res => res.allowance);
// }
// const allowance = await checkAllowance(swapParams.fromTokenAddress, walletAddress);

//     console.log('Allowance: ', allowance);


// 0x127caE3A536527db86F583E97B4af51A1ECacc84   my avax wallet