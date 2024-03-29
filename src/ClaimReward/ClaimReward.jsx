import { useContext,useRef,useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../context/Web3Context";

const ClaimReward = () => {
    const {stakingContract}=useContext(Web3Context);
    const [transactionStatus,setTransactionStatus]=useState("");
    const claimReward=async()=>{
        try{
            const transaction=await stakingContract.getReward();
            setTransactionStatus("Transaction is Pending");
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is SuccessFull");
                setTimeout(()=>{
                    setTransactionStatus("");


                },5000)
            }


        }
        catch(error){
            console.error("Error claiming reward",error);
        }
    }







    return (
        <div>
        <button type="button" onClick={claimReward}>Claim Reward</button>
        </div>
    )
    
}
export default ClaimReward;