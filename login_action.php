<link rel="stylesheet" href="styles.css">

<?php
include 'includes/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Check the verification status
        if ($user['verified'] === 'pending') {
            echo "Your account is pending verification. Please wait for admin approval. you can contact at tarek@gmail.com";
            exit();
        } elseif ($user['verified'] === 'rejected') {
            echo "Your account verification has been rejected. Please contact support  at tarek@gmail.com.";
            exit();
        }

        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['name'] = $user['name'];

        // Redirect to the appropriate dashboard
        if ($user['role'] === 'donor') {
            header("Location: /foodfinder/public/donor_dashboard.php");
        } elseif ($user['role'] === 'admin') {
            header("Location: /foodfinder/public/admin_dashboard.php");
        } elseif ($user['role'] === 'receiver') {
            header("Location: /foodfinder/public/receiver_dashboard.php");
        }
        exit();
    } else {
        echo "Invalid email or password!";
    }
}
?>
