var xml2js = require('xml2js');

/**
 * 
 * 解析xml数据为json格式
 * @param {String} xmlstr 
 */
function XmlToJson(xmlstr){
    return new Promise((resolve,reject) => {
        const parseString = xml2js.parseString;
        parseString(xmlstr,(err,reslut) => {
            if(err){
                reject(err);
            }else{
                resolve(reslut);
            }
        })
    })
}


/**
 * 将json转化为xml格式
 * @param {Object} Obj 
 */

function txtMsg(toUser,fromUser,content){
    var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
        xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA["+ content +"]]></Content></xml>";
    return xmlContent;
}

function JsonToXml(Obj){
    let builter = new xml2js.Builder();
    return builter.buildObject(Obj);
}

exports.xmltool = {getXml,txtMsg};