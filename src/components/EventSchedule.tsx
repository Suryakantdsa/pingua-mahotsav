"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import apiClient from "@/restApp/apiClient";
import { ApiRoutes } from "@/restApp/api-route";
import {
  Clock,
  MapPin,
  Droplet,
  Music,
  Users,
  Award,
} from "lucide-react";

export interface EventItem {
  _id?: string;
  event: string;
  date: string; // DD-MM-YYYY
  day: string;
  time: string;
  description: string;
  type: string;
  duration?: string;
  location: string;
  hasForm?: boolean;
  participationOpen?: boolean;
  targetDonors?: number;
  organizer?: string;
  performers?: string;
  specialNote?: string;
  mukhyaAtithi?: string;
  mukhyaBakta?: string;
  sammanitaAtithi?: string;
}

const DEFAULT_EVENTS: EventItem[] = [
  {
    date: "25-10-2026",
    day: "Sunday",
    time: "07:00 AM",
    event: "ବୃଦ୍ଧ ଜ୍ୟୋତି ଗ୍ରାମ ପରିକ୍ରମା (Bruddha Jyoti Grama Parikrama)",
    description:
      "ପବିତ୍ର କୁମାର ପୂର୍ଣ୍ଣିମା ଉପଲକ୍ଷେ ମହୋତ୍ସବ \"ବୃଦ୍ଧ ଜ୍ୟୋତି\" ଗ୍ରାମ ପରିକ୍ରମା ଓ ପବିତ୍ର କଳସ ଶୋଭାଯାତ୍ରା । Traditional lighting of sacred torch and village procession inaugurating the 14th Pingua Mahotsav.",
    type: "opening",
    duration: "2 Hours",
    location: "ପିଙ୍ଗୁଆ ଗ୍ରାମ ପରିକ୍ରମା (Pingua Village)",
    organizer: "ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପରିବାର",
  },
  {
    date: "26-10-2026",
    day: "Monday",
    time: "09:00 AM - 02:00 PM",
    event: "ମହା ରକ୍ତଦାନ ଓ ଅଙ୍ଗଦାନ ଶିବିର (Mega Blood & Organ Donation Camp)",
    description:
      "ଜୀବନ ରକ୍ଷା ଅଭିଯାନ — ରକ୍ତଦାନ ମହାପୁଣ୍ୟ । Serve humanity through voluntary blood donation and pledge organ donation at the festival headquarters.",
    type: "social",
    duration: "5 Hours",
    location: "ମହୋତ୍ସବ କାର୍ଯ୍ୟାଳୟ, ପିଙ୍ଗୁଆ (Festival Office)",
    hasForm: true,
    targetDonors: 150,
    organizer: "14th Pingua Mahotsav Committee",
    specialNote: "Donate Blood, Save Lives • Pledge Organ Donation",
  },
  {
    date: "26-10-2026",
    day: "Monday",
    time: "07:00 PM",
    event: "୧୪ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ଶୁଭ ଉଦ୍‌ଘାଟନ (Grand Inaugural Ceremony)",
    description:
      "ମାନ୍ୟବର ମନ୍ତ୍ରୀ ଓ ସାଂସଦଙ୍କ କରକମଳରେ ମହୋତ୍ସବ ଉଦ୍‌ଘାଟନ ଏବଂ ଶ୍ରୀ ଜଗନ୍ନାଥ କଳାବିକାଶ କେନ୍ଦ୍ର ଓ ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭାମାନଙ୍କ ଦ୍ୱାରା ଓଡ଼ିଶୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ ପରିବେଷଣ ।",
    type: "cultural",
    duration: "3.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ କୃଷ୍ଣଚନ୍ଦ୍ର ପାତ୍ର (ମାନ୍ୟବର ମନ୍ତ୍ରୀ, ଖାଦ୍ୟ ଯୋଗାଣ, ଖାଉଟି କଲ୍ୟାଣ ଓ ବୈଷୟିକ ଶିକ୍ଷା ବିଭାଗ, ଓଡିଶା ସରକାର)",
    mukhyaBakta: "ଶ୍ରୀଯୁକ୍ତ ରୁଦ୍ର ନାରାୟଣ ପାଣି (ମାନ୍ୟବର ସାଂସଦ, ଢେଙ୍କାନାଳ ଲୋକସଭା)",
    sammanitaAtithi:
      "ଶ୍ରୀମତୀ ଜୟନ୍ତୀ ପାତ୍ର (ଅଧ୍ୟକ୍ଷା, ଢେଙ୍କାନାଳ ପୌରପରିଷଦ); ଶ୍ରୀମତୀ ରୀନାରାଣୀ ଖଟୁଆ (ଅଧ୍ୟକ୍ଷା, ପଞ୍ଚାୟତ ସମିତି, ଗଁଦିଆ); ଶ୍ରୀଯୁକ୍ତ ବୋଧେଶ୍ୱର ସାହୁ (ପୂର୍ବତନ ଜିଲ୍ଲା ପରିଷଦ ଉପାଧ୍ୟକ୍ଷ); ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର ରଂଜନ ମହାଳିକ (ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ); ଶ୍ରୀଯୁକ୍ତ ଶ୍ରୀନିବାସ ସାହୁ; ଶ୍ରୀଯୁକ୍ତ ଆନନ୍ଦ ଚନ୍ଦ୍ର ସାହୁ",
    performers: "ଶ୍ରୀ ଜଗନ୍ନାଥ କଳାବିକାଶ କେନ୍ଦ୍ର, ପିଙ୍ଗୁଆ ଓ ସ୍ଥାନୀୟ ପ୍ରତିଭାବୃନ୍ଦ",
    participationOpen: true,
  },
  {
    date: "27-10-2026",
    day: "Tuesday",
    time: "07:00 PM",
    event: "ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ — ଗୋଠତଇଳା (Tribal Music & Dance)",
    description:
      "କଙ୍କଡ଼ାହାଡ଼ ଗୋଠତଇଳା ଆଦିବାସୀ ଦଳଙ୍କ ଦ୍ୱାରା ପାରମ୍ପରିକ ଆଦିବାସୀ ନୃତ୍ୟ, ଢୋଲ ବାଦ୍ୟ ଏବଂ ଆଧ୍ୟାତ୍ମିକ ପ୍ରବଚନ ।",
    type: "cultural",
    duration: "3 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ ଶତ୍ରୁଘ୍ନ ଜେନା (ପୂର୍ବତନ ବିଧାୟକ, ଗଁଦିଆ)",
    mukhyaBakta:
      "ଡକ୍ଟର ଶ୍ରୀଯୁକ୍ତ ବସନ୍ତ କୁମାର ପତି (ଯୁଗ୍ମ ନିର୍ଦ୍ଦେଶକ, ଓଡ଼ିଶା ଖଣି ନିଗମ, ଭୁବନେଶ୍ୱର)",
    sammanitaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ପ୍ରଶାନ୍ତ କୁମାର ଧଳ (ସହକାରୀ ନିର୍ବାହୀ ଯନ୍ତ୍ରୀ, ଜଳସମ୍ପଦ); ଶ୍ରୀଯୁକ୍ତ ସୁବାଷ ଚନ୍ଦ୍ର ଦଳେଇ (ପ୍ରବକ୍ତା, ଯୋରନ୍ଦା ମହାବିଦ୍ୟାଳୟ); ଶ୍ରୀଯୁକ୍ତ ରତ୍ନାକର ସାହୁ; ଶ୍ରୀମତୀ ବିଷ୍ଣୁପ୍ରିୟା ବେହେରା (ସମିତି ସଭ୍ୟା)",
    performers: "ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ ଦଳ, ଗୋଠତଇଳା, କଙ୍କଡ଼ାହାଡ଼",
    participationOpen: true,
  },
  {
    date: "28-10-2026",
    day: "Wednesday",
    time: "07:00 PM",
    event: "ଆଧ୍ୟାତ୍ମିକ ପ୍ରବଚନ ଓ ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା (Pravachan & Talent)",
    description:
      "ଭକ୍ତି ସଙ୍ଗୀତ ଓ ଭାଗବତ କଥାମୃତ ପ୍ରବଚନ ଏବଂ ଢେଙ୍କାନାଳ ଗ୍ରାମାଞ୍ଚଳ ଛାତ୍ରଛାତ୍ରୀମାନଙ୍କ ଦ୍ୱାରା ସାଂସ୍କୃତିକ ପ୍ରତିଭା ପ୍ରଦର୍ଶନ ।",
    type: "cultural",
    duration: "3 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ବିଭୂତି ଭୂଷଣ ରାଉତ (ବରିଷ୍ଠ ସମାଜସେବୀ ତଥା ଉପସଭାପତି, ଜିଲ୍ଲା କ୍ରିକେଟ୍ ଆସୋସିଏସନ, ଢେଙ୍କାନାଳ)",
    mukhyaBakta:
      "ଶ୍ରୀଯୁକ୍ତ ଭାଗୀରଥି ତ୍ରିପାଠୀ (ପ୍ରାବନ୍ଧିକ ତଥା ପ୍ରାକ୍ତନ ପ୍ରଧାନଶିକ୍ଷକ, ସରକାରୀ ଉଚ୍ଚ ବିଦ୍ୟାଳୟ, ଭୁବନ)",
    sammanitaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ବସନ୍ତ କୁମାର ମିଶ୍ର (ବିଶିଷ୍ଟ କଳାକାର ଓ ସଙ୍ଗୀତ ନିର୍ଦ୍ଦେଶକ, କଟକ); ଶ୍ରୀଯୁକ୍ତ ତନୁଜ କୁମାର ମହାନ୍ତି (ବରିଷ୍ଠ ଆଇନଜୀବୀ, ଢେଙ୍କାନାଳ); ଶ୍ରୀଯୁକ୍ତ ବସନ୍ତ କୁମାର ସାହୁ",
    performers: "ଭକ୍ତି ସଙ୍ଗୀତ ଶ୍ରୀଯୁକ୍ତ ଭକ୍ତଚରଣ ଦାସ ଓ ସ୍ଥାନୀୟ ଶିଳ୍ପୀବୃନ୍ଦ",
    participationOpen: true,
  },
  {
    date: "29-10-2026",
    day: "Thursday",
    time: "07:00 PM",
    event: "ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ ଓ ନାଟକ (Folk Theatre & Dance)",
    description:
      "ଲୋକକଳା, ଗ୍ରାମାଞ୍ଚଳ ନୃତ୍ୟ ଓ ସାମାଜିକ ନାଟକ ପ୍ରଦର୍ଶନ । Celebration of grassroots folk art and youth performing artists.",
    type: "cultural",
    duration: "3.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ସିମାଞ୍ଚଳ ଖଟୁଆ (ଅବସରପ୍ରାପ୍ତ ଅତିରିକ୍ତ ଶାସନ ସଚିବ, ଗୃହ ବିଭାଗ, ଓଡିଶା)",
    mukhyaBakta:
      "ଡକ୍ଟର ଶ୍ରୀଯୁକ୍ତ କୈଳାଶ ଚନ୍ଦ୍ର ସାହୁ (ଅଧ୍ୟକ୍ଷ, ହିନ୍ଦୋଳ ମହାବିଦ୍ୟାଳୟ, ଖଜୁରିଆକଟା, ଢେଙ୍କାନାଳ)",
    sammanitaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ସଚ୍ଚିଦାନନ୍ଦ ଷଡ଼ଙ୍ଗୀ (ଅଧ୍ୟକ୍ଷ, ବ୍ରାହ୍ମଣୀ ସ୍ୱୟଂଶାସିତ ମହାବିଦ୍ୟାଳୟ, ଦଣ୍ଡାସିଙ୍ଗା); ଶ୍ରୀଯୁକ୍ତ ଗୋପାଳ ଚନ୍ଦ୍ର ବାରିକ (ସାମ୍ବାଦିକ, ପ୍ରମେୟ); ଶ୍ରୀଯୁକ୍ତ ଅଶୋକ କୁମାର ଦାସ",
    performers: "ଢେଙ୍କାନାଳ ଜିଲ୍ଲାର ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ଓ ନାଟ୍ୟ ଦଳ",
    participationOpen: true,
  },
  {
    date: "30-10-2026",
    day: "Friday",
    time: "07:00 PM",
    event: "ମେଲୋଡି ନାଇଟ୍ — ଅସୀମା ପଣ୍ଡା ଓ ପପୁ ପମ୍ ପମ୍ (Star Melody Night)",
    description:
      "ଓଡ଼ିଶାର ସୁପରହିଟ୍ କଣ୍ଠଶିଳ୍ପୀ ଅସୀମା ପଣ୍ଡା ଏବଂ ହାସ୍ୟ ଅଭିନେତା ତତ୍ତ୍ୱ ପ୍ରକାଶ ଶତପଥୀ (ପପୁ ପମ୍ ପମ୍)ଙ୍କ ଦ୍ୱାରା ଧମାକାଦାର ସଙ୍ଗୀତ ସନ୍ଧ୍ୟା ।",
    type: "cultural",
    duration: "4.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi:
      "ଡକ୍ଟର ଶ୍ରୀଯୁକ୍ତ ମୃତ୍ୟୁଞ୍ଜୟ ରଥ (ଅଧ୍ୟକ୍ଷ, ଉତ୍କଳ ସାହିତ୍ୟ ସମାଜ, କଟକ ତଥା ବିଶିଷ୍ଟ ସାହିତ୍ୟିକ)",
    mukhyaBakta:
      "ପ୍ରଫେସର ଡକ୍ଟର ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ଦାସ (ବରିଷ୍ଠ ଅର୍ଥନୀତିଜ୍ଞ, ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ଭୁବନେଶ୍ୱର)",
    sammanitaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ବିଭୂତି ଭୂଷଣ ସାହୁ (ବରିଷ୍ଠ ଆଇନଜୀବୀ ତଥା ସମାଜସେବୀ); ଶ୍ରୀଯୁକ୍ତ ପ୍ରମୋଦ କୁମାର ସାହୁ (ସମାଜସେବୀ); ଶ୍ରୀଯୁକ୍ତ ରବୀନ୍ଦ୍ର ନାଥ ସାହୁ",
    performers: "ଓଲିଉଡ଼ କୁଇନ୍ ଅସୀମା ପଣ୍ଡା, ପପୁ ପମ୍ ପମ୍ ଏବଂ ମେଲୋଡି ଟିମ୍",
  },
  {
    date: "31-10-2026",
    day: "Saturday",
    time: "07:00 PM",
    event: "ଉଦ୍‌ଯାପନୀ ଉତ୍ସବ — ସ୍ୱର ଓଡ଼ିଶା ଓ ହାର୍ଟବିଟ୍ ଡ୍ୟାନ୍ସ (Grand Finale)",
    description:
      "ଉଦ୍‌ଯାପନୀ ସନ୍ଧ୍ୟାରେ ସ୍ୱର ଓଡ଼ିଶାର ଚର୍ଚ୍ଚିତ ପ୍ରତିଭା ଆଶିଷ ଓ କୃଷ୍ଣଙ୍କ ସଙ୍ଗୀତ ଏବଂ ହାର୍ଟବିଟ୍‌ ଡ୍ୟାନ୍ସ ଗ୍ରୁପ୍, ଢେଙ୍କାନାଳଙ୍କ ଦ୍ୱାରା ଭବ୍ୟ ନୃତ୍ୟ କାର୍ଯ୍ୟକ୍ରମ ।",
    type: "closing",
    duration: "4 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ ବବି ମହାନ୍ତି (ମାନ୍ୟବର ବିଧାୟକ, ବଡ଼ଚଣା ନିର୍ବାଚନ ମଣ୍ଡଳୀ)",
    mukhyaBakta:
      "ଶ୍ରୀଯୁକ୍ତ ପ୍ରଦୀପ କୁମାର ସେଠୀ (ବରିଷ୍ଠ ସାମ୍ବାଦିକ ତଥା ସମ୍ପାଦକ, ଦୈନିକ ସମାଜ)",
    sammanitaAtithi:
      "ଶ୍ରୀଯୁକ୍ତ ପ୍ରଦ୍ୟୁମ୍ନ କୁମାର ସାହୁ (ଜିଲ୍ଲା ପରିଷଦ ସଭ୍ୟ); ଶ୍ରୀମତୀ ସୁପ୍ରଭା ଜେନା (ସରପଞ୍ଚ); ଶ୍ରୀଯୁକ୍ତ ସରୋଜ କୁମାର ପାତ୍ର (ସମାଜସେବୀ); ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ",
    performers: "ସ୍ୱର ଓଡ଼ିଶାର ଆଶିଷ ଓ କୃଷ୍ଣ, ହାର୍ଟବିଟ୍‌ ଡ୍ୟାନ୍ସ ଗ୍ରୁପ୍, ଢେଙ୍କାନାଳ",
  },
  {
    date: "01-11-2026",
    day: "Sunday",
    time: "03:00 PM - 09:00 PM",
    event: "ମା’ ଗଜଲକ୍ଷ୍ମୀଙ୍କ ଭବ୍ୟ ଭସାଣି ଶୋଭାଯାତ୍ରା ଓ ମହା ବିସର୍ଜନ (Grand Immersion Ceremony)",
    description:
      "ପାରମ୍ପରିକ ଘଣ୍ଟ, ଶଙ୍ଖ, ତୂରୀ ଓ ଆତସବାଜି ସହ ମା’ ଗଜଲକ୍ଷ୍ମୀଙ୍କ ଭବ୍ୟ ମହା ବିସର୍ଜନ ଶୋଭାଯାତ୍ରା, ମହାପ୍ରସାଦ ସେବନ ଓ ମହୋତ୍ସବ ସମାପନ । Traditional immersion procession of Maa Gajalaxmi accompanied by regional folk drums, fireworks, and community prasad distribution.",
    type: "closing",
    duration: "6 Hours",
    location: "ପିଙ୍ଗୁଆ ଗ୍ରାମ ପରିକ୍ରମା ଓ ବ୍ରାହ୍ମଣୀ ନଦୀ ଘାଟ (Immersion Route)",
    organizer: "ପିଙ୍ଗୁଆ ମହୋତ୍ସବ କମିଟି ଓ ସମସ୍ତ ଗ୍ରାମବାସୀ",
    specialNote: "ସମସ୍ତ ଶ୍ରଦ୍ଧାଳୁ ଭକ୍ତବୃନ୍ଦ ସାଦରେ ନିମନ୍ତ୍ରିତ",
  },
];

export default function EventSchedule() {
  const { setShowBloodDonationForm, setShowParticipationForm } = useFormStore();
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);
  const [activeDate, setActiveDate] = useState<string>("25-10-2026");

  // Fetch verified backend events
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await apiClient.service(ApiRoutes.event).find({ query: { $limit: 100 } });
        const items = res?.data || (Array.isArray(res) ? res : []);
        if (items && items.length > 0) {
          const merged = items.map((backendItem: Partial<EventItem>) => {
            const fallback =
              DEFAULT_EVENTS.find((d) => {
                if (d.date !== backendItem.date) return false;
                if (backendItem.time && d.time) {
                  return d.time.slice(0, 4) === backendItem.time.slice(0, 4);
                }
                return true;
              }) || {};
            return {
              ...fallback,
              ...backendItem,
            } as EventItem;
          });

          // Retain any default events (e.g. Day 08 Immersion) not yet in backend
          const backendDates = new Set(items.map((i: any) => i.date));
          const missingDefaults = DEFAULT_EVENTS.filter((d) => !backendDates.has(d.date));

          setEvents([...merged, ...missingDefaults]);
        }
      } catch {
        // Fallback already in state
      }
    }
    loadEvents();
  }, []);

  // 8 Unique festival dates
  const uniqueDates = [
    { date: "25-10-2026", day: "Sunday", dayShort: "SUN", label: "Day 01", name: "ପ୍ରଥମ ଦିବସ" },
    { date: "26-10-2026", day: "Monday", dayShort: "MON", label: "Day 02", name: "ଦ୍ୱିତୀୟ ଦିବସ" },
    { date: "27-10-2026", day: "Tuesday", dayShort: "TUE", label: "Day 03", name: "ତୃତୀୟ ଦିବସ" },
    { date: "28-10-2026", day: "Wednesday", dayShort: "WED", label: "Day 04", name: "ଚତୁର୍ଥ ଦିବସ" },
    { date: "29-10-2026", day: "Thursday", dayShort: "THU", label: "Day 05", name: "ପଞ୍ଚମ ଦିବସ" },
    { date: "30-10-2026", day: "Friday", dayShort: "FRI", label: "Day 06", name: "ଷଷ୍ଠ ଦିବସ" },
    { date: "31-10-2026", day: "Saturday", dayShort: "SAT", label: "Day 07", name: "ସପ୍ତମ ଦିବସ" },
    { date: "01-11-2026", day: "Sunday", dayShort: "SUN", label: "Day 08", name: "ଅଷ୍ଟମ ଦିବସ (ଭସାଣି)" },
  ];

  // Events for selected active day
  const activeDayEvents = events.filter((e) => e.date === activeDate);
  const currentDayInfo = uniqueDates.find((d) => d.date === activeDate);

  // Clean title parser to separate Odia title and English subtitle
  const parseEventTitle = (raw: string) => {
    // If format is: "English: Something (Odia Title)"
    if (raw.includes("(") && raw.includes(")")) {
      const match = raw.match(/^(.*?)\s*\((.*?)\)$/);
      if (match) {
        const part1 = match[1].trim();
        const part2 = match[2].trim();
        // Check which one contains Odia characters (\u0B00-\u0B7F)
        const isPart2Odia = /[\u0B00-\u0B7F]/.test(part2);
        if (isPart2Odia) {
          return { odiaTitle: part2, englishSubtitle: part1.replace(/^(.*?):\s*/, "") };
        } else {
          return { odiaTitle: part1, englishSubtitle: part2 };
        }
      }
    }
    return { odiaTitle: raw, englishSubtitle: null };
  };

  const getCategoryTag = (type: string, isBlood: boolean) => {
    if (isBlood) {
      return {
        label: "HEALTHCARE & BLOOD CAMP",
        color: "text-rose-300 bg-rose-950/40 border-rose-500/30",
      };
    }
    switch (type) {
      case "opening":
        return {
          label: "SACRED OPENING RITUAL",
          color: "text-[#ffa735] bg-[#dc8513]/10 border-[#dc8513]/30",
        };
      case "closing":
        return {
          label: "VALEDICTORY GRAND FINALE",
          color: "text-[#cca146] bg-[#cca146]/10 border-[#cca146]/30",
        };
      default:
        return {
          label: "CULTURAL EVENING",
          color: "text-[#dfd6c4] bg-white/[0.04] border-white/10",
        };
    }
  };

  return (
    <section id="events" className="py-28 bg-[#030202] text-[#fff7e9] relative border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Isha Mahashivratri Style) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#dc8513] font-semibold block mb-2 font-sans">
            Festival Itinerary • ୨୦୨୬
          </span>
          <h2 className="font-odia text-3xl sm:text-5xl font-black text-[#fff7e9] tracking-tight leading-tight">
            ମହୋତ୍ସବ କାର୍ଯ୍ୟସୂଚୀ
          </h2>
          <p className="font-cinzel text-lg sm:text-xl text-[#dc8513] font-semibold tracking-wider uppercase mt-1">
            Official Festival Schedule 2026
          </p>
          <p className="text-xs sm:text-sm text-[#aea493] mt-3 font-light leading-relaxed font-serif">
            Select a festival date to view verified ceremony timings, honored dignitaries, and cultural performances.
          </p>
        </div>

        {/* 7-Day Selector (Elite Horizontal Ribbon) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start md:justify-center">
          {uniqueDates.map((item) => {
            const isSelected = activeDate === item.date;
            const count = events.filter((e) => e.date === item.date).length;

            return (
              <button
                key={item.date}
                type="button"
                onClick={() => setActiveDate(item.date)}
                className={`flex-shrink-0 px-4 sm:px-5 py-3 rounded-2xl text-center transition-all cursor-pointer border flex flex-col items-center min-w-[90px] sm:min-w-[110px] ${isSelected
                  ? "bg-[#140e1a] border-[#dc8513] shadow-lg shadow-[#dc8513]/20"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
              >
                {/* Day label */}
                <span
                  className={`text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold block ${isSelected ? "text-[#dc8513]" : "text-[#aea493]"
                    }`}
                >
                  {item.label}
                </span>

                {/* Date */}
                <span className="font-serif text-base sm:text-xl font-bold text-[#fff7e9] block my-0.5">
                  {item.date.split("-")[0]} Oct
                </span>

                {/* Day of Week */}
                <span className="text-[10px] sm:text-[11px] text-[#dfd6c4]/70 block font-sans tracking-wider uppercase">
                  {item.dayShort}
                </span>

                {/* Event count dot */}
                <span
                  className={`mt-1.5 text-[9px] px-2 py-0.5 rounded-full font-medium ${isSelected
                    ? "bg-[#dc8513] text-[#030202] font-bold"
                    : "bg-white/5 text-[#aea493]"
                    }`}
                >
                  {count} {count > 1 ? "Events" : "Event"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-8 border-b border-white/10">
          <div>
            <h3 className="font-odia text-xl sm:text-2xl font-bold text-[#fff7e9]">
              {currentDayInfo?.name} — {activeDate} ({currentDayInfo?.day})
            </h3>
            <p className="text-xs text-[#aea493] font-sans mt-0.5">
              {activeDayEvents.length} scheduled program{activeDayEvents.length > 1 ? "s" : ""} on this date
            </p>
          </div>

          <div className="text-xs text-[#cca146] font-medium flex items-center gap-1.5 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#dc8513]" />
            <span>Pingua Mahotsav Ground, Dhenkanal</span>
          </div>
        </div>

        {/* Detailed Events for Selected Day */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {activeDayEvents.map((item, index) => {
              const isBloodCamp =
                item.type === "social" ||
                Boolean(item.event?.includes("ରକ୍ତଦାନ") || item.event?.toLowerCase().includes("blood"));
              const categoryTag = getCategoryTag(item.type, isBloodCamp);
              const { odiaTitle, englishSubtitle } = parseEventTitle(item.event);

              return (
                <motion.div
                  key={`${item.date}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#09070c] border border-white/[0.08] hover:border-white/15 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden transition-all duration-300"
                >
                  {/* Subtle Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc8513]/40 to-transparent" />

                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border ${categoryTag.color}`}
                      >
                        {categoryTag.label}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#dfd6c4] font-medium font-sans">
                        <Clock className="w-3 h-3 text-[#dc8513]" />
                        <span>{item.time}</span>
                      </span>
                    </div>

                    <div className="text-xs text-[#aea493] flex items-center gap-1 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-[#dc8513]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Clean Event Title (Odia Main + English Subtitle) */}
                  <div className="mb-4">
                    <h4 className="font-odia text-2xl sm:text-3xl font-extrabold text-[#fff7e9] leading-snug">
                      {odiaTitle}
                    </h4>
                    {englishSubtitle && (
                      <p className="font-cinzel text-xs sm:text-sm text-[#cca146] tracking-[0.15em] uppercase font-semibold mt-1">
                        {englishSubtitle}
                      </p>
                    )}
                  </div>

                  {/* Event Description */}
                  <p className="font-odia text-sm sm:text-base text-[#dfd6c4] leading-relaxed font-light mb-6">
                    {item.description}
                  </p>

                  {/* Distinguished Dignitaries & Speakers Section */}
                  {(item.mukhyaAtithi || item.mukhyaBakta || item.sammanitaAtithi) && (
                    <div className="pt-6 border-t border-white/[0.08] space-y-4 mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#dc8513]">
                        <Users className="w-3.5 h-3.5" />
                        <span>Honored Dignitaries & Speakers • ଅତିଥି ବୃନ୍ଦ</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Chief Guest */}
                        {item.mukhyaAtithi && (
                          <div className="p-4 rounded-2xl bg-black/40 border-l-2 border-l-[#dc8513] border-t border-r border-b border-white/[0.06]">
                            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#dc8513] mb-1.5">
                              <Award className="w-3 h-3" />
                              <span>ମୁଖ୍ୟ ଅତିଥି (Chief Guest)</span>
                            </div>
                            <p className="font-odia text-base font-bold text-[#fff7e9]">
                              {item.mukhyaAtithi.split("(")[0].trim()}
                            </p>
                            {item.mukhyaAtithi.includes("(") && (
                              <p className="text-xs text-[#dfd6c4]/80 mt-1 leading-relaxed font-sans">
                                {item.mukhyaAtithi.slice(item.mukhyaAtithi.indexOf("("))}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Chief Speaker */}
                        {item.mukhyaBakta && (
                          <div className="p-4 rounded-2xl bg-black/40 border-l-2 border-l-[#cca146] border-t border-r border-b border-white/[0.06]">
                            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#cca146] mb-1.5">
                              <Award className="w-3 h-3" />
                              <span>ମୁଖ୍ୟ ବକ୍ତା (Chief Speaker)</span>
                            </div>
                            <p className="font-odia text-base font-bold text-[#fff7e9]">
                              {item.mukhyaBakta.split("(")[0].trim()}
                            </p>
                            {item.mukhyaBakta.includes("(") && (
                              <p className="text-xs text-[#dfd6c4]/80 mt-1 leading-relaxed font-sans">
                                {item.mukhyaBakta.slice(item.mukhyaBakta.indexOf("("))}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Honored Guests List */}
                      {item.sammanitaAtithi && (
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#aea493] block mb-2.5">
                            ସମ୍ମାନିତ ଅତିଥି (Guests of Honor)
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#dfd6c4]">
                            {item.sammanitaAtithi.split(";").map((guest, gIdx) => (
                              <div
                                key={gIdx}
                                className="flex items-start gap-2 p-2.5 rounded-xl bg-black/30 border border-white/[0.04] font-odia"
                              >
                                <span className="text-[#dc8513] font-bold text-sm leading-none mt-0.5">✦</span>
                                <span className="leading-snug">{guest.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cultural Performance Highlight */}
                  {item.performers && (
                    <div className="p-4 rounded-2xl bg-[#120e18] border border-white/[0.06] mb-6 flex items-start gap-3">
                      <Music className="w-4 h-4 text-[#cca146] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#cca146] block">
                          ସାଂସ୍କୃତିକ ପ୍ରସ୍ତୁତି ଓ କଳାକାର (Cultural Performance)
                        </span>
                        <p className="text-xs sm:text-sm text-[#fff7e9] font-odia mt-0.5 leading-relaxed">
                          {item.performers}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action CTA Bar */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    {isBloodCamp ? (
                      <Link
                        href="/blood-registration"
                        className="px-8 py-3 rounded-full bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-950/30 hover:scale-105 active:scale-95"
                      >
                        <Droplet className="w-4 h-4 fill-white" />
                        <span>Register to Donate Blood</span>
                      </Link>
                    ) : item.participationOpen ? (
                      <Link
                        href="/cultural-registration"
                        className="px-8 py-3 rounded-full bg-[#dc8513] hover:bg-[#ffa735] text-[#030202] font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#dc8513]/20 hover:scale-105 active:scale-95"
                      >
                        <Music className="w-4 h-4" />
                        <span>Participate in Program</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-[#aea493] italic font-serif">
                        Open to public • All devotees are cordially invited
                      </span>
                    )}

                    <span className="text-xs text-[#aea493] font-sans">
                      Duration: {item.duration || "Approx 3 Hours"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
