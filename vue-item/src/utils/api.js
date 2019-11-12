// 封装 axios
import axios from "axios";

// 
let baseURL = "http://www.liulongbin.top:3005/";
// 创建一个http/axios对象
const $axios = axios.create({
  baseURL: baseURL
});

/**
 * get
 * @param {*} url 
 * @param {*} params 
 */
export const get = function(url, params = {}) {
  return new Promise(function(resolve, reject) {
    $axios
      .get(url, { params: params })
      .then(res => {
        if (res.data.status === 0) {
          resolve(res.data)
        } else {

        }
      })
      .catch(err => {
        reject(err)
        alert('网络异常')
      });
  });
};

/**
 * post
 * @param {*} url 
 * @param {*} params 
 */
export const post = function(url,params={}){
  return new Promise((resolve,reject) => {
    $axios.post(url,params).then(res => {
      if (res.data.status === 0) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
      alert("网络异常")
    })
  })
}