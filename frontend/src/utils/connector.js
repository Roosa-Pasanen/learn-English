const connector = {
  fetchInfo: (callback) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank`)
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },
  putEntry: (callback, wordId, id, name, langId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank`, {
      method: "put",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id,
        name,
        langId,
      }),
    });
  },
};

export default connector;
