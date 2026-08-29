function BlogCard({ post }) {
  const description = post.excerpt || post.description || "";

  return (
    <article className="blog-card">

      {/* Blog Image */}
      <div className="blog-card-image">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
          />
        ) : (
          <div className="blog-image-placeholder">
            Blog
          </div>
        )}
      </div>

      {/* Blog Information */}
      <div className="blog-card-content">

        {/* Category */}
        {post.category && (
          <span className="blog-category">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h3>{post.title}</h3>

        {/* Description */}
        {description && (
          <p className="blog-description">
            {description}
          </p>
        )}

        {/* Meta Information */}
        <div className="blog-card-meta">

          {post.date && (
            <span>{post.date}</span>
          )}

          <span>
            {post.readTime || "5 min read"}
          </span>

        </div>

        {/* Read Button */}
        <button
          type="button"
          className="read-more"
          onClick={() => {
            if (post.id) {
              window.location.href = `/blog/${post.id}`;
            }
          }}
        >
          Read Article →
        </button>

      </div>

    </article>
  );
}

export default BlogCard;