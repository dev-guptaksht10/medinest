# 🚀 MediNest - Healthcare Innovation Platform

## 🌟 Project Overview
MediNest is a revolutionary healthcare platform designed to enhance patient-doctor interactions, streamline medical record management, and provide AI-driven health insights. Our mission is to improve healthcare accessibility using cutting-edge technology like AI, blockchain, and cloud services.

### 🏥 Problem Statement
Many patients struggle with:
- Managing their medical history efficiently.
- Following up on prescriptions and treatments.
- Accessing timely healthcare recommendations.

### ✅ How MediNest Solves It
- 🔍 AI-Powered Prescription Recognition - Extracts details from prescriptions automatically.
- 📂 Patient Portfolio Management - Securely stores and organizes medical records.
- 🔔 Medication & Follow-up Alerts - Sends reminders for adherence to treatments.
- 👩‍⚕️ Doctor Recommendations - Suggests specialists based on diagnosis.
- 💬 Community Peer Support - Connects patients with similar health conditions.
- 📚 Health Awareness Blogs - Provides informative content.
- 🎥 Video Chat with Doctors - Enables remote healthcare consultations.

## 🛠 Tech Stack
### **Frontend (Client - `/client` 📂)**
- ⚡ **Next.js** (React Framework)
- 🎨 **Tailwind CSS** (UI Styling)
- 🌑 **Next-Themes** (Dark Mode Support)
- 📊 **Recharts** (Data Visualization)
- 📦 **Radix UI** (Modern UI Components)

### **Backend (Server - `/server` 📂)**
- 🚀 **Express.js** (Node.js Framework)
- 🛢 **MongoDB** (Database)
- 🔑 **JWT Authentication** (User Security)
- ☁️ **Cloudinary** (File Storage)
- 🔐 **bcrypt** (Password Hashing)

### **ML Model (Server2 - `/server2` 📂)**
- 🤖 **LangChain** (AI-Powered NLP Processing)
- 🧠 **Sentence Transformers** (Text Embeddings)
- 🏗 **Pinecone** (Vector Database)
- 📄 **PyPDF** (Document Processing)
- 🌎 **Flask** (API Hosting)

## 📦 Dependencies

### **Frontend Dependencies**
- `@radix-ui/react-*` - UI components like Dialog, Checkbox, Popover, etc.
- `axios` - HTTP client for API requests.
- `clsx` - Utility for conditional classNames.
- `embla-carousel-react` - Smooth carousels.
- `lucide-react` - Icons library.
- `next` - React framework for server-side rendering.
- `react-day-picker` - Date picker component.
- `react-hook-form` - Form handling.
- `react-icons` - Icon support.
- `react-resizable-panels` - UI resizing.
- `recharts` - Charts & data visualization.
- `tailwind-merge` - Utility for Tailwind CSS.

### **Backend Dependencies**
- `express` - Node.js web framework.
- `mongoose` - ODM for MongoDB.
- `jsonwebtoken` - Authentication via JWT tokens.
- `bcrypt` - Password hashing.
- `cookie-parser` - Middleware for cookies.
- `cors` - Enables CORS policy.
- `dotenv` - Environment variable handling.
- `multer` - Middleware for file uploads.
- `moment` - Date/time parsing.
- `cloudinary` - Cloud storage for images.

### **ML Model Dependencies**
- `ctransformers` - Model inference.
- `sentence-transformers` - Text embeddings.
- `pinecone-client` - Vector database.
- `langchain` - AI framework.
- `flask` - Lightweight web server for ML API.
- `pypdf` - PDF processing.
- `python-dotenv` - Loads environment variables.



## 📥 Installation & Setup
Follow these steps to set up MediNest on your local machine:

### 1️⃣ Clone the Repository
```sh
  git clone https://github.com/your-repo/MediNest.git
  cd MediNest
```

### 2️⃣ Setup Frontend (Client)
```sh
cd client
npm install  # Install dependencies
npm run dev  # Start the frontend server
```

### 3️⃣ Setup Backend (Server)
```sh
cd ../server
npm install  # Install dependencies
npm run dev  # Start the backend server
```

### 4️⃣ Setup ML Model (Server2)
```sh
cd ../server2
pip install -r requirements.txt  # Install dependencies
python app.py  # Start ML server
```

### 5️⃣ Running the Full Application
Once all services are running, open **http://localhost:3000** in your browser. 🚀

## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

For more details, visit our **GitHub repository**: [MediNest Repository]((https://github.com/dev-guptaksht10/medi-nest))].
