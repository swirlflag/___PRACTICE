import ListView from './ListView.vue';
import bus from '../utils/bus.js';

export default function createListView(name){
  return {

    name:  name,

    created(){
      // setTimeout(()=>{
        bus.$emit('start:spinner');
        this.$store.dispatch('FETCH_LIST', this.$route.name)
          .then(() => {
            bus.$emit('end:spinner');
          })
          .catch((error) => {
            console.log(error)
          });
      // },3000);
    },

    render(createElement){
      return createElement(ListView);
    },

  };
}
