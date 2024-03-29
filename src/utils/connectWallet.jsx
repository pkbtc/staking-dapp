import {ethers,Contract} from "ethers";
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";

export const connectWallet=async()=>{
    try{
        let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null];
        if(window.ethereum==null){
            console.log("Metamask not found");
        }
        let accounts=await window.ethereum.request({method:"eth_requestAccounts"});
        let chainIdhex=await window.ethereum.request({method:"eth_chainId"});
        chainId=parseInt(chainIdhex,16);

        let selectedAccount=accounts[0];
        if(!selectedAccount){
            throw new Error("no account selected");
        }
        provider=new ethers.BrowserProvider(window.ethereum);
        signer=await provider.getSigner();

        const stakingContractAddress="0xF92D5d32506bb8003B7dF940e68F585f31545023";
        const stakingTokenContractAddress="0xdBa65f2BC8ad0042a44EFfDE03FcE68b762cdb94";

        stakingContract= new Contract(stakingContractAddress,stakingAbi,signer);
        stakeTokenContract=new Contract(stakingTokenContractAddress,stakeTokenAbi,signer);

        return {provider,selectedAccount,stakingContract,stakeTokenContract,chainId};




    }
    catch(error){
        console.error(error);

    }
}