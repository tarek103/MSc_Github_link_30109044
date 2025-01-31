<link rel="stylesheet" href="styles.css">

<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['request_id'])) {
    $request_id = $_POST['request_id'];

    try {
        // Update the request status to 'approved'
        $stmt = $pdo->prepare("UPDATE requests SET status = 'approved' WHERE id = ?");
        $stmt->execute([$request_id]);

        // Fetch the food listing ID linked to the approved request
        $stmt = $pdo->prepare("
            SELECT f.id 
            FROM requests r
            JOIN food_listings f ON r.donor_id = f.donor_id
            WHERE r.id = ?
        ");
        $stmt->execute([$request_id]);
        $food_listing = $stmt->fetch();

        if ($food_listing) {
            $food_id = $food_listing['id'];

            // Update only the specific food listing's availability
            $stmt = $pdo->prepare("UPDATE food_listings SET available = 0 WHERE id = ?");
            $stmt->execute([$food_id]);
        }

        header("Location: view_requests.php");
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
