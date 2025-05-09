/*
uses pg module
npm install pg
*/
import { Pool } from 'pg';

console.log('model-postgres.mjs');


// Configure the PostgreSQL connection pool
const pool = new Pool({
   user: process.env.PG_USER,
   host: process.env.PG_HOST,
   database: process.env.PG_DATABASE,
   password: process.env.PG_PASSWORD,
   port: process.env.PG_PORT,
});

// Retrieve all books from the database
const getBooks = async () => {
   try {
      const result = await pool.query('select * from books."Books" b ORDER BY b.title');
      return result.rbows;
   } catch (err) {
      throw err;
   }
};

// Add a new book to the database
const addBook = async (book) => {
   try {
      const result = await pool.query(
         'INSERT INTO books."Books" (title, author, comment) VALUES ($1, $2, $3)',
         [book.title, book.author, book.comment]
      );
      return result.rows[0];
   } catch (err) {
      throw err;
   }
};

// Delete a book from the database
const deleteBook = async (bookID) => {
   try {
      const result = await pool.query('DELETE FROM books."Books" WHERE books."Books"."bookID" = $1', [bookID]);
      return result.rows[0];
   } catch (err) {
      throw err;
   }
};

// Retrieve a single book by its ID
const getBook = async (bookID) => {
   try {
      const result = await pool.query('SELECT * FROM books."Books" WHERE books."Books"."bookID" = $1', [bookID]);
      return result.rows[0];
   } catch (err) {
      throw err;
   }
};

// Edit an existing book in the database
const editBook = async (book) => {
   try {
      const result = await pool.query(
         'UPDATE books."Books" SET title = $1, author = $2, comment = $3 WHERE "bookID" = $4',
         [book.title, book.author, book.comment, book.bookID]
      );
      return result.rows[0];
   } catch (err) {
      throw err;
   }
};

async function shutdown() {
   try {
     await pool.end(); 
     console.log('Η δεξαμενή PostgreSQL έκλεισε.');
   } catch (err) {
     throw err;
   }
 }

export { getBooks, addBook, getBook, editBook, deleteBook, shutdown };