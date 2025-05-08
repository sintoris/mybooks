// import dotenv from 'dotenv';

// dotenv.config();
console.log(`process.env.DB_MODEL= ${process.env.DB_MODEL}`);
const model = await import(`../model/model-${process.env.DB_MODEL}.mjs`);

function findUser(req, res) {
   console.log('GET / session=', req.session);
   const userID = req.session.userID;
   console.log('/get/', userID);
   if (userID) {
      let user = model.findUser(userID, null);
      res.render('index', { user: user[0].userName });
   } else res.render('index');
}

function about(req, res) {
   console.log('GET /about session=', req.session);
   res.render('about');
}

function create(req, res) {
   console.log('GET /create, session=', req.session);
   res.render('create', { data: {} });
}

function createBook(req, res) {
   console.log('POST /create session=', req.session);
   const userID = req.session.userID;
   console.log(userID);
   const newBook = {
      title: req.body.title,
      author: req.body.author,
      comment: req.body.comment,
      user: req.session.userID,
   };
   model.newBook(newBook, (err, data) => {
      if (err) return console.error(err.message);
      else res.redirect('/books');
   });
}
function deleteBook(req, res) {
   console.log('GET /delete/:id=', 'session=', req.session);
   const id = req.params.id;
   model.deleteBook(id, (err, res) => {
      if (err) {
         return console.error(err.message);
      }
   });
   res.redirect('/books');
}

function findBook(req, res) {
   console.log('GET /edit/:id session=', req.session);
   const id = req.params.bookID;
   if (id) {
      console.log('edit', id);
      model.findBook(id, (err, row) => {
         if (err) {
            res.send(err);
         } else {
            console.log('get /edit/id book to edit', row[0]);
            res.render('edit', { data: row[0] });
         }
      });
   }
}

function findToDeleteBook(req, res) {
   console.log('GET /delete/:id session=', req.session);
   const id = req.params.id;
   console.log('GET /delete/:id', id);
   model.findBook(id, (err, row) => {
      if (err) {
         return console.error(err.message);
      }
      console.log('TO BE DELETED...', row);
      res.render('delete', { data: row[0] });
   });
   console.log('END of GET /delete/:id');
}

function getBooks(req, res, next) {
   const books = model.getBooks();
   console.log('books to show...', books);
   res.render('books', { data: books });
}

function getCreateUser(req, res) {
   console.log('POST / session=', req.session);
   console.log('/', req.body.userName);
   // έχει συμπληρωθεί το userName στη φόρμα
   // βρες τον χρήστη id ή δημιούργησε χρήστη αν δεν υπάρχει
   let userID = null;
   let userName = req.body.userName;
   let user = model.findUser(userID, userName);
   req.session.userID = user[0].userID;
   req.session.userName = user[0].userName;
   console.log('new session', req.session);
   res.redirect('/');
}

function updateBook(req, res) {
   console.log('POST /edit/:id session=', req.session);
   const id = req.params.id;
   // const book = [req.body.title, req.body.author, req.body.comment, id];
   const book = {
      title: req.body.title,
      author: req.body.author,
      comment: req.body.comment,
      bookID: id,
      user: req.session.userID,
   };
   model.updateBook(book, (err, data) => {
      console.log('in POST', err, data);
      if (err) {
         return console.error(err.message);
      } else {
         res.redirect('/books');
      }
   });
}

export {
   findUser,
   about,
   create,
   createBook,
   deleteBook,
   findBook,
   findToDeleteBook,
   getBooks,
   getCreateUser,
   updateBook,
};
