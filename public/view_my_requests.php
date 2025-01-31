<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'receiver') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

$receiver_id = $_SESSION['user_id'];

try {
    // Fetch requests made by the receiver, including the donor's phone number
    $stmt = $pdo->prepare("
        SELECT r.id, r.status, r.created_at, 
               u.name AS donor_name, u.phone AS donor_phone, 
               f.food_details, f.latitude, f.longitude
        FROM requests r
        JOIN users u ON r.donor_id = u.id
        JOIN food_listings f ON r.food_listing_id = f.id
        WHERE r.receiver_id = ?
        ORDER BY r.created_at DESC
    ");
    $stmt->execute([$receiver_id]);
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Requests</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>My Requests</h1>
    <?php if (!empty($requests)): ?>
        <table border="1" cellpadding="10" cellspacing="0">
            <thead>
                <tr>
                    <th>Food Details</th>
                    <th>Donor Name</th>
                    <th>Status</th>
                    <th>Requested On</th>
                    <th>Pickup Location</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($requests as $request): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($request['food_details']); ?></td>
                        <td><?php echo htmlspecialchars($request['donor_name']); ?></td>
                        <td>
                            <?php 
                                if ($request['status'] === 'pending') {
                                    echo "<span style='color: orange;'>Pending</span>";
                                } elseif ($request['status'] === 'approved') {
                                    echo "<span style='color: green;'>Approved</span>";
                                } else {
                                    echo "<span style='color: red;'>Declined</span>";
                                }
                            ?>
                        </td>
                        <td><?php echo date('Y-m-d H:i:s', strtotime($request['created_at'])); ?></td>
                        <td>
                            <?php if ($request['status'] === 'approved'): ?>
                                <a href="https://www.google.com/maps/search/?api=1&query=<?php echo $request['latitude']; ?>,<?php echo $request['longitude']; ?>" 
                                   target="_blank">View Location</a>
                            <?php else: ?>
                                <span style="color: gray;">Not Available</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ($request['status'] === 'approved'): ?>
                                <p><?php echo htmlspecialchars($request['donor_phone']); ?></p>
                            <?php else: ?>
                                <span style="color: gray;">Not Available</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php else: ?>
        <p>You have no requests.</p>
    <?php endif; ?>
    <a href="receiver_dashboard.php">Back to Dashboard</a>
</body>
</html>
