<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

$donor_id = $_SESSION['user_id'];

try {
    // Fetch donor's food listings along with the request statuses
    $stmt = $pdo->prepare("
        SELECT f.id AS food_listing_id, f.food_details, f.available, 
               COUNT(r.id) AS pending_requests 
        FROM food_listings f
        LEFT JOIN requests r ON f.id = r.food_listing_id AND r.status = 'pending'
        WHERE f.donor_id = ?
        GROUP BY f.id
        ORDER BY f.created_at DESC
    ");
    $stmt->execute([$donor_id]);
    $food_listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donor Dashboard</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
<h1>Welcome, <?php echo $_SESSION['name']; ?> (Donor)</h1>
    <a href="add_food.php">Add Food Listing</a> |
    <a href="view_requests.php">View Requests</a> |
    <a href="logout.php">Logout</a>
    <hr>
    <p>Here, you can manage your food listings and approve requests.</p>
    <p>if there is any issue with any Receiver, you can contact us at +44 7440592288</p>
    <p>incase if you are injured or emergency, you can contact Police or NHS at 999/111</p>

    <h1>My Food Listings</h1>
    <?php if (!empty($food_listings)): ?>
        <table border="1" cellpadding="10" cellspacing="0">
            <thead>
                <tr>
                    <th>Food Details</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($food_listings as $listing): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($listing['food_details']); ?></td>
                        <td>
                            <?php
                                if ($listing['available'] == 0) {
                                    echo "<span style='color: gray;'>Unavailable</span>";
                                } elseif ($listing['pending_requests'] > 0) {
                                    echo "<span style='color: orange;'>Pending Requests</span>";
                                } else {
                                    echo "<span style='color: green;'>Available</span>";
                                }
                            ?>
                        </td>
                        <td>
                            <?php if ($listing['pending_requests'] == 0 && $listing['available'] == 1): ?>
                                <a href="update_listing.php?id=<?php echo $listing['food_listing_id']; ?>">Update</a>
                                <form action="delete_listing.php" method="POST" style="display:inline;">
                                    <input type="hidden" name="food_listing_id" value="<?php echo $listing['food_listing_id']; ?>">
                                    <button type="submit" onclick="return confirm('Are you sure you want to delete this listing?')">Delete</button>
                                </form>
                            <?php else: ?>
                                <span style="color: gray;">Update/Delete Not Allowed</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>You have no food listings.</p>
    <?php endif; ?>
    
</body>
</html>
