import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Table } from 'react-bootstrap';

const Species = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Este es un error!', error);
      });
  }, []);

  return (
    <div className="Episodios container mt-3 text-light">
      <h2 className="text-light">Episodios</h2>
      <Tabs defaultActiveKey={0} id="character-tabs" className="mb-3">
        {characters.map((character, index) => (
          <Tab eventKey={index} title={character.name} key={character.id}>
            <h4 className="text-light">Episodios de {character.name}</h4>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Name</th>
                  <th>Air Date</th>
                </tr>
              </thead>
              <tbody>
                {character.episode.map((episodeUrl, episodeIndex) => (
                  <EpisodeRow key={episodeIndex} episodeUrl={episodeUrl} />
                ))}
              </tbody>
            </Table>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

const EpisodeRow = ({ episodeUrl }) => {
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    axios.get(episodeUrl)
      .then(response => {
        setEpisode(response.data);
      })
      .catch(error => {
        console.error('Este es un error!', error);
      });
  }, [episodeUrl]);

  if (!episode) {
    return null;
  }

  return (
    <tr>
      <td>{episode.episode}</td>
      <td>{episode.name}</td>
      <td>{episode.air_date}</td>
    </tr>
  );
};

export default Species;
