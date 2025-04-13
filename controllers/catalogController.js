const db = require('../db');

exports.get_all_catalogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT catalog_id, name_catalog FROM catalog'); 
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.get_catalog_id = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM catalog WHERE catalog_id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
