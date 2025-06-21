import React, { useState } from 'react';
import ConfigCard from './../ConfigCard/ConfigCard';

const LevelAdd = () => {
  const [levelData, setLevelData] = useState({
    levelName: '',
    minPoints: '',
    reward: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLevelData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Level Added:', levelData);
    // Add API call / toast here
  };

  return (
    <div className="config-page">
      <ConfigCard
        title="Add Level"
        icon="fa-layer-group"
        fields={[
          { label: 'Level Name', name: 'levelName' },
          { label: 'Minimum Points', name: 'minPoints' },
          { label: 'Reward', name: 'reward' },
        ]}
        data={levelData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        btnLabel="Add Level"
      />
    </div>
  );
};

export default LevelAdd;
