
# Globetrotter - Destination Guessing Game

Globetrotter is a fun and interactive web app where users guess destinations based on cryptic clues, fun facts, and trivia. The app includes animated feedback, scoring, and a "Challenge a Friend" feature for an engaging experience.

## 🚀 Features

✅ **Guess the Destination** - Users get 1-2 random clues and must select the correct destination from multiple choices.
✅ **Instant Feedback** -
  - 🎉 Correct Answer: Confetti animation + fun fact.
  - 😢 Incorrect Answer: Sad-face animation + fun fact.
✅ **Score Tracking** - Displays total correct and incorrect answers.
✅ **Play Again/Next** - Users can load a new destination and continue playing.
✅ **Challenge a Friend** -
  - Users enter a unique username and invite friends to play.
  - The invite link shows the inviter's score before the game starts.
  - Anyone with the invite link can play the game.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Firebase
- **Other Tools:** Gemini AI

## 📂 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone [https://github.com/Deepaktr20/Dest-guess-app.git](https://github.com/Deepaktr20/Dest-guess-app.git)
   cd destination-guessing-app 
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Setup Firebase API Key:**
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id_here
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id_here
     ```

4. **Run the app:**
   ```sh
   npm start
   ```

## 🎯 How to Play
1. A destination is selected randomly from the backend.
2. The user is presented with cryptic clues.
3. The user selects the correct answer from multiple choices.
4. Instant feedback is provided with animations and fun facts.
5. Users can track their score and challenge friends!

## 🔥 Contributing
Feel free to submit pull requests to improve the dataset, UI, or features.

## 📜 License
This project is licensed under the MIT License.

Enjoy the game and happy guessing! 🌍✨
