import $ from 'jquery';
import './index.css';
import store from './store';
import api from './api';
import bookmarkList from './bookmark-list';

function main() {
  console.log('DOM is loaded you got this Jake');
  bookmarkList.bindEventListeners();
  api.getBookmarks().then((bookmarks) => {
    bookmarks.forEach((bookmark) => {
      store.addBookmark(bookmark);
    });
    bookmarkList.render();
  });
}

$(main);
