import mongoose from 'mongoose';

const RitualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ritual name is required'],
    trim: true
  },
  festival_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Festival',
    required: true,
    index: true
  },
  festival_name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['worship', 'tradition', 'decoration', 'celebration', 'food_preparation'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'complex'],
    default: 'moderate'
  },
  duration_minutes: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true
  },
  significance: {
    type: String,
    required: true
  },
  timing: {
    preferred_time: String,
    specific_muhurat: {
      type: Boolean,
      default: false
    },
    duration: String
  },
  materials_required: [{
    type: String
  }],
  steps: [{
    step_number: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration_minutes: Number,
    mantras: [String]
  }],
  regional_variations: [{
    region: String,
    variation: String
  }],
  dos: [{
    type: String
  }],
  donts: [{
    type: String
  }],
  mantras: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes
RitualSchema.index({ festival_id: 1 });
RitualSchema.index({ type: 1, difficulty: 1 });

export default mongoose.models.Ritual || mongoose.model('Ritual', RitualSchema);
