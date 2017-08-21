export default  class ImgFromHtmlUtil {
    /**
     * 获取html文本中的第一个<img/>标签中的src地址
     * @param content
     * @returns {*}
     */
     static getImageSrc = (content) => {
         let imgUrl;
         let imgReg = /<img.*?(?:>|\/>)/gi;//匹配src属性
         let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
         let arr = content.match(imgReg);
         //有循环则获取所有图片src,这里只获取第一张
         // for (let i = 0; i < arr.length; i++) {
             let src = arr[0].match(srcReg);
             //获取图片地址
             if(src[1]){
                 imgUrl = src[1];
             }
         // }
         return imgUrl;
    }
}