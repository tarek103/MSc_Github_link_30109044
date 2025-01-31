<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_id'], $_POST['action'])) {
    $user_id = $_POST['user_id'];
    $action = $_POST['action'];

    try {
        // Determine the new verification status based on the action
        $new_status = ($action === 'approve') ? 'verified' : 'rejected';

        // Update the user's verification status in the database
        $stmt = $pdo->prepare("UPDATE users SET verified = ? WHERE id = ?");
        $stmt->execute([$new_status, $user_id]);

        // Redirect back to the admin dashboard
        header("Location: admin_dashboard.php?message=User verification updated successfully.");
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
