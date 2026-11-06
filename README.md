# Focus Zone AI
### Intelligent Study Management & Distraction Prediction System
**B.Tech CSE (Data Science) Major Project**
**Package Name:** `com.example.focuszone_app`

---

## 🚀 How to Run in VS Code

This project consists of three main parts:
1. **Interactive Web App & Command Studio** (React 19 + TypeScript + Vite 8 + Tailwind CSS 4)
2. **FastAPI Machine Learning Cloud Backend** (Python + Scikit-Learn + Joblib)
3. **Android Jetpack Compose Native Project** (Kotlin + Room + Material 3)

---

### Part 1: Running the Interactive Web App in VS Code

#### Prerequisites
- **Node.js**: Version 18+ or 20+ installed ([Download Node.js](https://nodejs.org/))
- **VS Code**: Installed on your system ([Download VS Code](https://code.visualstudio.com/))

#### Steps:
1. **Open Project Folder in VS Code:**
   - Launch VS Code.
   - Click `File` > `Open Folder...` and select the root directory of this project.

2. **Open Integrated Terminal:**
   - Press `` Ctrl + ` `` (Windows/Linux) or `` Cmd + ` `` (Mac), or go to `Terminal` > `New Terminal`.

3. **Install Dependencies:**
   ```bash
   npm install
   ```
   *(Note: If your local npm has strict peer dependency flags enabled, you can also run: `npm install --legacy-peer-deps`)*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   - The terminal will display:
     ```
     VITE v8.3.0  ready in 250 ms
     ➜  Local:   http://localhost:3000/
     ➜  Network: use --host to expose
     ```
   - Hold `Ctrl` (or `Cmd`) and click the link `http://localhost:3000/`, or paste it into your browser (Chrome/Edge/Brave).
   - You can now test the **Pixel 8 Pro Android emulator**, Pomodoro timer, study planner, live distraction detection, and ML benchmark tools directly!

---

### Part 2: Running the FastAPI Machine Learning Backend

The FastAPI backend serves the Random Forest and Logistic Regression models via REST APIs.

#### Prerequisites
- **Python**: Version 3.10, 3.11, or 3.12 installed ([Download Python](https://python.org/))

#### Steps:
1. **Open a New Terminal Tab in VS Code:**
   - Click the `+` button in the VS Code terminal pane.

2. **Create and Activate a Virtual Environment:**
   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Backend Dependencies:**
   ```bash
   pip install fastapi uvicorn pydantic scikit-learn numpy pandas joblib
   ```

4. **Launch the FastAPI Server:**
   ```bash
   uvicorn server:app --reload --port 8000
   ```

5. **Access Interactive Swagger API Documentation:**
   - Open your browser to: `http://localhost:8000/docs`
   - You can test the `/api/v1/ml/predict-completion` endpoint live with JSON payloads!

---

### Part 3: Running the Android Jetpack Compose App

#### Recommended: Android Studio
While VS Code supports Kotlin via extensions, native Android applications compile and run best using **Android Studio**:
1. Download & Install [Android Studio](https://developer.android.com/studio).
2. Open Android Studio and select `Open` > navigate to the `app/` folder.
3. Allow Gradle to sync dependencies (`com.example.focuszone_app`).
4. Select a virtual device (e.g. Pixel 8 Pro) or connect a physical Android device with USB Debugging enabled.
5. Click **Run** (`Shift + F10`).

#### Running Android in VS Code (Optional):
1. Install the following VS Code extensions:
   - **Kotlin Language Support** (by fwcd)
   - **Android iOS Emulator**
   - **Gradle for Java**
2. In the terminal, run:
   ```bash
   ./gradlew installDebug
   ```

---

### 🛠️ Useful VS Code Extensions
- **Tailwind CSS IntelliSense** (for CSS class autocompletion)
- **ESLint & Prettier** (for clean code formatting)
- **Python** (by Microsoft, for running FastAPI & Jupyter Notebooks)
- **Thunder Client** or **Postman** (for testing REST API endpoints inside VS Code)
