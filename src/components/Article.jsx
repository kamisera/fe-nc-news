const Article = ({ currentArticle }) => {
  return (
    <>
      <h2>{currentArticle.title}</h2>
      <span className="author-label">Written by</span> {currentArticle.author}
      <p>
        <span className="date-label">Date:</span>{" "}
        {new Date(currentArticle.created_at).toLocaleString()}
      </p>
      <p>{currentArticle.body}</p>
    </>
  );
};

export default Article;
