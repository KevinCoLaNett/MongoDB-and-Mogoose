require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name : { type: String, required: true },
  age :  Number,
  favoriteFoods : [String]
});


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Keshav', 
    age: 18, 
  favoriteFoods: ['water']
  });

  person.save((err, data) => {
    if(err) return done(err);
    return done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) return done(err);
    return done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, peopleFound) => {
    if(err) return done(err);
    return done(null, peopleFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, individualFood) => {
    if(err) return done(err);
    return done(null, individualFood);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, personWithThisId) => {
    if(err) return done(err);
    return done(null, personWithThisId);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, personWithThisId) => {
    if(err) return done(err);
    personWithThisId.favoriteFoods.push(foodToAdd);
    personWithThisId.save((err, data) => {
      if(err) return done(err);
      return done(null, data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {"name": personName},
    {"age":ageToSet},{new : true}, 
    (err, peopleFound) => {
      if(err) return done(err);
      return done(null, peopleFound);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personToRemove) => {
    if(err) return done(err);
    return done(null, personToRemove);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) console.log(err);
    done(null, result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: {$all: [foodToSearch]}})
  .sort({ name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if(err) console.log(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
