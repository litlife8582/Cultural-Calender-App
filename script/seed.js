const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env.local file');
  process.exit(1);
}

// Define schemas inline for seeding
const FestivalSchema = new mongoose.Schema({
  name: String,
  alternate_names: [String],
  religion: String,
  type: String,
  description: String,
  significance: String,
  mythology: String,
  date: {
    gregorian: Date,
    lunar: String,
    is_variable: Boolean,
    calculation_method: String
  },
  duration_days: Number,
  days: [{
    day: Number,
    name: String,
    date: Date,
    significance: String
  }],
  celebrated_in: [String],
  states: [String],
  public_holiday: Boolean,
  regional_variations: [{
    state: String,
    name: String,
    difference: String
  }],
  traditional_foods: [String],
  colors: [String],
  symbols: [String]
}, { timestamps: true });

const RitualSchema = new mongoose.Schema({
  name: String,
  festival_id: mongoose.Schema.Types.ObjectId,
  festival_name: String,
  type: String,
  difficulty: String,
  duration_minutes: Number,
  description: String,
  significance: String,
  timing: {
    preferred_time: String,
    specific_muhurat: Boolean,
    duration: String
  },
  materials_required: [String],
  steps: [{
    step_number: Number,
    title: String,
    description: String,
    duration_minutes: Number,
    mantras: [String]
  }],
  regional_variations: [{
    region: String,
    variation: String
  }],
  dos: [String],
  donts: [String],
  mantras: [String]
}, { timestamps: true });

const Festival = mongoose.models.Festival || mongoose.model('Festival', FestivalSchema);
const Ritual = mongoose.models.Ritual || mongoose.model('Ritual', RitualSchema);

const festivalsData = [
  {
    name: "Diwali",
    alternate_names: ["Deepavali", "Festival of Lights"],
    religion: "Hindu",
    type: "national",
    description: "Festival of lights celebrating the victory of light over darkness and good over evil",
    significance: "Celebrates Lord Rama's return to Ayodhya after 14 years of exile",
    date: {
      gregorian: new Date("2025-10-20"),
      lunar: "Kartik Amavasya",
      is_variable: true,
      calculation_method: "Based on Hindu lunar calendar"
    },
    duration_days: 5,
    celebrated_in: ["India", "Nepal", "Fiji", "Malaysia", "Singapore"],
    states: ["All States"],
    public_holiday: true,
    traditional_foods: ["Sweets (Mithai)", "Dry fruits", "Namkeen", "Kheer"],
    colors: ["Red", "Yellow", "Orange", "Gold"],
    symbols: ["Diya (oil lamp)", "Rangoli", "Lotus", "Swastika"]
  },
  {
    name: "Holi",
    alternate_names: ["Festival of Colors"],
    religion: "Hindu",
    type: "national",
    description: "Festival of colors celebrating the arrival of spring",
    significance: "Celebrates the burning of Holika and the love of Radha-Krishna",
    date: {
      gregorian: new Date("2025-03-14"),
      lunar: "Phalguna Purnima",
      is_variable: true,
      calculation_method: "Based on Hindu lunar calendar"
    },
    duration_days: 2,
    celebrated_in: ["India", "Nepal"],
    states: ["All States"],
    public_holiday: true,
    traditional_foods: ["Gujiya", "Thandai"],
    colors: ["Red", "Yellow", "Green", "Blue", "Pink"],
    symbols: ["Colored powder (Gulal)", "Water balloons"]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Festival.deleteMany({});
    await Ritual.deleteMany({});
    
    // Insert festivals
    console.log('Inserting festivals...');
    await Festival.insertMany(festivalsData);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();