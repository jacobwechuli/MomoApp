## **📌 Telemedicine Backend API**
**Tech Stack:**  
- **Backend:** Spring Boot (Java)  
- **Database:** PostgreSQL  
- **Security:** JWT (OAuth2)  
- **Messaging:** Twilio (SMS), JavaMail (Email)  
- **Asynchronous Processing:** Apache Kafka  

---

### **📁 Project Setup**
#### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/telemedicine-backend.git
cd telemedicine-backend
```
#### **2️⃣ Configure Database (PostgreSQL)**
Update `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/telemed
    username: postgres
    password: yourpassword
```

#### **3️⃣ Run the Application**
```sh
mvn spring-boot:run
```

#### **4️⃣ Access API Documentation**
Once running, access **Swagger UI**:  
📌 `http://localhost:8080/swagger-ui.html`

---

## **📌 API Endpoints**

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|-------------------------|
| `/api/auth/login` | **POST** | User login, returns JWT | ❌ No |
| `/api/auth/register` | **POST** | Register a new user | ❌ No |
| `/api/users` | **GET** | Get all users | ✅ Yes (Admin) |
| `/api/users/{id}` | **GET** | Get user by ID | ✅ Yes |
| `/api/users/{id}` | **PUT** | Update user details | ✅ Yes (Admin or User) |
| `/api/users/{id}` | **DELETE** | Delete user | ✅ Yes (Admin) |
| `/api/appointments` | **POST** | Book an appointment | ✅ Yes (Patient) |
| `/api/appointments/{id}` | **GET** | Get appointment details | ✅ Yes |
| `/api/appointments/{id}/cancel` | **PUT** | Cancel appointment | ✅ Yes (Patient) |
| `/api/availability` | **POST** | Set doctor availability | ✅ Yes (Doctor) |
| `/api/availability` | **GET** | Get available time slots | ❌ No |
| `/api/payments` | **POST** | Process payment for appointment | ✅ Yes (Patient) |
| `/api/payments/{id}` | **GET** | Get payment details | ✅ Yes |
| `/api/prescription/create` | **POST** | Create a prescription | ✅ Yes (Doctor) |
| `/api/prescription/patient/{patientId}` | **GET** | Get prescriptions for a patient | ✅ Yes |
| `/api/prescription/verify/{code}` | **GET** | Verify a prescription by code | ✅ Yes |
| `/api/notifications/email` | **POST** | Send email notifications | ✅ Yes |
| `/api/notifications/sms` | **POST** | Send SMS notifications | ✅ Yes |

---

## **📌 Environment Variables**
Create a `.env` file or update `application.yml`:

```yaml
jwt:
  secret: your_jwt_secret

twilio:
  account-sid: your_twilio_sid
  auth-token: your_twilio_token
  phone-number: +1234567890

mail:
  username: your_email@gmail.com
  password: your_email_password
```

---

## **📌 Running with Docker**
```sh
docker-compose up -d
```
For Kafka, PostgreSQL, and the backend.

---

## **📌 Contributing**
1. Fork the repo  
2. Create a feature branch  
3. Submit a PR  

---

Let me know if you want to **add anything else**! 🚀🔥
