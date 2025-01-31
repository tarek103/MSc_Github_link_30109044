<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

$donor_id = $_SESSION['user_id'];

// Handle POST request (form submission for updating the listing)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['food_listing_id'], $_POST['food_details'])) {
        $food_listing_id = $_POST['food_listing_id'];
        $food_details = $_POST['food_details'];

        try {
            // Check if there are any pending requests for the listing
            $stmt = $pdo->prepare("
                SELECT COUNT(*) AS pending_requests 
                FROM requests 
                WHERE food_listing_id = ? AND status = 'pending'
            ");
            $stmt->execute([$food_listing_id]);
            $result = $stmt->fetch();

            if ($result['pending_requests'] > 0) {
                echo "Cannot update listing. There are pending requests.";
                exit();
            }

            // Update the food details if no pending requests exist
            $stmt = $pdo->prepare("UPDATE food_listings SET food_details = ? WHERE id = ? AND donor_id = ?");
            $stmt->execute([$food_details, $food_listing_id, $donor_id]);

            // Redirect to the donor dashboard
            header("Location: donor_dashboard.php");
            exit();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Invalid form submission.";
        exit();
    }
}

// Handle GET request (loading the current listing details)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $food_listing_id = $_GET['id'] ?? null;

    if (!$food_listing_id) {
        echo "Invalid listing ID.";
        exit();
    }

    try {
        // Fetch the current details of the listing
        $stmt = $pdo->prepare("SELECT * FROM food_listings WHERE id = ? AND donor_id = ?");
        $stmt->execute([$food_listing_id, $donor_id]);
        $listing = $stmt->fetch();

        if (!$listing) {
            echo "Listing not found.";
            exit();
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        exit();
    }
}
?>

<!-- HTML Form for Updating the Listing -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Listing</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>Update Food Listing</h1>
    <form action="update_listing.php" method="POST">
        <input type="hidden" name="food_listing_id" value="<?php echo htmlspecialchars($listing['id']); ?>">
        <label for="food_details">Food Details:</label>
        <input type="text" id="food_details" name="food_details" value="<?php echo htmlspecialchars($listing['food_details']); ?>" required>
        <button type="submit">Update</button>
    </form>
    <a href="donor_dashboard.php">Back to Dashboard</a>
</body>
</html>
