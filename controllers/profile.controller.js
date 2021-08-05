const knex = require('../data/db')
var path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:"upload/profile",
    filename:(req,file,cb) => {
        cb(null,file.fieldname+"-"+Date.now()+file.originalname)
    },

})
const fileFilter =function(req,file,callback){
     let ext =  path.extname(file.originalname).split('.')[1];
    if(ext !== 'png' && ext !=='jpg' && ext !=='jpeg') {
        return callback(new Error('Only image extesnsion are allowes'))
    }
    callback(null,true)
}

let upload = multer({
    storage:storage,
     fileFilter:fileFilter
})

module.exports.imageName = upload.single("image")

module.exports.profilePic = async(req,res)=>{
    let  insertObject ={};
    console.log(req.file)    
     insertObject.imageName = req.file.filename;
    insertObject.type = req.file.mimetype;
    insertObject.path = req.file.path
    insertObject.personId = req.params.personId;
     console.log("this is inside function",insertObject)
    await knex("tbl_profile").insert(insertObject).then((doc)=>{
        res.json({status:"success",message:"success"});
    }).catch((err)=>{
        console.log("THis is err",err)
        res.json({status:"error",message:"error"})
    })
}

module.exports.pic = async(req,res)=>{
    const personId = req.params.personId;
    await knex("tbl_profile").select('path').where('personId',personId).then((doc)=>{
  let filePath = doc[0]
  let  imageUrl = filePath.path
  const dirname = path.resolve();
  const fileUrl = path.join(dirname,imageUrl);
        res.sendFile(fileUrl)
    }).catch((err)=>{
        console.log("This is an error",err)
        res.json({status:"error",message:"error reterving messsage"})
    })
}