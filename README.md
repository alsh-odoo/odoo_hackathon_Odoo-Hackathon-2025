# 🌐 StackIt – Minimal Q&A Forum Platform

**StackIt** is a minimalist, community-focused question-and-answer platform built with **React** (frontend) and **Laravel** (backend). It empowers users to engage in structured knowledge sharing, making it ideal for technical communities and collaborative learning.

---

## 🎯 Project Overview

StackIt provides an intuitive interface for users to ask questions, provide rich-text answers, and interact through a voting and notification system. With a clean UI and essential features, it’s built to serve communities that value focused discussion.

---

## 🚀 Core Features

### 📝 Ask Questions
- **Title** – Short and descriptive
- **Description** – Rich text editor (with formatting, emojis, media)
- **Tags** – Multi-select input (e.g., `React`, `JWT`, `Laravel`)

### ✍️ Rich Text Editor
Supports:
- **Bold**, *Italic*, ~~Strikethrough~~
- Numbered & bullet lists
- Emojis 😊🔥
- Hyperlinks
- Image uploads
- Text alignment (Left, Center, Right)

### 💬 Answer Questions
- Users can answer any question using the same editor
- Only logged-in users can post answers

### 👍 Voting & Accepted Answers
- Vote up/down on answers
- Question author can mark one answer as **accepted**

### 🏷️ Tagging System
- Enforce tagging for all questions
- Tags help categorize and search questions efficiently

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Hooks)
- **Axios** (API communication)
- **React Router** (Routing)
- **TipTap** or **Quill.js** (Rich text editor)
- **Tailwind CSS** (Styling)

### Backend
- **Laravel 10**
- **Sanctum** (Authentication)
- **MySQL** (Database)

---