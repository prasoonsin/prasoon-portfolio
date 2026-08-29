import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Comments({ blogId }) {
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // FETCH COMMENTS
  // =====================================================

  useEffect(() => {
    const fetchComments = async () => {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/comments/blog/${blogId}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load comments."
          );
        }

        const data = Array.isArray(result)
          ? result
          : result.data || [];

        setComments(data);
      } catch (err) {
        console.error("Comments API Error:", err);

        setError(
          err.message || "Unable to load comments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  // =====================================================
  // SUBMIT COMMENT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check blog ID
    if (!blogId) {
      setError("Unable to identify this article.");
      return;
    }

    // Check form fields
    if (
      !name.trim() ||
      !email.trim() ||
      !comment.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/comments`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            blog_id: blogId,
            name: name.trim(),
            email: email.trim(),

            // IMPORTANT:
            // Backend expects "comment"
            comment: comment.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to post comment."
        );
      }

      // =================================================
      // ADD NEW COMMENT TO UI
      // =================================================

      const newComment = result.data;

      if (newComment) {
        setComments((previousComments) => [
          newComment,
          ...previousComments,
        ]);
      }

      // Clear form
      setName("");
      setEmail("");
      setComment("");

      // Success message
      setSuccess(
        "Your comment has been posted successfully."
      );
    } catch (err) {
      console.error("Comment API Error:", err);

      setError(
        err.message || "Unable to post comment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="comments">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="comments-header">

        <h3>Comments</h3>

        <p>
          Share your thoughts about this article.
        </p>

      </div>


      {/* =================================================
          EXISTING COMMENTS
      ================================================= */}

      <div className="comments-list">

        {/* Loading */}
        {loading && (
          <p className="comments-message">
            Loading comments...
          </p>
        )}


        {/* Error while loading */}
        {!loading &&
          error &&
          comments.length === 0 && (
            <p className="comments-message">
              {error}
            </p>
          )}


        {/* No comments */}
        {!loading &&
          !error &&
          comments.length === 0 && (
            <p className="comments-message">
              No comments yet. Be the first to comment.
            </p>
          )}


        {/* Comments */}
        {!loading &&
          comments.length > 0 &&
          comments.map((item) => (
            <article
              className="comment-item"
              key={item.id}
            >

              {/* Comment Header */}
              <div className="comment-header">

                <strong>
                  {item.name}
                </strong>

                {item.created_at && (
                  <span>
                    {new Date(
                      item.created_at
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                )}

              </div>


              {/* Comment Text */}

              <p>
                {item.comment || item.content}
              </p>

            </article>
          ))}

      </div>


      {/* =================================================
          COMMENT FORM
      ================================================= */}

      <form
        className="comment-form"
        onSubmit={handleSubmit}
      >

        {/* =================================================
            NAME
        ================================================= */}

        <div className="form-group">

          <label htmlFor="comment-name">
            Name
          </label>

          <input
            id="comment-name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

        </div>


        {/* =================================================
            EMAIL
        ================================================= */}

        <div className="form-group">

          <label htmlFor="comment-email">
            Email
          </label>

          <input
            id="comment-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

        </div>


        {/* =================================================
            COMMENT
        ================================================= */}

        <div className="form-group">

          <label htmlFor="comment-text">
            Comment
          </label>

          <textarea
            id="comment-text"
            rows="5"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            required
          />

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <p className="comment-error">
            {error}
          </p>
        )}


        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <p className="comment-success">
            {success}
          </p>
        )}


        {/* =================================================
            SUBMIT BUTTON
        ================================================= */}

        <button
          type="submit"
          className="comment-submit"
          disabled={submitting}
        >
          {submitting
            ? "Posting..."
            : "Post Comment"}
        </button>

      </form>

    </section>
  );
}

export default Comments;