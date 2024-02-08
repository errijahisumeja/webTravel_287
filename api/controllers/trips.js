import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getTrips = (req,res) => {
    const q = req.query.cat ? "SELECT * FROM trips WHERE cat=?" : " SELECT * FROM trips";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err);

        return res.status(200).json(data);
    });
}

export const getTrip = (req,res) => {
    const q = "SELECT p.id, `username`, `title`, `date`,`desc`, p.img, u.img AS userImg, `cat`, DATE_FORMAT(`tripDate`, '%Y-%m-%d') AS tripDate, `price` FROM users u JOIN trips p ON u.id=p.uid WHERE p.id = ?" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
    });
}

export const searchTrips = (req,res) => {
    const q = req.query.cat ? "SELECT * FROM trips WHERE cat=? AND title like '" + req.query.title + "%'" : " SELECT * FROM trips WHERE title like '" + req.query.title + "%'";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err);

        return res.status(200).json(data);
    });
}

export const addTrip = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")
        if (userInfo.isAdmin) return res.status(403).json("Don't have permission for this operation!");
            
    
        const q = "INSERT INTO trips(`title`, `desc`,`img`, `cat`,`date`, `uid`, `price`, `tripDate`) VALUES (?)"

        
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date, 
            userInfo.id,
            req.body.price,
            req.body.tripDate.substring(0, 10)
            

        ]
    
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Trip created!");
        })
    })
}

export const deleteTrip = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")

        const tripId = req.params.id
        const q = "DELETE FROM trips WHERE `id` = ? AND `uid` = ?";

        db.query(q,[tripId, userInfo.id], (err, data) =>{
            if(err) return res.status(403).json("Don't have permission for this operation!")
        
            return res.json("Trip deleted!")
        })
    })
}

export const updateTrip = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")

        const tripId = req.params.id;
        const q = "UPDATE trips SET `title`=?,`desc`=?,`img`=?,`cat`=?, `price`=?, `tripDate`=? WHERE `id`=? AND `uid` = ?";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,   
            req.body.price,
            req.body.tripDate.substring(0, 10)       
        ]
    
        db.query(q,[...values,tripId,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Trip updated!");
        })
    })
}