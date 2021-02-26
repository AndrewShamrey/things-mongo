function generateThing(req) {
  const body = req.body;
  if (!body.name || typeof body.name !== "string") {
    return {message: `Param 'name' is required and should be 'String'`};
  }
  if (body.id) {
    delete body.id;
  }
  const name = body.name;
  delete body.name;
  return { name, body };
}

module.exports = { generateThing };
