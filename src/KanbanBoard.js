import React from 'react';
import TicketCard from './TicketCard';
import styles from './KanbanBoard.module.css';

import userImage from './user.jpg';

import urgentIcon from './images/Priority_Urgent.svg';
import highIcon from './images/Priority_High.svg';
import mediumIcon from './images/Priority_Medium.svg';
import lowIcon from './images/Priority_Low.svg';
import noPriorityIcon from './images/Priority_No.svg';

import todoIcon from './images/Status_Todo.svg';
import inProgressIcon from './images/Status_InProgress.svg';
import doneIcon from './images/Status_Done.svg';
import backlogIcon from './images/Status_Backlog.svg';
import cancelledIcon from './images/Status_Cancelled.svg';


const priorityLevels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority"
};

const priorityIcons = {
  4: urgentIcon,
  3: highIcon,
  2: mediumIcon,
  1: lowIcon,
  0: noPriorityIcon
};

const statusIcons = {
  "Todo": todoIcon,
  "In progress": inProgressIcon,
  "Done": doneIcon,
  "Backlog": backlogIcon,
  "Cancelled": cancelledIcon
};



function KanbanBoard({ tickets, groupBy, sortBy, users }) {
  // Helper function to group tickets
  const groupTickets = (tickets, groupBy) => {
    const grouped = {};
    tickets.forEach(ticket => {
      let key;
      let icon;

      if (groupBy === 'status') {
        key = ticket.status;
        icon = statusIcons[key];
        if (!grouped[key]) grouped[key] = { name: key, icon, tickets: [] };
      }
      else if (groupBy === 'user') {
        key = ticket.userId;
        const user = users.find(user => user.id === key);
        if (!grouped[key]) grouped[key] = { name: user.name, icon: userImage, tickets: [] };  // Add user-specific icon here if available
      }
      else if (groupBy === 'priority') {
        key = ticket.priority;
        icon = priorityIcons[key];
        if (!grouped[key]) grouped[key] = { name: priorityLevels[key], icon, tickets: [] };
      }

      grouped[key].tickets.push(ticket);
    });
    return grouped;
  };

  // Sort tickets based on the selected sorting option
  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  return (
    <div className={styles.kanbanBoard}>
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className={styles.groupColumn}>
          {/* <h3>{groupedTickets[groupKey].name}</h3> */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              {/* <img src={groupedTickets[groupKey].icon}  /> */}
              <img src={groupedTickets[groupKey].icon} alt={`${groupedTickets[groupKey].name} icon`} className={styles.statusIconImg} />
              <span className={styles.statusText}>{groupedTickets[groupKey].name}</span>
              <span className={styles.taskCount}>{groupedTickets[groupKey].tickets.length}</span>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.addTaskButton}>+</button>
            </div>
          </div>

          {sortTickets(groupedTickets[groupKey].tickets).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} userName={users.find(user => user.id === ticket.userId).name} groupBy={groupBy}/>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
