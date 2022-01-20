const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

const User=require('./models/User');
mongoose.connect('mongodb://localhost/userData');

const port=8000;
const app= express();

console.log(User);

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  let user = new User({
    name:req.body.newData.name,
    email:req.body.newData.email,
    password:req.body.newData.password
  });
  user.save()
  .then((data) => {
    console.log('User saved');  
    res.json({success: true,data: data})
  })
  .catch(err => {
    console.error(err)
    res.json({success: false,message: err})
  });
})  

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    if (err){
      res.json({
        success: false,
        message: err
      })
    } else if (!data){
      res.json({
        success: false,
        message: "Not Found"
      })
    } else {
      res.json({
        success: true,
        data: data
      })
    }
  })
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})