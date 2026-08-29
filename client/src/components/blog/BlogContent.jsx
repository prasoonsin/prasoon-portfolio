function BlogContent({ post }) {
  if (!post) {
    return (
      <section className="blog-content">
        <div className="blog-content-container">
          <p className="blog-not-found">
            Article not found.
          </p>
        </div>
      </section>
    );
  }

  const category =
    post.category?.name ||
    post.category ||
    "Development";

  const date =
    post.date ||
    (post.created_at
      ? new Date(post.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "");

  const readTime =
    post.readTime ||
    post.read_time ||
    "5 min read";

  const content = post.content || "";

  return (
    <section className="blog-content">
      <div className="blog-content-container">

        {/* Category */}
        <span className="blog-category">
          {category}
        </span>

        {/* Title */}
        <h1>{post.title}</h1>

        {/* Meta Information */}
        <div className="blog-post-meta">

          {date && (
            <span>{date}</span>
          )}

          {date && readTime && (
            <span>•</span>
          )}

          {readTime && (
            <span>{readTime}</span>
          )}

        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="blog-post-image">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="blog-article">

          {content ? (
            content.split("\n").map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>
                  {paragraph}
                </p>
              )
            ))
          ) : (
            <p>
              This article does not have any content yet.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}

export default BlogContent;