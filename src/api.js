const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jake';

const getBookmarks = function () {
  return bookmarkApiFetch(`${BASE_URL}/bookmarks`);
};

const postBookmarks = function (object) {
  return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: object,
  });
};

const deleteBookmark = function (id) {
  return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
};

function bookmarkApiFetch(...args) {
  let error;
  return fetch(...args)
    .then((response) => {
      if (!response.ok) {
        error = { code: response.status };
      }

      return response.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
}

export default {
  getBookmarks,
  postBookmarks,
  deleteBookmark,
};
