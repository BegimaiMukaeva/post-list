import React, { useRef } from 'react';
import { postsApi } from '../../services/posts'; 
import { useGetPostsQuery } from '../../services/posts'; 
import { useVirtualizer } from '@tanstack/react-virtual';
import { Post } from '../../types'; 
import { Link } from 'react-router-dom';
import styles from './PostsList.module.css';

const PostsList = () => {
    const parentRef = useRef(null);
    const { data: posts = [], isLoading, isError, error } = useGetPostsQuery();
  
  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
  });

  const truncateText = (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  if (isLoading) return <div className={styles.loading}>Loading posts...</div>;
  if (isError) return <div className={styles.error}>Error: {error?.toString()}</div>;

  return (
    <div ref={parentRef} className={styles.postsListContainer}>
      <div className={styles.postsList}>
        {rowVirtualizer.getVirtualItems().map(virtualItem => {
          const post = posts[virtualItem.index] as Post;
          return (
            <div
              key={post.id}
              className={styles.postItem}
              style={{ top: `${virtualItem.start}px` }}
            >
              <div className={styles.postContent}>
                <div className={styles.postList}>
                  {virtualItem.index + 1}: {post.title} - {truncateText(post.body, 30)}
                </div>
                <Link to={`/posts/${post.id}`} className={styles.viewLink}>Просмотр</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsList;
