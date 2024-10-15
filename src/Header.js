import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

// Import images from the icons_FEtask folder
import startImage from './images/Display.svg';
import endImage from './images/down.svg';

function Header({ setGroupBy, setSortBy }) {
  const [displayMenuOpen, setDisplayMenuOpen] = useState(false);

  const [groupBy, setLocalGroupBy] = useState(() => {
    return localStorage.getItem('groupBy') || 'status';
  });

  const [sortBy, setLocalSortBy] = useState(() => {
    return localStorage.getItem('sortBy') || '';
  });

  const dropdownRef = useRef(null);

  const toggleDisplayMenu = () => {
    setDisplayMenuOpen(!displayMenuOpen);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleGroupByChange = (value) => {
    setLocalGroupBy(value);
    localStorage.setItem('groupBy', value);
    setGroupBy(value);
  };

  const handleSortByChange = (value) => {
    setLocalSortBy(value);
    localStorage.setItem('sortBy', value);
    setSortBy(value);
  };

  useEffect(() => {
    setGroupBy(groupBy);
    setSortBy(sortBy);
  }, [groupBy, sortBy, setGroupBy, setSortBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.headerContainer} onClick={toggleDisplayMenu}>
      <div className={styles.displayButton}>
        {/* Start Image */}
        <img src={startImage} alt="Start" className={styles.icon} />
        
        {/* Display Text */}
        <span>Display</span>
        
        {/* End Image */}
        <img src={endImage} alt="End" className={styles.icon} />

        {/* Dropdown Menu */}
        <div
          className={`${styles.dropdownMenu} ${displayMenuOpen ? styles.show : ''}`}
          onClick={handleDropdownClick}
          ref={dropdownRef}
        >
          <div>
            <label>Grouping</label>
            <select value={groupBy} onChange={(e) => handleGroupByChange(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label>Ordering</label>
            <select value={sortBy} onChange={(e) => handleSortByChange(e.target.value)}>
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;