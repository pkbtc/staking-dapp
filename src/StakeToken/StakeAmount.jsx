import { useState,useRef,useContext } from "react"
import {ethers} from "ethers"
import Web3Context from "../context/Web3Context"
import StakingContext from "../context/StakingContext"
const StakeAmount=()=>{
    const [transactionStatus,setTransactionStatus]=useState("");
    const {stakingContract}=useContext(Web3Context);
    const stakeAmountRef = useRef();
    const {isReload,setIsReload}=useContext(StakingContext);

    const stakeToken=async(e)=>{
        e.preventDefault();
        const amount=stakeAmountRef.current.value.trim();

        if(isNaN(amount) || amount<0){
            console.error("Please enter a valid positive number");
            return;
        }
        const amountToStake=await ethers.parseUnits(amount,18).toString();
        try{
            const transaction=await stakingContract.stake(amountToStake);
            setTransactionStatus("Transaction is Pending");
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is SuccessFull");
                setIsReload(!isReload);
                setIsReload(!isReload);
                setTimeout(() => {
                    setTransactionStatus("");  
                }, 5000);
                stakeAmountRef.current.value="";
            }
            else{
                setTransactionStatus("Transaction Failed");
            }
                

        }
        catch(error){
            console.error("Error staking token",error);
        }

    }


    


    return(
        <div>
        {transactionStatus && <p>{transactionStatus}</p>}
        <form onSubmit={stakeToken}>
        <label>Enter Stake Amount :</label>
        <input type="text" ref={stakeAmountRef}/>
        <button type="submit" onClick={stakeToken}>Stake Token</button>


        </form>
        
        </div>
    )

}
export default StakeAmount