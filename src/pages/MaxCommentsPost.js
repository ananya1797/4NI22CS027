import React, { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '../config';

const MaxCommentsPost = () => {
  const [maxPosts, setMaxPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostCommented = async () => {
      try {
        const usersRes = await fetch("https://20.244.56.144/evaluation-service/users", {
          headers: { Authorization: AUTH_TOKEN }
        });
        const users = await usersRes.json();

        let maxCount = 0;
        let mostCommentedPosts = [];

        for (const user of users) {
          const postsRes = await fetch(`https://20.244.56.144/evaluation-service/users/${user.id}/posts`, {
            headers: { Authorization: AUTH_TOKEN }
          });
          const posts = await postsRes.json();

          for (const post of posts) {
            const commentsRes = await fetch(`https://20.244.56.144/evaluation-service/posts/${post.id}/comments`, {
              headers: { Authorization: AUTH_TOKEN }
            });
            const comments = await commentsRes.json();

            if (comments.length > maxCount) {
              maxCount = comments.length;
              mostCommentedPosts = [{ ...post, comments: comments.length }];
            } else if (comments.length === maxCount) {
              mostCommentedPosts.push({ ...post, comments: comments.length });
            }
          }
        }

        setMaxPosts(mostCommentedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching most commented posts:", error);
        setLoading(false);
      }
    };

    fetchMostCommented();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Most Commented Post(s):</h2>
      {maxPosts.map(post => (
        <div key={post.id} style={{ marginBottom: '15px' }}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <strong>{post.comments} comments</strong>
        </div>
      ))}
    </div>
  );
};

export default MaxCommentsPost;
