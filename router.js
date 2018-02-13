const router = require('express').Router()
const request = require('request')
router.get('/getsite/:page_name',(req,res) => {
    const page_name = decodeURIComponent(req.params.page_name)
    console.log(`to fetch ${page_name}`)
    var scheme = page_name.indexOf('localhost') == 0 ? 'http': 'https'
    request({method:'GET',url:`${scheme}://${page_name}`},(err,resp,body) => {

        if(err != null) {
            console.log(err)
            res.json({status:"error"})
        } else {
            console.log(body)
            res.json({status:'success',html:body})
        }
    })
})
module.exports = router
