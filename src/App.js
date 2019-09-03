import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const APP_ID = '3bb7a0e0';
  const APP_KEY = '09008f4d0b912d1ab8e7f0c0a42e7fc2';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" value={search} type="text" onChange={updateSearch}></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(data => (
        <Recipe key={data.recipe.label} title={data.recipe.label} calories={data.recipe.calories} image={data.recipe.image} ingredients={data.recipe.ingredients} />
      ))}
    </div>
  );
}

export default App;
