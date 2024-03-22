import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { postsApi } from '../../services/posts'; 
import styles from './PostDetail.module.css';

const PostDetail = () => {
    const { id } = useParams<{ id: string }>(); 
    if (!id) {
      return <div>Post ID is required.</div>;
    }
    const { data: post, isLoading, isError } = postsApi.endpoints.getPostById.useQuery(id);
    
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (isError) return <div className={styles.error}>Error</div>;

    if (!post) return <div className={styles.notFound}>Post not found</div>;

  return (
    <div className={styles.postDetail}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.body}>{post.body}</p>
      <Link to="/" className={styles.backLink}>Назад</Link> 
    </div>
  );
};

export default PostDetail;
