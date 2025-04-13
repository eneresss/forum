const db = require('../db');

const isModerator = async (student_id) => {
  const [rows] = await db.query('SELECT * FROM moderator WHERE student_id = ?', [student_id]);
  return rows.length > 0;
};

const student_exist = async (student_id) => {
  const [rows] = await db.query('SELECT * FROM student WHERE student_id = ?', [student_id]);
  return rows.length > 0;
};

exports.delete_thread = async (req, res) => {
  const { student_id, thread_id } = req.body;

  const isMod = await isModerator(student_id);
  if (!isMod) {
    return res.status(403).json({ error: 'вы не модератор' });
  }

  try {

    const [result] = await db.query('INSERT INTO thread_deleted (thread_id) VALUES (?)', [thread_id]);

    await db.query('DELETE FROM thread WHERE thread_id = ?', [thread_id]);

    res.status(200).json({ message: 'тред удален', deleted_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete_answer = async (req, res) => {
  const { student_id, answer_id } = req.body;

  const isMod = await isModerator(student_id);
  if (!isMod) {
    return res.status(403).json({ error: 'вы не модератор' });
  }

  try {
    const [result] = await db.query('INSERT INTO answer_deleted (answer_id) VALUES (?)', [answer_id]);

    await db.query('DELETE FROM answer WHERE answer_id = ?', [answer_id]);

    res.status(200).json({ message: 'ответ удален', deleted_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add_moderator = async (req, res) => {
  const { student_id } = req.body;

  const studentExists = await student_exist(student_id);
  if (!studentExists) {
    return res.status(404).json({ error: 'студент не найден' });
  }

  const isMod = await isModerator(student_id);
  if (isMod) {
    return res.status(400).json({ error: 'студент уже модератор' });
  }

  try {
    const [result] = await db.query('INSERT INTO moderator (student_id) VALUES (?)', [student_id]);
    res.status(201).json({
      moderator_id: result.insertId,
      message: 'стдуент назначен модератором',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};