import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";


const Post = ({ posts, editPost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts ? posts.find(post => post.id === parseInt(id)) : null;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');

  const handleSave = () => {
    editPost(post.id, { ...post, title, content });
    setIsEditing(false);
  };

  if (!post) return <div>Post no encontrado</div>;

  return (
    <div className="container">
        <button onClick={() => navigate(-1)}>Back <IoArrowBack />
</button>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="save" onClick={handleSave}>Guardar</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.content}</p>
          <button onClick={() => setIsEditing(true)}>Editar <MdOutlineModeEdit />
</button>
        </div>
      )}
      
    </div>

    
  );
};

export default Post;
