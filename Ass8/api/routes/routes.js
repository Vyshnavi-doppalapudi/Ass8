const express = require("express");
const bodyPraser = require('body-parser');
const { model } = require('mongoose');
const Sample = require('./../models/sample');


module.exports = (app)=>{

    // view all user
    app.get('/user/getAll',function(req,res){
        Sample.find(function(err,data){
            if(err){
                res.send(err);
            }
            res.status(200);
            res.json(data);
        });
    })


    // create user
    app.post('/user/create',bodyPraser.json(),function(req,res){
        var regexfullName = /(^[a-zA-Z-_ /s]{3,20}$)/
        var regexForEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        var fullname = req.body.fullname;
        var email = req.body.email;
        var password = req.body.password;

        if(fullname ==null)
        {
            res.send({message:"please enter fullname field"});
            return;
        }
        if(email == null)
        {
            res.send({message:"please enter email field"});
            return;   
        }
        if(password == null)
        {
            res.send({message:"please enter password field"});
            return;
        }

        if( !fullname.trim().match(regexfullName)){
            res.status(400);
            res.json("full name entered is not valid or correct. Please check entered fullname again.");
            return;
        }
        else if( !email.trim().match(regexForEmail)){
            res.status(400);
            res.json("Email ID entered is not valid or correct. Please check entered details again.");
            return;
        }
        

        else if(!password.trim().match(regexForPassword)){
            res.status(400);
            res.json("Password should be min 8 length long. \n  Must contain an uppercase letter and a lowercase letter \n A special character and a numeric character (0-9) ");
            return;
        }

        
        const rec = new Sample(req.body);
        rec.save(function(err,data){
            if(err)
            {
                console.log(err);
            }else{
                console.log("data is saved successfully");
                res.status(201);
                res.json(data);
            }
        });

    });

    app.put('/user/edit',bodyPraser.json(),function(req,res){



        const mail = req.body.email;
        if(mail == null)
        {
            res.send({message:"please enter email field"});
            return;   
        }
        Sample.find({email:mail},function(err,user){
            if(err)
            {
                console.log("error in update!!");
                res.status(400);
                res.send(err);
                return;
            }else{
                if(user == null)
                {
                    res.send("email is not present in the data base to update");
                    return;
                }
                console.log("user present");
            }
        })
        const regexfullName = /(^[a-zA-Z-_ /s]{3,20}$)/
        const regexForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const password = req.body.password;
        const fullname = req.body.fullname;
        if(fullname ==null)
        {
            res.send({message:"please enter fullname field"});
            return;
        }
        
        if(password == null)
        {
            res.send({message:"please enter password field"});
            return;
        }


        if( !fullname.trim().match(regexfullName)){
            res.status(400);
            res.json("full name entered is not valid or correct. Please check entered fullname again.");
            return;
        }
        else if(!password.trim().match(regexForPassword)){
            res.status(400);
            res.json("Password should be min 8 length long. \n  Must contain an uppercase letter and a lowercase letter \n A special character and a numeric character (0-9) ");
            return;
        }


        const newData = req.body;
        newData.email = mail;
        console.log("before update");
        console.log(req.body);
        Sample.findOneAndUpdate({email:mail}, req.body, function(err,user){
            if(err)
            {
                console.log("error in update!!");
                res.status(400);
                res.send(err);
                return;
            }else{
                if(user == null)
                {
                    res.send("email is not present in the data base to update");
                    return;
                }
                console.log("user successfully updated ")
                res.send(user);
            }
        });
       
        // res.send({"message":"successfully updated"})
    })

    app.delete('/user/delete',bodyPraser.json(), function(req,res){
        console.log("before delete");
        const mail = req.body.email;
        if(mail == null)
        {
            res.send({message:"please enter email field"});
            return;   
        }
        console.log(req.body);
            Sample.findOneAndDelete({"email":req.body.email},function(err,user){
                if(err)
                {
                    res.status(400);
                    res.send(err);
                }else{
                    if(user == null)
                    {
                        res.send("email is not present in the data base");
                        return;
                    }
                    console.log("user successfully deleted ")
                    res.send(user);
                }
            })
    })

}