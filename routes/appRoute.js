const express = require('express');

const {user,post} = require('../models');

const appRoute = express.Router();

appRoute.get('/users', async(req,res)=>{
    try {
        const users = await user.findAll();
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.json({error:'Something went wrong'});
    }
});

appRoute.get('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid;
    try {
        const item = await user.findOne({
            where:{uuid: uuid},
            include:'myPosts'
        });
        return res.json(item);
    } catch (error) {
        console.log(error);
        return res.json({error:'Something went wrong'});
    }
});

appRoute.delete('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid;
    try {
        const item = await user.findOne({where:{uuid: uuid}});
        await item.destroy();
        return res.json({msg: 'User deleted!'});
    } catch (error) {
        console.log(error);
        return res.json({error:'Something went wrong'});
    }
});

appRoute.put('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid;
    const{name,email,role} = req.body;
    try {
        const item = await user.findOne({where:{uuid: uuid}});
        if(name) item.name = name;
        if(email) item.email = email;
        if(role) item.role = role;
        
        await item.save();
        return res.json(item);
    } catch (error) {
        console.log(error);
        return res.json({error:'Something went wrong'});
    }
});

appRoute.post('/users', async(req,res) => {
    try {
        const {name,email,role} = req.body;
        const item = await user.create({name, email, role});
        return res.json(item);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

appRoute.get('/posts', async(req,res)=>{
    try {
        //---To change the name of the returned object:
        //---> const myPosts = await post.findAll({include:[{model:user, as:'newName' }]});
        //--- !!! and you must also change it in the post model!
        const myPosts = await post.findAll({include:[user]});
        return res.status(200).json(myPosts); 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

appRoute.post('/posts', async(req,res)=>{
    const {userUuid, body} = req.body;
    try {
        const myUser = await user.findOne({where:{uuid: userUuid}});
        const myPost = await post.create({body, userId:myUser.id});
        return res.status(200).json(myPost); 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports = appRoute;