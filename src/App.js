import React, { useEffect, useState } from 'react';
import Header from './Header';  // Add this import for Header
import KanbanBoard from './KanbanBoard';  // Add this import for KanbanBoard


function App() {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // default group by status
  const [sortBy, setSortBy] = useState('');
  const [users,setUsers] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);

    };
    fetchTickets();
  }, []);

  return (
    <div>
      <Header setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} users={users} />
    </div>
  );
}

export default App;
