const Thing = require('../models/thing');

exports.createThing = async function ({ name, body } = {}) {
  const thing = new Thing({ name, body });
  return thing.save();
}

exports.getThings = async function (query) {
  const page = +query.page;
  let limit = +query.limit || 10;
  if (!page) {
    limit = undefined;
  }
  const skip = limit * (page - 1);
  let allThings = [];
  const cursor = Thing.find({ _deletedAt: null }).select('_id name body').skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allThings;
    }
    allThings.push({ id: doc._id, name: doc.name, ...doc.body });
  }
}

exports.getThing = async function (id) {
  const currentThing = await Thing.find({ _id: id, _deletedAt: null }).select('_id name body');
  return { id: currentThing[0]._id, name: currentThing[0].name, ...currentThing[0].body };
}

exports.updateThing = async function (id, { name, body, _deletedAt }) {
  const valuesToUpdate = { name, body, _deletedAt };
  const newObject = {};
  for (let key in valuesToUpdate) {
    if (valuesToUpdate[key] !== undefined)
    newObject[key] = valuesToUpdate[key];
  }
  return await Thing.updateOne({ _id: id }, newObject);
}

exports.deleteThing = async function (id) {
  return await exports.updateThing(id, { _deletedAt: Date.now() });
};
