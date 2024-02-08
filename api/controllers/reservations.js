import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getReservations = (req,res) => {
    const { id } = req.params;

    const q =  "select t.id as tripId, u.id as userId, u.username, t.title, t.tripDate from reservations r join trips t on t.id = r.tripId join users u on u.id = r.userId WHERE u.id= ? and t.tripDate < NOW()";

    db.query(q,[req.params.id],(err,data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data);
    });
}


export const addReservation = (req, res) => {

    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
      if(err) return res.status(403).json("Token nije ispravan!")
      if (userInfo.isAdmin) return res.status(403).json("Don't have permission for this operation!");


    const { userId, tripId, date } = req.body;
  
    
    const q = "INSERT INTO reservations(`userId`, `tripId`, `date`) VALUES (?)";
    
    const values = [userId, tripId, date];
  
  
      db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err)

        return res.json("Reservation created!");
    })
    })
    
  };
  

// export const getCommentsByTripId = (req, res) => {
//     const { id } = req.params;
  
//     const q = `
//       SELECT p.id, p.content, p.userId, u.username, u.img AS userImg, t.id AS tripId
//       FROM users u
//       JOIN comments p ON u.id = p.userId
//       JOIN trips t ON t.id = p.tripId
//       WHERE t.id = ?
//     `;
  
//     const values = [id];
  
//     db.query(q, values, (err, comments) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       res.json(comments);
//     });
//   };
  

export const deleteReservation = (req,res) => {
      // const token = req.cookies.access_token
      // if(!token) return res.status(401).json("Not authentificated!")

      // jwt.verify(token,"unama", (err, userInfo)=>{
      //     if(err) return res.status(403).json("Invalid token!")

        const tripId = req.params.id
        const userInfo = req.params.userId
        
        const q = "DELETE FROM reservations WHERE `id` = ?";

         db.query(q,[tripId, userInfo], (err, data) =>{
             if(err) return res.status(403).json("Don't have permission for this operation!")
        
            return res.json("Reservation deleted!")
         })
      // } )
}


