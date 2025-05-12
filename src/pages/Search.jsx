import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("q");

  // Função assíncrona que faz a requisição dos filmes com base na URL
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);         // Faz a requisição
    const data = await res.json();        // Converte a resposta para JSON
    setMovies(data.results);              // Atualiza o estado com os filmes
  };

  // useEffect dispara a busca sempre que o `query` mudar
  useEffect(() => {
    
    const searchWithQueryURL = `${searchUrl}?${apiKey}&query=${query}&language=pt-BR`;


    getSearchedMovies(searchWithQueryURL); // Executa a busca
  }, [query]); // Executa novamente quando `query` mudar

  return (
    <div className='container'>
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="movies-container">
       
        {movies.length === 0 && <p>Carregando...</p>}
        
        
        {movies.length > 0 && 
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
