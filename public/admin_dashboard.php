<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

// Fetch all users, pending verifications, and food listings
try {
    $users_stmt = $pdo->prepare("SELECT id, name, email, role, status FROM users");
    $users_stmt->execute();
    $users = $users_stmt->fetchAll(PDO::FETCH_ASSOC);

    $pending_verifications_stmt = $pdo->prepare("SELECT id, name, email, role, photo_id FROM users WHERE verified = 'pending'");
    $pending_verifications_stmt->execute();
    $pending_verifications = $pending_verifications_stmt->fetchAll(PDO::FETCH_ASSOC);

    $listings_stmt = $pdo->prepare("
        SELECT f.id AS listing_id, f.food_details, f.available, u.name AS donor_name
        FROM food_listings f
        JOIN users u ON f.donor_id = u.id
        ORDER BY f.created_at DESC
    ");
    $listings_stmt->execute();
    $food_listings = $listings_stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>Admin Dashboard</h1>

    <!-- Manage Pending Verifications -->
    <h2>Pending User Verifications</h2>
    <?php if (!empty($pending_verifications)): ?>
        <table border="1" cellpadding="10" cellspacing="0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Photo ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($pending_verifications as $user): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($user['name']); ?></td>
                        <td><?php echo htmlspecialchars($user['email']); ?></td>
                        <td><?php echo htmlspecialchars($user['role']); ?></td>
                        <td>
                            <a href="../uploads/photo_ids/<?php echo htmlspecialchars($user['photo_id']); ?>" target="_blank">View Photo</a>
                        </td>
                        <td>
                            <form action="verify_user_action.php" method="POST" style="display:inline;">
                                <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                <button type="submit" name="action" value="approve">Approve</button>
                                <button type="submit" name="action" value="reject">Reject</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>No pending verifications.</p>
    <?php endif; ?>

    <!-- Manage Users -->
    <h2>Manage Users</h2>
    <table border="1" cellpadding="10" cellspacing="0">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td><?php echo htmlspecialchars($user['name']); ?></td>
                    <td><?php echo htmlspecialchars($user['email']); ?></td>
                    <td><?php echo htmlspecialchars($user['role']); ?></td>
                    <td><?php echo htmlspecialchars($user['status']); ?></td>
                    <td>
                        <?php if ($user['status'] === 'active'): ?>
                            <form action="block_user.php" method="POST" style="display:inline;">
                                <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                <button type="submit">Block</button>
                            </form>
                        <?php else: ?>
                            <form action="unblock_user.php" method="POST" style="display:inline;">
                                <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                <button type="submit">Unblock</button>
                            </form>
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Manage Food Listings -->
    <h2>Manage Food Listings</h2>
    <table border="1" cellpadding="10" cellspacing="0">
        <thead>
            <tr>
                <th>Food Details</th>
                <th>Donor Name</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($food_listings as $listing): ?>
                <tr>
                    <td><?php echo htmlspecialchars($listing['food_details']); ?></td>
                    <td><?php echo htmlspecialchars($listing['donor_name']); ?></td>
                    <td><?php echo $listing['available'] ? 'Available' : 'Unavailable'; ?></td>
                    <td>
                        <form action="delete_listing.php" method="POST" style="display:inline;">
                            <input type="hidden" name="listing_id" value="<?php echo $listing['listing_id']; ?>">
                            <button type="submit" onclick="return confirm('Are you sure you want to delete this listing?')">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <a href="logout.php">Logout</a>
</body>
</html>
