import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../../services/api";

function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD COMMENTS
  // =====================================================

  const loadComments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getComments();

      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadComments();
  }, []);

  // =====================================================
  // DELETE COMMENT
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      await deleteComment(id);

      setComments((current) =>
        current.filter((comment) => comment.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment.");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-page-header">

        <div>
          <span>BLOG</span>

          <h2>Comments</h2>

          <p className="admin-page-description">
            Manage comments submitted on your blog posts.
          </p>
        </div>

        <button
          className="admin-secondary-button"
          onClick={loadComments}
          disabled={loading}
        >
          ↻ Refresh
        </button>

      </div>


      {/* =================================================
          STATS
      ================================================= */}

      {!loading && !error && (
        <div className="admin-stats-row">

          <div className="admin-mini-card">
            <span>Total Comments</span>

            <strong>
              {comments.length}
            </strong>
          </div>


          <div className="admin-mini-card">
            <span>Status</span>

            <strong>
              Active
            </strong>
          </div>

        </div>
      )}


      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="admin-state-card">

          <div className="admin-loader"></div>

          <p>
            Loading comments...
          </p>

        </div>
      )}


      {/* =================================================
          ERROR
      ================================================= */}

      {!loading && error && (
        <div className="admin-state-card admin-error-card">

          <strong>
            Something went wrong
          </strong>

          <p>
            {error}
          </p>

          <button
            className="admin-primary-button"
            onClick={loadComments}
          >
            Try Again
          </button>

        </div>
      )}


      {/* =================================================
          EMPTY
      ================================================= */}

      {!loading &&
        !error &&
        comments.length === 0 && (
          <div className="admin-state-card">

            <div className="admin-empty-icon">
              💬
            </div>

            <h3>
              No comments yet
            </h3>

            <p>
              Comments submitted on your blog will appear
              here.
            </p>

          </div>
        )}


      {/* =================================================
          COMMENTS TABLE
      ================================================= */}

      {!loading &&
        !error &&
        comments.length > 0 && (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Commenter</th>
                  <th>Email</th>
                  <th>Blog</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {comments.map((comment) => (

                  <tr key={comment.id}>

                    {/* ===================================
                        NAME
                    =================================== */}

                    <td>

                      <div className="admin-user-cell">

                        <div className="admin-avatar">
                          {(comment.name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>


                        <div>

                          <strong>
                            {comment.name || "Anonymous"}
                          </strong>

                          <small>
                            Comment #{comment.id}
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* ===================================
                        EMAIL
                    =================================== */}

                    <td>
                      {comment.email || "—"}
                    </td>


                    {/* ===================================
                        BLOG
                    =================================== */}

                    <td>

                      <span className="admin-badge">
                        Blog #{comment.blog_id}
                      </span>

                    </td>


                    {/* ===================================
                        COMMENT
                    =================================== */}

                    <td>

                      <div className="admin-comment-text">

                        {/* FIX:
                            Backend uses "comment",
                            not "content".
                        */}

                        {comment.comment || "—"}

                      </div>

                    </td>


                    {/* ===================================
                        DELETE
                    =================================== */}

                    <td>

                      <button
                        className="admin-delete-button"
                        onClick={() =>
                          handleDelete(comment.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

    </div>
  );
}

export default Comments;