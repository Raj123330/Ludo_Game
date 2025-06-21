import React, { useState } from 'react';
import ConfigCard from './../ConfigCard/ConfigCard';

const ConfigSupportFast = () => {
  const [supportData, setSupportData] = useState({
    whatsapp: '917669006847',
    instagram: 'https://www.instagram.com/codegully.in/',
    youtube: 'https://www.youtube.com/devninja',
    email: 'workwithdevninja@gmail.com',
  });

  const [smsData, setSmsData] = useState('Hello');

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (label, data) => {
    console.log(`${label} Updated:`, data);
    // Add API call / toast here
  };

  return (
    <div className="config-page">
      <ConfigCard
        title="Support & Social Media Config"
        icon="fa-cogs"
        fields={[
          { label: 'Whatsapp', name: 'whatsapp' },
          { label: 'Instagram', name: 'instagram' },
          { label: 'Youtube', name: 'youtube' },
          { label: 'Email', name: 'email', type: 'email' },
        ]}
        data={supportData}
        onChange={(e) => handleChange(e, setSupportData)}
        onSubmit={() => handleSubmit('Support Config', supportData)}
        btnLabel="Update Support Config"
      />

      <ConfigCard
        title="Fast2SMS Config"
        icon="fa-cogs"
        fields={[
          { label: 'Fast2SMS Api Key', name: 'apiKey' },
        ]}
        data={smsData}
        onChange={(e) => handleChange(e, setSmsData)}
        onSubmit={() => handleSubmit('Fast2SMS Config', smsData)}
        btnLabel="Update Fast2SMS Config"
      />
    </div>
  );
};

export default ConfigSupportFast;
