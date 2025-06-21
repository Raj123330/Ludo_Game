import React, { useState } from "react";
import ConfigCard from "../ConfigCard/ConfigCard";
import axios from "axios"; // ✅ import axios for API calls

const TournamentAdd = () => {
  const [tournamentData, setTournamentData] = useState({
    title: "",
    level: "",
    entryFee: "",
    prizePool: "",
    maxPlayers: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTournamentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/tournament/create",
        tournamentData,
        { withCredentials: true }
      );
      alert("Tournament created successfully!");
      console.log("Created:", response.data);
    } catch (error) {
      console.error("Error creating tournament:", error);
      alert("Failed to create tournament.");
    }
  };

  return (
    <div className="config-page" style={{ margin: "20px", width: "90%" }}>
      <ConfigCard
        title="Create New Tournament"
        icon="fa-trophy"
        fields={[
          { label: "Tournament Title", name: "title" },
          { label: "Level", name: "level", type: "number" },
          { label: "Entry Fee (₹)", name: "entryFee", type: "number" },
          { label: "Prize Pool (₹)", name: "prizePool", type: "number" },
          { label: "Maximum Players", name: "maxPlayers", type: "number" },
          {
            label: "Start Date & Time",
            name: "startDate",
            type: "datetime-local",
          },
          { label: "End Date & Time", name: "endDate", type: "datetime-local" },
        ]}
        data={tournamentData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        btnLabel="Create Tournament"
      />
    </div>
  );
};

export default TournamentAdd;
