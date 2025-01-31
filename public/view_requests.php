<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'donor') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

$donor_id = $_SESSION['user_id'];

try {
    // Fetch pending requests for the logged-in donor
    $stmt = $pdo->prepare("
        SELECT r.id AS request_id, u.name AS receiver_name, u.phone 
        FROM requests r 
        JOIN users u ON r.receiver_id = u.id 
        WHERE r.donor_id = ? AND r.status = 'pending'
    ");
    $stmt->execute([$donor_id]);
    $requests = $stmt->fetchAll();
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Requests</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>Pending Requests</h1>
    <?php if ($requests): ?>
        <ul>
            <?php foreach ($requests as $request): ?>
                <li>
                    <p>Receiver: <?php echo htmlspecialchars($request['receiver_name']); ?></p>
                    <p>Phone: <?php echo htmlspecialchars($request['phone']); ?></p>

                    <!-- Approve Form -->
                    <form action="approve_request.php" method="POST" style="display:inline;">
                        <input type="hidden" name="request_id" value="<?php echo $request['request_id']; ?>">
                        <button type="submit">Approve</button>
                    </form>

                    <!-- Reject Form -->
                    <form action="reject_request.php" method="POST" style="display:inline;">
                        <input type="hidden" name="request_id" value="<?php echo $request['request_id']; ?>">
                        <button type="submit" onclick="return confirm('Are you sure you want to reject this request?')">Reject</button>
                    </form>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>No pending requests.</p>
    <?php endif; ?>
    <a href="donor_dashboard.php">Back to Dashboard</a>
</body>
</html>
