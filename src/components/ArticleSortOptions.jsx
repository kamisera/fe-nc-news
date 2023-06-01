import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ArticleSortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", sortOrder);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  }, [sortBy, sortOrder]);

  return (
    <div className="row form-group mb-4 pb-4 mt-4 pt-4 border-top border-bottom justify-content-center">
      <div className="col-sm-2">
        <div className="input-group">
          <label htmlFor="sort-by" className="input-group-text">
            Sort By
          </label>
          <select
            name="sort-by"
            id="sort-by"
            className="form-select"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value=""></option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comment Count</option>
          </select>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="input-group">
          <label htmlFor="sort-order" className="input-group-text">
            Order
          </label>
          <select
            name="sort-order"
            id="sort-order"
            className="form-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleSortOptions;
