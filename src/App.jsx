import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Post from './components/Post';
import NewPost from './components/NewPost';
import Filter from './components/Filter';
import { MdFolderDelete } from "react-icons/md";

const App = () => {
  const getInitialPosts = () => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [
      { id: 1, title: 'Nuevo Álbum de Martin Garrix', date: '2024-05-01', content: 'Martin Garrix lanza su nuevo álbum lleno de colaboraciones sorprendentes.', imageUrl: 'https://festivalesmexico.com/wp-content/uploads/2023/02/martin-garrix-galantis-edc-mexico.png' },
      { id: 2, title: 'Ultra Music Festival 2024', date: '2024-05-15', content: 'El Ultra Music Festival 2024 promete ser el evento del año con actuaciones de los mejores DJs del mundo.', imageUrl: 'https://umfworldwide.com/wp-content/uploads/2024/02/SP9_02.jpeg' },
      { id: 3, title: 'Lanzamiento de Single de Tiësto', date: '2024-06-01', content: 'Tiësto sorprende a sus fans con un nuevo single lleno de energía.', imageUrl: 'https://mrindie.com/wp-content/uploads/2023/02/tiesto.jpeg' },
      { id: 4, title: 'Entrevista Exclusiva con Armin van Buuren', date: '2024-06-10', content: 'Armin van Buuren comparte detalles sobre su próxima gira mundial.', imageUrl: 'https://www.elsoldemexico.com.mx/gossip/celebridades/na5iep-armin-van-buuren-1-by-floris-heuer-2.jpg/ALTERNATES/LANDSCAPE_1140/ARMIN%20VAN%20BUUREN%201%20BY%20FLORIS%20HEUER%20(2).jpg' },
      { id: 5, title: 'Festival Tomorrowland 2024', date: '2024-07-20', content: 'Tomorrowland 2024 promete ser un festival inolvidable con un lineup impresionante.', imageUrl: 'https://cdn.uc.assets.prezly.com/66ced186-0a7b-44d6-9702-e7792b00b8f3/-/resize/1108x/-/quality/best/-/format/auto/' },
      { id: 6, title: 'Colaboración entre David Guetta y Calvin Harris', date: '2024-08-15', content: 'David Guetta y Calvin Harris lanzan una colaboración épica que ya está rompiendo récords.', imageUrl: 'https://www.rollingstone.co.uk/wp-content/uploads/sites/2/2021/11/Calvin_Harris-davidguetta-creamfieldssouth-2000x1270-1.jpg' },
    ];
  };

  const [posts, setPosts] = useState(getInitialPosts);
  const [filteredPosts, setFilteredPosts] = useState(getInitialPosts);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (title, content, imageUrl) => {
    const newPost = {
      id: posts.length + 1,
      title,
      date: new Date().toISOString().split('T')[0],
      content,
      imageUrl,
    };
    setPosts([...posts, newPost]);
    setFilteredPosts([...posts, newPost]);
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const editPost = (id, updatedPost) => {
    const updatedPosts = posts.map(post => (post.id === id ? updatedPost : post));
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const filterPosts = (date) => {
    const filtered = posts.filter(post => post.date === date);
    setFilteredPosts(filtered);
  };

  const showAllPosts = () => {
    setFilteredPosts(posts);
  };

  return (
    <Router>
      <div>
          <div className='header'>
          <img className="logo" src="https://images.fineartamerica.com/images/artworkimages/medium/3/4-avicii-ad-ie-transparent.png" alt="img" />
          <h1>ÁTOMO EDM en Movimiento</h1>
          <img className="audio-wave" src="https://nowmusicradio.com/wp-content/uploads/2019/05/ondas-de-audio.gif" alt="Audio Wave" />
          
          <div className='navigate'>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/new-post">Nueva Entrada</Link>
          </nav>
          </div>
          
          </div>

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<PostList posts={filteredPosts} deletePost={deletePost} filterPosts={filterPosts} showAllPosts={showAllPosts} />}
            />
            <Route
              path="/posts/:id"
              element={<Post posts={posts} editPost={editPost} />}
            />
            <Route
              path="/new-post"
              element={<NewPost addPost={addPost} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const PostList = ({ posts, deletePost, filterPosts, showAllPosts }) => {
  return (
    <div>
      <h1>Noticias ATÓMICAS</h1>
      <p>Sumérgete en la música electrónica en su forma más pura. Aquí encontrarás reseñas de las canciones y álbumes más destacados, así como recomendaciones exclusivas para expandir tu biblioteca musical electrónica.</p>
      <Filter filterPosts={filterPosts} showAllPosts={showAllPosts} />
      {posts.map(post => (
        <div className="post" key={post.id}>
          <h2><Link to={`/posts/${post.id}`} className="link-button">{post.title}</Link></h2>
          <p>{post.date}</p>
          <img src={post.imageUrl} alt={post.title} style={{ width: '400px', height: '300px', objectFit: 'cover' }} />
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>Eliminar <MdFolderDelete /></button>
        </div>
      ))}
    </div>
  );
};

export default App;
