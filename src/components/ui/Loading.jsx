import "../../styles/loading.css";

const Loading = ({ name }) => {
  return (
    <>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading {name}...</p>
    </>
  );
};

export default Loading;
