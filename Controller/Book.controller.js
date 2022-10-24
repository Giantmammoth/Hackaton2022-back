const Book = require('../Models/Book.model')
const {User} = require('../Models/Users.model');

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
  
  }


exports.uploadBook = async (req, res) => {
    try{
      
      const user = await User.findById(req.params.id);
      let private = false
      if (req.body.status == 'Privée')
        {
           private = true
        }
      const book = await Book({ 
        ...req.body,
        bookName: req.file.originalname,
        bookPath: req.file.path,
        bookType: req.file.mimetype,
        bookSize: fileSizeFormatter(req.file.size, 2),
        user: user._id,
        userName: user.firstName +' '+ user.lastName,
        isPrivate: private}).save();
       

      user.book.push(book._id);
      await user.save();
      return res.status(200).send({message: 'Book uploads successfuly'});
    }
    catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
}

exports.getAllPublicBook = async(req, res) => {
  Book.find({isPrivate: false}).then(
      (book) => {
        res.status(200).send({ data: book });
      }
    ).catch(
      (error) => {
        res.status(500).send({ message: "Internal Server Error" });
      }
    );
}

exports.getUserPrivateBook = async(req, res) => {
  Book.find({user: req.params.id, isPrivate: true}).then(
      (book) => {
        res.status(200).send({ data: book });
      }
    ).catch(
      (error) => {
        res.status(500).send({ message: "Internal Server Error" });
      }
    );
}

exports.downloadBook = async (req, res) => {
  try{
    const book = await Book.findById(req.params.id);
    if (!book) 
        return res.status(404).send("Aucun fichier correspondant")
  
    res.download(book.bookPath)
  }
  catch(error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
  }