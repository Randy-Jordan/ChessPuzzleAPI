const express = require('express')
const path = require('path');
const router = express.Router();
const pool = require('./db')


router.get('/puzzle',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles TABLESAMPLE SYSTEM(0.01) LIMIT 1'
    
    try{
        const query = await pool.query(sql)
        res.json(query.rows[0])
    }catch(err){
        res.status(500).send('Server Error')
    }
}) 

router.get('/rating/:ratinglow',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "rating" > $1 ORDER BY RANDOM() LIMIT 1; '
    ratinglow = parseInt(req.params.ratinglow)
    const values = [ratinglow]
   
        try {
            const query = await pool.query(sql,values)
            if (query.rows[0] === undefined) {
                res.status(404).send('No puzzles with that rating.')
            } else {
                res.status(200).json(query.rows[0])
            }
        } catch (error) {
            res.status(500).send('Server Error')
        }
    
    
}) 

router.get('/between/:ratinglow/:ratinghigh',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "rating" > $1 AND "rating" < $2 ORDER BY RANDOM() LIMIT 1; '
    ratinglow = parseInt(req.params.ratinglow)
    ratinghigh = parseInt(req.params.ratinghigh)
    const values = [ratinglow,ratinghigh]

    if(Number.isInteger(ratinglow) && Number.isInteger(ratinghigh)){
        try {
            const query = await pool.query(sql,values)
            if (query.rows[0] === undefined) {
                res.status(404).send('No puzzles with that rating.')
            } else {
                res.status(200).json(query.rows[0])
            }
        } catch (error) {
            res.status(500).send('Server Error')
        }
    }else{
        res.status(400).send('Invalid rating parameter')
    }
})

router.get('/theme/:theme/',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "themes" LIKE $1 ORDER BY RANDOM() LIMIT 1;'
    const theme = '%'+ req.params.theme + '%'
    const values = [theme]

    try{
        const query = await pool.query(sql,values)
        if(query.rows[0] === undefined){
            res.status(404).send('No puzzles with that theme.')
            
        }else{
            res.status(200).json(query.rows[0])
            
        }
        
        
    }catch(err){
        res.status(500).send('Server Error')
        
    }
    
})



router.get('/theme/:theme/rating/:ratinglow',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "themes" LIKE $1 AND "rating" > $2 ORDER BY RANDOM() LIMIT 1;'
    const theme = '%'+ req.params.theme + '%'
    ratinglow = parseInt(req.params.ratinglow)
    const values = [theme,ratinglow]

    try{
        const query = await pool.query(sql,values)
        if(query.rows[0] === undefined){
            res.status(404).send('No puzzles with that theme or rating.')
            
        }else{
            res.status(200).json(query.rows[0])
            
        }
        
        
    }catch(err){
        res.status(500).send('Server Error')
        
    }
    
})

router.get('/rating/:ratinglow/theme/:theme/',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "themes" LIKE $1 AND "rating" > $2 ORDER BY RANDOM() LIMIT 1;'
    const theme = '%'+ req.params.theme + '%'
    ratinglow = parseInt(req.params.ratinglow)
    const values = [theme,ratinglow]

    try{
        const query = await pool.query(sql,values)
        if(query.rows[0] === undefined){
            res.status(404).send('No puzzles with that theme or rating.')
            
        }else{
            res.status(200).json(query.rows[0])
            
        }
        
        
    }catch(err){
        res.status(500).send('Server Error')
        
    }
    
})

router.get('/theme/:theme/between/:ratinglow/:ratinghigh',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "themes" LIKE $1 AND "rating" > $2 AND "rating" < $3 ORDER BY RANDOM() LIMIT 1; '
    ratinglow = parseInt(req.params.ratinglow)
    ratinghigh = parseInt(req.params.ratinghigh)
    const theme = '%'+ req.params.theme + '%'
    const values = [theme,ratinglow,ratinghigh]

    if(Number.isInteger(ratinglow) && Number.isInteger(ratinghigh)){
        try {
            const query = await pool.query(sql,values)
            if (query.rows[0] === undefined) {
                res.status(404).send('No puzzles with that theme or rating.')
            } else {
                res.status(200).json(query.rows[0])
            }
        } catch (error) {
            res.status(500).send('Server Error')
        }
    }else{
        res.status(400).send('Invalid rating parameter')
    }
})

router.get('/between/:ratinglow/:ratinghigh/theme/:theme',async(req,res) =>{
    const sql = 'SELECT * FROM public.puzzles WHERE "themes" LIKE $1 AND "rating" > $2 AND "rating" < $3 ORDER BY RANDOM() LIMIT 1; '
    ratinglow = parseInt(req.params.ratinglow)
    ratinghigh = parseInt(req.params.ratinghigh)
    const theme = '%'+ req.params.theme + '%'
    const values = [theme,ratinglow,ratinghigh]

    if(Number.isInteger(ratinglow) && Number.isInteger(ratinghigh)){
        try {
            const query = await pool.query(sql,values)
            if (query.rows[0] === undefined) {
                res.status(404).send('No puzzles with that theme or rating.')
            } else {
                res.status(200).json(query.rows[0])
            }
        } catch (error) {
            res.status(500).send('Server Error')
        }
    }else{
        res.status(400).send('Invalid rating parameter')
    }
})

module.exports = router;
