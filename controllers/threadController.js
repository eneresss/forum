const db = require('../db');

exports.get_all_threads = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM thread');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create_thread = async (req, res) => {
  const { student_id, catalog_id, thread_name, thread_text, anonim_state } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO thread (student_id, catalog_id, thread_name, thread_text, created_date, anonim_state) VALUES (?, ?, ?, ?, NOW(), ?)',
      [student_id, catalog_id, thread_name, thread_text, anonim_state]
    );
    res.status(201).json({ thread_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
