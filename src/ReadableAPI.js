import axios from 'axios';
const api = 'http://localhost:5001/';

let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getPosts = () =>
  axios.get(`${api}posts`, { headers });
    // .then(res => res.json());
    // .then(data => data.books);

export const getCategories = () =>
  fetch(`${api}categories`, { headers })
    .then(res => res.json());

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query, maxResults })
//   }).then(res => res.json())
//     .then(data => data.books)
