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
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/${type}/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id,
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },
  deleteEntry: (callback, id, type) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/${type}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },
  postWord: (callback, name, langId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/word`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name,
        langId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },
};

export default connector;
