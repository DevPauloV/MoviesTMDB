import React from 'react';
// Importa hook para obter os parâmetros da URL
import { useSearchParams } from 'react-router-dom';
// Importa hooks de estado e efeito
import { useState, useEffect } from 'react';
// Componente reutilizável para exibir cada filme
import MovieCard from '../components/MovieCard';

// URL base da busca e a chave da API (vindos do .env)
const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

// Importa estilos
import './MoviesGrid.css';

// Componente de busca
const Search = () => {
  // Obtém os parâmetros da URL (ex: ?q=avatar)
  const [searchParams] = useSearchParams();

  // Estado que armazena os filmes retornados pela busca
  const [movies, setMovies] = useState([]);

  // Extrai o valor da busca da URL
  const query = searchParams.get("q");

  // Função assíncrona que faz a requisição dos filmes com base na URL
  const getSearchedMovies = async (url) => {
    const res = await fetch(url);         // Faz a requisição
    const data = await res.json();        // Converte a resposta para JSON
    setMovies(data.results);              // Atualiza o estado com os filmes
  };

  // useEffect dispara a busca sempre que o `query` mudar
  useEffect(() => {
    
    const searchWithQueryURL = `${searchUrl}?api_key=${apiKey}&query=${query}&language=pt-BR`;
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
