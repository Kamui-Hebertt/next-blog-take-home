export const getPosts = async () => {
  try {
    const res = await fetch('http://localhost:3001/posts');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
};