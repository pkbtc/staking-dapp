import { useState,useRef,useContext } from "react"
import {ethers} from "ethers"
import Web3Context from "../context/Web3Context"
import StakingContext from "../context/StakingContext"
const Withdraw = () => {
    const [transactionStatus,setTransactionStatus]=useState("");
    const {stakingContract}=useContext(Web3Context);
    const WithdrawstakeAmountRef = useRef();
    const {isReload,setIsReload}=useContext(StakingContext);

    const withdrawToken=async(e)=>{
        e.preventDefault();
        const amount=WithdrawstakeAmountRef.current.value.trim();

        if(isNaN(amount) || amount<0){
            console.error("Please enter a valid positive number");
            return;
        }
        const amountToWithdraw=await ethers.parseUnits(amount,18).toString();
        try{
            const transaction=await stakingContract.withdrawStakedTokens(amountToWithdraw);
            setTransactionStatus("Transaction is Pending");
            const receipt=await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is SuccessFull");
                setTimeout(() => {
                    setTransactionStatus("");  
                }, 5000);
                WithdrawstakeAmountRef.current.value="";
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
        <form onSubmit={withdrawToken}>
        <label>Enter Withdraw Amount :</label>
        <input type="text" ref={WithdrawstakeAmountRef}/>
        <button type="submit" onClick={withdrawToken}>Withdraw Token</button>
        </form>
        </div>
    )


    

}
export default Withdraw;