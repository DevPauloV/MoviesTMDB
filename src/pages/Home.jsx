import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './MoviesGrid.css';


const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  
  const [topMovies, setTopMovies] = useState([]);

 
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url); // Faz a requisição para a URL fornecida
    const data = await res.json(); // Converte a resposta para JSON
    setTopMovies(data.results); // Atualiza o estado com os resultados da API
  };

  // useEffect executa a função quando o componente é montado
  useEffect(() => {
    // Monta a URL completa com a chave da API e o parâmetro de idioma
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}&language=pt-BR`;



    // Chama a função para buscar os filmes
    getTopRatedMovies(topRatedUrl);
  }, []); // O array vazio indica que isso será executado apenas uma vez (quando o componente montar)

  return (
    <div className='container'>
      <h2 className="title">Melhores filmes:</h2>

      <div className="movies-container">
        
        {topMovies.length === 0 && <p>Carregando...</p>}

       
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
