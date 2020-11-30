const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const client_id = ''
const client_secret = ''
const request = require('request')

module.exports = {
    translate: async (req, res) => {
        const {
            word,sentence
        } = req.query
        try {
            var text
            if(word){
                text = await translateText(word)
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.TRANSLATE_WORD_SUCCESS,{'word':text}))
                
            }else if(sentence){
                text = await translateText(sentence)
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.TRANSLATE_WORD_SUCCESS,{'sentence':text}))
            }else{
                return res.status(statusCode.BAD_REQUEST).sent(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
            }
        } catch (err) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, err.message))
        }
    },
}

const translateText = (query) =>{
    return new Promise(function(resolve,reject){
        var text
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var options = {
        url: api_url,
        form: {
            'source': 'en',
            'target': 'ko',
            'text': query
        },
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    }
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            // res.end(body)
            text = JSON.parse(body).message.result.translatedText
            resolve(text)
        } else {
            reject(error)
        }
    })
    })
}