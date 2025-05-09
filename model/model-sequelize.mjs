/*
uses sequelize module
npm install sequelize
*/

import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
   host: process.env.PG_HOST,
   port: process.env.PG_PORT,
   dialect: 'postgres',
   logging: false,
});

const Book = sequelize.define(
   'Book',
   {
      bookID: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      author: DataTypes.STRING,
      comment: DataTypes.TEXT,
   },
   {
      schema: 'books',
      tableName: 'Books',
      timestamps: false,
   }
);

// Connect and sync
await sequelize.authenticate();

try {
   await Book.sync(); // creates table if not exists
} catch (err) {
   throw err;
}

async function shutdown() {
   await sequelize.close();
   console.log('Η σύνδεση με την PostgreSQL (Sequelize) έκλεισε');
}

const getBooks = async () => {
   const books = await Book.findAll();
   return (await Book.findAll()).map((b) => b.toJSON());
};

const addBook = async (book) => {
   await Book.create(book);
};

const getBook = async (bookID) => {
   const book = await Book.findByPk(bookID);
   return book?.toJSON() || null;
};

const editBook = async (book) => {
   const { bookID, ...updates } = book;
   await Book.update(updates, { where: { bookID: bookID } });
   return getBook(bookID);
};

// delete book
const deleteBook = async (bookID) => {
   await Book.destroy({ where: { bookID: bookID } });
};

export { getBooks, getBook, addBook, editBook, deleteBook, shutdown };
