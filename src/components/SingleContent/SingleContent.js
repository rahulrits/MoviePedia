// SingleContent.js

import React, { useState, useEffect } from 'react';
import { Badge } from '@material-ui/core';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './SingleContent.css';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  onRemove, // Callback function to remove the favorite
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false); // State to track removal animation

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${id}`);
    setIsFavorite(!!storedFavorite);
  }, [id]);

  const handleClick = (event) => {
    event.stopPropagation();

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    if (newFavoriteStatus) {
      localStorage.setItem(`favorite_${id}`, JSON.stringify({ id, poster, title, date, media_type, vote_average }));
    } else {
      setIsRemoving(true); // Trigger removal animation
      setTimeout(() => {
        localStorage.removeItem(`favorite_${id}`);
        onRemove(id);
      }, 300); // Wait for the animation to finish before removing
    }
  };

  return (
    <ContentModal media_type={media_type} id={id} className={`singleContent ${isRemoving ? 'removing' : ''}`}>
      <FavoriteIcon
        className={`favoriteIcon ${isFavorite ? 'favorited' : ''}`}
        onClick={handleClick}
      />
      <Badge
        badgeContent={vote_average.toFixed(1)}
        color={vote_average > 7 ? 'primary' : 'secondary'}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === 'tv' ? 'TV Series' : 'Movie'}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
