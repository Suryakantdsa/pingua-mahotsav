"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Abinash rout",
    image: "https://storage.googleapis.com/pingua-mahotsav/avi.jpeg",
  },
  {
    id: 2,
    name: "Pratap ranjan sahoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/jinua.jpeg",
  },
  {
    id: 3,
    name: "Ashish kuamr sahoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/ashish.jpeg",
  },
  {
    id: 4,
    name: "Brajskisor sahoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/bunu.jpeg",
  },
  {
    id: 5,
    name: "Asutosh ashoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/happy.jpeg",
  },
  {
    id: 6,
    name: "Chandan behera",
    image: "https://storage.googleapis.com/pingua-mahotsav/avi.jpeg",
  },
  {
    id: 7,
    name: "Gyanaranjan mahalik",
    image: "https://storage.googleapis.com/pingua-mahotsav/jinua.jpeg",
  },
  {
    id: 8,
    name: "Biswajit sahoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/bunu.jpeg",
  },
  {
    id: 9,
    name: "Balaram sahoo",
    image: "https://storage.googleapis.com/pingua-mahotsav/jinua.jpeg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
