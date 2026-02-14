import mongoose from 'mongoose';

const FestivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Festival name is required'],
    trim: true,
    index: true
  },
  alternate_names: [{
    type: String,
    trim: true
  }],
  religion: {
    type: String,
    enum: ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Buddhist', 'Jain', 'Secular'],
    required: true
  },
  type: {
    type: String,
    enum: ['national', 'regional', 'religious', 'cultural'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  significance: {
    type: String,
    required: true
  },
  mythology: {
    type: String
  },
  date: {
    gregorian: {
      type: Date,
      required: true,
      index: true
    },
    lunar: {
      type: String
    },
    is_variable: {
      type: Boolean,
      default: true
    },
    calculation_method: {
      type: String
    }
  },
  duration_days: {
    type: Number,
    default: 1,
    min: 1
  },
  days: [{
    day: Number,
    name: String,
    date: Date,
    significance: String
  }],
  celebrated_in: [{
    type: String
  }],
  states: [{
    type: String,
    index: true
  }],
  public_holiday: {
    type: Boolean,
    default: false
  },
  regional_variations: [{
    state: String,
    name: String,
    difference: String
  }],
  traditional_foods: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  symbols: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
FestivalSchema.index({ name: 'text', description: 'text' });
FestivalSchema.index({ 'date.gregorian': 1 });
FestivalSchema.index({ religion: 1, type: 1 });
FestivalSchema.index({ states: 1 });

export default mongoose.models.Festival || mongoose.model('Festival', FestivalSchema);
