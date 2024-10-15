import React from 'react';
import styles from './TicketCard.module.css';
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

function TicketCard({ ticket, userName, groupBy }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardId}>{ticket.id}</span>
        {/* Conditionally hide user icon based on groupBy */}
        {groupBy !== 'user' && (
          <div className={styles.cardProfile}>
            <img src={userImage} alt="Profile" />
          </div>
        )}
      </div>

      <div className={styles.cardTitle}>
        {ticket.title}
      </div>

      <div className={styles.cardLabels}>
        {/* Conditionally hide status icon based on groupBy */}
        {groupBy !== 'status' && (
          <div className={styles.icon}>
          <img src={statusIcons[ticket.status]} alt={ticket.status} />
          </div>
        )}
        
        {/* Conditionally hide priority icon based on groupBy */}
        {groupBy !== 'priority' && (
          <div className={styles.icon}>
          <img src={priorityIcons[ticket.priority]} alt={ticket.priority} />
          </div>
        )}
        <div className={styles.label}>{ticket.tag[0]}</div>
        
      </div>
    </div>
  );
}

export default TicketCard;
