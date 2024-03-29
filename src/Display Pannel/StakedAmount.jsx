import { useState, useEffect, useContext } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";
import StakingContext from "../context/StakingContext";

const StakedAmount = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [stakedAmount, setStakedAmount] = useState("0");
    const {isReload}=useContext(StakingContext);

    useEffect(() => {
        const fetchStakedAmount = async () => {
            try {
                const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
                const stakedAmountEth=ethers.formatUnits(amountStakedWei.toString(),18);
                setStakedAmount(stakedAmountEth);
            } catch (error) {
                console.error("Error fetching staked amount", error);
            }
        };

        if (stakingContract && selectedAccount) {
            fetchStakedAmount(); 
        }
    }, [selectedAccount, stakingContract,isReload]);

    return (
        <div>
            <p>Staked Amount: {stakedAmount}</p>
        </div>
    );
};

export default StakedAmount;
