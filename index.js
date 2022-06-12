const express = require("express");
const multer = require("multer")
const app=express();
const cors=require("cors");
const port= process.env.PORT || 9099;
 const mysql=require("mysql")
const db = mysql.createPool({  
    user:"root",
    host:"127.0.0.1",
    password:"",
    port:"3306",
    database:"church" 
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/uploads",express.static("uploads"))
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "./uploads/");
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);
  
    }
})
const uploads = multer({storage:storage});
//
//
const HEADER_ONE =[
    {
        heading:"Welcome to saint Andrews Anglican Youth Church Ogudu",
        des:"• grateful welcome Many of you have made a huge effort to join us today. On behalf of us all, we are deeply appreciative and offer you our most grateful welcome.• honored welcome I look around the stage and am in awe with the collected expertise gathered here. We are deeply honored to welcome you.",
        img:""
    }
];
app.get('/header',(req,res)=>{
    res.send(HEADER_ONE)
})
const ADS_PER = [
    {title:"Join Adult church service",
     des:"Click the link below to join now",
     img:"",
     link:""
     }
];
app.get('/ads',(req,res)=>{
    res.send(ADS_PER)
})
const EVENT_ONE =[
    {title:"Everyone events plan",des:"Add your description to your playlist",img:'http://localhost:9099/uploads/Chimdindu.jpg'},
    {title:"Everyone events plan",des:"Add your description to your playlist",img:'http://localhost:9099/uploads/Chimdindu.jpg'}
];
app.get('/events',(req,res)=>{
    res.send(EVENT_ONE)
})
const NEWS =[
    {heading:"NEWS...",p_tag:"News goes here..."}
];
app.get('/news',(req,res)=>{
    res.send(NEWS)
})
const PASS =[
    {username:"username:123",
     password:"password:123"
    }
]
//
//
const QUOTES = [
  {quotes:'“Everything should be done in love.”',name:'— 1 Corinthians 16:14'},
  {quotes:'“The Lord is my strength and my shield. My heart trusts him. I was helped, my heart rejoiced, and I thank him with my song.”',name:'— Psalm 28:7'},
  {quotes:'“Taste and see how good the Lord is! The one who takes refuge in him is truly happy!”',name:'— Psalm 34:8'},
  {quotes:'“I’ve said these things to you so that you will have peace in me. In the world you have distress. But be encouraged! I have conquered the world.” ',name:'— John 16:33'},
  {quotes:'“Pursue the Lord and his strength; seek his face always!”',name:'— 1 Chronicles 16:11'},
  {quotes:'“He only is my rock and my salvation, my fortress; I shall not be shaken.”',name:'— Psalm 62:6'},
  {quotes:'“Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.”',name:'— Joshua 1:9'},
  {quotes:'“And my God will supply every need of yours according to his riches in glory in Christ Jesus.” ',name:' — Philippians 4:19'},
  {quotes:'“This is my comfort in my affliction, that your promise gives me life.”',name:' — Psalm 119:50'},
  {quotes:'“Jesus looked at them and said, ‘With man it is impossible, but not with God. For all things are possible with God.’”',name:'— Mark 10:27'},
  {quotes:'"Be on your guard; stand firm in the faith; be courageous; be strong."',name:'— 1 Corinthians 16:13'},
  {quotes:'"Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you."',name:'— Deuteronomy 31:6'},
  {quotes:'"But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint."',name:'— Isaiah 40:31'}
 
]
app.get('/quotes',(req,res)=>{
    res.send(QUOTES)
})
const PASSWORD_INTO_TXT = "chimdindu";
app.post("/post/",uploads.single("image"),(req,res)=>{
    const {title,text,summary,date} = req.body;
    const img = req.file.path;
    db.query('INSERT INTO church (title,text,summary,date,img)VALUES(?,?,?,?)',[title,text,summary,date,img],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Blog post successful!");
        }
    }); 
    
});
app.get("/post-get/:passed/",(req,res)=>{
    const passed = req.params.passed;
   // console.log(passed)
    if(passed == PASSWORD_INTO_TXT){
     
            db.query("SELECT * FROM church",(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                }
            });
   }else{
    console.log("_code:'please malam gettat'")
   };
});

app.listen(port ,()=>{
    console.log(`Yey Server is running on http://localhost:${port}`);
}) 
