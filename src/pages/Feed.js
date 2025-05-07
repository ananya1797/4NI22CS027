import React, { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '../config';

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const usersRes = await fetch("https://20.244.56.144/evaluation-service/users", {
          headers: { Authorization: AUTH_TOKEN }
        });
        const users = await usersRes.json();

        let allPosts = [];

        for (const user of users) {
          const postsRes = await fetch(`https://20.244.56.144/evaluation-service/users/${user.id}/posts`, {
            headers: { Authorization: AUTH_TOKEN }
          });
          const posts = await postsRes.json();

          allPosts = [...allPosts, ...posts];
        }

        setFeedPosts(allPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error loading feed:", error);
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) return <div>Loading feed...</div>;

  return (
    <div>
      <h2>Feed</h2>
      {feedPosts.map(post => (
        <div key={post.id} style={{ marginBottom: '15px' }}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
