const { Project } = require("../../db");
const { User } = require("../../db");


const handleError = (res) => {
  res.json({ "message": "bad" });
}


const getUserDate = async (req, res) => {
  let date;
  const { year, month, day } = req.params;
  try {
    date = new Date(`${year}-${month}-${day}`);
  }
  catch (e) {
    handleError(res);
  }
  let notes = await DesignNote.find({ date: date });
  res.json(notes);
}


const setUserDate = async (req, res) => {
  const { section, placement, slug, wordCount, art, status, comments } = req.body;
  const { year, month, day } = req.params;

  const date = new Date(`${year}-${month}-${day}`);

  const query = { placement, slug, section, wordCount, art, comments, status, date };
  if (section == "inserts") {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 14);
    query.expireAt = expiration;
  }

  await DesignNote.create(query, (err, note) => {
    if (err) {
      handleError(res);
    }

    res.json(note);
  })
}


const updateUser = async (req, res) => {
  const { id, placement, slug, section, wordCount, art, comments, status, date } = req.body;
  // TODO this is so bad
  const query = {};
  placement && (query.placement = placement);
  slug && (query.slug = slug);
  wordCount && (query.wordCount = wordCount);
  art && (query.art = art);
  comments && (query.comments = comments);
  status && (query.status = status);

  let entry = await DesignNote.findByIdAndUpdate(id, query);
  res.json(entry);
}


const removeUser = async (req, res) => {
  let { id } = req.params;

  let note = await DesignNote.findByIdAndRemove(id);
  if (note) {
    res.json(note);
  } else {
    res.json([]);
  }
}


module.exports = {
  handleError,
  getUserDate,
  setUserDate,
  updateUser,
  removeUser,
};
