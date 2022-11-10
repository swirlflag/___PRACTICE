import bus from '../utils/bus.js';
import { store } from '../store/index.js';

export const fetchStart = function(to, from, next){
  bus.$emit('start:spinner');
  return store.dispatch('FETCH_LIST', to.name)
    .then(() => {
      console.log('hi');
      next();
    })
    .catch((error) => {
      console.log(error);
    });

};

