"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Suryakant das",
    designation: "Developer of the website",
    image: "https://storage.googleapis.com/pingua-mahotsav/surya.jpeg",
  },
  {
    id: 2,
    name: "Ashish kuamr sahoo",
    designation: "Planning & Ideas",
    image: "https://storage.googleapis.com/pingua-mahotsav/ashish.jpeg",
  },
  {
    id: 3,
    name: "Abinash rout",
    designation: "Content Collection",
    image: "https://storage.googleapis.com/pingua-mahotsav/avi.jpeg",
  },
  {
    id: 4,
    name: "Pratap ranjan sahoo",
    designation: "Content Support",
    image: "https://storage.googleapis.com/pingua-mahotsav/jinua.jpeg",
  },
  {
    id: 5,
    name: "Brajskisor sahoo",
    designation: "Member",
    image: "https://storage.googleapis.com/pingua-mahotsav/bunu.jpeg",
  },
  {
    id: 6,
    name: "Asutosh ashoo",
    designation: "Member",
    image: "https://storage.googleapis.com/pingua-mahotsav/happy.jpeg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
