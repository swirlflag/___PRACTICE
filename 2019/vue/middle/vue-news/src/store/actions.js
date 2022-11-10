import { 
  fetchNewsList , 
  fetchAskList , 
  fetchJobsList , 
  fetchUserInfo , 
  fetchItemInfo ,
  fetchList ,
} from '../api/index.js';

export default {
      
  FETCH_NEWS(context) {
    return fetchNewsList()
      .then((response) => {
        context.commit('SET_NEWS', response.data);
        return response;
      })
      .catch(error => console.log(error));
  },
  
  FETCH_ASK( context ){
    return fetchAskList()
      .then((response) => {
        context.commit('SET_ASK', response.data);
        return response;
      })
      .catch(error => console.log(error));
  },

  FETCH_JOBS(context ){
    return fetchJobsList()
      .then((response) => {
        context.commit('SET_JOBS', response.data);
        return response;
      })
      .catch(error => console.log(error));
  },

  FETCH_USER(context, name){
    return fetchUserInfo(name)
      .then((response) => {
        context.commit('SET_USER', response.data);
        return response;
      })
      .catch(error => console.log(error));
  },

  FETCH_ITEM(context, item){
    return fetchItemInfo(item)
      .then((response) => {
        context.commit('SET_ITEM', response.data);
        return response;
      })
      .catch(error => console.log(error));
  },

  FETCH_LIST(context, pageName){
    return fetchList(pageName)
    .then((response)=> {
      context.commit('SET_LIST', response.data);
      // return response;
    })
    .catch(error => console.log(error));
  },

};