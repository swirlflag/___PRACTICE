import ListView from './ListView.vue';
import bus from '../utils/bus.js';

export default function createListView(name){
  return {
    
    name:  name,

    created(){
      bus.$emit('start:spinner');
      this.$store.dispatch('FETCH_LIST', this.$route.name)
        .then(() => {
          console.log('HOC', this.$route);
          bus.$emit("end:spinner");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    render(createElement){
      return createElement(ListView);
    },

  };
}
