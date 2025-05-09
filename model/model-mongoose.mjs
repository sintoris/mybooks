import dotenv from 'dotenv';
import mongoose from 'mongoose';

console.log('Χρησιμοποιώ model-mongoose.mjs');

dotenv.config();

// Connect to mongodb
async function connectDB() {
   try {
      await mongoose.connect(process.env.MONGO_CONNECTION);
      mongoose.set('debug', true);
   } catch (err) {
      throw err;
   }
}

await connectDB();
const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error: "));
db.once('open', () => {
   console.log('Connected successfully');
});

// MONGOOSE schemata and model definition for books and users

const bookSchema = new mongoose.Schema({ title: String, author: String, comment: String });

const Book = mongoose.model('Book', bookSchema, 'books');

// Interface to the database

async function getBooks() {
   // ανάκτηση όλων των βιβλίων του χρήστη από τη βάση δεδομένων
   try {
      const books = [];
      for await (const book of Book.find()) {
         let currentBook = book.toObject();
         currentBook.bookID = currentBook._id.toString();

         books.push(currentBook);
         console.log('book', currentBook);
      }
      // ή
      // const cursor = Book.find().cursor(); // no await
      // for (let book = await cursor.next(); book != null; book = await cursor.next()) {
      //   books.push(book.toObject());
      // }
      return books;
   } catch (err) {
      throw err;
   }
}

async function addBook(book) {
   try {
      const newBook = new Book(book);
      await newBook.save(newBook);
   } catch (err) {
      throw err;
   }
}

async function getBook(bookID) {
   try {
      const book = await Book.findById(bookID).lean();

      book.bookID = book._id.toString();

      return book;
   } catch (err) {
      throw err;
   }
}

async function editBook(book) {
  const { bookID, ...updates } = book; // exclude `bookID` or `_id`

   try {
      const updatedBook = await Book.findByIdAndUpdate(book.bookID, updates, {
         new: true,
         runValidators: true,
      });

      return updatedBook;
   } catch (err) {
      throw err;
   }
}

async function deleteBook(bookID) {
   try {
      await Book.findByIdAndDelete(bookID);
   } catch (err) {
      throw err;
   }
}

export { getBooks, addBook, getBook, editBook, deleteBook };
