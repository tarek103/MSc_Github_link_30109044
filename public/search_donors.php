<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'receiver') {
    header("Location: login.php");
    exit();
}

include '../includes/db.php';

// Initialize receiver's latitude and longitude
$latitude = null;
$longitude = null;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];

    // Use Google's Geocoding API to get a readable address (reverse geocoding)
    $apiKey = "AIzaSyAhL0WJib4sDu3eXqcZOnXAF-EEJblWtSE";
    $geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$latitude,$longitude&key=$apiKey";

    // Fetch address using cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $geocodeUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $geocodeResponse = curl_exec($ch);
    curl_close($ch);

    $address = "Unknown Location";
    if ($geocodeResponse) {
        $responseData = json_decode($geocodeResponse, true);
        if (isset($responseData['results'][0]['formatted_address'])) {
            $address = $responseData['results'][0]['formatted_address'];
        }
    }

    //echo "<h3>Your Address:</h3>";
    //echo "<p>" . htmlspecialchars($address) . "</p>";

    // Calculate donors within a 2.5 km walking distance
    $walkingDistanceInKm = 2.5;

    try {
        $stmt = $pdo->prepare("
            SELECT *, 
            (6371 * acos(
                cos(radians(?)) * cos(radians(latitude)) * 
                cos(radians(longitude) - radians(?)) + 
                sin(radians(?)) * sin(radians(latitude))
            )) AS distance 
            FROM food_listings 
            WHERE available = 1
            HAVING distance <= ?
            ORDER BY distance ASC
        ");
        $stmt->execute([$latitude, $longitude, $latitude, $walkingDistanceInKm]);
        $donors = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Donors</title>
    <link rel="stylesheet" href="styles.css">

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhL0WJib4sDu3eXqcZOnXAF-EEJblWtSE&callback=initMap" async defer></script>
    <script>
        let map;

        function initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    // Populate hidden fields with the receiver's location
                    document.getElementById("latitude").value = userLocation.lat;
                    document.getElementById("longitude").value = userLocation.lng;

                    // Initialize the map centered at the receiver's location
                    map = new google.maps.Map(document.getElementById("map"), {
                        center: userLocation,
                        zoom: 14,
                    });

                    // Add marker for the receiver's location
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Your Location",
                    });

                    // Optionally, display address using reverse geocoding
                    fetchAddress(userLocation);
                }, () => {
                    alert("Unable to retrieve your location. Please enable location services.");
                });
            } else {
                alert("Geolocation is not supported by your browser.");
            }
        }

        function fetchAddress(location) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyAhL0WJib4sDu3eXqcZOnXAF-EEJblWtSE`;

            fetch(geocodeUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results[0]) {
                        document.getElementById("address").textContent = data.results[0].formatted_address;
                    }
                })
                .catch(() => {
                    document.getElementById("address").textContent = "Unable to fetch address.";
                });
        }
    </script>
</head>
<body>
    <div class="container">
        <h1>Nearby Donors (within 2.5 km)</h1>
        
        <h3>Your Address:</h3>
        <p id="address">Fetching address...</p>

        <form method="POST">
            <input type="hidden" id="latitude" name="latitude">
            <input type="hidden" id="longitude" name="longitude">
            <button type="submit">Search for Donors</button>
        </form>

        <?php if (!empty($donors)): ?>
            <ul>
                <?php foreach ($donors as $donor): ?>
                    <li>
                        <p>Food: <?php echo htmlspecialchars($donor['food_details']); ?></p>
                        <p>Distance: <?php echo round($donor['distance'], 2); ?> km</p>
                        <form action="request_food.php" method="POST">
                            <input type="hidden" name="food_listing_id" value="<?php echo $donor['id']; ?>">
                            <input type="hidden" name="donor_id" value="<?php echo $donor['donor_id']; ?>">
                            <button type="submit">Send Request</button>
                        </form>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <p>No available donors within 2.5 km.</p>
        <?php endif; ?>

        <div id="map" style="width: 100%; height: 400px; margin-top: 10px;"></div>
        <a href="receiver_dashboard.php">Back to Dashboard</a>
    </div>
</body>
</html>
