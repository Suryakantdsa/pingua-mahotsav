import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://suryakanta514:0bWBeCnnz8TpvS4H@cluster0.psc34.mongodb.net/pingua_mahotsav";

const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='60' fill='%23ea580c'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='%23ffffff' font-size='40' font-family='sans-serif' font-weight='bold'%3EPM%3C/text%3E%3C/svg%3E";

const EventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, default: "cultural" },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  hasForm: { type: Boolean, default: false },
  participationOpen: { type: Boolean, default: false },
  targetDonors: { type: Number, default: 0 },
  organizer: { type: String, default: "" },
  performers: { type: String, default: "" },
  specialNote: { type: String, default: "" },
  mukhyaAtithi: { type: String, default: "" },
  mukhyaBakta: { type: String, default: "" },
  sammanitaAtithi: { type: String, default: "" },
  guests: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const OrgMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const WebCreditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  contribution: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
}, { timestamps: true });

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  role: { type: String, required: true, default: "member" },
  image: { type: String },
  password: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
const OrgMember = mongoose.models.OrgMember || mongoose.model("OrgMember", OrgMemberSchema);
const WebCredit = mongoose.models.WebCredit || mongoose.model("WebCredit", WebCreditSchema);
const Sponsor = mongoose.models.Sponsor || mongoose.model("Sponsor", SponsorSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);

const eventsData = [
  // --- 2026 Poster Schedule ---
  {
    event: "Jyoti Parikrama (ଜ୍ୟୋତି ପରିକ୍ରମା)",
    date: "25-10-2026",
    day: "Sunday",
    time: "6:00 PM",
    description: "Traditional lighting ceremony marking the sacred beginning of 14th Pingua Mahotsav 2026.",
    type: "opening",
    duration: "2 Hours",
    location: "Main Festival Ground",
    hasForm: false,
    participationOpen: false,
    organizer: "14th Pingua Mahotsav Paribar",
  },
  {
    event: "Blood & Organ Donation Camp (ରକ୍ତଦାନ ଓ ଅଙ୍ଗଦାନ ଶିବିର)",
    date: "26-10-2026",
    day: "Monday",
    time: "9:00 AM - 2:00 PM",
    description: "ଆପଣଙ୍କ ଏହି ମହତ୍ ଦାନ କାହା ଜୀବନରେ ଆଣିପାରେ ନୂଆ ସକାଳ - Serve humanity through blood & organ donation at the festival conference hall.",
    type: "social",
    duration: "5 Hours",
    location: "Pingua Mahotsav Conference Hall",
    hasForm: true,
    targetDonors: 150,
    organizer: "14th Pingua Mahotsav Committee & Mo Pingua",
    specialNote: "Donate Blood - Save Lives, Pledge Organ Donation",
  },
  {
    event: "Cultural Program by Sri Jagannath Kala Bikash Kendra & Village Artists (ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ)",
    date: "26-10-2026",
    day: "Monday",
    time: "7:00 PM",
    description: "Classical Odishi dance and folk performances showcasing local village talent.",
    type: "cultural",
    duration: "3 Hours",
    location: "Main Stage",
    performers: "Sri Jagannath Kala Bikash Kendra, Pingua & Village Artists",
  },
  {
    event: "Adibasi Dance & Music: Gothataila Troupe (ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ : ଗୋଠତଇଲା)",
    date: "27-10-2026",
    day: "Tuesday",
    time: "6:30 PM",
    description: "Vibrant traditional tribal dance and authentic instruments showcasing indigenous Odia culture.",
    type: "cultural",
    duration: "3 Hours",
    location: "Tribal Cultural Pavilion",
    performers: "Gothataila Tribal Dance Troupe",
  },
  {
    event: "Vedic Pravachan by Pandit Dr. Barendra Kumar Panda & Village Talent (ପ୍ରବଚନ ଓ ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ)",
    date: "28-10-2026",
    day: "Wednesday",
    time: "6:00 PM",
    description: "Spiritual discourse by Eminent Vedic Scholar Pandit Dr. Barendra Kumar Panda followed by local village performances.",
    type: "local",
    duration: "3 Hours",
    location: "Main Stage",
    mukhyaBakta: "Pandit Dr. Barendra Kumar Panda (Eminent Vedic Scholar of Odisha)",
  },
  {
    event: "Cultural Program by Village Prativa - Night 2 (ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା)",
    date: "29-10-2026",
    day: "Thursday",
    time: "6:30 PM",
    description: "Village talent showcase featuring local folk singers, drama, skit, and dance troupes.",
    type: "local",
    duration: "3 Hours",
    location: "Main Stage",
    participationOpen: true,
  },
  {
    event: "Melody Live: Aseema Panda & Papu PomPom Live Concert (ମେଲୋଡି କାର୍ଯ୍ୟକ୍ରମ)",
    date: "30-10-2026",
    day: "Friday",
    time: "6:30 PM",
    description: "Mega Musical Night featuring playback star Aseema Panda Live in Concert, Odisha Comedy King Papu PomPom, and Singer Deepam Pritam.",
    type: "professional",
    duration: "4 Hours",
    location: "Main Stage",
    performers: "Aseema Panda, Papu PomPom, Deepam Pritam & Live Band",
  },
  {
    event: "Swara Odisha Ra Finalist Ashis & Krushna + Heart Beat Dance Group (ସ୍ୱର ଓଡ଼ିଶାର ଫାଇନାଲିଷ୍ଟ ଆଶିଷ ଓ କୃଷ୍ଣ)",
    date: "31-10-2026",
    day: "Saturday",
    time: "7:00 PM",
    description: "Sensational live performance by Swara Odisha Ra finalists Ashis & Krushna alongside Heart Beat Dance Group Dhenkanal. Sponsored by Sanskari Group Pingua.",
    type: "professional",
    duration: "4 Hours",
    location: "Pingua Mahotsav Ground",
    performers: "Ashis & Krushna (Singers), Heart Beat Dance Group Dhenkanal",
    specialNote: "Sponsored by Sanskari Group Pingua",
  },
  {
    event: "Grand Immersion Procession: Sammilita Bhasani (ସମ୍ମିଳିତ ଭାସାଣି ଶୋଭାଯାତ୍ରା)",
    date: "01-11-2026",
    day: "Sunday",
    time: "5:00 PM Onwards",
    description: "Grand concluding immersion procession with traditional folk drums, fireworks, and community celebrations.",
    type: "closing",
    duration: "4 Hours",
    location: "Pingua Village to River Ghat",
  },
];

const orgMembersData = [
  {
    name: "Shri Ranjan Sahoo",
    position: "Festival President",
    message: "ଆମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପିଢ଼ୀ ପିଢ଼ୀ ଧରି ଚାଲିଆସିଥିବା ସମୃଦ୍ଧ ସାଂସ୍କୃତିକ ଐତିହ୍ୟର ପ୍ରତିକ। ଏହି ମହୋତ୍ସବ ଆମର ସମସ୍ତଙ୍କୁ ଏକତ୍ର କରେ, ଆମ ପାରମ୍ପରିକତା ଓ ମୂଲ୍ୟବୋଧକୁ ଉଦ୍ଜାପନ କରିବାରେ।",
    image: defaultAvatar,
    order: 1,
    isActive: true,
  },
  {
    name: "Shri Ranjan Kumar Sahoo",
    position: "Festival Secretary",
    message: "ପ୍ରତିବର୍ଷ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ସମୟରେ ଆମ ଗାଁର ସତ୍ୟିକର ମାୟାକୁ ଆମେ ଦେଖୁଥାଉ। ଏହା ଆମର ଏକତା ଓ ସୁନ୍ଦର ପାରମ୍ପରିକତାର ସୁରକ୍ଷାର ପ୍ରତିକ।",
    image: defaultAvatar,
    order: 2,
    isActive: true,
  },
  {
    name: "Shri Niranjan Sahoo",
    position: "Treasurer & Planning Head",
    message: "Every year, we witness the magic of our village coming alive during Pingua Mahotsav. It's a testament to our unity and the preservation of our beautiful traditions.",
    image: defaultAvatar,
    order: 3,
    isActive: true,
  },
  {
    name: "Shri Amarendra Prasad Mohalik",
    position: "Advisory Committee Member",
    message: "My heart always belongs to our village. The unity, culture, and traditions of Pingua are treasures that I deeply cherish and support with pride.",
    image: defaultAvatar,
    order: 4,
    isActive: true,
  },
  {
    name: "Shri Debasish Barik",
    position: "Cultural Program Head",
    message: "The cultural stage of Pingua Mahotsav is where our heritage meets creativity. From folk songs to modern performances, every act reflects the spirit of our village.",
    image: defaultAvatar,
    order: 5,
    isActive: true,
  },
];

const webCreditsData = [
  {
    name: "Suryakant Das",
    role: "Lead Web Developer",
    contribution: "Designed and built the complete Pingua Mahotsav 2026 Admin Panel & Public Website.",
    image: defaultAvatar,
    order: 1,
  },
  {
    name: "Ashish Kumar Sahoo",
    role: "Planning & Architecture",
    contribution: "Guided concept design, feature roadmap, and UI planning.",
    image: defaultAvatar,
    order: 2,
  },
  {
    name: "Abinash Rout",
    role: "Content & Media Collection",
    contribution: "Gathered festival posters, schedules, videos, and media assets.",
    image: defaultAvatar,
    order: 3,
  },
  {
    name: "Pratap Ranjan Sahoo",
    role: "Content & Strategy Support",
    contribution: "Assisted with guest profiles, program verification, and village coordination.",
    image: defaultAvatar,
    order: 4,
  },
  {
    name: "Brajakishor Sahoo",
    role: "Committee Support",
    contribution: "Provided logistical and media support.",
    image: defaultAvatar,
    order: 5,
  },
  {
    name: "Ashutosh Sahoo",
    role: "Technical Support",
    contribution: "Assisted in testing & feedback.",
    image: defaultAvatar,
    order: 6,
  },
  {
    name: "Chandan Behera",
    role: "Design Support",
    contribution: "Design and banner coordination.",
    image: defaultAvatar,
    order: 7,
  },
  {
    name: "Soumya Ranjan Barik",
    role: "Community Relations",
    contribution: "Promoted web engagement in village groups.",
    image: defaultAvatar,
    order: 8,
  },
  {
    name: "Gyana Ranjan Mohalik",
    role: "Ground Operations",
    contribution: "Coordinated volunteer activities.",
    image: defaultAvatar,
    order: 9,
  },
];

const sponsorsData = [
  {
    name: "Sanskari Group Pingua",
    type: "platinum",
    phone: "8763054526",
    email: "sanskari@pinguamahotsav.com",
    message: "Title Sponsor for Swara Odisha Ra Finalists & Heart Beat Dance Night",
  },
  {
    name: "Mo Pingua Media & Digital",
    type: "gold",
    phone: "8763054526",
    email: "mopingua@pinguamahotsav.com",
    message: "Official Digital Broadcasting & Social Media Partner",
  },
  {
    name: "Heart Beat Dance Group Dhenkanal",
    type: "silver",
    phone: "8763054526",
    email: "heartbeat@pinguamahotsav.com",
    message: "Official Performance Troupe & Event Cultural Partner",
  },
];

const teamMembersData = [
  {
    name: "Suryakant Das",
    email: "admin@pinguamahotsav.com",
    phone: "8763054526",
    designation: "Full Stack Engineer & Tech Lead",
    role: "super_admin",
    image: defaultAvatar,
    password: "adminpassword123",
    isActive: true,
  },
  {
    name: "Ranjan Sahoo",
    email: "president@pinguamahotsav.com",
    phone: "9876543210",
    designation: "Festival President",
    role: "admin",
    image: defaultAvatar,
    password: "presidentpassword123",
    isActive: true,
  },
];

async function runSeed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");

    console.log("Seeding Events...");
    await Event.deleteMany({});
    const eventsCreated = await Event.insertMany(eventsData);

    console.log("Seeding Org Members...");
    await OrgMember.deleteMany({});
    const orgMembersCreated = await OrgMember.insertMany(orgMembersData);

    console.log("Seeding Web Credits...");
    await WebCredit.deleteMany({});
    const webCreditsCreated = await WebCredit.insertMany(webCreditsData);

    console.log("Seeding Sponsors...");
    await Sponsor.deleteMany({});
    const sponsorsCreated = await Sponsor.insertMany(sponsorsData);

    console.log("Seeding Team Members...");
    await TeamMember.deleteMany({});
    const teamMembersCreated = await TeamMember.insertMany(teamMembersData);

    console.log("✨ ALL DATA SEEDED SUCCESSFULLY TO MONGODB! ✨");
    console.log({
      eventsCount: eventsCreated.length,
      orgMembersCount: orgMembersCreated.length,
      webCreditsCount: webCreditsCreated.length,
      sponsorsCount: sponsorsCreated.length,
      teamMembersCount: teamMembersCreated.length,
    });
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

runSeed();
