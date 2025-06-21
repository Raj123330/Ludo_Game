import React, { useState } from 'react';
import ConfigCard from './../ConfigCard/ConfigCard';

const CouponEntry = () => {
  const [couponConfig, setCouponConfig] = useState({
    couponEntryEnabled: 'true',
    couponAmount: '10',
    moneyBeforeStart: 'true',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Coupon Entry Config Updated:', couponConfig);
    // Add API call / toast here
  };

  return (
    <div className="config-page">
      <ConfigCard
        title="Coupon Entry & Money Before Start Config"
        icon="fa-cogs"
        fields={[
          { label: 'Enable Coupon Entry (true/false)', name: 'couponEntryEnabled' },
          { label: 'Coupon Entry Amount (₹)', name: 'couponAmount', type: 'number' },
           {/** { label: 'Money Before Start (true/false)', name: 'moneyBeforeStart' }, */}
        ]}
        data={couponConfig}
        onChange={handleChange}
        onSubmit={handleSubmit}
        btnLabel="Update Coupon & Entry Settings"
      />
    </div>
  );
};

export default CouponEntry;
