/**
 * fetch GET&POST 网络层简单封装
 */
export default class HttpUtils {
    /**
     * fetch GET 请求
     * @param url
     * @returns {Promise}
     */
    static fetchGet = (url) => {
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then((response)=>response.json())
                .then((responseData)=>{
                    resolve(responseData);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    };

    /**
     * fetch POST 请求
     * @param url   API
     * @param formData  FormData表单数据
     * @param headers   头部
     * @returns {Promise}
     */
    static fetchPost = (url,formData,headers) => {
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'POST',
                headers:headers,
                body:formData,
            })
                .then((response)=>response.json())
                .then((responseData)=>{
                    resolve(responseData);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }
}