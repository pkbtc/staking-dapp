import {useState,useEffect} from 'react';
import { connectWallet } from '../../utils/connectWallet';
import Web3Context from '../../context/Web3Context';
import { handleAccountChange } from '../../utils/handleAccountChnage';
import { handleChainChange } from '../../utils/handleChainChange';


const Wallet=({children})=>{
    const [state,setState] =useState({
    provider:null,
    account:null,
    stakingContract:null,
    stakeTokenContract:null,
    chianId:null});
    useEffect(()=>{
        window.ethereum.on("accountsChanged",()=>handleAccountChange(setState));
        window.ethereum.on("chainChanged",()=>handleChainChange(setState));

        return()=>{
        window.ethereum.on("accountsChanged",()=>handleAccountChange(setState));
        window.ethereum.on("chainChanged",()=>handleChainChange(setState));
        }
        

    },[])

    const [isLoading,setLoading]=useState(false);

    const handleWallet=async()=>{
        try{
            setLoading(true);
            const {provider,selectedAccount,stakingContract,stakeTokenContract,chainId}=await connectWallet();
           /// console.log(provider,selectedAccount,stakingContract,stakeTokenContract,chainId);
            setState({provider,selectedAccount,stakingContract,stakeTokenContract,chainId});

        }
        catch(error){
            console.error("Error connecting wallet",error);

        }
        finally{
            setLoading(false);
        }
    }
    return(
        <>
            <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
            {isLoading && <p>Loading...</p>}
            <button onClick={handleWallet}>Connect Wallet</button>
        </>
    )

}
export default Wallet;