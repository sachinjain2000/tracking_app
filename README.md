# 🚀 Habit Quest: The Gamified Task Counter



**My Habit Quest** is a simple yet powerful web application I designed to transform the tedious process of habit tracking into an engaging, gamified experience. I created this because I was personally struggling to maintain consistency with my day-to-day habits. I realized that static checklists weren't working for me. I needed something that gave me immediate, fun feedback. This tool replaces those static checklists with dynamic "tickers" that encourage me to build and maintain good habits throughout my day. By turning each completed action into a visible, incremental score, it provides immediate, positive feedback, making habit building feel less like a chore and more like a high-score challenge.

---

## 📝 Table of Contents

- [The Problem and The Solution](#the-problem-and-the-solution)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Data Visualization and Insights](#data-visualization-and-insights)
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 The Problem and The Solution

### The Problem: The Static Habit Wall

I found that traditional habit trackers, which often rely on simple checkboxes or static lists, lacked the immediate, motivating feedback loop necessary to sustain my long-term behavioral change. For me, this static approach failed to create the necessary "stickiness" to overcome daily inertia and build a consistent routine. I needed a better way to encourage myself.

### The Solution: Gamified Tickers

I solved this by introducing a **gamified counter system**. Instead of just marking a habit as "done" once, I can track the *frequency* of a positive habit throughout the day.

| Habit Tracking Method | Feedback Mechanism | Motivation Type |
| :--- | :--- | :--- |
| **Traditional Checkbox** | Binary (Done/Not Done) | Long-term, Abstract |
| **My Habit Quest Ticker** | Incremental (Score increases) | Immediate, Gamified |

This simple change encourages a "more is better" mindset, transforming my habits into a daily high-score challenge and providing a clear, fun incentive to build upon my good behaviors.

---

## ✨ Key Features

- **Gamified Ticker System:** I can incrementally track the frequency of positive habits (e.g., "glasses of water drunk," "pages read," "minutes of focused work").
- **Real-time Local Tracking:** My daily progress is saved locally in my browser for immediate access and responsiveness.
- **Seamless Airtable Integration:** At the end of the day, all my tracked data is securely saved to a connected Airtable base.
- **Data Visualization Ready:** The structured data I collect in Airtable is perfectly set up for clear, powerful visualizations in tools like Airtable's native charts, Google Data Studio, or Tableau.
- **Netlify Functions Backend:** I use a serverless architecture for secure and efficient data transfer to Airtable.
- **Progressive Web App (PWA) Ready:** I can install this on any device for a native-app feel.

---

## 💻 Technology Stack

The application is built with a modern, serverless-first approach:

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | HTML, CSS, JavaScript | Simple, fast, and responsive user interface. |
| **Data Storage** | Airtable | Flexible, structured database for long-term data storage and visualization. |
| **Backend** | Netlify Functions | Serverless functions to securely handle the API connection and data transfer to Airtable. |
| **Deployment** | Netlify | Continuous deployment and hosting for the static site and serverless functions. |

---

## 📊 Data Visualization and Insights

The true power of **My Habit Quest** lies in the data I collect. By saving my daily habit counts to a structured Airtable base, I unlock the ability to generate clear, compelling visualizations of my progress over time. This is the part that truly encouraged me to build upon my good habits.

I use this data to answer questions like:
- **Consistency:** Which habits do I track most consistently over a month?
- **Correlation:** Is there a correlation between my "minutes of exercise" and my "hours of sleep"?
- **Peak Performance:** On which days of the week am I most productive?

This data-driven feedback loop is the final, crucial step in turning my short-term motivation into long-term, sustainable habit change.

---

## 🛠️ Installation and Setup

This project requires a basic understanding of web development, Netlify, and Airtable.

### Prerequisites

1.  **Airtable Account:** I use an Airtable account and a new Base to store my habit data.
2.  **Netlify Account:** For deploying the site and the serverless functions.
3.  **Node.js & npm:** To manage dependencies for the Netlify Functions.

### Step 1: Clone the Repository

```bash
git clone https://github.com/sachinjain2000/tracking_app.git
cd tracking_app
```

### Step 2: Configure Airtable

1.  Create a new Airtable Base.
2.  I create a table (e.g., `Daily Habits`).
3.  The application expects a single record per day. I need to create fields in this table that correspond to the habits I want to track (e.g., `Read Pages`, `Water Glasses`, `Meditate Minutes`).
4.  **Crucially, the names of the fields in my Airtable table must match the names of the tasks I add in the app.**

### Step 3: Set up Netlify Functions

The application uses Netlify Functions to interact with Airtable. I need to set up my environment variables on Netlify.

1.  **`AIRTABLE_API_KEY`**: My personal Airtable API Key.
2.  **`AIRTABLE_BASE_ID`**: The ID of the Airtable Base I created (e.g., `appXXXXXXXXXXXXXX`).
3.  **`AIRTABLE_TABLE_NAME`**: The name of my table (e.g., `Daily Habits`).

The Netlify Functions are located in the `netlify/functions` directory and handle two main tasks:
- `get-task-fields`: Fetches the list of available habit fields from your Airtable table to populate the app's task selection dropdown.
- `save-tasks`: Receives the end-of-day data and updates the corresponding record in your Airtable table.

---

## 🚀 Deployment

The easiest way to deploy this application is using **Netlify**.

1.  **Connect to Git:** In my Netlify dashboard, I create a new site from my Git repository.
2.  **Build Settings:**
    - **Base directory:** (Leave blank)
    - **Build command:** `npm install --prefix netlify && npm run build` (This ensures Netlify Functions dependencies are installed)
    - **Publish directory:** (Leave blank, as it's a single-page app)
3.  **Environment Variables:** I set the three required environment variables (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`) in the Netlify UI under **Site settings > Build & deploy > Environment**.
4.  **Deploy:** I trigger a deploy. Netlify will automatically build and deploy my static site and the serverless functions.

---

## 🤝 Contributing

I welcome contributions to enhance this gamified tracking experience!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
