import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const client = new MongoClient(process.env.MONGO_CONNECTION);
await client.connect();

const db = client.db();
const booksCollection = db.collection('books');

async function getBooks() {
   try {
      const booksCursor = await booksCollection.find({});
      const books = await booksCursor.toArray();

      return books.map((book) => ({
         ...book,
         bookID: book._id.toString(),
      }));
   } catch (err) {
      throw err;
   }
}

async function addBook(book) {
   try {
      await booksCollection.insertOne(book);
   } catch (err) {
      throw err;
   }
}

async function getBook(bookID) {
   try {
      const book = await booksCollection.findOne({ _id: ObjectId(bookID) });
      if (!book) return null;

      return {
         ...book,
         bookID: book._id.toString(),
      };
   } catch (err) {
      throw err;
   }
}

async function editBook(book) {
   const { bookID, ...updates } = book;

   try {
      const result = await booksCollection.findOneAndUpdate(
         { _id: ObjectId(bookID) },
         { $set: updates },
         { returnDocument: 'after' }
      );

      if (!result.value) return null;

      return {
         ...result.value,
         bookID: result.value._id.toString(),
      };
   } catch (err) {
      throw err;
   }
}

async function deleteBook(bookID) {
   try {
      await booksCollection.deleteOne({ _id: ObjectId(bookID) });
   } catch (err) {
      throw err;
   }
}

async function shutdown() {
   try {
      await client.close();
      console.log('Η σύνδεση με τη MongoDB έκλεισε.');
   } catch (err) {
      throw err;
   }
}

export { getBooks, addBook, getBook, editBook, deleteBook, shutdown };
