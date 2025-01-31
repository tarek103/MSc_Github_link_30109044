<link rel="stylesheet" href="styles.css">

<?php
include 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = $_POST['phone'];
    $role = $_POST['role'];

    // Handle the photo ID upload
    if (isset($_FILES['photo_id']) && $_FILES['photo_id']['error'] === UPLOAD_ERR_OK) {
        // Define the absolute upload directory path
        $upload_dir = __DIR__ . '/uploads/photo_ids/';
        $filename = uniqid() . '-' . basename($_FILES['photo_id']['name']);
        $target_file = $upload_dir . $filename;

        // Check if the upload directory exists, if not, create it
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }

        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($_FILES['photo_id']['tmp_name'], $target_file)) {
            try {
                // Insert user data into the database, setting verification status to 'pending'
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password, phone, role, verified, photo_id) VALUES (?, ?, ?, ?, ?, 'pending', ?)");
                $stmt->execute([$name, $email, $password, $phone, $role, $filename]);

                echo "Registration successful! Please wait for admin verification.";
                echo "<script type='text/javascript'>
        setTimeout(function() {
            window.location.href = 'http://localhost/foodfinder/';
        }, 5000); // 5000 milliseconds = 5 seconds
      </script>";


echo "<p>You will be redirected to the Foodfinder page in 5 seconds...</p>";
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) {
                    echo "Email already exists!";
                } else {
                    echo "Error: " . $e->getMessage();
                }
            }
        } else {
            echo "Failed to upload photo ID. Please check folder permissions.";
        }
    } else {
        echo "Please upload a valid photo ID.";
    }
}
?>
