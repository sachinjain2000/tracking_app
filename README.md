# 🚀 Habit Quest: The Gamified Task Counter

![Habit Quest Banner](https://i.imgur.com/3qF4q8h.png)

**Habit Quest** is a simple yet powerful web application designed to transform the tedious process of habit tracking into an engaging, gamified experience. Born out of a personal struggle to maintain consistency, this tool replaces static checklists with dynamic "tickers" that encourage you to build and maintain good habits throughout your day. By turning each completed action into a visible, incremental score, it provides immediate, positive feedback, making habit building feel less like a chore and more like a high-score challenge.

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

Traditional habit trackers often rely on simple checkboxes or static lists. While functional, they lack the immediate, motivating feedback loop necessary to sustain long-term behavioral change. For many, including the creator of this app, this static approach fails to create the necessary "stickiness" to overcome daily inertia and build a consistent routine.

### The Solution: Gamified Tickers

**Habit Quest** solves this by introducing a **gamified counter system**. Instead of just marking a habit as "done" once, you can track the *frequency* of a positive habit throughout the day.

| Habit Tracking Method | Feedback Mechanism | Motivation Type |
| :--- | :--- | :--- |
| **Traditional Checkbox** | Binary (Done/Not Done) | Long-term, Abstract |
| **Habit Quest Ticker** | Incremental (Score increases) | Immediate, Gamified |

This simple change encourages a "more is better" mindset, transforming habits into a daily high-score challenge and providing a clear, fun incentive to build upon your good behaviors.

---

## ✨ Features

- **Gamified Ticker System:** Incrementally track the frequency of positive habits (e.g., "glasses of water drunk," "pages read," "minutes of focused work").
- **Real-time Local Tracking:** Daily progress is saved locally in your browser for immediate access and responsiveness.
- **Seamless Airtable Integration:** At the end of the day, all tracked data is securely saved to a connected Airtable base.
- **Data Visualization Ready:** The structured data stored in Airtable is perfectly set up for clear, powerful visualizations in tools like Airtable's native charts, Google Data Studio, or Tableau.
- **Netlify Functions Backend:** A serverless architecture for secure and efficient data transfer to Airtable.
- **Progressive Web App (PWA) Ready:** Installable on any device for a native-app feel.

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

The true power of **Habit Quest** lies in the data it collects. By saving your daily habit counts to a structured Airtable base, you unlock the ability to generate clear, compelling visualizations of your progress over time.

You can use this data to answer questions like:
- **Consistency:** Which habits do I track most consistently over a month?
- **Correlation:** Is there a correlation between my "minutes of exercise" and my "hours of sleep"?
- **Peak Performance:** On which days of the week am I most productive?

This data-driven feedback loop is the final, crucial step in turning short-term motivation into long-term, sustainable habit change.

---

## 🛠️ Installation and Setup

This project requires a basic understanding of web development, Netlify, and Airtable.

### Prerequisites

1.  **Airtable Account:** You will need an Airtable account and a new Base to store your habit data.
2.  **Netlify Account:** For deploying the site and the serverless functions.
3.  **Node.js & npm:** To manage dependencies for the Netlify Functions.

### Step 1: Clone the Repository

```bash
git clone https://github.com/sachinjain2000/tracking_app.git
cd tracking_app
```

### Step 2: Configure Airtable

1.  Create a new Airtable Base.
2.  Create a table (e.g., `Daily Habits`).
3.  The application expects a single record per day. You will need to create fields in this table that correspond to the habits you want to track (e.g., `Read Pages`, `Water Glasses`, `Meditate Minutes`).
4.  **Crucially, the names of the fields in your Airtable table must match the names of the tasks you add in the app.**

### Step 3: Set up Netlify Functions

The application uses Netlify Functions to interact with Airtable. You will need to set up your environment variables on Netlify.

1.  **`AIRTABLE_API_KEY`**: Your personal Airtable API Key.
2.  **`AIRTABLE_BASE_ID`**: The ID of the Airtable Base you created (e.g., `appXXXXXXXXXXXXXX`).
3.  **`AIRTABLE_TABLE_NAME`**: The name of your table (e.g., `Daily Habits`).

The Netlify Functions are located in the `netlify/functions` directory and handle two main tasks:
- `get-task-fields`: Fetches the list of available habit fields from your Airtable table to populate the app's task selection dropdown.
- `save-tasks`: Receives the end-of-day data and updates the corresponding record in your Airtable table.

---

## 🚀 Deployment

The easiest way to deploy this application is using **Netlify**.

1.  **Connect to Git:** In your Netlify dashboard, create a new site from your Git repository.
2.  **Build Settings:**
    - **Base directory:** (Leave blank)
    - **Build command:** `npm install --prefix netlify && npm run build` (This ensures Netlify Functions dependencies are installed)
    - **Publish directory:** (Leave blank, as it's a single-page app)
3.  **Environment Variables:** Set the three required environment variables (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`) in the Netlify UI under **Site settings > Build & deploy > Environment**.
4.  **Deploy:** Trigger a deploy. Netlify will automatically build and deploy your static site and the serverless functions.

---

## 🤝 Contributing

We welcome contributions to enhance this gamified tracking experience!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
