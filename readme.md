# Go4It 🚀

> **Go4it is a personalized web platform that connects university students with relevant academic opportunities, events, and experiences tailored to their interests, location, and career goals.**

## 📌 Project Description

**Go4It** is a modern and responsive web platform focused on the academic community that aims to facilitate access and dissemination of academic opportunities such as internships, scholarships, events, competitions, workshops, and networking. The proposal is to centralize information that was previously scattered across channels like Slack or email, allowing students, teachers, and administrators to collaborate in sharing and finding opportunities in a more organized and accessible way.

## ✨ Implemented Features

### 🎯 **Modern and Responsive Interface**
- **Tech-academic design** with elegant cards and gradients
- **Responsive layout** (desktop, tablet, mobile)
- **Intuitive navigation** with hamburger menu
- **Tag filters** with horizontal scroll on mobile

### 🔐 **Authentication System**
- User registration and login
- Custom profiles with interest labels
- Role-based access control

### 📋 **Event Management**
- **Event creation** with modal form
- **Informative cards** with title, location, date, type, and tags
- **Complete details page** for each event
- **Label system** for categorization

### 🎨 **Design System**
- **Modern navbar** with logo and navigation
- **Responsive footer** with quick links and social media
- **Consistent color palette** and professional
- **Smooth animations** and elegant transitions

### 📱 **Complete Responsiveness**
- **Mobile-first** approach
- **Adaptive grid** for different screens
- **Functional hamburger menu**
- **Horizontal scroll** for filters

## 🛠️ Technologies Used

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **EJS** - Template engine

### **Frontend**
- **HTML5** - Semantic structure
- **CSS3** - Modern styles with CSS variables
- **JavaScript** - Interactivity and animations
- **Font Awesome** - Professional icons

### **Tools**
- **Git** - Version control
- **Jest** - Automated testing
- **Bootstrap 5** - Base components (partial)

## 🗂️ Project Structure

```
Projeto_Individual/
│
├── 📁 config/                 # Database configurations
│   └── database.js
├── 📁 controllers/            # Business logic
│   ├── authController.js
│   ├── labelController.js
│   ├── oportunidadeController.js
│   └── userController.js
├── 📁 models/                 # Data models
│   ├── Label.js
│   ├── Oportunidade.js
│   └── Usuario.js
├── 📁 routes/                 # Route definitions
│   ├── authRoutes.js
│   ├── index.js
│   ├── labelRoutes.js
│   ├── oportunidadeRoutes.js
│   └── userRoutes.js
├── 📁 services/               # Auxiliary services
│   ├── authService.js
│   ├── labelService.js
│   ├── oportunidadeService.js
│   └── userService.js
├── 📁 public/css/             # CSS styles
│   ├── style.css
│   ├── navbar.css
│   ├── footer.css
│   ├── home.css
│   └── event.css
├── 📁 views/                  # EJS templates
│   ├── home.ejs
│   ├── event.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── usuario/
│   │   ├── perfil.ejs
│   │   └── editar.ejs
│   └── partials/
│       ├── header.ejs
│       ├── footer.ejs
│       ├── cardOportunidade.ejs
│       └── modalOportunidade.ejs
├── 📁 tests/                  # Automated tests
│   ├── auth.test.js
│   ├── oportunidade.test.js
│   └── routes.test.js
├── 📁 scripts/                # Database scripts
│   ├── db.js
│   ├── init.sql
│   └── runSQLScript.js
├── 📁 assets/                 # Static resources
│   ├── modelo-banco.png
│   └── modelo-fisico.sql
├── 📄 .gitignore              # Ignored files
├── 📄 package.json            # Dependencies
├── 📄 server.js               # Main server
├── 📄 jest.config.js          # Test configuration
└── 📄 README.md               # Documentation
```

## 🚀 How to Run the Project

### **Prerequisites**
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)
- npm or yarn

### **1. Clone the Repository**
```bash
git clone https://github.com/seu-usuario/go4it.git
cd go4it
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure the Database**
```bash
# Create a PostgreSQL database
createdb go4it_db

# Run the initialization script
node scripts/runSQLScript.js
```

### **4. Configure Environment Variables**
```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your configurations
nano .env
```

### **5. Start the Server**
```bash
# Development
npm start

# Or directly
node server.js
```

### **6. Access the Application**
Open your browser and go to: [http://localhost:3001](http://localhost:3001)

## 🧪 Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 Features by Device

### **Desktop (>1024px)**
- 3-column grid layout
- Complete horizontal menu
- Inline filters
- Sticky sidebar

### **Tablet (769px-1024px)**
- Adaptive 2-column grid
- Responsive menu
- 2-column footer

### **Mobile (≤768px)**
- Single column layout
- Hamburger menu
- Horizontal scroll for filters
- Centered footer

## 🎨 Design System

### **Primary Colors**
- **Primary:** #2563eb (Blue)
- **Secondary:** #64748b (Gray)
- **Accent:** #f59e0b (Orange)
- **Success:** #10b981 (Green)
- **Danger:** #ef4444 (Red)

### **Typography**
- **Font:** System stack (-apple-system, BlinkMacSystemFont, etc.)
- **Titles:** 700-800 weight
- **Body:** 400-500 weight
- **Responsive:** clamp() for sizes

### **Components**
- **Cards:** Border-radius 12px, soft shadows
- **Buttons:** Border-radius 8px, hover effects
- **Tags:** Border-radius 25px, pastel colors
- **Navbar:** Height 64px, sticky positioning

## 🔧 Development Configuration

### **MVC Structure**
- **Models:** Entity definitions and queries
- **Views:** Responsive EJS templates
- **Controllers:** Business logic and validations
- **Services:** Data operations and authentication

### **Routing**
- **RESTful API** for CRUD operations
- **Authentication middleware**
- **Input data validation**
- **Centralized error handling**

## 📊 Database

### **Main Entities**
- **Usuario:** User data and preferences
- **Oportunidade:** Events and opportunities
- **Label:** Tags for categorization
- **Relationships:** N:N between users/opportunities and labels

### **Optimized Queries**
- **Indexes** on search fields
- **Efficient joins** for relationships
- **Pagination** for large volumes
- **Cache** for frequent queries

## 🚀 Deploy

### **Production Environment**
```bash
# Build the application
npm run build

# Configure production variables
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:port/db
```

### **Docker (Optional)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

## 👨‍💻 Author

**João Vitor Furtado de Freitas**  
*Full Stack Developer*

- **Email:** joao.vitor@inteli.edu.br
- **LinkedIn:** [LinkedIn Profile](https://linkedin.com/in/joaovitorfreitas)
- **GitHub:** [GitHub Profile](https://github.com/joaovitorfreitas)

## 📄 License

This project was developed as part of Module 2 of the Computing discipline at Inteli - Institute of Technology and Leadership.

---

**© 2025 Go4it – Developed at CustomHack** 🚀
