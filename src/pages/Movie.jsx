import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para obter parâmetros da URL
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'; // Ícones para exibição de informações do filme

import MovieCard from '../components/MovieCard'; // Componente para exibir o filme

import './Movie.css'; // Estilo da página Movie

// URL base da API e chave de autenticação
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams(); // Pega o ID do filme da URL
  const [movie, setMovie] = useState(null); // Estado que armazena os dados do filme

  // Função para buscar os dados do filme pela API
  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data); // Armazena os dados no estado
  };

  // Formata valores monetários para dólar americano
  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };


  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, [id]); 
  


  return (
    <div className='movie-page'>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className='tagline'>{movie.tagline}</p>

          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>

          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>

  );
};

export default Movie;

