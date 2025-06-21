import React, { useState } from 'react';
import ConfigCard from './../ConfigCard/ConfigCard';


const ConfigWithdrawReward = () => {
  const [withdrawConfig, setWithdrawConfig] = useState({
    minWithdraw: '100.00',
    withdrawFee: '1.80',
  });

  const [rewardConfig, setRewardConfig] = useState({
    winnerReward: '95.00',
    referralBonus: '2.00',
  });

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (configType, data) => {
    console.log(`Updated ${configType}:`, data);
    // API call can be placed here
  };

  return (
    <div className="config-page">
      <ConfigCard
        title="Withdraw Setting"
        icon="fas fa-cogs"
        fields={[
          { label: 'Minimum Withdraw (₹)', name: 'minWithdraw', type: 'number' },
          { label: 'Withdraw Fee (%)', name: 'withdrawFee', type: 'number' },
        ]}
        data={withdrawConfig}
        onChange={(e) => handleChange(e, setWithdrawConfig)}
        onSubmit={() => handleSubmit('Withdraw Config', withdrawConfig)}
        btnLabel="Update Withdraw Config"
      />

      <ConfigCard
        title="Reward Setting"
        icon="fas fa-cogs"
        fields={[
          { label: 'Winner Reward (%)', name: 'winnerReward', type: 'number' },
          { label: 'Referral Bonus (%)', name: 'referralBonus', type: 'number' },
        ]}
        data={rewardConfig}
        onChange={(e) => handleChange(e, setRewardConfig)}
        onSubmit={() => handleSubmit('Reward Config', rewardConfig)}
        btnLabel="Update Reward Config"
      />
    </div>
  );
};

export default ConfigWithdrawReward;
