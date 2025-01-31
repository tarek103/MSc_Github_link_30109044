---

# **Foodfinder: A Location-Based Food Redistribution Platform**

## **Overview**
The **Foodfinder** application is a web-based platform designed to reduce food waste by connecting food donors with receivers in real-time. The platform leverages **location-based services** to facilitate efficient redistribution of surplus food within a community. Users can register as donors, receivers, or administrators and interact through role-specific features such as food listing management, request submission, and user verification.

---

## **Features**
### **1. Role-Based Access Control (RBAC)**  
- **Donors**: Add, update, and manage food listings; approve or reject requests from receivers.
- **Receivers**: Search for nearby food listings and submit requests.
- **Administrators**: Verify users, manage listings, block/unblock users, and monitor system activity.

### **2. Real-Time Location Services**  
- Integration with **Google Maps API** and **Google Places API**.
- Geolocation-based search for food listings within a 2.5 km radius.
- Address autocomplete and dynamic map interaction.

### **3. Secure User Authentication**  
- Registration with photo ID upload for verification.
- Password hashing using **bcrypt**.
- Role-based session management with secure cookie handling.

### **4. Food Listings and Request Management**  
- Donors can create and manage listings with food details and location data.
- Receivers can browse available listings, send requests, and view request statuses.
- Real-time notifications on request approval/rejection.

### **5. Administrative Tools**  
- User verification and account management.
- Logs and reports on system activity for auditing purposes.

---

## **Technologies Used**

### **Frontend**
- **HTML/CSS**: Page structure and styling.
- **JavaScript & jQuery**: Dynamic page interactions.
- **Google Maps & Places APIs**: Location-based services and map visualization.

### **Backend**
- **PHP**: Server-side logic and RESTful API implementation.
- **MySQL**: Relational database for structured data storage.

### **Security**
- **Role-Based Access Control (RBAC)**.
- **Password Hashing** with `password_hash()`.
- Protection against **SQL injection**, **cross-site scripting (XSS)**, and **cross-site request forgery (CSRF)**.

---

## **System Requirements**

- **PHP** (version 7.4 or higher)
- **MySQL** (version 5.7 or higher)
- **Apache** or **Nginx** web server
- **Google Maps API Key** with access to Maps and Places APIs

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/foodfinder.git
   cd foodfinder
   ```

2. **Set Up the Database**:
   - Import the `foodfinder.sql` file located in the `/database/` directory into your MySQL server.
   - Update the database credentials in the `includes/db.php` file:
     ```php
     $host = 'localhost';
     $db   = 'foodfinder';
     $user = 'your_db_username';
     $pass = 'your_db_password';
     ```

3. **Configure Google API**:
   - Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the **Maps JavaScript API** and **Places API**.
   - Add your API key in the JavaScript files (`search_donors.php`, `add_food.php`, etc.):
     ```javascript
     <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap" async defer></script>
     ```

4. **Run the Application**:
   - Deploy the project on a local server using **XAMPP**, **MAMP**, or another PHP server.
   - Access the application in your browser at `http://localhost/foodfinder/`.

---

## **Usage**

1. **Register** as a donor, receiver, or admin.
2. **Login** to access your role-specific dashboard.
3. **Donors**: Add food listings and manage requests.
4. **Receivers**: Search for listings and submit requests.
5. **Administrators**: Verify user registrations and manage platform activity.

---

## **Testing**

1. **Functional Testing**:  
   Ensure all core features (e.g., registration, login, food listing management) are functioning as expected.

2. **Security Testing**:  
   Test for vulnerabilities such as SQL injection, XSS, and CSRF.

3. **Performance Testing**:  
   Measure system response times and query execution under different user loads.

4. **User Acceptance Testing**:  
   Gather feedback from stakeholders and refine features based on suggestions.

---

## **Future Enhancements**

- **Push Notifications** for real-time updates.
- **Mobile Application** with offline capabilities.
- **Data Analytics** to track food redistribution trends.
- **Multi-Language Support** for global reach.
- Integration with **food donor organizations** (e.g., food banks and supermarkets).

---

## **Contributing**

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Submit a pull request.

---

## **License**

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## **Acknowledgements**

- **Supervisor:** Dr. Shiny Verghese  
- **Technologies:** Google Maps API, PHP, MySQL, jQuery, HTML/CSS  
- **Inspiration:** Food redistribution initiatives such as Too Good To Go and Olio.

---

