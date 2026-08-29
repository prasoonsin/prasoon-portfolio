import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getBlogById,
  getBlogs,
} from "../services/api";

import BlogContent from "../components/blog/BlogContent";
import Comments from "../components/blog/Comments";
import RelatedPosts from "../components/blog/RelatedPosts";

function BlogPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");

        // Get the current blog post
        const postData = await getBlogById(id);

        setPost(postData);

        // Get all blog posts
        const allPosts = await getBlogs();

        // Make sure we have an array
        const postsArray = Array.isArray(allPosts)
          ? allPosts
          : [];

        // Remove the current post
        const otherPosts = postsArray.filter(
          (blog) => blog.id !== postData.id
        );

        // Keep related posts
        setRelatedPosts(otherPosts);

      } catch (err) {
        console.error("Blog post error:", err);

        setError(
          err.message || "Failed to load article."
        );

      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="blog-content">
        <p>Loading article...</p>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !post) {
    return (
      <section className="blog-content">
        <p>
          {error || "Article not found."}
        </p>
      </section>
    );
  }

  // =====================================================
  // BLOG POST
  // =====================================================

  return (
    <>
      {/* Main Blog Article */}
      <BlogContent post={post} />

      {/* Comments */}
      <Comments blogId={post.id} />

      {/* Related Articles */}
      <RelatedPosts
        posts={relatedPosts}
        currentPostId={post.id}
      />
    </>
  );
}

export default BlogPost;