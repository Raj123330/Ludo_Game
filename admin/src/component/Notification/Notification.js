import React, {useState} from "react";
import "./Notification.css";
import { Bell } from "lucide-react";
import SendNotificationModal from '../POPUP/SendNotification';

const notifications = [
  {
    date: "18 APR, 2025 12:28 AM",
    message: "Hi",
    to: "All Users",
    seenBy: 4,
  },
  {
    date: "16 APR, 2025 12:59 PM",
    message: "Hghik",
    to: "Vinod\n9785064008",
    seenBy: 0,
  },
  {
    date: "28 MAR, 2025 11:40 AM",
    message: "Hlo",
    to: "Ss guru\n7024940797",
    seenBy: 1,
  },
  // Add more notifications here...
];

export default function NotificationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2>Manage Notifications</h2>
        <button className="send-button"onClick={() => setIsModalOpen(true)} >
          <Bell className="bell-icon" /> Send Notification
        </button>
      </div>
      <div className="notification-card">
        <table className="notification-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Message</th>
              <th>To</th>
              <th>Seen By</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={index}>
                <td>{notification.date}</td>
                <td>{notification.message}</td>
                <td>{notification.to}</td>
                <td>
                  <span className="seen-badge">{notification.seenBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SendNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
