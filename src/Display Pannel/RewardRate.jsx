import {useState,useEffect,useContext} from "react";
import Web3Context from "../context/Web3Context";
import {ethers} from "ethers";
const RewardRate = () => {
    const {stakingContract,selectedAccount}=useContext(Web3Context);
    const [rewardRate,setRewardRate]=useState("0");

    useEffect(()=>{
        const fetchRewardRate = async () => {
            try{
                const rewardRateWei=await stakingContract.REWARD_RATE();
                const rewardRateEth=await ethers.formatUnits(rewardRateWei.toString(),18);
                setRewardRate(rewardRateEth);
                
    
            }
            catch(error){
                console.error("Error fetching reward rate",error);
            }
        }
        if(stakingContract && selectedAccount){
            fetchRewardRate();
        }
        
    },[stakingContract,selectedAccount]);

    return(
        <>
        <p>Reward Rate :{rewardRate} Token/Sec</p>
        </>
    )
    
}
export default RewardRate;