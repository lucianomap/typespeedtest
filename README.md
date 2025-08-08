# ⌨️ Typing Speed Test

This is an interactive typing speed test application built with **HTML5**, **CSS3**, and **JavaScript**. It features real-time WPM and accuracy calculation, difficulty levels, error highlighting, a virtual keyboard, performance history, custom test creation, multi-language support, and a competition mode with a leaderboard.

![Typing Speed Test Screenshot](<img width="769" height="905" alt="1" src="https://github.com/user-attachments/assets/a032c763-7bd1-4aa6-857c-9446b0f19e57" />)


---

## 🚀 Features

-   **Real-time Metrics:** Calculates Words Per Minute (WPM) and accuracy as you type.
-   **Difficulty Levels:** Choose from Easy, Medium, and Hard text samples.
-   **Multi-language Support:** Test your typing skills in English 🇬🇧, Spanish 🇪🇸, German 🇩🇪, and Portuguese 🇧🇷.
-   **Error Highlighting:** Incorrectly typed characters are highlighted for immediate feedback.
-   **Virtual Keyboard:** Displays a virtual keyboard that highlights keys as you press them.
-   **Performance History:** Tracks and visualizes your WPM and accuracy over time with a graph.
-   **Custom Tests:** Paste your own text to create personalized typing tests.
-   **Competition Mode:** Compete with others and see your rank on a real-time leaderboard.

---

## 🛠️ Installation and Usage

To run this project locally, follow these steps:

1.  **Clone the repository**

    ```bash
    git clone https://github.com/YOUR_USERNAME/typespeedtest.git
    cd typespeedtest
    ```

2.  **Install dependencies for the backend server**

    ```bash
    npm install
    ```

3.  **Start the backend server**

    ```bash
    node server.js
    ```

4.  **Open the application**

    Open `index.html` in your web browser. For the leaderboard to function, ensure the Node.js server is running.

---

## 📌 Notes

-   The leaderboard data is stored in memory on the server and will reset when the server is restarted.
-   Performance history is stored locally in your browser's `localStorage`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
