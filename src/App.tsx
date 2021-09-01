import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Dropdown, Spinner } from 'react-bootstrap';
import { getPokemonList, getPokemonData } from './api/endpoints';
import { GetPokemonListResponse, getPokemonResponse } from './api/responses';
import fetcher from './utils/fetcher';
import './App.scss';

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<{ name: string; url: string; }>();

  const { data: pokemonList } = useSWR<GetPokemonListResponse>(
    getPokemonList,
    (key: string) => fetcher<GetPokemonListResponse>(key),
  );
  const { data: pokemonData } = useSWR<getPokemonResponse>(
    selectedPokemon ? getPokemonData(selectedPokemon.name) : null,
    (key: string) => fetcher<getPokemonResponse>(key),
  );

  // const [pokemonList, setPokemonList] = useState<GetPokemonListResponse>();
  // const [pokemonData, setPokemonData] = useState<getPokemonResponse>();

  // useEffect(() => {
  //   fetch(getPokemonList)
  //     .then((res) => res.json() as Promise<GetPokemonListResponse>)
  //     .then((data) => setPokemonList(data));
  // }, [])

  // useEffect(() => {
  //   if (selectedPokemon) {
  //     fetch(getPokemonData(selectedPokemon.name))
  //       .then((res) => res.json() as Promise<getPokemonResponse>)
  //       .then((data) => setPokemonData(data));
  //   }
  // }, [selectedPokemon])

  console.log(pokemonList);

  return (
    <div className="App">
      {
        pokemonList ? (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                { selectedPokemon?.name || 'Select a Pokemon' }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {
                  pokemonList.results.map((pokemon) => (
                    <Dropdown.Item onClick={() => setSelectedPokemon(pokemon)} data-testid="pokemon-option" key={pokemon.name}>
                      {pokemon.name}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>

            {
              (selectedPokemon && pokemonData) && (
                <>
                  <img src={pokemonData.sprites.front_default} alt={selectedPokemon.name} />
                </>
              )
            }
          </>
        ) : (
          <Spinner animation="border" variant="primary" data-testid="loading-spinner" />
        )
      }
    </div>
  );
}

export default App;
