<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'receiver') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receiver Dashboard</title>
    <link rel="stylesheet" href="styles.css">

</head>
<body>
    <h1>Welcome, <?php echo $_SESSION['name']; ?> (Receiver)</h1>
    <a href="search_donors.php">Search Donors</a> |
    <a href="view_my_requests.php">View My Requests</a> |
    <a href="logout.php">Logout</a>
    <hr>
    <p>Here, You can search for nearby donors and request food.</p>
    <p>if there is any issue with food or with any donor, you can contact us at +44 7440592288</p>
    <p>incase if are sick or emergency, you can contact Police or NHS at 999/111</p>
</body>
</html>
