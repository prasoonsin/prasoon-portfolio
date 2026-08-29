import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPosts,
  deletePost,
} from "../../services/api";

import "./BlogAdmin.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();

      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError(err.message || "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) return;

    try {
      await deletePost(id);

      setPosts((current) =>
        current.filter((post) => post.id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete post.");
    }
  };

  return (
    <div className="admin-page blog-admin-page">

      {/* HEADER */}
      <div className="admin-page-header blog-admin-header">

        <div>
          <span>BLOG MANAGEMENT</span>
          <h1>Blog Posts</h1>

          <p>
            Create, edit and manage all your portfolio blog posts.
          </p>
        </div>

        <Link
          to="/admin/blogs/create"
          className="admin-primary-button"
        >
          <span>＋</span>
          Create Post
        </Link>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="blog-admin-state">
          <div className="blog-loader"></div>
          <p>Loading blog posts...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="blog-admin-error">
          <strong>Unable to load posts</strong>
          <p>{error}</p>

          <button onClick={loadPosts}>
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && !error && posts.length === 0 && (
        <div className="blog-empty-state">

          <div className="blog-empty-icon">
            📝
          </div>

          <h2>No Blog Posts Yet</h2>

          <p>
            Start writing your first blog post and it will
            automatically appear on your portfolio.
          </p>

          <Link
            to="/admin/blogs/create"
            className="admin-primary-button"
          >
            ＋ Create Your First Post
          </Link>

        </div>
      )}

      {/* POSTS */}
      {!loading && !error && posts.length > 0 && (

        <div className="blog-admin-card">

          <div className="blog-admin-card-top">

            <div>
              <h2>All Posts</h2>

              <span>
                {posts.length}{" "}
                {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            <Link
              to="/admin/blogs/create"
              className="blog-small-create"
            >
              ＋ New Post
            </Link>

          </div>

          <div className="blog-table-wrapper">

            <table className="blog-admin-table">

              <thead>
                <tr>
                  <th>Post</th>
                  <th>Slug</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {posts.map((post) => (

                  <tr key={post.id}>

                    {/* POST */}
                    <td>

                      <div className="blog-post-info">

                        <div className="blog-post-image">

                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                            />
                          ) : (
                            <span>📝</span>
                          )}

                        </div>

                        <div>
                          <strong>
                            {post.title || "Untitled Post"}
                          </strong>

                          {post.excerpt && (
                            <p>
                              {post.excerpt.length > 70
                                ? `${post.excerpt.substring(
                                    0,
                                    70
                                  )}...`
                                : post.excerpt}
                            </p>
                          )}
                        </div>

                      </div>

                    </td>

                    {/* SLUG */}
                    <td>
                      <code>
                        /{post.slug || "no-slug"}
                      </code>
                    </td>

                    {/* CATEGORY */}
                    <td>

                      <span className="blog-category">

                        {post.category_id
                          ? `Category ${post.category_id}`
                          : "Uncategorized"}

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="blog-actions">

                        <Link
                          to={`/admin/blogs/edit/${post.id}`}
                          className="blog-edit-button"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="blog-delete-button"
                          onClick={() =>
                            handleDelete(post.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}

export default Posts;