import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getComments = (req,res) => {

    const q =  "SELECT p.id, `content`,`userId`, `username`, u.img AS userImg, t.id AS tripId  FROM users u JOIN comments p ON u.id=p.userId JOIN trips t ON t.id=tripId";

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err);

        return res.status(200).json(data);
    });
}


export const addComment = (req, res) => {

     const token = req.cookies.access_token
     if(!token) return res.status(401).json("Not authentificated!")

     jwt.verify(token,"unama", (err, userInfo)=>{
         if(err) return res.status(403).json("Invalid token!")
         if (userInfo.isAdmin) return res.status(403).json("Don't have permission for this operation!");


    const { content, userId, tripId } = req.body;
  
    
    const q = "INSERT INTO comments(`content`, `userId`, `tripId`) VALUES (?)";
    
    const values = [content, userId, tripId];
  
  
      db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err)

        return res.json("Comment created!");
    })
    })
    
  };
  

export const getCommentsByTripId = (req, res) => {
    const { id } = req.params;
  
    const q = `
      SELECT p.id, p.content, p.userId, u.username, u.img AS userImg, t.id AS tripId
      FROM users u
      JOIN comments p ON u.id = p.userId
      JOIN trips t ON t.id = p.tripId
      WHERE t.id = ?
    `;
  
    const values = [id];
  
    db.query(q, values, (err, comments) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json(comments);
    });
  };
  

export const deleteComment = (req,res) => {
      const token = req.cookies.access_token
      if(!token) return res.status(401).json("Not authentificated!")

      jwt.verify(token,"unama", (err, userInfo)=>{
          if(err) return res.status(403).json("Invalid token!")
         const commentId = req.params.id;
         const q = "DELETE FROM comments WHERE `id` = ? AND ( (SELECT `is_admin` FROM users WHERE `id` = ?) = 'admin' OR `userId` =?)";

          db.query(q,[commentId,userInfo.id,userInfo.id], (err, data) =>{
             if(err) return res.status(403).json("Don't have permission for this operation!");
            return res.json("Comemnt deleted!")
         })
      } )
}

