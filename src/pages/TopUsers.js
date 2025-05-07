import React, { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '../config';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const usersRes = await fetch("https://20.244.56.144/evaluation-service/users", {
          headers: { Authorization: AUTH_TOKEN }
        });
        const users = await usersRes.json();

        const userCommentCounts = await Promise.all(users.map(async (user) => {
          const postsRes = await fetch(`https://20.244.56.144/evaluation-service/users/${user.id}/posts`, {
            headers: { Authorization: AUTH_TOKEN }
          });
          const posts = await postsRes.json();

          let commentCount = 0;
          for (const post of posts) {
            const commentsRes = await fetch(`https://20.244.56.144/evaluation-service/posts/${post.id}/comments`, {
              headers: { Authorization: AUTH_TOKEN }
            });
            const comments = await commentsRes.json();
            commentCount += comments.length;
          }

          return { ...user, totalComments: commentCount };
        }));

        const sortedUsers = userCommentCounts
          .sort((a, b) => b.totalComments - a.totalComments)
          .slice(0, 5);

        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top users:", error);
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Top 5 Users by Comments</h2>
      <ul>
        {topUsers.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.totalComments} comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
