import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Buttons } from '../Buttons';
import { Table } from 'react-bootstrap';

import './EpisodesList.css';

import { urlEpisodes } from '../../api/api';

export function EpisodesList() {
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);

  let pageEpisodes = `${urlEpisodes}/?page=${page}`;
  
  useEffect(() => {
    axios.get(pageEpisodes)
      .then((response) => {
        const result = (response.data);
        setEpisodes(result.results);
        setInfo(result.info)
      })
  }, [pageEpisodes]);

  const dataCreated = episodes.map(episode => episode.created = episode.created.substr(0, 10))

  const headers = ["name", "air_date", "episode", "created"];

  const filterEpisodes = useMemo(() => {
    let result = episodes.sort(function (a, b) {
      return a.name.localeCompare(b.name);
  })
    return result;
  }, [episodes]);
  
  return (
    <>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr style={{textTransform: 'capitalize', color: 'yellow'}}>
            {headers.map(title => (
              <th key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterEpisodes.map(episode => (
            <tr key={episode.id}>
              {headers.map(key => (
                <td key={key}>{episode[key] === "created"
                  ? dataCreated
                  : episode[key]}
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