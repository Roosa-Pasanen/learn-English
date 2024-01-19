/**
 * Connector object for making requests to backend
 */
const connector = {
  /**
   * Function for sending fetch requests
   *
   * Retreives information from the database and returns it in a callback
   *
   * @param {function} callback Callback function
   */
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
  /**
   * Function for sending put requests
   *
   * Used for updating existing information in the database
   * Returns response status in callback
   *
   * @param {function} callback - Callback function
   * @param {number} id - ID of the item in need of updating
   * @param {string} name - (New) name of the item in need of updating
   * @param {string} add - Address extention
   */
  putEntry: (callback, id, name, add) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/${add}/${id}`, {
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
  /**
   * Function for sending pair delete requests
   *
   * Used for severing the link between two items in the database
   * Returns response status in callback
   *
   * @param {function} callback - Callback function
   * @param {number} id1 - ID of the first item to be deleted
   * @param {number} id2 - ID of the second item to be deleted
   * @param {string} add - Address extention
   */
  deleteEntry: (callback, id1, id2, add) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/${add}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id1,
        id2,
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
  /**
   * Function for posting new "word" items to the database
   *
   * Used for posting new items and creating a link between them
   * Returns the response status in a callback
   *
   * @param {function} callback - Callback function
   * @param {string} name1 - Name of the first new object
   * @param {number} langId1 - LanguageID of the first new object
   * @param {string} name2 - Name of the second new object
   * @param {number} langId2 - LanguageID of the second new object
   */
  postWord: (callback, name1, langId1, name2, langId2) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/wordbank/word`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name1,
        langId1,
        name2,
        langId2,
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
