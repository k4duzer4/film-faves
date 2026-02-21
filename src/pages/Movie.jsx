/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BiMoneyWithdraw,
  BiSolidWallet,
  BiSolidHourglass,
  BiFile,
  BiSolidData,
} from "react-icons/bi";
import MovieContainer from "../components/MovieContainer";
import axios from "../../axiosConfig";
import "./Movie.css";

const uiCopy = {
  "pt-BR": {
    releaseDate: "Data de Lancamento",
    budget: "Orcamento",
    revenue: "Receita",
    runtime: "Duracao",
    description: "Descricao",
    submitRating: "Enviar avaliacao",
    ratingLabel: "Avaliacao",
    commentsTitle: "Comentarios",
    commentPlaceholder: "Escreva seu comentario...",
    commentButton: "Publicar",
    emptyComments: "Ainda nao ha comentarios.",
    commentSuccess: "Comentario publicado!",
    ratingPlaceholder: "Selecione uma avaliacao...",
    ratingSuccess: "Avaliacao salva com sucesso!",
    minutes: "min",
  },
  "en-US": {
    releaseDate: "Release Date",
    budget: "Budget",
    revenue: "Revenue",
    runtime: "Runtime",
    description: "Overview",
    submitRating: "Submit rating",
    ratingLabel: "Rating",
    commentsTitle: "Comments",
    commentPlaceholder: "Write your comment...",
    commentButton: "Publish",
    emptyComments: "No comments yet.",
    commentSuccess: "Comment published!",
    ratingPlaceholder: "Select a rating...",
    ratingSuccess: "Rating saved successfully!",
    minutes: "min",
  },
};

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentDraft, setCommentDraft] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const language = navigator.language in uiCopy ? navigator.language : "pt-BR";
  const labels = uiCopy[language];

  const getMovie = async () => {
    try {
      const response = await axios.get(`movie/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
    }
  };

  const moneyFormat = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const dateFormat = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language).format(date);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    const ratingKey = `rating_${id}`;
    localStorage.setItem(ratingKey, String(rating));
    setRatingSubmitted(true);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const trimmed = commentDraft.trim();
    if (!trimmed) return;

    const next = [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        createdAt: Date.now(),
      },
      ...comments,
    ];

    setComments(next);
    localStorage.setItem(`comments_${id}`, JSON.stringify(next));
    setCommentDraft("");
    setToastMessage(labels.commentSuccess);
    setToastVisible(true);
  };

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${id}`);
    if (storedComments) {
      try {
        const parsed = JSON.parse(storedComments);
        if (Array.isArray(parsed)) {
          setComments(parsed);
        }
      } catch (error) {
        console.error("Erro ao carregar comentarios:", error);
      }
    }

    const storedRating = localStorage.getItem(`rating_${id}`);
    if (storedRating) {
      const parsed = Number(storedRating);
      if (!Number.isNaN(parsed)) {
        setRating(parsed);
        setRatingSubmitted(true);
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

  useEffect(() => {
    if (!toastVisible) return undefined;
    const timer = setTimeout(() => setToastVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  return (
    <div className="movie_page">
      {movie && (
        <>
          <div className="movie_container">
            <MovieContainer movie={movie} showLink={false} variant="detail" />
            <div className="movie_info">
              <p className="movie_tagline">&quot;{movie.tagline}&quot;</p>
              <div className="movie_info_info">
                <h3>
                  <BiSolidData /> {labels.releaseDate}
                </h3>
                <p>{dateFormat(movie.release_date)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidWallet /> {labels.budget}
                </h3>
                <p>{moneyFormat(movie.budget)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiMoneyWithdraw /> {labels.revenue}
                </h3>
                <p>{moneyFormat(movie.revenue)}</p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiSolidHourglass /> {labels.runtime}
                </h3>
                <p>
                  {movie.runtime ? `${movie.runtime} ${labels.minutes}` : "-"}
                </p>
              </div>
              <div className="movie_info_info">
                <h3>
                  <BiFile /> {labels.description}
                </h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
          <div className="rating_grid">
            <section className="rating_form">
              <h3>{labels.submitRating}</h3>
              <form onSubmit={handleSubmitRating}>
                <label htmlFor="rating">{labels.ratingLabel}</label>
                <div className="star_rating" role="radiogroup" aria-label={labels.ratingLabel}>
                  {[...Array(5)].map((_, index) => {
                    const value = index + 1;
                    const isActive = value <= (hoverRating || rating);

                    return (
                      <button
                        key={value}
                        type="button"
                        className={isActive ? "star active" : "star"}
                        aria-pressed={rating === value}
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" id="rating" value={rating} readOnly />
                <button className="primary_button" type="submit" disabled={!rating}>
                  {labels.submitRating}
                </button>
              </form>
              {ratingSubmitted && rating > 0 && (
                <p className="rating_saved">{labels.ratingSuccess}</p>
              )}
            </section>
            <section className="comments_panel">
              <h3>{labels.commentsTitle}</h3>
              <form className="comment_form" onSubmit={handleSubmitComment}>
                <textarea
                  rows="3"
                  placeholder={labels.commentPlaceholder}
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                />
                <button className="primary_button" type="submit" disabled={!commentDraft.trim()}>
                  {labels.commentButton}
                </button>
              </form>
              <div className="comment_list">
                {comments.length === 0 ? (
                  <p className="comment_empty">{labels.emptyComments}</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="comment_item">
                      <p>{comment.text}</p>
                      <span>{new Intl.DateTimeFormat(language).format(comment.createdAt)}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </>
      )}
      {toastMessage && (
        <div className={`toast ${toastVisible ? "show" : ""}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Movie;
