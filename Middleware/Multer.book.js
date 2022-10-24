const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'book')
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' +file.originalname)
    }
});

const filefilter = (req, file,cb) => {
  if(file.mimetype === 'application/pdf'){
    cb(null, true)
  }
  else{
    cb(null, false)
    console.log('Multer : file not supported')
  }
}

const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload};