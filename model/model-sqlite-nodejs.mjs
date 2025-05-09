/*
uses Node.js sqlite3 module
node must be ran as "node --experimental-sqlite <filename>" 
*/
import { DatabaseSync } from 'node:sqlite';

console.log('Using node:sqlite module');

const db = new DatabaseSync(`${import.meta.dirname}/../data/books.db`);

const getBooks = () => {
   try {
      const getBookStm = db.prepare('SELECT * FROM Books ORDER BY title');
      return getBookStm.all();
   } catch (err) {
      throw err;
   }
};

const addBook = (book) => {
   try {
      const addBookStm = db.prepare('INSERT INTO Books (title, author, comment, user)  VALUES (?, ?, ?, ?)');

      const result = addBookStm.run(book.title, book.author, book.comment);
      return result;
   } catch (err) {
      throw err;
   }
};

const getBook = (bookID) => {
   try {
      const getBookStm = db.prepare('SELECT * FROM Books WHERE bookID = ?');

      const row = getBookStm.get(bookID);
      return row;
   } catch (err) {
      throw err;
   }
};

const editBook = (book) => {
   try {
      const editBookStm = db.prepare('UPDATE Books SET title = ?, author = ?, comment = ? WHERE (bookID = ?)');

      const result = editBookStm.run(book.title, book.author, book.comment, book.bookID);
      return result;
   } catch (err) {
      throw err;
   }
};

const deleteBook = (bookID) => {
   try {
      const deleteBookStm = db.prepare('DELETE FROM Books WHERE bookID = ?');

      const result = deleteBookStm.run(bookID);
      return result;
   } catch (err) {
      throw err;
   }
};

function shutdown() {
   try {
      db.close();
      console.log('Έκλεισε η σύνδεση με την SQLite.');
   } catch (err) {
      throw err;
   }
}

export { getBooks, addBook, getBook, editBook, deleteBook, shutdown };
