import { useState, useEffect } from 'react';

const Blog = ({blog, loggedInUser, updateLikesHandler, deleteBlogHandler}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [sameUser, setSameUser] = useState(true);

  const hideWhenDetailsVisible = { display: showDetails ? 'none' : '' }
  const showWhenDetailsVisible = { display: showDetails ? '' : 'none' }

  const deleteButtonVisible = { display: sameUser ? '' : 'none' }

  //Used when component is rendered for the first time
  useEffect(() => {
    console.log('Blog user: ' + blog.user.username + ' & logged in user ' + loggedInUser.username);
    if (blog.user.username === loggedInUser.username) {
      setSameUser(true);
    } else {
      setSameUser(false);
    }
  }, [blog.user.username, loggedInUser.username] );

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };


  const updateLikes = () => {
    const updatedBlog = {...blog, likes: blog.likes+1};

    updateLikesHandler(updatedBlog);
  }

  const deleteBlog = () => {
    deleteBlogHandler(blog.id);
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenDetailsVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>View</button>
      </div>
      <div style={showWhenDetailsVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes} <button onClick={updateLikes}>Like</button>
        </div>
        <div>
          {blog.user.name} <button style={deleteButtonVisible} onClick={deleteBlog}>Delete</button>
        </div>
      </div>
  </div>
)};

export default Blog