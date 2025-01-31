<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['request_id'])) {
    $request_id = $_POST['request_id'];

    try {
        // Update the request status to 'rejected'
        $stmt = $pdo->prepare("UPDATE requests SET status = 'rejected' WHERE id = ?");
        $stmt->execute([$request_id]);

        header("Location: view_requests.php?message=Request rejected successfully.");
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
