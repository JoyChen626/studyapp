var commonFn = {
    randomString: (len,str) =>{
        len = len || 32;
        var $chars = str;    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    str_add: (str,length,pvalue) => {
        var result = '';
        for(var i=0,len=str.length; i<len; i+=length){
            result+=str.slice(i,i+length) + pvalue;
        }
        var news = result.slice(0,result.length-1);
        return news;
    }
}
module.exports = commonFn;
