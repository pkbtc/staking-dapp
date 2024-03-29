import { useState, useEffect, useContext } from "react";
import Web3Context from "../context/Web3Context";
import { ethers } from "ethers";

const EarnedReward = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [earnedReward, setEarnedReward] = useState("0");

    useEffect(() => {
        const fetchEarnedReward = async () => {
            try {
                const rewardValueWei = await stakingContract.earned(selectedAccount);
                const rewardValueEth = ethers.formatUnits(rewardValueWei, 18).toString();
                const roundedReward = parseFloat(rewardValueEth).toFixed(2);
                setEarnedReward(roundedReward);
            } catch (error) {
                console.error("Error fetching earned reward", error);
            }
        };

        if (stakingContract && selectedAccount) {
            fetchEarnedReward();
        }

        const interval = setInterval(() => {
            if (stakingContract && selectedAccount) {
                fetchEarnedReward();
            }
        }, 20000);

        return () => clearInterval(interval);
    }, [stakingContract, selectedAccount]);

    return (
        <>
            <p>Earned Reward: {earnedReward}</p>
        </>
    );
};

export default EarnedReward;
