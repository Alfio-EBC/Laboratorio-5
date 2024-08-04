import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";

const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [expandedCharacter, setExpandedCharacter] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        axios
            .get("https://rickandmortyapi.com/api/character")
            .then((response) => {
                setCharacters(response.data.results);
                setLoading(false); // Data loaded successfully
            })
            .catch((error) => {
                console.error("Se produjo un error al obtener los datos del personaje!", error);
                setLoading(false); // Data loading failed
            });

        axios
            .get("https://rickandmortyapi.com/api/episode")
            .then((response) => {
                setEpisodes(response.data.results);
            })
            .catch((error) => {
                console.error("Se produjo un error al obtener los datos del personaje", error);
            });
    }, []);

    const handleShowEpisodes = (characterId) => {
        if (expandedCharacter === characterId) {
            setExpandedCharacter(null); // Collapse if already expanded
        } else {
            setExpandedCharacter(characterId); // Expand selected character's episodes
        }
    };

    if (loading) {
        return <p>Cargando...</p>; // Add a loading indicator
    }

    return (
        <div>
            <h2 className="text-center text-light py-4">Personajes de Rick and Morty</h2>

            <Container fluid>
                <Row id="Perpagina">
                    {characters.map((character) => (
                        <Col key={character.id} sm={12} md={6} lg={4} xl={3}>
                            <Card style={{ width: "18rem", marginBottom: "1rem" }}>
                                <Card.Body>
                                    <Card.Title>
                                        <strong>{character.name}</strong>
                                    </Card.Title>
                                    <hr />
                                    <Card.Img variant="top" src={character.image} />
                                    <Card.Text>
                                        <strong>Estado:</strong> {character.status}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Especie:</strong> {character.species}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Género:</strong> {character.gender}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Episodios:</strong> {character.episode.length}
                                    </Card.Text>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleShowEpisodes(character.id)}
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        {expandedCharacter === character.id ? "Ocultar Episodios" : "Mostrar Episodios"}
                                    </Button>

                                    {expandedCharacter === character.id && (
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombre del Episodio</th>
                                                    <th>Fecha de Emisión</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {character.episode.map((episodeUrl) => {
                                                    const episode = episodes.find(ep => ep.url === episodeUrl);
                                                    if (episode) {
                                                        return (
                                                            <tr key={episode.id}>
                                                                <td>{episode.id}</td>
                                                                <td>{episode.name}</td>
                                                                <td>{episode.air_date}</td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return null; // Handle case where episode data is not found
                                                    }
                                                })}
                                            </tbody>
                                        </Table>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Character;
