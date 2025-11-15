# 🌿 Social Development Events – Server Side  

This is the backend API for the **Social Development Events** platform. It handles authentication, event management, event filtering, searching, and user-specific joined events.

---

## 🚀 Features
- 🗂️ **Create, Read, Update Events**  
- 🔍 **Filter & Search Events** using MongoDB queries  
- 📅 **Upcoming Events Filtering** (Past events auto-excluded)  
- 🤝 **Join Events API** with user-event mapping  
- 🔐 **Secure Routes for User-Based Event Management**  

---

## 📦 Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB (Native Driver)**
- **CORS Middleware**
- **dotenv**

---

## 📁 API Endpoints

### **Events**
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/create-event` | Create new event |
| GET | `/upcoming-events` | Get upcoming events (auto-filtered by date) |
| GET | `/event/:id` | Get single event |
| PUT | `/update-event/:id` | Update event |
| DELETE (optional) | `/delete-event/:id` | Delete event |

### **Joined Events**
| Method | Route | Description |
|--------|--------|-------------|
| POST | `/join-event` | Join event |
| GET | `/joined-events?email=` | Get events joined by a user |

### **Manage Events**
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/manage-events?email=` | Events created by a user |

### **Search & Filter**
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/search-events?name=` | Search by event name |
| GET | `/filter-events?type=` | Filter by event type |

---

## ⚙️ How to Run
1. Clone the repository  
2. Run `npm install`  
3. Create `.env` file:  
