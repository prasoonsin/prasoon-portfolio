import { useEffect, useState } from "react";
import { getContacts } from "../../services/api";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getContacts();

      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="admin-page">

      {/* PAGE HEADER */}
      <div className="admin-page-header">

        <div>
          <span>CONTACT</span>

          <h2>Messages</h2>

          <p className="admin-page-description">
            Messages and enquiries received through your portfolio.
          </p>
        </div>

        <button
          className="admin-secondary-button"
          onClick={loadMessages}
          disabled={loading}
        >
          ↻ Refresh
        </button>

      </div>


      {/* STATS */}
      {!loading && !error && (
        <div className="admin-stats-row">

          <div className="admin-mini-card">
            <span>Total Messages</span>
            <strong>{messages.length}</strong>
          </div>

          <div className="admin-mini-card">
            <span>Status</span>
            <strong>Active</strong>
          </div>

        </div>
      )}


      {/* LOADING */}
      {loading && (
        <div className="admin-state-card">

          <div className="admin-loader"></div>

          <p>Loading messages...</p>

        </div>
      )}


      {/* ERROR */}
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
            onClick={loadMessages}
          >
            Try Again
          </button>

        </div>
      )}


      {/* EMPTY */}
      {!loading && !error && messages.length === 0 && (
        <div className="admin-state-card">

          <div className="admin-empty-icon">
            ✉
          </div>

          <h3>
            No messages yet
          </h3>

          <p>
            Messages submitted through your contact
            form will appear here.
          </p>

        </div>
      )}


      {/* MESSAGES TABLE */}
      {!loading && !error && messages.length > 0 && (
        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>

              <tr>
                <th>Sender</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {messages.map((message) => (

                <tr key={message.id}>

                  {/* SENDER */}
                  <td>

                    <div className="admin-user-cell">

                      <div className="admin-avatar">
                        {(message.name || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <strong>
                          {message.name || "Unknown"}
                        </strong>

                        <small>
                          Message #{message.id}
                        </small>

                      </div>

                    </div>

                  </td>


                  {/* EMAIL */}
                  <td>

                    {message.email ? (
                      <a
                        href={`mailto:${message.email}`}
                        className="admin-email-link"
                      >
                        {message.email}
                      </a>
                    ) : (
                      "—"
                    )}

                  </td>


                  {/* SUBJECT */}
                  <td>

                    <strong className="admin-subject">
                      {message.subject || "No subject"}
                    </strong>

                  </td>


                  {/* MESSAGE */}
                  <td>

                    <div className="admin-comment-text">
                      {message.message || "—"}
                    </div>

                  </td>


                  {/* ACTION */}
                  <td>

                    {message.email && (
                      <a
                        href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(
                          message.subject || "Your message"
                        )}`}
                        className="admin-action-button"
                      >
                        Reply
                      </a>
                    )}

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

export default Messages;