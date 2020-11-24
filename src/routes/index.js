const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('HW!');
})


module.exports = router;