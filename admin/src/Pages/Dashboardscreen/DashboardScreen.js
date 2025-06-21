// DashBoardScreen.jsx
import { useState } from 'react';
import Sidebar from '../../component/Dashboard/SideBar';
import Dashboard from '../../component/Dashboard/Dashboard';
import UserTable from '../../component/OnlineUser/OnlineUser';
import ConflictTable from '../../component/ConflictTable/ConflictTable';
import CancelRequests from '../../component/CancelRequest/CancelRequest';
import KycRequests from '../../component/KycRequest/KycRequest';
import WithdrawRequests from '../../component/Withdraw/Withdraw';
import StatusBar from '../../component/Dashboard/StatusBar';
import './Dashboardscreen.css';
import ActiveMatches from '../../component/ActiveMatches/ActiveMatches';
import ManageAdminPage from '../../component/ManageAdmin/ManageAdmin';
import NotificationPage from '../../component/Notification/Notification';
import ConfigurationScreen from '../ConfigurationScreen/ConfigurationScreen';
import AdminLogs from '../../component/AdminLogs/AdminLogs';
import PendingResults from '../../component/PendingResult/PendingResult';
import UserProfile from '../../component/OnlineUser/component/OpenUser';
import MatchInfo from '../../component/CancelRequest/Component/MatchInfo';
import TournamentList from '../../component/TournamentList/TournamentList';
import TournamentAdd from '../../component/Configuration/Configcomponent/TournamentAdd';
import ReferEarn from '../../component/Configuration/Configcomponent/ReferandEarn';
import LevelAdd from '../../component/Configuration/Configcomponent/AddLevel';
import CouponEntry from '../../component/Configuration/Configcomponent/CouponEntry';

function DashBoardScreen() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null); // <--- ADD this

  const handleOpenUser = (user) => {
    setSelectedUser(user);
    setSelectedMatch(null); // Clear selected match if user is opened
  };

  const handleOpenMatch = (match) => {
    setSelectedMatch(match);
    setSelectedUser(null); // Clear selected user if match is opened
  };

  const renderContent = () => {
    if (selectedUser) {
      return <UserProfile user={selectedUser} />;
    }

    if (selectedMatch) {
      return <MatchInfo match={selectedMatch} />; // <--- Pass selected match
    }

    switch (activeView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Admin Logs':
        return <AdminLogs />;
      case 'Manage Users':
        return <UserTable onOpenUser={handleOpenUser} />;
      case 'User Withdraws':
        return <WithdrawRequests />;
      case 'Pending Results':
        return <PendingResults />;
      case 'Match History':
        return <MatchInfo />; // (optional)
      case 'Active Matches':
        return <ActiveMatches />;
      case 'Manage Notifications':
        return <NotificationPage />;
      case 'Manage Admins':
        return <ManageAdminPage />;
      case 'Manage Conflicts':
        return <ConflictTable setSelectedMatch={handleOpenMatch} setSelectedUser={setSelectedUser}/>;
      case 'Cancel Requests':
        return <CancelRequests setSelectedMatch={handleOpenMatch} setSelectedUser={setSelectedUser} />;
      case 'User KYC':
        return <KycRequests />;
      case 'Configuration':
        return <ConfigurationScreen />;
        case 'Create Tournament':
          return <TournamentAdd />;
          case 'Tournament':
        return <TournamentList />;
      case 'Add Level':
        return <LevelAdd />; // (optional)
      case 'Coupon Entry':
        return <CouponEntry />;
        case 'Refer and Earn':
          return <ReferEarn />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar onItemSelect={(item) => {
        setActiveView(item);
        setSelectedUser(null);
        setSelectedMatch(null); // Clear selected match also
      }} />
      <div className="main-content">
        <StatusBar onStatusClick={(item) => {
          setActiveView(item);
          setSelectedUser(null);
          setSelectedMatch(null); // Clear selected match also
        }} />
        {renderContent()}
      </div>
    </div>
  );
}

export default DashBoardScreen;
