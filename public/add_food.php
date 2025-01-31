<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Food Listing</title>

    <!-- Google Maps JavaScript API with Places library -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhL0WJib4sDu3eXqcZOnXAF-EEJblWtSE&libraries=places&callback=initMap" async defer></script>

    <script>
        let map, marker, autocomplete;

        function initMap() {
            const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // Default location: London

            // Initialize map centered at default location
            map = new google.maps.Map(document.getElementById("map"), {
                center: defaultLocation,
                zoom: 12,
            });

            // Initialize draggable marker
            marker = new google.maps.Marker({
                position: defaultLocation,
                map: map,
                draggable: true,
            });

            // Update latitude and longitude fields when marker is dragged
            marker.addListener("dragend", () => {
                const position = marker.getPosition();
                document.getElementById("latitude").value = position.lat();
                document.getElementById("longitude").value = position.lng();
                updateAddressFromCoordinates(position.lat(), position.lng());
            });

            // Detect location on button click
            document.getElementById("detectLocation").addEventListener("click", () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.setCenter(userLocation);
                        marker.setPosition(userLocation);
                        document.getElementById("latitude").value = userLocation.lat;
                        document.getElementById("longitude").value = userLocation.lng;
                        updateAddressFromCoordinates(userLocation.lat, userLocation.lng);
                    });
                } else {
                    alert("Geolocation is not supported by your browser.");
                }
            });

            // Initialize Google Places Autocomplete
            const addressInput = document.getElementById("address");
            autocomplete = new google.maps.places.Autocomplete(addressInput, {
                types: ["geocode"], // Limit to addresses
                componentRestrictions: { country: "us" }, // Restrict to a specific country (optional)
            });

            // Update marker and map when an address is selected
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    alert("No details available for this address.");
                    return;
                }

                const location = place.geometry.location;
                map.setCenter(location);
                map.setZoom(14);
                marker.setPosition(location);
                document.getElementById("latitude").value = location.lat();
                document.getElementById("longitude").value = location.lng();
            });
        }

        // Function to update address based on coordinates (reverse geocoding)
        function updateAddressFromCoordinates(lat, lng) {
            const geocoder = new google.maps.Geocoder();
            const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK" && results[0]) {
                    document.getElementById("address").value = results[0].formatted_address;
                } else {
                    alert("Unable to retrieve address.");
                }
            });
        }
    </script>

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Add Food Listing</h1>
    <form action="add_food_action.php" method="POST">
        <label>Food Details:</label>
        <textarea name="food_details" required></textarea><br>

        <label>Address:</label>
        <input type="text" id="address" name="address" placeholder="Start typing your address..." required><br>

        <label>Latitude:</label>
        <input type="text" id="latitude" name="latitude" readonly required><br>

        <label>Longitude:</label>
        <input type="text" id="longitude" name="longitude" readonly required><br>

        <button type="button" id="detectLocation">Use My Location</button>
        <div id="map" style="width: 100%; height: 400px; margin-top: 10px;"></div>
        <button type="submit">Add Listing</button>
    </form>
    <a href="donor_dashboard.php">Back to Dashboard</a>
</body>
</html>
