// Utils.js

// Retrieve favorited content from localStorage
export const getFavoriteContent = () => {
  const favorites = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('favorite_')) {
      const content = JSON.parse(localStorage.getItem(key));
      favorites.push(content);
    }
  }
  return favorites;
};

// Remove favorited content from localStorage
export const removeFavoriteContent = (id) => {
  localStorage.removeItem(`favorite_${id}`);
};
