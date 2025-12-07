<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/db.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

if ($action === 'insert') {
    handleInsert();
} elseif ($action === 'get') {
    handleGet();
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Action tidak valid'
    ]);
}

function handleInsert()
{
    global $conn;

    $nama = isset($_POST['nama']) ? trim($_POST['nama']) : '';
    $jurusan = isset($_POST['jurusan']) ? trim($_POST['jurusan']) : '';

    if (empty($nama) || empty($jurusan)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Nama dan jurusan harus diisi'
        ]);
        return;
    }

    try {
        $sql = "INSERT INTO absensi (nama, jurusan, waktu_kehadiran) VALUES (:nama, :jurusan, NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nama', $nama);
        $stmt->bindParam(':jurusan', $jurusan);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Absensi berhasil dicatat'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Gagal menyimpan data'
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

function handleGet()
{
    global $conn;

    try {
        $sql = "SELECT id, nama, jurusan, waktu_kehadiran FROM absensi ORDER BY waktu_kehadiran DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $data
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}
