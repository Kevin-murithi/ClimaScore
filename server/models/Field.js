const mongoose = require('mongoose');

const GeoJSONPolygonSchema = new mongoose.Schema({
  type: { type: String, enum: ['Polygon'], required: true },
  coordinates: {
    type: [[[Number]]], // Array of linear rings, each ring is array of [lng, lat]
    required: true,
  }
}, { _id: false });

const FieldSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  name: { type: String, required: true, trim: true },
  geometry: { type: GeoJSONPolygonSchema, required: true },
  areaHa: { type: Number, default: 0 },
  latestClimaScore: { type: Number, default: null },
  latestRiskBreakdown: { type: Object, default: null },
  metadata: {
    crops: { type: [String], default: [] },
    plantingMethod: { type: String, default: '' },
    harvestingMethod: { type: String, default: '' },
    irrigation: { type: String, default: '' },
    soilType: { type: String, default: '' },
    ownership: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
}, { timestamps: true });

module.exports = mongoose.model('field', FieldSchema);
