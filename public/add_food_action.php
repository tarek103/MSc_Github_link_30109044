<link rel="stylesheet" href="styles.css">

<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}
include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $food_details = $_POST['food_details'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $donor_id = $_SESSION['user_id'];

    try {
        $stmt = $pdo->prepare("INSERT INTO food_listings (donor_id, food_details, latitude, longitude) VALUES (?, ?, ?, ?)");
        $stmt->execute([$donor_id, $food_details, $latitude, $longitude]);
        echo "Food listing added successfully!";
        header("Location: donor_dashboard.php");
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
