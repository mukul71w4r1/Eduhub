const bcrypt = require('bcrypt');

const users = [];
const platforms = [
  {
    id: 1,
    name: "Physics Wallah",
    logo: "pw-logo.png",
    url: "https://www.pw.live/",
    description: "Affordable quality education for JEE, NEET, and school boards",
    grades: JSON.stringify(["9-10", "11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB"]),
    budget: "affordable",
    price: "₹3,000-6,000/year",
    features: JSON.stringify(["Live Classes", "Recorded Lectures", "Test Series", "Doubt Solving"]),
    rating: 4.5
  },
  {
    id: 2,
    name: "Unacademy",
    logo: "unacademy-logo.png",
    url: "https://unacademy.com/",
    description: "India's largest learning platform with top educators",
    grades: JSON.stringify(["11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB", "commerce", "arts"]),
    budget: "medium",
    price: "₹5,000-15,000/year",
    features: JSON.stringify(["Live Classes", "Doubt Solving", "Mock Tests"]),
    rating: 4.3
  },
  {
    id: 3,
    name: "Vedantu",
    logo: "vedantu-logo.png",
    url: "https://www.vedantu.com/",
    description: "Live online classes with personalized attention",
    grades: JSON.stringify(["9-10", "11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB", "commerce"]),
    budget: "medium",
    price: "₹8,000-20,000/year",
    features: JSON.stringify(["Live Classes", "1-on-1 Tutoring", "Doubt Clearing"]),
    rating: 4.4
  },
  {
    id: 4,
    name: "Allen Online",
    logo: "allen-logo.png",
    url: "https://www.allen.ac.in/online-programs",
    description: "Trusted name for JEE & NEET preparation",
    grades: JSON.stringify(["11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB"]),
    budget: "premium",
    price: "₹40,000-80,000/year",
    features: JSON.stringify(["Live Classes", "Study Material", "Test Series", "Mentorship"]),
    rating: 4.6
  },
  {
    id: 5,
    name: "Byju's",
    logo: "byjus-logo.png",
    url: "https://byjus.com/",
    description: "Comprehensive learning app with animated videos",
    grades: JSON.stringify(["9-10", "11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB", "commerce"]),
    budget: "premium",
    price: "₹25,000-50,000/year",
    features: JSON.stringify(["Video Lessons", "Practice Tests", "Personalized Learning"]),
    rating: 4.2
  },
  {
    id: 6,
    name: "Khan Academy",
    logo: "khan-logo.png",
    url: "https://www.khanacademy.org/",
    description: "Free world-class education for anyone, anywhere",
    grades: JSON.stringify(["9-10", "11-12"]),
    streams: JSON.stringify(["PCM", "commerce"]),
    budget: "free",
    price: "Free",
    features: JSON.stringify(["Video Lessons", "Practice Exercises", "Progress Tracking"]),
    rating: 4.7
  },
  {
    id: 7,
    name: "Toppr",
    logo: "toppr-logo.png",
    url: "https://www.toppr.com/",
    description: "Personalized learning platform with adaptive tests",
    grades: JSON.stringify(["9-10", "11-12"]),
    streams: JSON.stringify(["PCM", "PCB", "commerce"]),
    budget: "affordable",
    price: "₹4,000-10,000/year",
    features: JSON.stringify(["Adaptive Practice", "Live Doubt Solving", "Video Lectures"]),
    rating: 4.1
  },
  {
    id: 8,
    name: "Doubtnut",
    logo: "doubtnut-logo.png",
    url: "https://doubtnut.com/",
    description: "Get instant solutions by taking a photo of your doubts",
    grades: JSON.stringify(["9-10", "11-12"]),
    streams: JSON.stringify(["PCM", "PCB"]),
    budget: "free",
    price: "Free (Premium: ₹2,000/yr)",
    features: JSON.stringify(["Photo-based Doubt Solving", "Video Solutions", "Live Classes"]),
    rating: 4.3
  },
  {
    id: 9,
    name: "Embibe",
    logo: "embibe-logo.png",
    url: "https://www.embibe.com/",
    description: "AI-powered personalized learning and test prep",
    grades: JSON.stringify(["11-12", "competitive"]),
    streams: JSON.stringify(["PCM", "PCB"]),
    budget: "free",
    price: "Free",
    features: JSON.stringify(["AI Analysis", "Mock Tests", "Performance Insights"]),
    rating: 4.2
  },
  {
    id: 10,
    name: "Extramarks",
    logo: "extramarks-logo.png",
    url: "https://www.extramarks.com/",
    description: "K-12 learning with interactive content",
    grades: JSON.stringify(["9-10", "11-12"]),
    streams: JSON.stringify(["PCM", "PCB", "commerce"]),
    budget: "medium",
    price: "₹10,000-15,000/year",
    features: JSON.stringify(["Video Lectures", "Practice Tests", "Learning App"]),
    rating: 4.0
  }
];

// Default Admin
users.push({
  id: 1,
  name: "Admin",
  email: "admin@eduhub.com",
  password: bcrypt.hashSync('admin123', 10),
  role: "admin"
});

let nextUserId = 2;

const dbMock = {
  prepare: (query) => {
    return {
      get: (...args) => {
        if (query.includes("count(*) as count") && query.includes("users")) return { count: users.length };
        if (query.includes("count(*) as count") && query.includes("platforms")) return { count: platforms.length };
        if (query.includes("FROM users WHERE email")) return users.find(u => u.email === args[0]);
        if (query.includes("FROM users WHERE id")) return users.find(u => u.id === args[0]);
        return null; // undefined usually
      },
      all: (...args) => {
        if (query.includes("FROM platforms")) return platforms;
        return [];
      },
      run: (...args) => {
        if (query.includes("INSERT INTO users")) {
          const [name, email, password] = args;
          const user = { id: nextUserId++, name, email, password, role: 'user' };
          users.push(user);
          return { lastInsertRowid: user.id };
        }
        if (query.includes("INSERT INTO platforms")) {
          // just ignore dynamic inserts for mock
          return { lastInsertRowid: -1 };
        }
      }
    };
  },
  exec: () => {} // Mock create table
};

module.exports = dbMock;
