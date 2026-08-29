import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPostById,
  updatePost,
} from "../../services/api";

import "./BlogAdmin.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD POST
  // ==========================================

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(id);

        setPost(data);

      } catch (err) {
        console.error("Load post error:", err);

        setError(
          err.message || "Failed to load post."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // ==========================================
  // UPDATE POST
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updatePost(id, {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        image_url: post.image_url,
        category: post.category,
        published: Number(post.published) || 0,
        published_at: post.published_at || null,
      });

      navigate("/admin/blogs");

    } catch (err) {
      console.error("Update post error:", err);

      setError(
        err.message || "Failed to update post."
      );
    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-page blog-admin-state">

        <div className="blog-loader"></div>

        <p>Loading post...</p>

      </div>
    );
  }


  // ==========================================
  // POST NOT FOUND
  // ==========================================

  if (!post) {
    return (
      <div className="admin-page">

        <div className="blog-admin-error">

          <strong>
            Post not found
          </strong>

          <p>
            The requested blog post could not be found.
          </p>

          <button
            onClick={() =>
              navigate("/admin/blogs")
            }
          >
            Back to Posts
          </button>

        </div>

      </div>
    );
  }


  // ==========================================
  // EDIT FORM
  // ==========================================

  return (
    <div className="admin-page blog-editor-page">

      {/* HEADER */}

      <div className="admin-page-header blog-admin-header">

        <div>

          <span>BLOG MANAGEMENT</span>

          <h1>Edit Post</h1>

          <p>
            Update your blog post and save the changes.
          </p>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="blog-form-error">
          {error}
        </div>
      )}


      <form
        className="blog-editor-form"
        onSubmit={handleSubmit}
      >

        <div className="blog-editor-main">

          {/* TITLE */}

          <div className="blog-form-card">

            <label>
              Post Title
            </label>

            <input
              type="text"
              name="title"
              value={post.title || ""}
              onChange={handleChange}
              required
            />

          </div>


          {/* SLUG */}

          <div className="blog-form-card">

            <label>
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={post.slug || ""}
              onChange={handleChange}
              required
            />

          </div>


          {/* EXCERPT */}

          <div className="blog-form-card">

            <label>
              Excerpt
            </label>

            <textarea
              name="excerpt"
              value={post.excerpt || ""}
              onChange={handleChange}
              rows="4"
            />

          </div>


          {/* CONTENT */}

          <div className="blog-form-card">

            <label>
              Content
            </label>

            <textarea
              name="content"
              value={post.content || ""}
              onChange={handleChange}
              rows="16"
              required
            />

          </div>

        </div>


        {/* SIDEBAR */}

        <aside className="blog-editor-sidebar">

          {/* IMAGE */}

          <div className="blog-form-card">

            <label>
              Cover Image
            </label>

            <input
              type="url"
              name="image_url"
              value={post.image_url || ""}
              onChange={handleChange}
              placeholder="https://..."
            />

            {post.image_url && (
              <div className="blog-image-preview">

                <img
                  src={post.image_url}
                  alt={post.title || "Post"}
                />

              </div>
            )}

          </div>


          {/* CATEGORY */}

          <div className="blog-form-card">

            <label>
              Category
            </label>

            <input
              type="text"
              name="category"
              value={post.category || ""}
              onChange={handleChange}
              placeholder="Technology"
            />

          </div>


          {/* PUBLISHED */}

          <div className="blog-form-card">

            <label>
              Published
            </label>

            <select
              name="published"
              value={post.published || 0}
              onChange={handleChange}
            >

              <option value="0">
                Draft
              </option>

              <option value="1">
                Published
              </option>

            </select>

          </div>


          {/* ACTIONS */}

          <div className="blog-form-actions">

            <button
              type="button"
              className="blog-cancel-button"
              onClick={() =>
                navigate("/admin/blogs")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="blog-save-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </aside>

      </form>

    </div>
  );
}

export default EditPost;