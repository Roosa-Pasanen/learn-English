const connector = {
  fetchInfo: () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default connector;
