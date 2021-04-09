import React, { useState } from "react";
import "./DataTable.css";

function DataTable({ data, numPerPage }) {
  const tHeaders = Object.keys(data[0]);
  const [indexRoot, setIndexRoot] = useState(0);
  const [newData, setNewData] = useState(data);
  const [tBodies, setTBodies] = useState(newData.slice(0, numPerPage));
  const [ageFilter, setAgeFilter] = useState({ min: "", max: "" });

  // Prev and Next page
  const prevPage = (event) => {
    if (indexRoot >= numPerPage) {
      setIndexRoot(indexRoot - numPerPage);
      setTBodies(newData.slice(indexRoot - numPerPage, indexRoot));
    }
  };
  const nextPage = (event) => {
    if (indexRoot + numPerPage < newData.length) {
      setIndexRoot(indexRoot + numPerPage);
      setTBodies(
        newData.slice(indexRoot + numPerPage, indexRoot + numPerPage * 2)
      );
    }
  };

  // Search by name
  const searchByName = (event) => {
    const newDataSearched = newData.filter(
      (data) =>
        data.name.toLowerCase().search(event.target.value.toLowerCase()) >= 0 ||
        event.target.value === ""
    );
    setIndexRoot(0);
    setTBodies(newDataSearched.slice(0, numPerPage));
  };

  // Filter by age
  const filterByMinAge = (event) => {
    if (!event.target.value || event.target.value < 0) event.target.value = "";
    else setAgeFilter({ ...ageFilter, min: parseInt(event.target.value) });
  };
  const filterByMaxAge = (event) => {
    if (!event.target.value || event.target.value < 0) event.target.value = "";
    else setAgeFilter({ ...ageFilter, max: parseInt(event.target.value) });
  };

  // Filter everything
  const filter = (event) => {
    if (ageFilter.min && ageFilter.max) {
      const min = ageFilter.min < ageFilter.max ? ageFilter.min : ageFilter.max;
      const max = ageFilter.min < ageFilter.max ? ageFilter.max : ageFilter.min;
      const newDataFilter = data.filter(
        (data) => data?.age >= min && data?.age <= max
      );
      setIndexRoot(0);
      setNewData(newDataFilter);
      setTBodies(newDataFilter.slice(0, numPerPage));
    } else if (ageFilter.min && !ageFilter.max) {
      const newDataFilter = data.filter((data) => data?.age >= ageFilter.min);
      setIndexRoot(0);
      setNewData(newDataFilter);
      setTBodies(newDataFilter.slice(0, numPerPage));
    } else if (!ageFilter.min && ageFilter.max) {
      const newDataFilter = data.filter((data) => data?.age <= ageFilter.max);
      setIndexRoot(0);
      setNewData(newDataFilter);
      setTBodies(newDataFilter.slice(0, numPerPage));
    } else clearFilter();
  };

  const clearFilter = (event) => {
    setIndexRoot(0);
    setNewData(data);
    setTBodies(data.slice(0, numPerPage));
  };

  return (
    <div>
      <span>Page: {indexRoot / numPerPage + 1}</span>
      <span> {newData.length}</span>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
      <input type="text" placeholder="Search by name" onChange={searchByName} />
      <input
        defaultValue={ageFilter.min}
        type="number"
        className="age-box"
        placeholder="Min age"
        onChange={filterByMinAge}
      />
      <span> - </span>
      <input
        defaultValue={ageFilter.max}
        type="number"
        className="age-box"
        placeholder="Max age"
        onChange={filterByMaxAge}
      />
      <button onClick={filter}> Filter </button>
      <span> - </span>
      <button type="reset" onClick={clearFilter}>
        Clear
      </button>
      <table>
        <thead>
          <tr>
            {tHeaders.map((head, index) => (
              <th key={index} name={head}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tBodies.map((body, index) => (
            <tr key={index}>
              {Object.keys(body).map((key, index) => (
                <td className="row-table" key={index}>
                  {body[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
