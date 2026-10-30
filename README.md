# Pulse Studio (React + Tailwind)

A fitness studio site built around personal journeys: lose weight, build muscle, tone and strengthen, or get started. Rebuilt from my Assignment 1 HTML/CSS site using React and Tailwind CSS.

## Features
- Components: Header, Hero, ClassesSection, TrainersSection, MembershipSection, Footer
- All classes, trainers and plans come from data files in `src/data/` (arrays of objects)
- Journey filter on the class grid, built with `useState`
- Reusable controlled `SaveToggle` on every class card ("Add to my week")
- Mobile-first Tailwind classes (unprefixed, then `sm:`, `md:`, `lg:`)
- No horizontal scroll at 320, 768 or 1280px

## Run it
    npm install
    npm run dev

## Built with
Vite, React, Tailwind CSS. No TypeScript, no extra libraries, data hardcoded.

Assignment 1 (plain HTML/CSS) is preserved in the `assignment-1` tag.
