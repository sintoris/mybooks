/*
uses Node.js sqlite3 module
node must be ran as "node --experimental-sqlite <filename>" 
*/
import { DatabaseSync } from 'node:sqlite';

console.log(`${import.meta.dirname}/../data/books.db`)
const db = new DatabaseSync(`${import.meta.dirname}/../data/books.db`);

// Prepared statements
// ανάκτηση όλων των βιβλίων του χρήστη από τη βάση δεδομένων
//TODO move prepared statements to functions
const getMyBookStm = db.prepare('SELECT * FROM Books WHERE user = ? ORDER BY title');
const addNewBookStm = db.prepare('INSERT INTO Books (title, author, comment, user)  VALUES (?, ?, ?, ?)');
const findBookStm = db.prepare('SELECT * FROM Books WHERE bookID = ?');
const updateBookStm = db.prepare('UPDATE Books SET title = ?, author = ?, comment = ? WHERE (bookID = ?)');
const deleteBookStm = db.prepare('DELETE FROM Books WHERE bookID = ?');

const getMyBooks = (userID) => {
   try {
      return getMyBookStm.get(userID);
   } catch (err) {
      console.error(err);
      return null;
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
    }
    catch (err) {
        console.error(err);
        return null;
    }
}


const findUser = (userID = null, userName = null) => {
    try {
        const findUserStm = db.prepare('SELECT * FROM Users WHERE UserID = ? OR UserName = ?');
        const row = findUserStm.get(userID, userName);
        return row;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export { getMyBooks, addNewBook, findBook, updateBook, deleteBook, insertUser, findUser };
