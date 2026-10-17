const mongoose = require("mongoose");
const fs = require("fs");

const envContent = fs.readFileSync(".env", "utf8");
let uri = "";
envContent.split("\n").forEach(line => {
  if (line.startsWith("MONGODB_URI=")) {
    uri = line.substring("MONGODB_URI=".length).trim();
  }
});

const eventsData = [
  // 1. DAY 1: October 25, 2026 (Sunday) - Morning 7:00 AM
  {
    event: "Pratham Dibas: Bruddha Jyoti Grama Parikrama (ପ୍ରଥମ ଦିବସ - ବୃଦ୍ଧ ଜ୍ୟୋତି ଗ୍ରାମ ପରିକ୍ରମା)",
    date: "25-10-2026",
    day: "Sunday",
    time: "7:00 AM",
    description: "(ପବିତ୍ର କୁମାର ପୂର୍ଣ୍ଣିମା) ମହୋତ୍ସବ \"ବୃଦ୍ଧ ଜ୍ୟୋତି\" ଗ୍ରାମ ପରିକ୍ରମା । Sacred torch lighting and village procession ceremony marking the auspicious beginning of 14th Pingua Mahotsav 2026.",
    type: "opening",
    duration: "2 Hours",
    location: "Pingua Village (Grama Parikrama)",
    hasForm: false,
    participationOpen: false,
    organizer: "ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପରିବାର (Pingua Mahotsav Paribar)",
  },

  // 2. DAY 2: October 26, 2026 (Monday) - Morning 9:00 AM
  {
    event: "Dwitiya Dibas: Raktadana O Angadana Sibira (ଦ୍ୱିତୀୟ ଦିବସ - ରକ୍ତଦାନ ଓ ଅଙ୍ଗଦାନ ଶିବିର)",
    date: "26-10-2026",
    day: "Monday",
    time: "9:00 AM",
    description: "ରକ୍ତଦାନ ଓ ଅଙ୍ଗଦାନ ଶିବିର, ସ୍ଥାନ - ମହୋତ୍ସବ କାର୍ଯ୍ୟାଳୟ, ପିଙ୍ଗୁଆ । Blood and Organ Donation Camp at Festival Office, Pingua. Donate blood and pledge organs to save valuable human lives.",
    type: "social",
    duration: "5 Hours",
    location: "ମହୋତ୍ସବ କାର୍ଯ୍ୟାଳୟ, ପିଙ୍ଗୁଆ (Pingua Mahotsav Karyalaya)",
    hasForm: true,
    targetDonors: 150,
    organizer: "14th Pingua Mahotsav Committee",
    specialNote: "Donate Blood - Save Lives, Pledge Organ Donation",
  },

  // 3. DAY 2: October 26, 2026 (Monday) - Evening 7:00 PM (Udghatan Utsav / Dwitiya Sandhya)
  {
    event: "Udghatan Utsav / Dwitiya Sandhya (ଉଦ୍‌ଘାଟନ ଉତ୍ସବ - ଦ୍ୱିତୀୟ ସନ୍ଧ୍ୟା)",
    date: "26-10-2026",
    day: "Monday",
    time: "7:00 PM",
    description: "୧୪ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ଉଦ୍‌ଘାଟନ ଉତ୍ସବ । ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ଶ୍ରୀ ଜଗନ୍ନାଥ କଳାବିକାଶ କେନ୍ଦ୍ର, ପିଙ୍ଗୁଆ ଓ ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭାମାନଙ୍କ ଦ୍ୱାରା । Grand Inauguration of 14th Pingua Mahotsav 2026 graced by State Ministers and Parliamentarians.",
    type: "cultural",
    duration: "3.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ କୃଷ୍ଣଚନ୍ଦ୍ର ପାତ୍ର, ମାନ୍ୟବର ମନ୍ତ୍ରୀ, ଖାଦ୍ୟ ଯୋଗାଣ, ଖାଉଟି କଲ୍ୟାଣ ଓ ପ୍ରଯୁକ୍ତି ବିଦ୍ୟା, ଓଡିଶା ସରକାର",
    mukhyaBakta: "ଶ୍ରୀଯୁକ୍ତ ରୁଦ୍ର ନାରାୟଣ ପାଣି, ମାନ୍ୟବର ସାଂସଦ, ଢେଙ୍କାନାଳ",
    sammanitaAtithi: "ଶ୍ରୀମତୀ ଜୟନ୍ତୀ ପାତ୍ର (ଅଧ୍ୟକ୍ଷା, ଢେଙ୍କାନାଳ ପୌରପରିଷଦ); ଶ୍ରୀମତୀ ରୀନାରାଣୀ ଖଟୁଆ (ଅଧ୍ୟକ୍ଷା, ପଞ୍ଚାୟତ ସମିତି, ଗଁଦିଆ); ଶ୍ରୀଯୁକ୍ତ ବୋଧେଶ୍ୱର ସାହୁ (ପୂର୍ବତନ ଜିଲ୍ଲା ପରିଷଦ ଉପାଧ୍ୟକ୍ଷ, ଢେଙ୍କାନାଳ); ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର ରଂଜନ ମହାଳିକ (ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ ଗ୍ରା.ପ.); ଶ୍ରୀଯୁକ୍ତ ଶ୍ରୀନିବାସ ସାହୁ (ସମିତି ସଭ୍ୟ, ପିଙ୍ଗୁଆ ଗ୍ରା.ପ.); ଶ୍ରୀଯୁକ୍ତ ଆନନ୍ଦ ଚନ୍ଦ୍ର ସାହୁ (ବିଜେପି ମଣ୍ଡଳ ସଭାପତି, ନିହଲପ୍ରସାଦ)",
    guests: {
      mukhyaAtithi: {
        name: "ଶ୍ରୀଯୁକ୍ତ କୃଷ୍ଣଚନ୍ଦ୍ର ପାତ୍ର",
        role: "ମୁଖ୍ୟ ଅତିଥି (Chief Guest)",
        position: "ମାନ୍ୟବର ମନ୍ତ୍ରୀ, ଖାଦ୍ୟ ଯୋଗାଣ, ଖାଉଟି କଲ୍ୟାଣ ଓ ପ୍ରଯୁକ୍ତି ବିଦ୍ୟା, ଓଡିଶା ସରକାର"
      },
      mukhyaBakta: {
        name: "ଶ୍ରୀଯୁକ୍ତ ରୁଦ୍ର ନାରାୟଣ ପାଣି",
        role: "ମୁଖ୍ୟ ବକ୍ତା (Chief Speaker)",
        position: "ମାନ୍ୟବର ସାଂସଦ (MP), ଢେଙ୍କାନାଳ"
      },
      sammanitaAtithi: [
        { name: "ଶ୍ରୀମତୀ ଜୟନ୍ତୀ ପାତ୍ର", position: "ଅଧ୍ୟକ୍ଷା, ଢେଙ୍କାନାଳ ପୌରପରିଷଦ" },
        { name: "ଶ୍ରୀମତୀ ରୀନାରାଣୀ ଖଟୁଆ", position: "ଅଧ୍ୟକ୍ଷା, ପଞ୍ଚାୟତ ସମିତି, ଗଁଦିଆ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ବୋଧେଶ୍ୱର ସାହୁ", position: "ପୂର୍ବତନ ଜିଲ୍ଲା ପରିଷଦ ଉପାଧ୍ୟକ୍ଷ, ଢେଙ୍କାନାଳ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର ରଂଜନ ମହାଳିକ", position: "ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ ଗ୍ରା.ପ." },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଶ୍ରୀନିବାସ ସାହୁ", position: "ସମିତି ସଭ୍ୟ, ପିଙ୍ଗୁଆ ଗ୍ରା.ପ." },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଆନନ୍ଦ ଚନ୍ଦ୍ର ସାହୁ", position: "ବିଜେପି ମଣ୍ଡଳ ସଭାପତି, ନିହଲପ୍ରସାଦ" }
      ]
    },
    performers: "ଶ୍ରୀ ଜଗନ୍ନାଥ କଳାବିକାଶ କେନ୍ଦ୍ର, ପିଙ୍ଗୁଆ ଓ ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭାମାନେ (Sri Jagannath Kala Bikash Kendra & Village Artists)",
  },

  // 4. DAY 3: October 27, 2026 (Tuesday) - Evening 7:00 PM (Tritiya Sandhya)
  {
    event: "Tritiya Sandhya: Adibasi Nrutya O Sangita — Gothataila (ତୃତୀୟ ସନ୍ଧ୍ୟା - ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ, ଗୋଠତଇଳା)",
    date: "27-10-2026",
    day: "Tuesday",
    time: "7:00 PM",
    description: "ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ, ଗୋଠତଇଳା । Authentic tribal folk dances and indigenous music performed by traditional artistes from Gothataila.",
    type: "cultural",
    duration: "3 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ ସୁଧୀର କୁମାର ସାମଲ, ପୂର୍ବତନ ବିଧାୟକ, ଢେଙ୍କାନାଳ",
    mukhyaBakta: "ଶ୍ରୀମତୀ ଅର୍ଚ୍ଚନା ପୁହାଣ, ଜିଲ୍ଲାପରିଷଦ ଅଧ୍ୟକ୍ଷା, ଢେଙ୍କାନାଳ",
    sammanitaAtithi: "ଶ୍ରୀଯୁକ୍ତ ଶୁଭେନ୍ଦୁ ସାହୁ (ନଗରପାଳ, ଭୁବନ ଏନ୍.ଏ.ସି.); ଶ୍ରୀଯୁକ୍ତ ବିଭୂତି ଭୂଷଣ ରାଉତ (ଜିଲ୍ଲା ପରିଷଦ ସଭ୍ୟ, ଜୋନ-୪); ଶ୍ରୀଯୁକ୍ତ ପ୍ରଦୀପ କୁମାର ରାଉତ (ବିଜେଡି ବ୍ଲକ ସଭାପତି, ଗଁଦିଆ)",
    guests: {
      mukhyaAtithi: {
        name: "ଶ୍ରୀଯୁକ୍ତ ସୁଧୀର କୁମାର ସାମଲ",
        role: "ମୁଖ୍ୟ ଅତିଥି (Chief Guest)",
        position: "ପୂର୍ବତନ ବିଧାୟକ (Former MLA), ଢେଙ୍କାନାଳ"
      },
      mukhyaBakta: {
        name: "ଶ୍ରୀମତୀ ଅର୍ଚ୍ଚନା ପୁହାଣ",
        role: "ମୁଖ୍ୟ ବକ୍ତା (Chief Speaker)",
        position: "ଜିଲ୍ଲାପରିଷଦ ଅଧ୍ୟକ୍ଷା, ଢେଙ୍କାନାଳ"
      },
      sammanitaAtithi: [
        { name: "ଶ୍ରୀଯୁକ୍ତ ଶୁଭେନ୍ଦୁ ସାହୁ", position: "ନଗରପାଳ, ଭୁବନ ଏନ୍.ଏ.ସି." },
        { name: "ଶ୍ରୀଯୁକ୍ତ ବିଭୂତି ଭୂଷଣ ରାଉତ", position: "ଜିଲ୍ଲା ପରିଷଦ ସଭ୍ୟ, ଜୋନ-୪" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ପ୍ରଦୀପ କୁମାର ରାଉତ", position: "ବିଜେଡି ବ୍ଲକ ସଭାପତି, ଗଁଦିଆ" }
      ]
    },
    performers: "ଆଦିବାସୀ ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ, ଗୋଠତଇଳା (Gothataila Tribal Dance & Music Troupe)",
  },

  // 5. DAY 4: October 28, 2026 (Wednesday) - Evening 7:00 PM (Chaturtha Sandhya)
  {
    event: "Chaturtha Sandhya: Pravachana O Gramanchal Pratibha (ଚତୁର୍ଥ ସନ୍ଧ୍ୟା - ପ୍ରବଚନ ଓ ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା)",
    date: "28-10-2026",
    day: "Wednesday",
    time: "7:00 PM",
    description: "ପ୍ରବଚନ : ପଣ୍ଡିତ ଡ. ବାରେନ୍ଦ୍ର ପଣ୍ଡା । ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ମାନଙ୍କ ଦ୍ୱାରା । Divine Vedic pravachan followed by cultural presentations by talented local youth and village artists.",
    type: "cultural",
    duration: "3.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ ପଦ୍ମଚରଣ ସାହୁ (OAS), ଉପଜିଲ୍ଲାପାଳ, ଢେଙ୍କାନାଳ",
    mukhyaBakta: "ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର କୁମାର ବେହେରା (OAS), ବି.ଡି.ଓ, ଗଁଦିଆ",
    sammanitaAtithi: "ଶ୍ରୀଯୁକ୍ତ ସତ୍ୟଜିତ ମହାପାତ୍ର (OAS, ତହସିଲଦାର, ଗଁଦିଆ); ଶ୍ରୀଯୁକ୍ତ ଜ୍ୟୋତିରଞ୍ଜନ ସାହୁ (OAS, ଡେପୁଟି କଲେକ୍ଟର, ଢେଙ୍କାନାଳ); ଶ୍ରୀଯୁକ୍ତ ଧୁରେନ୍ଦ୍ର କୁମାର ସ୍ୱାଇଁ (ଆର.ଆର.ଓ, ନିହଲପ୍ରସାଦ); ଶ୍ରୀଯୁକ୍ତ ରାମ ନାରାୟଣ ରାଉତ (ଅଧ୍ୟାପକ, ପିଙ୍ଗୁଆ ଡିଗ୍ରୀ କଲେଜ)",
    guests: {
      mukhyaAtithi: {
        name: "ଶ୍ରୀଯୁକ୍ତ ପଦ୍ମଚରଣ ସାହୁ (OAS)",
        role: "ମୁଖ୍ୟ ଅତିଥି (Chief Guest)",
        position: "ଉପଜିଲ୍ଲାପାଳ (Sub-Collector), ଢେଙ୍କାନାଳ"
      },
      mukhyaBakta: {
        name: "ଶ୍ରୀଯୁକ୍ତ ପବିତ୍ର କୁମାର ବେହେରା (OAS)",
        role: "ମୁଖ୍ୟ ବକ୍ତା (Chief Speaker)",
        position: "ବି.ଡି.ଓ (B.D.O.), ଗଁଦିଆ"
      },
      sammanitaAtithi: [
        { name: "ଶ୍ରୀଯୁକ୍ତ ସତ୍ୟଜିତ ମହାପାତ୍ର (OAS)", position: "ତହସିଲଦାର, ଗଁଦିଆ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଜ୍ୟୋତିରଞ୍ଜନ ସାହୁ (OAS)", position: "ଡେପୁଟି କଲେକ୍ଟର, ଢେଙ୍କାନାଳ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଧୁରେନ୍ଦ୍ର କୁମାର ସ୍ୱାଇଁ", position: "ଆର.ଆର.ଓ, ନିହଲପ୍ରସାଦ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ରାମ ନାରାୟଣ ରାଉତ", position: "ଅଧ୍ୟାପକ, ପିଙ୍ଗୁଆ ଡିଗ୍ରୀ କଲେଜ" }
      ]
    },
    specialNote: "ପ୍ରବଚନ : ପଣ୍ଡିତ ଡ. ବାରେନ୍ଦ୍ର ପଣ୍ଡା",
    performers: "ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ମାନେ (Gramanchal Pratibha Artists)",
  },

  // 6. DAY 5: October 29, 2026 (Thursday) - Evening 7:00 PM (Pancham Sandhya)
  {
    event: "Pancham Sandhya: Gramanchal Pratibha Sanskrutika Karyakram (ପଞ୍ଚମ ସନ୍ଧ୍ୟା - ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ)",
    date: "29-10-2026",
    day: "Thursday",
    time: "7:00 PM",
    description: "ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ମାନଙ୍କ ଦ୍ୱାରା ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ । Village talent showcase honoring veteran educators and community leaders of Pingua.",
    type: "local",
    duration: "3.5 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    mukhyaAtithi: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ନାୟକ, ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ ଓ ସମାଜ ସେବୀ, ପିଙ୍ଗୁଆ",
    mukhyaBakta: "ଶ୍ରୀଯୁକ୍ତ ବୁଦ୍ଧଦେବ ପ୍ରଧାନ, ଅବସରପ୍ରାପ୍ତ ପ୍ରଧାନ ଶିକ୍ଷକ, ପିଙ୍ଗୁଆ",
    sammanitaAtithi: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ସାହୁ (ଅବସରପ୍ରାପ୍ତ ଏ.ବି.ଇ.ଓ, ହିନ୍ଦୋଳ); ଶ୍ରୀଯୁକ୍ତ ସୁଧୀର ଚରଣ ସାହୁ (ପୂର୍ବତନ ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ); ଶ୍ରୀଯୁକ୍ତ ଦିବାକର ସାହୁ (ଅବସରପ୍ରାପ୍ତ ବ୍ୟକ୍ତିଗତ ସଚିବ, ଓଡିଶା ସରକାର); ଶ୍ରୀଯୁକ୍ତ ଗୋପାଳ ଚରଣ ମହାଳିକ (ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ, ପିଙ୍ଗୁଆ); ଶ୍ରୀଯୁକ୍ତ ଅମୁଲ୍ୟ କୁମାର ସାହୁ (ସମାଜସେବୀ, ପିଙ୍ଗୁଆ); ଶ୍ରୀଯୁକ୍ତ ହିମାଂଶୁ ଶେଖର ମହାଳିକ (ସହକାରୀ ନିର୍ବାହୀ ଯନ୍ତ୍ରୀ, ବରଙ୍ଗ)",
    guests: {
      mukhyaAtithi: {
        name: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ନାୟକ",
        role: "ମୁଖ୍ୟ ଅତିଥି (Chief Guest)",
        position: "ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ ଓ ସମାଜ ସେବୀ, ପିଙ୍ଗୁଆ"
      },
      mukhyaBakta: {
        name: "ଶ୍ରୀଯୁକ୍ତ ବୁଦ୍ଧଦେବ ପ୍ରଧାନ",
        role: "ମୁଖ୍ୟ ବକ୍ତା (Chief Speaker)",
        position: "ଅବସରପ୍ରାପ୍ତ ପ୍ରଧାନ ଶିକ୍ଷକ, ପିଙ୍ଗୁଆ"
      },
      sammanitaAtithi: [
        { name: "ଶ୍ରୀଯୁକ୍ତ କୈଳାସ ଚନ୍ଦ୍ର ସାହୁ", position: "ଅବସରପ୍ରାପ୍ତ ଏ.ବି.ଇ.ଓ, ହିନ୍ଦୋଳ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ସୁଧୀର ଚରଣ ସାହୁ", position: "ପୂର୍ବତନ ସରପଞ୍ଚ, ପିଙ୍ଗୁଆ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଦିବାକର ସାହୁ", position: "ଅବସରପ୍ରାପ୍ତ ବ୍ୟକ୍ତିଗତ ସଚିବ, ଓଡିଶା ସରକାର" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଗୋପାଳ ଚରଣ ମହାଳିକ", position: "ଅବସରପ୍ରାପ୍ତ ଶିକ୍ଷକ, ପିଙ୍ଗୁଆ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ଅମୁଲ୍ୟ କୁମାର ସାହୁ", position: "ସମାଜସେବୀ, ପିଙ୍ଗୁଆ" },
        { name: "ଶ୍ରୀଯୁକ୍ତ ହିମାଂଶୁ ଶେଖର ମହାଳିକ", position: "ସହକାରୀ ନିର୍ବାହୀ ଯନ୍ତ୍ରୀ, ବରଙ୍ଗ" }
      ]
    },
    participationOpen: true,
    performers: "ଗ୍ରାମାଞ୍ଚଳ ପ୍ରତିଭା ମାନଙ୍କ ଦ୍ୱାରା ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ (Gramanchal Pratibha Artists)",
  },

  // 7. DAY 6: October 30, 2026 (Friday) - Evening 7:00 PM (Sastha Sandhya)
  {
    event: "Sastha Sandhya: Melody Night — Aseema Panda & Papu Pom Pom (ଷଷ୍ଠ ସନ୍ଧ୍ୟା - ମେଲୋଡି କାର୍ଯ୍ୟକ୍ରମ : ଅସୀମା ପଣ୍ଡା ଓ ପପୁ ପମ୍ ପମ୍)",
    date: "30-10-2026",
    day: "Friday",
    time: "7:00 PM",
    description: "ମେଲୋଡି କାର୍ଯ୍ୟକ୍ରମ : ଅସୀମା ପଣ୍ଡା ଓ ସାଥୀବୃନ୍ଦ । ବିଶେଷ ଆକର୍ଷଣ : ପପୁ ପମ୍ ପମ୍ । Sensational live musical concert by playback star Aseema Panda & Group along with comedy performance by Odisha's beloved comedian Papu Pom Pom.",
    type: "professional",
    duration: "4 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    performers: "ଅସୀମା ପଣ୍ଡା ଓ ସାଥୀବୃନ୍ଦ (Aseema Panda & Group), ବିଶେଷ ଆକର୍ଷଣ: ପପୁ ପମ୍ ପମ୍ (Papu Pom Pom)",
    specialNote: "ମେଲୋଡି କାର୍ଯ୍ୟକ୍ରମ : ଅସୀମା ପଣ୍ଡା ଓ ସାଥୀବୃନ୍ଦ | ବିଶେଷ ଆକର୍ଷଣ : ପପୁ ପମ୍ ପମ୍",
  },

  // 8. DAY 7: October 31, 2026 (Saturday) - Evening 7:00 PM (Udyapani Utsav / Saptama Sandhya)
  {
    event: "Udyapani Utsav / Saptama Sandhya: Heart Beat Dance Group, Dhenkanal (ଉଦ୍‌ଯାପନୀ ଉତ୍ସବ - ସପ୍ତମ ସନ୍ଧ୍ୟା)",
    date: "31-10-2026",
    day: "Saturday",
    time: "7:00 PM",
    description: "ଉଦ୍‌ଯାପନୀ ଉତ୍ସବ । ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ : ହାର୍ଟବିଟ୍‌ ଡ୍ୟାନ୍ସ ଗ୍ରୁପ୍, ଢେଙ୍କାନାଳ । ଉଦ୍‌ଯାପକ: ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ (ସଭାପତି ମହୋତ୍ସବ ପରିବାର), ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ (ସମ୍ପାଦକ ମହୋତ୍ସବ ପରିବାର), ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ (ଟ୍ରଷ୍ଟି ଓ ସେବାକର ମୁମ୍ବା-ଆନ୍ଧ୍ର, କଟକ ଏବଂ ମହୋତ୍ସବ ପରିବାର ର ସଦସ୍ୟ) । Grand Valedictory Ceremony and blockbuster modern dance extravaganza.",
    type: "closing",
    duration: "4 Hours",
    location: "ମୁଖ୍ୟ ମଞ୍ଚ, ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ (Main Stage, Pingua Mahotsav Ground)",
    organizer: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ (ସଭାପତି), ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ (ସମ୍ପାଦକ), ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ (ଟ୍ରଷ୍ଟି)",
    sammanitaAtithi: "ଉଦ୍‌ଯାପକ: ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ (ସଭାପତି ମହୋତ୍ସବ ପରିବାର); ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ (ସମ୍ପାଦକ ମହୋତ୍ସବ ପରିବାର); ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ (ଟ୍ରଷ୍ଟି ଓ ସେବାକର ମୁମ୍ବା-ଆନ୍ଧ୍ର, କଟକ ଏବଂ ମହୋତ୍ସବ ପରିବାର ର ସଦସ୍ୟ)",
    guests: {
      mukhyaAtithi: {
        name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ",
        role: "ଉଦ୍‌ଯାପକ / ସଭାପତି",
        position: "ସଭାପତି, ମହୋତ୍ସବ ପରିବାର"
      },
      mukhyaBakta: {
        name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ",
        role: "ଉଦ୍‌ଯାପକ / ସମ୍ପାଦକ",
        position: "ସମ୍ପାଦକ, ମହୋତ୍ସବ ପରିବାର"
      },
      sammanitaAtithi: [
        {
          name: "ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ",
          position: "ଟ୍ରଷ୍ଟି ଓ ସେବାକର ମୁମ୍ବା-ଆନ୍ଧ୍ର, କଟକ ଏବଂ ମହୋତ୍ସବ ପରିବାର ର ସଦସ୍ୟ"
        }
      ]
    },
    performers: "ହାର୍ଟବିଟ୍‌ ଡ୍ୟାନ୍ସ ଗ୍ରୁପ୍, ଢେଙ୍କାନାଳ (Heart Beat Dance Group, Dhenkanal)",
  }
];

async function updateDatabase() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB!");
  const eventsCollection = mongoose.connection.db.collection("events");

  // Remove existing events and insert accurate new ones
  await eventsCollection.deleteMany({});
  console.log("Deleted old events.");

  const now = new Date();
  const docsToInsert = eventsData.map(e => ({
    ...e,
    createdAt: now,
    updatedAt: now
  }));

  const result = await eventsCollection.insertMany(docsToInsert);
  console.log(`Inserted ${result.insertedCount} updated events successfully!`);

  const inserted = await eventsCollection.find({}).sort({ date: 1, time: 1 }).toArray();
  inserted.forEach((e, i) => {
    console.log(`${i + 1}. [${e.date}] (${e.day}) at ${e.time}: ${e.event}`);
    if (e.mukhyaAtithi) console.log(`   - Chief Guest: ${e.mukhyaAtithi}`);
    if (e.mukhyaBakta) console.log(`   - Chief Speaker: ${e.mukhyaBakta}`);
    if (e.performers) console.log(`   - Performers: ${e.performers}`);
  });

  await mongoose.disconnect();
}

updateDatabase().catch(console.error);
