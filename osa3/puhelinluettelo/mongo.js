const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    `usage: node ${__filename.slice(__dirname.length + 1)} [password] ([name] [number])`,
  );
  return process.exit(1);
}

const password = process.argv[2];
const URL = `mongodb+srv://fullstack:${password}@cluster0.oswtvtx.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(URL, { family: 4 });

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', personSchema);

// henkilön lisääminen
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  // sama kuin new Person({ name, number }).save();
  const person = Person.create({ name, number });

  person.then(() => {
    console.log('Person added to the database!');
    mongoose.connection.close();
  });
}
// henkilöiden haku
else {
  Person.find({}).then((res) => {
    if (res.length > 0) {
      console.log('phonebook:');
      res.forEach((person) => console.log(`${person.name} ${person.number}`));
    } else {
      console.log('phonebook is empty');
    }
    mongoose.connection.close();
  });
}
