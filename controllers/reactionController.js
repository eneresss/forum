const db = require('../db');

exports.reactToThread = async (req, res) => {
  const { student_id, thread_id, type_reaction } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO thread_reaction (student_id, thread_id, type_reaction) VALUES (?, ?, ?)',
      [student_id, thread_id, type_reaction]
    );
    res.status(201).json({ thread_reaction_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reactToAnswer = async (req, res) => {
  const { student_id, answer_id, type_reaction } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO answer_reaction (student_id, answer_id, type_reaction) VALUES (?, ?, ?)',
      [student_id, answer_id, type_reaction]
    );
    res.status(201).json({ answer_reaction_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
