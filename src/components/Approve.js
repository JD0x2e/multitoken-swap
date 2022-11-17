import {ethers} from 'ethers'

export default window.Approve = async () => { 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();

    const eggContract = '0x7761E2338B35bCEB6BdA6ce477EF012bde7aE611';
    const oneInchContract = '0x1111111254EEB25477B68fb85Ed929f73A960582'
  
    const erc20Abi = ["function approve(address spender, uint256 amount) public returns (bool)"];
    const egg = new ethers.Contract(eggContract, erc20Abi, signer);
    const textAmount = prompt("Enter amount to swap")
    const weiAmount = ethers.utils.parseEther(textAmount)
    const tx1 = await egg.approve(oneInchContract, weiAmount);
    await tx1.wait();
    alert('All done')
  }
