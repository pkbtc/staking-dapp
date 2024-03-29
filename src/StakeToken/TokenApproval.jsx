import {useState,useEffect,useContext,useRef} from 'react';
import Web3Context from '../context/Web3Context';
import { ethers } from 'ethers';

const TokenApproval = () => {
    const {stakeTokenContract,stakingContract,provider}=useContext(Web3Context);
    const approvedTokenRef = useRef();
    const [transactionStatus, setTransactionStatus] = useState("");
    
    const approveToken=async(e)=>{
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();
        if(isNaN(amount) || amount<0){
            console.error("Please enter a valid positive number");
            return;
        }
        const amountToSend = ethers.parseUnits(amount,18).toString();
        try{

            const transaction=await stakeTokenContract.approve(stakingContract.target,amountToSend);
            setTransactionStatus("Transaction is Pending...");
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is SuccessFull");
                setTimeout(()=>{
                    setTransactionStatus("");
                },5000);
                approvedTokenRef.current.value="";
            }
            else{
                setTransactionStatus("Transaction Failed");
            }


        }
        catch(error){
            console.error("Error approving token",error);
        }
    }



    return(
        <div>
        {transactionStatus && <p>{transactionStatus}</p>} 
        <form onSubmit={approveToken}>
        <label>Approve Toekn :</label>
        <input type='text' ref={approvedTokenRef}/>
        <button type='submit' onClick={approveToken}>Approve</button>
        </form>
        </div>
    )
    
}
export default TokenApproval;