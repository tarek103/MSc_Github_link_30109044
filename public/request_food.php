<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'receiver') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['food_listing_id'])) {
    $receiver_id = $_SESSION['user_id'];
    $food_listing_id = $_POST['food_listing_id'];
    

    try {
        // Fetch the donor_id associated with the food listing
        $stmt = $pdo->prepare("SELECT donor_id FROM food_listings WHERE id = ?");
        $stmt->execute([$food_listing_id]);
        $food_listing = $stmt->fetch();

        if ($food_listing) {
            $donor_id = $food_listing['donor_id'];

            // Insert the new request with the food_listing_id
            $stmt = $pdo->prepare("INSERT INTO requests (receiver_id, donor_id, food_listing_id, status) VALUES (?, ?, ?, 'pending')");
            $stmt->execute([$receiver_id, $donor_id, $food_listing_id]);

            header("Location: view_my_requests.php");
            exit();
        } else {
            echo "Food listing not found.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
