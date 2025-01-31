<link rel="stylesheet" href="styles.css">

<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['food_listing_id'])) {
    $food_listing_id = $_POST['food_listing_id'];
    $donor_id = $_SESSION['user_id'];

    try {
        // Check if there are any pending or approved requests for the listing
        $stmt = $pdo->prepare("
            SELECT COUNT(*) AS request_count 
            FROM requests 
            WHERE food_listing_id = ? AND (status = 'pending' OR status = 'approved')
        ");
        $stmt->execute([$food_listing_id]);
        $result = $stmt->fetch();

        if ($result['request_count'] > 0) {
            echo "Cannot delete listing. There are pending or approved requests.";
            exit();
        }

        // Proceed to delete the listing
        $stmt = $pdo->prepare("DELETE FROM food_listings WHERE id = ? AND donor_id = ?");
        $stmt->execute([$food_listing_id, $donor_id]);

        header("Location: donor_dashboard.php");
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Invalid request.";
}
?>
