import $ from 'jquery';
import api from './api';
import store from './store';

// ***********       GENERATOR FUNCTIONS      ************** //

const generateBookmarkElement = function (bookmark) {
  console.log('generating bookmark');

  return `
  <li class="js-bookmark-list-element" id="${bookmark.id}">
          <div class="bookmark-info">
            <p class="bookmark-name">${bookmark.title}</p>
            <div class="listing-rating-info">
              <p>Rating:</p>
              <p class="rating-total">${
                bookmark.rating === null ? 'No rating yet' : bookmark.rating
              }</p>
            </div>
            <div class="bookmark-listing-options">
              <button class="view-bookmark-details">
                View Details
              </button>
            </div>
          </div>
          <div class="bookmark-details"></div>
        </li>
  `;
};

const generateBookmarkDetailed = function (bookmark) {
  console.log('generating detailed bookmark');
  return `<li class="js-bookmark-list-element" id="${bookmark.id}">
   <div class="bookmark-info">
     <p class="bookmark-name">${bookmark.title}</p>
     
     <div class="bookmark-listing-options">
       <button class="view-bookmark-details">
         View Details
       </button>
     </div>
   </div>
   <div class="bookmark-details">
   <div class="bookmark-details-header">
  <button class="visit-site-url"><a href="${
    bookmark.url
  }">Visit Site</a></button>
  <div class="listing-rating-info">
    <p>Rating:</p>
    <p class="rating-total">${
      bookmark.rating === null ? 'No rating yet' : bookmark.rating
    }</p>
  </div>
  <button class="delete-bookmark">Delete</button>
</div>
<div class="bookmark-details-description">
  <p>
    ${bookmark.desc === '' ? 'No description listed' : bookmark.desc}
  </p>
  <button class="close">Close</button>
</div></div>
 </li>`;
};

const generateAddNewBookMark = function () {
  return `
    <section class="add-bookmark">
      <div class="add-bookmark-inputs">
        <form
          class="add-bookmark-form"
          id="add-new-bookmark-form"
        >
          <label for="new-name-input">Name your bookmark:</label>
          <input type="text" name="title" id="new-name-input" placeholder="Google" required/>
          <label for="new-url-input">Add new bookmark URL (please include http:// or https://):</label>
          <input type="text" name="url" id="new-url-input" value="http://" required/>
          <label for="new-rating">Rate this bookmark:</label>
          <select name="rating" id="new-rating" class="new-rating-select" default="1" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label for="new-bookmark-description"
            >Add a bookmark description (optional)</label
          >
          <textarea
            name="desc"
            id="new-bookmark-description"
            default="null"
            cols="30"
            rows="10"
          ></textarea>
          <div class="add-form-buttons">
        <button class="cancel-add-bookmark">Cancel</button>
        <button type="submit" class="create-bookmark">Create</button>
      </div>
        </form>
      </div>
    </section>`;
};

const generateAddNewBookMarkWithError = () => {
  return `<div class="error-content">
  <p class="error-message">${store.error}</p>
  <button id="cancel-error">X</button>
</div><section class="add-bookmark">
<div class="add-bookmark-inputs">
  <form
    class="add-bookmark-form"
    id="add-new-bookmark-form"
  >
    <label for="new-name-input">Name your bookmark:</label>
    <input type="text" name="title" id="new-name-input" placeholder="Google" required/>
    <label for="new-url-input">Add new bookmark URL (please include http:// or https://):</label>
    <input type="text" name="url" id="new-url-input" value="http://" required/>
    <label for="new-rating">Rate this bookmark:</label>
    <select name="rating" id="new-rating" class="new-rating-select" default="1" required>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <label for="new-bookmark-description"
      >Add a bookmark description (optional)</label
    >
    <textarea
      name="desc"
      id="new-bookmark-description"
      default="null"
      cols="30"
      rows="10"
    ></textarea>
    <div class="add-form-buttons">
  <button class="cancel-add-bookmark">Cancel</button>
  <button type="submit" class="create-bookmark">Create</button>
</div>
  </form>
</div>
</section>`;
};

// ************* BOOKMARK STRING GENERATOR ********** //

const generateBookmarkString = function (bookmarkArray) {
  const bookmarkHtml = bookmarkArray.map((bookmark) => {
    if (bookmark.expanded === true) {
      return generateBookmarkDetailed(bookmark);
    } else {
      return generateBookmarkElement(bookmark);
    }
  });
  bookmarkHtml.join('');

  return bookmarkHtml;
};

const generateFilteredBookmarkString = function (bookmarkArray) {
  const bookmarkHtml = bookmarkArray.map((bookmark) => {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded === true) {
        return generateBookmarkDetailed(bookmark);
      } else {
        return generateBookmarkElement(bookmark);
      }
    }
  });
  bookmarkHtml.join('');

  return bookmarkHtml;
};

// ***********    RENDER FUNCTION     ***********

const render = () => {
  console.log('render running');
  if (store.adding) {
    if (store.error !== null) {
      let html = generateAddNewBookMarkWithError();
      $('.bookmark-main').html(html);
      store.error = null;
    } else {
      let html = generateAddNewBookMark();
      $('.bookmark-main').html(html);
    }
  } else if (store.filter === 0) {
    let listHtml = generateBookmarkString(store.items);

    let html = `<ul class="bookmark-list">${listHtml}</ul>`;
    $('.bookmark-main').html(html);
  } else {
    let listHtml = generateFilteredBookmarkString(store.items);

    let html = `<ul class="bookmark-list">${listHtml}</ul>`;
    $('.bookmark-main').html(html);
  }
};

// **************     EVENT HANDLERS **************** //

// HANDLE NEW BOOKMARK CLICK

const handleAddNewBookMark = () => {
  $('.new-bookmark-button').on('click', function () {
    console.log('clicked to add new');
    console.log(store.adding);
    store.adding = true;
    render();
  });
};

// HANDLE ADD NEW CANCEL

const handleNewBookmarkCancel = () => {
  $('main').on('click', '.cancel-add-bookmark', function () {
    console.log('clicked to cancel');
    store.adding = false;
    render();
  });
};

// SERIALIZE FORM INPUT AS JSON

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    return JSON.stringify(o);
  },
});

// HANDLE ADD NEW CREATE

const handleNewBookmark = function () {
  $('main').submit(function (e) {
    e.preventDefault();

    let postJsonBody = $(e.target).serializeJson();

    console.log(postJsonBody);

    api
      .postBookmarks(postJsonBody)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.adding = false;
        render();
      })
      .catch((error) => {
        store.error = error.message;
        render();
        //     renderError();
      });
  });
};

// HANDLE FILTER REQUEST

const handleFilterRequest = () => {
  $('.filter-button').on('click', function (event) {
    // console.log('clicked to filter');
    let filterRating = $(event.target).siblings('select').val();
    // console.log(filterRating);
    // console.log(`changing ${store.filter} to ${filterRating}`);
    store.filter = filterRating;
    render();
  });
};

// HANDLE FILTER RESET

const handleFilterReset = () => {
  $('.filter-reset-button').on('click', function (event) {
    console.log('clicked to reset filter');
    store.filter = 0;
    render();
  });
};

// HANDLE VIEW DETAILS

const handleViewDetails = () => {
  $('main').on('click', '.view-bookmark-details', function (event) {
    console.log('clicked to view details');

    let targetId = $(event.target).closest('li').attr('id');
    store.findAndUpdate(targetId, { expanded: true });
    render();
  });
};

// HANDLE CLOSE

const handleCloseDetails = () => {
  $('main').on('click', '.close', function (event) {
    console.log('trying to close details');

    let targetId = $(event.target).closest('li').attr('id');

    // console.log(targetId);

    store.findAndUpdate(targetId, { expanded: false });
    render();
  });
};

// HANDLE DELETE BOOKMARK

const handleDeleteBookmark = () => {
  $('main').on('click', '.delete-bookmark', function (event) {
    console.log('trying to delete');

    let targetId = $(event.target).closest('li').attr('id');

    api.deleteBookmark(targetId);

    store.findAndDelete(targetId);

    render();
  });
};

// HANDLE ERROR CLOSE

const handleErrorClose = () => {
  $('main').on('click', '#cancel-error', function () {
    render();
  });
};

// BIND EVENT LISTENERS

const bindEventListeners = function () {
  handleViewDetails();
  handleAddNewBookMark();
  handleFilterRequest();
  handleNewBookmarkCancel();
  handleCloseDetails();
  handleFilterReset();
  handleNewBookmark();
  handleDeleteBookmark();
  handleErrorClose();
};

// *************          EXPORT         ***************** //

export default {
  generateBookmarkElement,
  bindEventListeners,
  render,
};
