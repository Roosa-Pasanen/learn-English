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
  putEntry: (callback, id, name, type) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/${type}`, {
      method: "put",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id,
        name,
      }),
    });
  },
};

export default connector;
