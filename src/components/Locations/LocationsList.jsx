import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Buttons } from '../Buttons';
import { Table } from 'react-bootstrap';

import './LocationList.css';

import { urlLocations } from '../../api/api';

export function LocationsList() {
  const [locations, setLocations] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);

  let pageLocations = `${urlLocations}/?page=${page}`;

  const dataCreated = locations.map(location => location.created = location.created.substr(0, 10))
  
  useEffect(() => {
    axios.get(pageLocations)
      .then((response) => {
        const result = (response.data);
        setLocations(result.results);
        setInfo(result.info)
      })
  }, [pageLocations]);

  const filterLocations = useMemo(() => {
    let result = locations.sort(function (a, b) {
      return a.name.localeCompare(b.name);
  });

    return result;
  }, [locations]);

  const headers = ["name", "type", "dimension", "created"]
  
  return (
    <>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            {headers.map(title => (
              <th key={title} style={{textTransform: 'capitalize', color: 'yellow'}}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterLocations.map(location => (
            <tr key={location.id}>
              {headers.map(key => (
                <td key={key}>{location[key] === "created"
                  ? dataCreated
                  : location[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Buttons
        page={page}
        setPage={setPage}
        prev={info.prev}
        pages={info.pages}
      />
    </>
  );
};