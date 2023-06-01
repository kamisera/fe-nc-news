import { Link } from "react-router-dom";
import Loading from "./ui/Loading";
import { capitaliseWord } from "../utils/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchTopics } from "../utils/api";

const Topics = () => {
  const [currentTopics, setCurrentTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopics()
      .then((topics) => setCurrentTopics(topics))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Could not load topics! Please try again later.");
      });
  }, []);

  return (
    <section className="container">
      <h2 className="mb-5">Browse by Topic</h2>
      {!currentTopics && <>No topics</>}
      {isLoading && <Loading name="topics" />}
      {!isLoading && currentTopics.length && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 topics">
          {currentTopics.map((topic, index) => {
            return (
              <article className="col" key={index}>
                <div className="card shadow-sm topic-card">
                  <div className="card-body">
                    <Link
                      to={`/articles?topic=${topic.slug}`}
                      title={
                        `Click here to view articles related to ` +
                        capitaliseWord(topic.slug)
                      }
                    >
                      <p className="card-text p-2">
                        {capitaliseWord(topic.slug)}
                      </p>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Topics;
