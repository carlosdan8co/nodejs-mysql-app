const router = require('express').Router();
const {isLoggedIn}= require('../lib/auth');

const pool=require('../database');

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('links/add');
})

router.post('/add',isLoggedIn,async (req,res)=>{
    const {title,url,description,id}=req.body;
    const newLink={
        title,
        url,
        description,
        user_id:req.user.id
    };
    await pool.query('Insert into links set ?',[newLink]);
    req.flash('success','Link saved successfully');
    console.log('Flash');
    res.redirect('/links');
});

router.get('/',isLoggedIn,async(req,res)=>{
    const links = await pool.query('select * from links where user_id=?',[req.user.id]);
    res.render('links/list',{links});
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
    const {id}= req.params;
    await pool.query('delete from links where id=? ',[id]);
    req.flash('success','Link deleted successfully');
    res.redirect('/links');
});

router.get('/edit/:id',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    const links = await pool.query('select * from links where id=?',[id]);
    res.render('links/edit',{links:links[0]});
});

router.post('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const {title,description,url} = req.body;
    const newLink ={
        title,
        description,
        url
    };
    await pool.query('update links set ? where id=?',[newLink, id]);
    req.flash('success','Link updated successfully');
    res.redirect('/links');
})

module.exports = router;