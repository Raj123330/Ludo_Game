import React, { useState } from 'react';
import './TournamentList.css';
import Confirmation from '../POPUP/Confirmation';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([
    { id: 1, title: 'Mega Ludo 2025', entryFee: 50, prizePool: 1000, status: 'Upcoming', startDate: '2025-05-01' },
    { id: 2, title: 'Sunday Fun Cup', entryFee: 20, prizePool: 500, status: 'Running', startDate: '2025-04-30' },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTournament, setCurrentTournament] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);

  const handleEdit = (id) => {
    const tournament = tournaments.find(tour => tour.id === id);
    setCurrentTournament(tournament);
    setIsModalOpen(true);  // Open modal when clicking Edit
  };

  const handleDelete = (id) => {
    setTournamentToDelete(id);
    setIsConfirmationOpen(true);  // Open confirmation popup
  };

  const confirmDelete = () => {
    setTournaments(tournaments.filter(tour => tour.id !== tournamentToDelete));
    setIsConfirmationOpen(false);
    setTournamentToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmationOpen(false);
    setTournamentToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTournament(null);
  };

  return (
    <div className="tournament-table-container">
      <h2 className="page-title">All Tournaments</h2>
      <div className="table-responsive">
        <table className="tournament-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Entry Fee</th>
              <th>Prize Pool</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.length > 0 ? (
              tournaments.map((tour, index) => (
                <tr key={tour.id}>
                  <td>{index + 1}</td>
                  <td>{tour.title}</td>
                  <td>₹{tour.entryFee}</td>
                  <td>₹{tour.prizePool}</td>
                  <td>
                    <span className={`status-badge ${tour.status.toLowerCase()}`}>{tour.status}</span>
                  </td>
                  <td>{tour.startDate}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(tour.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(tour.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No tournaments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Tournament Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Tournament</h3>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={currentTournament.title}
                  onChange={(e) => setCurrentTournament({ ...currentTournament, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="entryFee">Entry Fee</label>
                <input
                  type="number"
                  id="entryFee"
                  name="entryFee"
                  value={currentTournament.entryFee}
                  onChange={(e) => setCurrentTournament({ ...currentTournament, entryFee: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prizePool">Prize Pool</label>
                <input
                  type="number"
                  id="prizePool"
                  name="prizePool"
                  value={currentTournament.prizePool}
                  onChange={(e) => setCurrentTournament({ ...currentTournament, prizePool: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={currentTournament.startDate}
                  onChange={(e) => setCurrentTournament({ ...currentTournament, startDate: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="close-btn" onClick={handleCloseModal}>Close</button>
                <button type="button" className="save-btn" onClick={() => handleCloseModal()}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <Confirmation 
          message="Are you sure you want to delete this tournament?"
          onClose={cancelDelete} 
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default TournamentList;
