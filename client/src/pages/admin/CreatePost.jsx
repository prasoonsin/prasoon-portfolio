import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createPost,
} from "../../services/api";

import "./BlogAdmin.css";

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image_url: "",
    category: "",
    published: 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // ==========================================
  // CREATE POST
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createPost({
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt,
        image_url: form.image_url,
        category: form.category,
        published: Number(form.published),
      });

      navigate("/admin/blogs");

    } catch (err) {
      console.error("Create post error:", err);

      setError(
        err.message || "Failed to create post."
      );
    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="admin-page blog-editor-page">

      {/* HEADER */}

      <div className="admin-page-header blog-admin-header">

        <div>

          <span>BLOG MANAGEMENT</span>

          <h1>Create Post</h1>

          <p>
            Create a new blog post for your portfolio.
          </p>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="blog-form-error">
          {error}
        </div>
      )}


      {/* FORM */}

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
              value={form.title}
              onChange={handleChange}
              placeholder="Enter post title"
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
              value={form.slug}
              onChange={handleChange}
              placeholder="my-first-blog-post"
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
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Short description of the post..."
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
              value={form.content}
              onChange={handleChange}
              placeholder="Write your blog content..."
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
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />

            {form.image_url && (
              <div className="blog-image-preview">

                <img
                  src={form.image_url}
                  alt="Preview"
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
              value={form.category}
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
              value={form.published}
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
                ? "Creating..."
                : "Create Post"}
            </button>

          </div>

        </aside>

      </form>

    </div>
  );
}

export default CreatePost;