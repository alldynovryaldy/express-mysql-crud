const connection = require('../config/database');

const getPosting = (req, res) => {
  connection.query(
    'SELECT * FROM posting ORDER BY id desc',
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Server Error',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'List data',
          data: rows,
        });
      }
    }
  );
};

const addPosting = (req, res) => {
  let formData = {
    title: req.body.title,
    content: req.body.content,
  };

  connection.query('INSERT INTO posting SET ?', formData, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Tambah data berhasil.',
      });
    }
  });
};

const detailPosting = (req, res) => {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM posting WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: 'Data tidak ditemukan!',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Detail data posting',
        data: rows[0],
      });
    }
  );
};

const updatePosting = (req, res) => {
  //id post
  let id = req.params.id;

  // define formData
  let formData = { ...req.body };

  let querySearch = `SELECT * FROM posting WHERE id = ${id}`;
  let queryUpdate = `UPDATE posting SET ? WHERE id = ${id}`;

  // check data
  connection.query(querySearch, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data tidak ditemukan!',
      });
    }

    // update query
    connection.query(queryUpdate, formData, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Berhasil memperbaharui data',
      });
    });
  });
};

const deletePosting = (req, res) => {
  let id = req.params.id;

  let querySearch = `SELECT * FROM posting WHERE id = ${id}`;
  let queryDelete = `DELETE FROM posting WHERE id =${id}`;

  // check
  connection.query(querySearch, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data tidak ditemukan!',
      });
    }

    // delete
    connection.query(queryDelete, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Berhasil menghapus data',
      });
    });
  });
};

module.exports = {
  getPosting,
  addPosting,
  detailPosting,
  updatePosting,
  deletePosting,
};
