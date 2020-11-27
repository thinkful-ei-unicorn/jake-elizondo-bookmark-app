import bookmarkList from './bookmark-list';

const items = [];
let adding = false;
let error = null;
let filter = 0;

const addBookmark = function (bookmark) {
  // console.log(bookmark);
  this.items.push(bookmark);
};

const findById = (id) => {
  //   console.log(`id is ${id}`);
  //   console.log(items);
  let targetBookmark = items.find((item) => item.id === id);
  // console.log(targetBookmark);
  return targetBookmark;
};

const findAndUpdate = function (id, object) {
  // console.log('finding');

  let target = findById(id);

  Object.assign(target, object);
};

const findAndDelete = (id) => {
  let itemToDelete = findById(id);
  let index = items.indexOf(itemToDelete);

  items.splice(index, 1);
};

export default {
  items,
  adding,
  error,
  filter,
  addBookmark,
  findById,
  findAndUpdate,
  findAndDelete,
};
