import { default as bettersqlite3 } from 'better-sqlite3';
const db = new bettersqlite3(`${import.meta.dirname}/../data/books.db`, { fileMustExist: true });

// Prepared statements
// ανάκτηση όλων των βιβλίων του χρήστη από τη βάση δεδομένων

// const addNewBookStm = db.prepare('INSERT INTO Books (title, author, comment, user)  VALUES (?, ?, ?, ?)');
// const findBookStm = db.prepare('SELECT * FROM Books WHERE bookID = ?');
// const updateBookStm = db.prepare('UPDATE Books SET title = ?, author = ?, comment = ? WHERE (bookID = ?)');
// const deleteBookStm = db.prepare('DELETE FROM Books WHERE bookID = ?');

const getBooks = () => {
   try {
      const getBooksStm = db.prepare('SELECT * FROM Books ORDER BY title');

      return getBooksStm.all();
   } catch (err) {
      throw err;
   }
};

const addNewBook = (book) => {
   try {
      const result = addNewBookStm.run(book.title, book.author, book.comment, book.user);
      return result;
   } catch (err) {
      console.error(err);
      return null;
   }
};

const findBook = (bookID) => {
   try {
      const row = findBookStm.get(bookID);
      return row;
   } catch (err) {
      console.error(err);
      return null;
   }
};

const updateBook = (book) => {
   try {
      const result = updateBookStm.run(book.title, book.author, book.comment, book.bookID);
      return result;
   } catch (err) {
      console.error(err);
      return null;
   }
};

const deleteBook = (bookID) => {
   try {
      const result = deleteBookStm.run(bookID);
      return result;
   } catch (err) {
      console.error(err);
      return null;
   }
};

const insertUser = (userName) => {
   try {
      const insertUserStm = db.prepare('INSERT INTO Users(userName) VALUES (?)');
      const result = insertUserStm.run(userName);
      return result.lastInsertRowid;
   } catch (err) {
      console.error(err);
      return null;
   }
};

const findUser = (userID = null, userName = null) => {
   try {
      const findUserStm = db.prepare('SELECT * FROM Users WHERE UserID = ? OR UserName = ?');
      const row = findUserStm.all(userID, userName);
      return row;
   } catch (err) {
      console.error(err);
      throw err;
   }
};

export { getBooks, addNewBook, findBook, updateBook, deleteBook, insertUser, findUser };
