import React, { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";


const Filter = ({ filterPosts, showAllPosts }) => {
  const [filterDate, setFilterDate] = useState('');

  const handleFilter = () => {
    filterPosts(filterDate);
  };

  const handleShowAll = () => {
    setFilterDate('');
    showAllPosts();
  };

  return (
    <div className="filter-container">
      <label>
        Fecha:
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </label>
      <button onClick={handleFilter}><CiFilter />
</button>
      <button onClick={handleShowAll}><IoEyeSharp />
</button>
    </div>
  );
};

export default Filter;
