import React, { useState, useEffect } from 'react';
import { fetchFavoritesFromAPI, toggleFavoriteAPI } from '../../Utils/Utils';
import Favorite from '../../Pages/Favorite/Favorite';


const ParentComponent = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from the API when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await fetchFavoritesFromAPI();
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Function to toggle the favorite status of an item
  const toggleFavorite = async (id) => {
    try {
      // Toggle the favorite status of the item in the API
      await toggleFavoriteAPI(id);
      
      // Update the favorite status locally
      const updatedFavorites = favorites.map(item => {
        if (item.id === id) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div>
      {/* Pass the list of favorites and the toggleFavorite function to the Favorite component */}
      <Favorite favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default ParentComponent;
