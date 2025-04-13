const db = require('../db');

exports.get_answers = async (req, res) => {
  const { thread_id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM answer WHERE thread_id = ?', [thread_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create_answer = async (req, res) => {
  const { thread_id, student_id, answer_text, anonim_state } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO answer (thread_id, student_id, answer_text, created_date, anonim_state) VALUES (?, ?, ?, NOW(), ?)',
      [thread_id, student_id, answer_text, anonim_state]
    );
    res.status(201).json({ answer_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
