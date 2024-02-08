import jwt from "jsonwebtoken";
import {db} from "../db.js";
import bcrypt from "bcrypt";

export const getUser = (req,res) => {
    const q = "SELECT `username`, `email`, `img` FROM users WHERE id = ?" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
    });
}

export const getUsers = (req,res) => {
    const q = "SELECT `id`, `username`, `email`, `img`, `status`, `is_admin`  FROM users" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const deleteUser = (req, res) => {
    const userIdToDelete = req.params.id;
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json("Not authentificated!");
    }
  
    jwt.verify(token, "unama", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Invalid token!");
      }
  
  
      const q = "DELETE FROM users WHERE `id` = ?";
  
      db.query(q, [userIdToDelete], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        return res.json("User deleted!");
      });
    });
  };
   

export const updateUser = (req,res) => {
    const token = req.cookies.access_token
      if(!token) return res.status(401).json("Not authentificated!")

     jwt.verify(token,"unama", (err, userInfo)=>{
          if(err) return res.status(403).json("Invalid token!")
    const userIdToEdit = req.params.id;

        const q = "UPDATE users SET `is_admin`=?, `status`=?  WHERE `id`=?";

        const values = [
            req.body.is_admin,
            req.body.status,
        ]
    
        db.query(q,[...values,[userIdToEdit]],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("User updated!");
        })
     })
}

export const updateUserPhoto = (req,res) => { 
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authentificated!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Invalid token!")

        const q = "UPDATE users SET `img`=? WHERE `id`=?";

        const values = [
            req.body.img,        
        ]
    
        db.query(q,[...values,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Profile image updated!");
        })
    })
}


export const updateUsername = (req,res) => { 
  const token = req.cookies.access_token
  if(!token) return res.status(401).json("Not authentificated!")

  jwt.verify(token,"unama", (err, userInfo)=>{
      if(err) return res.status(403).json("Invalid token!")

      const q = "UPDATE users SET `username`=? WHERE `id`=?";

      const values = [
          req.body.username,        
      ]
  
      db.query(q,[...values,userInfo.id],(err,data)=>{
          if(err) return res.status(500).json(err)

          return res.json("Username updated!");
      })
  })
}

export const updateUserPassword = (req,res) => {



    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User don't exist!") 
    

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    if(!isPasswordCorrect) return res.status(400).json("Invalid username or password!")

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);

      const q = "UPDATE users SET `password`=? WHERE `id`=?";

      db.query(q,[hash,req.body.id],(err,data)=>{
          if(err) return res.json(err);
          return res.status(200).json("Password updated!");
      })
    
    })
}