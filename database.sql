-- Script SQL untuk membuat database dan tabel absensi
-- Jalankan script ini di phpMyAdmin atau MySQL Command Line

-- Buat database
CREATE DATABASE IF NOT EXISTS absensi_db;

-- Gunakan database
USE absensi_db;

-- Buat tabel absensi
CREATE TABLE IF NOT EXISTS absensi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    waktu_kehadiran DATETIME NOT NULL,
    INDEX idx_waktu (waktu_kehadiran)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
