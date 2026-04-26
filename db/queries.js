// Database helper functions for common queries

const connection = require('../config/database');

const Database = {
    select: (table, callback) => {
        const query = `SELECT * FROM ${table}`;
        connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    selectById: (table, id, callback) => {
        const query = `SELECT * FROM ${table} WHERE id = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    insert: (table, data, callback) => {
        const query = `INSERT INTO ${table} SET ?`;
        connection.query(query, data, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    update: (table, data, id, callback) => {
        const query = `UPDATE ${table} SET ? WHERE id = ?`;
        connection.query(query, [data, id], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    delete: (table, id, callback) => {
        const query = `DELETE FROM ${table} WHERE id = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }
};

module.exports = Database;