# TypeSith | Ultimate Galactic Records

## https://typesith.vercel.app

> **Project Disclaimer:** This project was developed primarily as a hands-on learning exercise to practice and solidify my understanding of TypeScript within a React environment. As a developer continuously building my skills in software engineering, this repository serves as a personal training ground for applying static typing, component architecture, and responsive design.

> **Copyright Disclaimer:** Star Wars, its characters, and all related properties are trademarks and/or copyrights of Lucasfilm Ltd. and The Walt Disney Company. This application is strictly **fan-made** and created solely for **educational purposes**. No copyright infringement is intended.

## Project Overview

TypeSith is a frontend web application designed to catalog and display information about various Force users from the Star Wars universe. It allows users to seamlessly explore characters from both the Jedi Order and the Sith through an interactive, clean, and highly responsive interface.

![screenshot1](https://github.com/weerayosong/weerayosong.github.io/blob/main/images/gif/proj7.gif?raw=true)

## Architecture & System Design Documentation

[Documentation](https://dainty-custard-bd9ec7.netlify.app/)

## Features

- **Strict Type Safety:** Built entirely with TypeScript to ensure reliable data structures (`Interfaces`, `Types`) and predictable component props.
- **Dynamic Filtering & Sorting:** Users can seamlessly filter entities by affiliation (Jedi/Sith), era, and sort them by Midichlorian count or alphabetical order.
- **Logic Separation (Custom Hooks):** Utilizes `useMemo` and a custom hook (`useForceCodex`) to efficiently manage state, separate business logic from the UI, and improve rendering performance.
- **Interactive UI/UX:** Features a responsive grid layout, dynamic pagination, and detailed split-layout character modals with conditional styling based on the character's dark/light side affiliation.
- **Responsive Design:** Fully optimized for seamless mobile, tablet, and desktop experiences using Tailwind CSS.

## Technologies Used

- **Core:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
