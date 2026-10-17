const mongoose = require("mongoose");
const fs = require("fs");

const envContent = fs.readFileSync(".env", "utf8");
let uri = "";
envContent.split("\n").forEach(line => {
  if (line.startsWith("MONGODB_URI=")) {
    uri = line.substring("MONGODB_URI=".length).trim();
  }
});

const bannerDocs = [
  {
    title: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬",
    subtitle: "14th Pingua Mahotsav • 25 October – 01 November 2026",
    tagline: "କଳା, ସଂସ୍କୃତି, ଐତିହ୍ୟ ଓ ପରମ୍ପରାର କଥା କହେ....",
    category: "Grand Annual Festival",
    imageSrc: "/banners/banner-main-mahotsav.jpg",
    mobileImageSrc: "/banners/banner-main-mahotsav.jpg",
    dateBadge: "25 Oct – 01 Nov 2026",
    location: "ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ, ଢେଙ୍କାନାଳ (Pingua Mahotsav Ground)",
    ctaText: "Explore Event Schedule",
    ctaUrl: "#events",
    secondaryCtaText: "Festival Map & Venue",
    secondaryCtaUrl: "#map",
    order: 1,
    isActive: true,
    focalPoint: "center",
  },
  {
    title: "ମେଲୋଡି ନାଇଟ୍ — ଅସୀମା ପଣ୍ଡା ଓ ପପୁ ପମ୍ ପମ୍",
    subtitle: "Mega Musical Concert & Comedy Extravaganza Live",
    tagline: "ଷଷ୍ଠ ସନ୍ଧ୍ୟା • ୩୦ ଅକ୍ଟୋବର ୨୦୨୬ (ଶୁକ୍ରବାର ସନ୍ଧ୍ୟା ୭ ଘଟିକା)",
    category: "Star Musical Night",
    imageSrc: "/hero-bg.jpg",
    mobileImageSrc: "/hero-bg.jpg",
    dateBadge: "30 Oct 2026 • 7:00 PM",
    location: "Main Festival Stage, Pingua",
    featuredArtist: "Aseema Panda & Group • Papu Pom Pom",
    ctaText: "View Night Schedule",
    ctaUrl: "#events",
    secondaryCtaText: "Watch Festival Gallery",
    secondaryCtaUrl: "#gallery",
    order: 2,
    isActive: true,
    focalPoint: "center",
  },
  {
    title: "ସ୍ୱର ଓଡ଼ିଶାର ଆଶିଷ ଓ କୃଷ୍ଣ + ହାର୍ଟବିଟ୍‌ ଡ୍ୟାନ୍ସ ଗ୍ରୁପ୍",
    subtitle: "Swara Odisha Ra Finalists & Heart Beat Dance Group, Dhenkanal",
    tagline: "ସପ୍ତମ ସନ୍ଧ୍ୟା • ୩୧ ଅକ୍ଟୋବର ୨୦୨୬ — ଉଦ୍‌ଯାପନୀ ଉତ୍ସବ",
    category: "Valedictory Grand Concert",
    imageSrc: "/banners/banner-ashis-krushna.jpg",
    mobileImageSrc: "/banners/banner-ashis-krushna.jpg",
    dateBadge: "31 Oct 2026 • 7:00 PM",
    location: "Main Festival Stage, Pingua",
    featuredArtist: "Ashis & Krushna • Heart Beat Dance Group",
    ctaText: "Festival Schedule",
    ctaUrl: "#events",
    order: 3,
    isActive: true,
    focalPoint: "center",
  },
  {
    title: "ରକ୍ତଦାନ ଓ ଅଙ୍ଗଦାନ ଶିବିର — ଜୀବନ ରକ୍ଷା ଅଭିଯାନ",
    subtitle: "Blood & Organ Donation Camp • Save Lives, Pledge Organ Donation",
    tagline: "ଆପଣଙ୍କ ଏହି ମହତ୍ ଦାନ କାହା ଜୀବନରେ ଆଣିପାରେ ନୂଆ ସକାଳ",
    category: "Community Welfare",
    imageSrc: "/banners/banner-blood-donation.jpg",
    mobileImageSrc: "/banners/banner-blood-donation.jpg",
    dateBadge: "26 Oct 2026 • 9:00 AM",
    location: "ମହୋତ୍ସବ କାର୍ଯ୍ୟାଳୟ, ପିଙ୍ଗୁଆ (Festival Office Hall)",
    ctaText: "Register as Donor 🩸",
    ctaUrl: "#events",
    secondaryCtaText: "Organizers Voice",
    secondaryCtaUrl: "#organizers",
    order: 4,
    isActive: true,
    focalPoint: "center",
  },
  {
    title: "ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ — ଗୋଠତଇଳା",
    subtitle: "Gothataila Indigenous Folk Troupe & Vedic Pravachan",
    tagline: "ତୃତୀୟ ସନ୍ଧ୍ୟା • ୨୭ ଅକ୍ଟୋବର ୨୦୨୬ • ଉତ୍କଳର ପ୍ରାଚୀନ ଐତିହ୍ୟ",
    category: "Indigenous Folk Culture",
    imageSrc: "/banners/banner-heartbeat-youth.jpg",
    mobileImageSrc: "/banners/banner-heartbeat-youth.jpg",
    dateBadge: "27 Oct 2026 • 7:00 PM",
    location: "Pingua Cultural Pavilion",
    featuredArtist: "Gothataila Tribal Dance Troupe",
    ctaText: "Explore Cultural Events",
    ctaUrl: "#events",
    order: 5,
    isActive: true,
    focalPoint: "center",
  }
];

async function seedBanners() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB for Hero Banners seed!");
  const bannerCol = mongoose.connection.db.collection("herobanners");
  await bannerCol.deleteMany({});
  
  const now = new Date();
  const docs = bannerDocs.map(b => ({
    ...b,
    createdAt: now,
    updatedAt: now
  }));
  
  const res = await bannerCol.insertMany(docs);
  console.log(`Successfully seeded ${res.insertedCount} Hero Banners!`);
  await mongoose.disconnect();
}

seedBanners().catch(console.error);
