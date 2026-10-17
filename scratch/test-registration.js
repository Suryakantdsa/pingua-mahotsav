async function testSubmission() {
  const payload = {
    name: "ORISSA DANCE ACADEMY",
    leaderName: "GURUSRI ARUNA MOHANTY",
    phone: "9861012345",
    whatsappNumber: "9861012345",
    address: "Bhubaneswar, Odisha",
    district: "Khurda",
    programType: ["Dance", "Folk Dance"],
    programTitle: "Vande Mataram Odissi Ballet",
    participantsCount: 12,
    duration: "20",
    description: "Grand classical Odissi ballet depicting devotional tribute to Maa Gajalaxmi.",
    specialRequirements: "3 Stage monitor mics, 6 foot-mics, stage audio cable",
    signatureName: "ARUNA MOHANTY",
    declarationAgreed: true,
    declarationDate: "18/10/2026",
  };

  try {
    const res = await fetch("http://localhost:3000/api/participation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

testSubmission();
