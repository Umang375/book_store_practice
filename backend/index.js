var cors = require('cors')
const express = require('express')
const mysql = require('mysql')
const port  = 5000

const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"Ujain7315@",
    database: "test"
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM test.new_table"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data); 
    })
})


app.post("/books", (req, res)=>{
    const q = "INSERT INTO test.new_table ( `title`, `desc`,`price`, `cover`) VALUES (?)";
    const values =[req.body.title, req.body.desc, req.body.price, req.body.cover];
    console.log("ok");
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })

})

//delete a book from database

app.delete("/books/:id", (req, res)=>{
    const q = "DELETE FROM test.new_table WHERE id = ?";
    const book_id = req.params.id;
    db.query(q, [book_id], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put("/books/:id", (req,res)=>{
    const q = "UPDATE test.new_table SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values =[req.body.title, req.body.desc, req.body.price, req.body.cover];
    const book_id = req.params.id;
    db.query(q,[...values, book_id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })

})

// app.delete("/books/:id",(req, res)=>{
//     const bookId = req.params.id;
//     const q = "DELETE FROM test.new_table WHERE id = ?";
//     console.log(q) 
//     db.query(q,[bookId], (err, data)=>{
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })

app.listen(5000,()=>{
    console.log(`Server is running on port ${port}`);
})