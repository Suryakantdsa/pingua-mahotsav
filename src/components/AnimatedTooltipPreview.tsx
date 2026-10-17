"use client";
import React, { useState, useEffect } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import apiClient from "@/restApp/apiClient";
import { ApiRoutes } from "@/restApp/api-route";

const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='60' fill='%23d97706'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-size='40' font-family='sans-serif' font-weight='bold'%3EPM%3C/text%3E%3C/svg%3E";

const defaultPeople = [
  {
    id: 1,
    name: "Suryakant Das",
    designation: "Lead Developer",
    image: defaultAvatar,
  },
  {
    id: 2,
    name: "Ashish Kumar Sahoo",
    designation: "Planning & Architecture",
    image: defaultAvatar,
  },
  {
    id: 3,
    name: "Abinash Rout",
    designation: "Content Collection",
    image: defaultAvatar,
  },
  {
    id: 4,
    name: "Pratap Ranjan Sahoo",
    designation: "Content Support",
    image: defaultAvatar,
  },
  {
    id: 5,
    name: "Brajakishor Sahoo",
    designation: "Member",
    image: defaultAvatar,
  },
  {
    id: 6,
    name: "Ashutosh Sahoo",
    designation: "Member",
    image: defaultAvatar,
  },
  {
    id: 7,
    name: "Chandan Behera",
    designation: "Member",
    image: defaultAvatar,
  },
  {
    id: 8,
    name: "Soumya Ranjan Barik",
    designation: "Member",
    image: defaultAvatar,
  },
  {
    id: 9,
    name: "Gyana Ranjan Mohalik",
    designation: "Member",
    image: defaultAvatar,
  },
];

export function AnimatedTooltipPreview() {
  const [people, setPeople] = useState<any[]>(defaultPeople);

  useEffect(() => {
    async function loadWebCredits() {
      try {
        const res = await apiClient.service(ApiRoutes.websiteCredit).find({ query: { $limit: 100 } });
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any, idx: number) => ({
            id: item._id || idx + 1,
            name: item.name,
            designation: item.role || item.contribution || "Contributor",
            image:
              item.image && !item.image.includes("storage.googleapis.com")
                ? item.image
                : defaultAvatar,
          }));
          setPeople(mapped);
        }
      } catch (err) {
        console.error("Failed to load website credits:", err);
      }
    }
    loadWebCredits();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
