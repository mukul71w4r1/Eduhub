const express = require('express');
const Platform = require('../models/Platform');

const router = express.Router();

const initialPlatforms = [
  {
    name: "Physics Wallah",
    logo: "pw-logo.png",
    url: "https://www.pw.live/",
    description: "Affordable quality education for JEE, NEET, and school boards",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "affordable",
    price: "₹3,000-6,000/year",
    features: ["Live Classes", "Recorded Lectures", "Test Series", "Doubt Solving"],
    rating: 4.5
  },
  {
    name: "Unacademy",
    logo: "unacademy-logo.png",
    url: "https://unacademy.com/",
    description: "India's largest learning platform with top educators",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce", "arts"],
    budget: "medium",
    price: "₹5,000-15,000/year",
    features: ["Live Classes", "Doubt Solving", "Mock Tests"],
    rating: 4.3
  },
  {
    name: "Vedantu",
    logo: "vedantu-logo.png",
    url: "https://www.vedantu.com/",
    description: "Live online classes with personalized attention",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "medium",
    price: "₹8,000-20,000/year",
    features: ["Live Classes", "1-on-1 Tutoring", "Doubt Clearing"],
    rating: 4.4
  },
  {
    name: "Allen Online",
    logo: "allen-logo.png",
    url: "https://www.allen.ac.in/online-programs",
    description: "Trusted name for JEE & NEET preparation",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "premium",
    price: "₹40,000-80,000/year",
    features: ["Live Classes", "Study Material", "Test Series", "Mentorship"],
    rating: 4.6
  },
  {
    name: "Byju's",
    logo: "byjus-logo.png",
    url: "https://byjus.com/",
    description: "Comprehensive learning app with animated videos",
    grades: ["9-10", "11-12", "competitive"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "premium",
    price: "₹25,000-50,000/year",
    features: ["Video Lessons", "Practice Tests", "Personalized Learning"],
    rating: 4.2
  },
  {
    name: "Khan Academy",
    logo: "khan-logo.png",
    url: "https://www.khanacademy.org/",
    description: "Free world-class education for anyone, anywhere",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "commerce"],
    budget: "free",
    price: "Free",
    features: ["Video Lessons", "Practice Exercises", "Progress Tracking"],
    rating: 4.7
  },
  {
    name: "Toppr",
    logo: "toppr-logo.png",
    url: "https://www.toppr.com/",
    description: "Personalized learning platform with adaptive tests",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "affordable",
    price: "₹4,000-10,000/year",
    features: ["Adaptive Practice", "Live Doubt Solving", "Video Lectures"],
    rating: 4.1
  },
  {
    name: "Doubtnut",
    logo: "doubtnut-logo.png",
    url: "https://doubtnut.com/",
    description: "Get instant solutions by taking a photo of your doubts",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB"],
    budget: "free",
    price: "Free (Premium: ₹2,000/yr)",
    features: ["Photo-based Doubt Solving", "Video Solutions", "Live Classes"],
    rating: 4.3
  },
  {
    name: "Embibe",
    logo: "embibe-logo.png",
    url: "https://www.embibe.com/",
    description: "AI-powered personalized learning and test prep",
    grades: ["11-12", "competitive"],
    streams: ["PCM", "PCB"],
    budget: "free",
    price: "Free",
    features: ["AI Analysis", "Mock Tests", "Performance Insights"],
    rating: 4.2
  },
  {
    name: "Extramarks",
    logo: "extramarks-logo.png",
    url: "https://www.extramarks.com/",
    description: "K-12 learning with interactive content",
    grades: ["9-10", "11-12"],
    streams: ["PCM", "PCB", "commerce"],
    budget: "medium",
    price: "₹10,000-15,000/year",
    features: ["Video Lectures", "Practice Tests", "Learning App"],
    rating: 4.0
  }
];

// Seed Database Route
router.post('/seed', async (req, res) => {
  try {
    const count = await Platform.countDocuments();
    if (count > 0) {
      return res.json({ success: true, message: 'Database already seeded' });
    }
    await Platform.insertMany(initialPlatforms);
    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding Error:', error);
    res.status(500).json({ success: false, message: 'Error seeding database' });
  }
});

// GET all platforms
router.get('/', async (req, res) => {
  try {
    let platforms = await Platform.find({});
    
    // Auto-seed if empty
    if (platforms.length === 0) {
      await Platform.insertMany(initialPlatforms);
      platforms = await Platform.find({});
    }

    res.json({ success: true, count: platforms.length, data: platforms });
  } catch (error) {
    console.error('Platforms Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
