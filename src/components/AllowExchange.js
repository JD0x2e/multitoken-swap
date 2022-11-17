// const Web3 = require('web3');
// const fetch = require('node-fetch');

// const chainId = 43114
// const web3RpcUrl = 'https://api.avax.network/ext/bc/C/rpc';
// const walletAddress = '0x127caE3A536527db86F583E97B4af51A1ECacc84'
// const privateKey = process.env.REACT_APP_PRIVATE_KEY

// const swapParams = {
//     fromTokenAddress: '0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611',
//     toTokenAddress: '0x9C846D808A41328A209e235B5e3c4E626DAb169E',
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

// async function broadCastRawTransaction(rawTransaction) {
//     return fetch(broadcastApiUrl, {
//         method: 'post',
//         body: JSON.stringify({rawTransaction}),
//         headers: {'Content-Type': 'application/json'}
//     })
//         .then(res => res.json())
//         .then(res => {
//             return res.transactionHash;
//         });
// }

// async function signAndSendTransaction(transaction) {
//     const {rawTransaction} = await web3.eth.accounts.signTransaction(transaction, privateKey);

//     return await broadCastRawTransaction(rawTransaction);
// }

// async function buildTxForApproveTradeWithRouter(tokenAddress, amount) {
//     const url = apiRequestUrl(
//         '/approve/transaction',
//         amount ? {tokenAddress, amount} : {tokenAddress}
//     );

//     const transaction = await fetch(url).then(res => res.json());

//     const gasLimit = await web3.eth.estimateGas({
//         ...transaction,
//         from: walletAddress
//     });
//     console.log(gasLimit)

//     return {
//         ...transaction,
//         gas: gasLimit
//     };
// }

// // First, let's build the body of the transaction
// const transactionForSign = buildTxForApproveTradeWithRouter(swapParams.fromTokenAddress);
// console.log('Transaction for approve: ', transactionForSign);


// // Send a transaction and get its hash
// const approveTxHash = signAndSendTransaction(transactionForSign);

// console.log('Approve tx hash: ', approveTxHash);

