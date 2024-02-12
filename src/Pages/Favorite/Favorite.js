import React, { useEffect, useState } from 'react';
import { getFavoriteContent } from '../../Utils/Utils';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Favorite.css';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteContent = getFavoriteContent();
    setFavorites(favoriteContent);
  }, []);

  const removeFromFavorites = (id) => {
    setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== id));
  };

  return (
    <div>
      <span className="pageTitle">Your Favorites</span>
      <div className="favorites-container">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <SingleContent
              id={favorite.id}
              poster={favorite.poster}
              title={favorite.title}
              date={favorite.date}
              media_type={favorite.media_type}
              vote_average={favorite.vote_average}
              onRemove={() => removeFromFavorites(favorite.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
