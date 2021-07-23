const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all parties
router.get('/parties', (req, res) => {
  // internal logic remains the same
});

// Get single party
router.get('/party/:id', (req, res) => {});

// Delete a party
router.delete('/party/:id', (req, res) => {});

// Get single voter
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

  router.post('/voter', ({ body }, res) => {
    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];
  // Data validation
const errors = inputCheck(body, 'first_name', 'last_name', 'email');
if (errors) {
  res.status(400).json({ error: errors });
  return;
}
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });

module.exports = router;