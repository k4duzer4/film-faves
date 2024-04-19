/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { NavbarContainer } from "./NavbarStyles";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      const response = await axios.get(`search/movie?query=${search}`);
      navigate(`/search?q=${search}`, { replace: true });
      setSearch("");
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  return (
    <NavbarContainer scrolled={scrolled}>
      <h2>
        <Link to="/">
          <img src="/favicon.ico" alt="" />FilmeFaves
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque o seu filme!"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BsSearch />
        </button>
      </form>
    </NavbarContainer>
  );
};

export default Navbar;
