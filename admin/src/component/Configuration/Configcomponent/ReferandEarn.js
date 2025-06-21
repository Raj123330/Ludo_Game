import React, { useState } from 'react';
import ConfigCard from './../ConfigCard/ConfigCard';

const ReferEarn = () => {
  const [referData, setReferData] = useState({
    referralBonus: '',
    minimumWithdraw: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Refer & Earn Updated:', referData);
    // Add API call / toast here
  };

  return (
    <div className="config-page" style={{margin:'10%'}}>
      <ConfigCard
        title="Refer & Earn Settings"
        icon="fa-gift"
        fields={[
          { label: 'Referral Bonus', name: 'referralBonus' },
          { label: 'Minimum Withdraw Amount', name: 'minimumWithdraw' },
        ]}
        data={referData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        btnLabel="Update Refer & Earn"
      />
    </div>
  );
};

export default ReferEarn;
