import React from 'react';
import './App.css';
import Wallet from './components/Wallet/Wallet';
import Navigation from './Navigation/Navigation';
import DisplayPannel from './Display Pannel/DisplayPannel';
import TokenApproval from './StakeToken/TokenApproval';
import StakeAmount from './StakeToken/StakeAmount';
import Withdraw from './Withdraw/Withdraw';
import ClaimReward from './ClaimReward/ClaimReward';
import { StakingProvider } from './context/StakingContext';

function App() {
  return (
    <>
    <Wallet>
        <Navigation/>
        <StakingProvider>
        <DisplayPannel/>
        <StakeAmount/>
        <Withdraw/>
        </StakingProvider>
        <TokenApproval/>
        <ClaimReward/>

        
    </Wallet>
    </>
  );
}

export default App;
