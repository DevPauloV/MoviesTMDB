import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './MoviesGrid.css';

// URL base da API e chave de autenticação vinda do arquivo .env
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  // Estado para armazenar a lista de filmes mais bem avaliados
  const [topMovies, setTopMovies] = useState([]);

  // Função assíncrona que busca os filmes da API
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url); // Faz a requisição para a URL fornecida
    const data = await res.json(); // Converte a resposta para JSON
    setTopMovies(data.results); // Atualiza o estado com os resultados da API
  };

  // useEffect executa a função quando o componente é montado
  useEffect(() => {
    // Monta a URL completa com a chave da API e o parâmetro de idioma
    const topRatedUrl = `${moviesUrl}top_rated?api_key=${apiKey}&language=pt-BR`;

    // Chama a função para buscar os filmes
    getTopRatedMovies(topRatedUrl);
  }, []); // O array vazio indica que isso será executado apenas uma vez (quando o componente montar)

  return (
    <div className='container'>
      <h2 className="title">Melhores filmes:</h2>

      <div className="movies-container">
        /* Se ainda não carregou os filmes, mostra mensagem de carregamento */
        {topMovies.length === 0 && <p>Carregando...</p>}

        /* Se os filmes foram carregados, exibe os cartões de filmes */
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
