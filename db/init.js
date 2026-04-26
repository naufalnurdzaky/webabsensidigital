// Initialize database tables

const connection = require('../config/database');

const createTables = () => {
    // Create users table
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    // Create attendance table
    const attendanceTable = `
        CREATE TABLE IF NOT EXISTS attendance (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            check_in TIMESTAMP,
            check_out TIMESTAMP,
            date DATE,
            status VARCHAR(50),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    connection.query(usersTable, (err) => {
        if (err) console.error('Error creating users table:', err);
        else console.log('✅ Users table created/exists');
    });

    connection.query(attendanceTable, (err) => {
        if (err) console.error('Error creating attendance table:', err);
        else console.log('✅ Attendance table created/exists');
    });
};

module.exports = createTables;