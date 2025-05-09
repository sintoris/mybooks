CREATE TABLE IF NOT EXISTS "Books" (
	"bookID"	INTEGER,
	"title"	VARCHAR(100) NOT NULL,
	"author"	VARCHAR(100) NOT NULL,
	"comment"	TEXT,
	"user"	INTEGER,
	PRIMARY KEY("bookID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Users" (
	"userID"	INTEGER,
	"userName"	TEXT NOT NULL,
	PRIMARY KEY("userID" AUTOINCREMENT)
);
INSERT INTO "Books" VALUES (3,'Theory and Design of Pervasive Games','Markus Montola','βασικό βιβλίο για χωρικά παιχνίδια, highly recommended',1);
INSERT INTO "Books" VALUES (4,'Τεχνοπώλιο','Niel Postman','Εξαιρετική κριτική στα σύγχρονα μέσα ενημέρωσης',1);
INSERT INTO "Books" VALUES (7,'Η Aλίκη στη χώρα των θαυμάτων','Luis Caroll','',2);
INSERT INTO "Books" VALUES (10,'Through the looking glass','Luis Caroll','το δεύτερο, λιγότερο γνωστό βιβλίο του',2);
INSERT INTO "Books" VALUES (11,'Τo Κεφάλαιο','Καρόλου Μαρξ','Ενδιαφέρον ανάγνωσμα',12);
INSERT INTO "Books" VALUES (14,'Ένα ακόμη','Συγγραφέας','Δεν έχω πολλά να πω για το βιβλίο τούτο',1);
INSERT INTO "Books" VALUES (24,'Δον Κιχώτης','Θερβάντες','Όχι τόσο εξαιρετικό βιβλίο',22);
INSERT INTO "Books" VALUES (25,'Πόλεμος και Ειρήνη','Λέων Τολστόι','Επικό αλλά βαρετό',22);
INSERT INTO "Books" VALUES (26,'Lord of the Rings','J.R. Tolkien','',22);
INSERT INTO "Books" VALUES (31,'Όσα παίρνει ο άνεμος','M. Mitchel','',18);
INSERT INTO "Books" VALUES (36,'Κυβεριάδα','Στάνισλαβ Λεμ','',NULL);
INSERT INTO "Users" VALUES (1,'Nikos');
INSERT INTO "Users" VALUES (2,'Katerina');
INSERT INTO "Users" VALUES (12,'Kostas');
INSERT INTO "Users" VALUES (17,'Γιώργος');
INSERT INTO "Users" VALUES (18,'Κατερίνα');
INSERT INTO "Users" VALUES (19,'asdfasfasd');
INSERT INTO "Users" VALUES (22,'nikos');
INSERT INTO "Users" VALUES (23,'Νίκος');
INSERT INTO "Users" VALUES (24,'maria');
INSERT INTO "Users" VALUES (25,'chris');
INSERT INTO "Users" VALUES (30,'Babis');
