const addOneItem = (state, newItem) => {
  const obj = {
    completed: false,
    item: newItem,
  };
  localStorage.setItem(newItem, JSON.stringify(obj));
  state.todoItems.push(obj);
};

const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.todoItem.item);
  state.todoItems.splice(payload.index, 1);
};

const toggleOneItem = (state, payload) => {
  state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
  localStorage.removeItem(payload.todoItem.item);
  localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
};

const removeAllItem = (state) =>{
  state.todoItems = [];
  localStorage.clear();
};

const showModal = (state, obj) => {
  state.modalText = {
    header: obj.header,
    text: obj.text,
  };
  state.isOnModal = !state.isOnModal;
};

const hideModal = (state) => {
  state.isOnModal = !state.isOnModal;
  state.modalText = {};
};

export {
  addOneItem,
  removeOneItem,
  toggleOneItem,
  removeAllItem,
  showModal,
  hideModal
}
