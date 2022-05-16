const db = require('../config/database')

exports.get = (req, res) => {
  db.query(
    'SELECT * FROM posting ORDER BY id desc',
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Server Error',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'List data',
        data: rows,
      });
    }
  );
}

exports.store = (req, res) => {
  let formData = {
    title: req.body.title,
    content: req.body.content,
  };

  db.query('INSERT INTO posting SET ?', formData, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Tambah data berhasil.',
    });
  });
}

exports.edit = (req, res) => {
  let id = req.params.id;

  db.query(
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
}

exports.update = (req, res) => {
  //id post
  let id = req.params.id;

  // define formData
  let formData = {
    ...req.body
  };

  let querySearch = `SELECT * FROM posting WHERE id = ${id}`;
  let queryUpdate = `UPDATE posting SET ? WHERE id = ${id}`;

  // check data
  db.query(querySearch, function (err, rows) {
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
  });

  // update query
  db.query(queryUpdate, formData, function (err, rows) {
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
}

exports.destroy = (req, res) => {
  let id = req.params.id;

  let querySearch = `SELECT * FROM posting WHERE id = ${id}`;
  let queryDelete = `DELETE FROM posting WHERE id =${id}`;

  // check
  db.query(querySearch, function (err, rows) {
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
  });

  // delete
  db.query(queryDelete, function (err, rows) {
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
}