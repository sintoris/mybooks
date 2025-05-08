import express from 'express';
import exphbs from 'express-handlebars';
// import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

console.log(`dirname : ${import.meta.dirname}`);

//import * as model from './model/model_fs.js'; ////// first attempt with plain JSON file
// import * as model from './model/model_lite.mjs'; ////// second attempt with sqlite3
// import * as model from './model/model-sqlite-node.mjs'; // Node.js built-in module for sqlite3
// import * as model from './model/model_pg.js'; ////// third attempt with postgresql
////

// Δημιουργία εξυπηρετητή Express
const app = express();

// Διαμόρφωση του εξυπηρετητή - μηχανής handlebars
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// // Προσθήκη του express-session middleware
// app.use(
//    session({
//       name: process.env.SESS_NAME,
//       secret: process.env.SESSION_SECRET || 'PynOjAuHetAuWawtinAytVunar', // κλειδί για κρυπτογράφηση του cookie
//       resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
//       saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
//       cookie: {
//          maxAge: 2 * 60 * 60 * 1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
//          sameSite: true,
//       },
//    })
// );

//// ROUTES //////
import { router } from './routes/router.mjs'; // import the router from router.mjs

app.use('/', router);
app.post('/', router);
app.get('/about', router);
app.get('/books', router);
app.get('/create', router);
app.post('/create', router);
app.get('/edit/:bookID', router);
app.post('/edit/:bookID', router);
app.get('/delete/:bookID', router);
app.post('/delete/:bookID', router);
app.get('/logout', router);

// GET /stats
// εδώ να προστεθεί κώδικας που θα πρέπει να είναι μόνο προσβάσιμος αν
// ο χρήστης λέγεται admin


app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).render('error', { error: err, layout: false });
});

console.log(process.env.PORT);
// Εκκίνηση του εξυπηρετητή
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
   console.log(`Συνδεθείτε στη σελίδα: http://localhost:${PORT}`);
});
