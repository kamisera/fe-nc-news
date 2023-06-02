const RequestError = ({ errorMsg }) => {
  return (
    <>
      <h2>⚠️ OOPS ⚠️</h2>
      <p>{errorMsg}</p>
    </>
  );
};

export default RequestError;
