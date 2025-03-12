const mongoose = require("mongoose");

const DraftCommunitySchema = mongoose.Schema(
  {
    title: { type: String },
    metaTitle: { type: String },
    metaDesc: { type: String },
    slug: { type: String },
    website: { type: String },
    phone: { type: String },
    description: { type: String },
    address: { type: String },
    state: { type: mongoose.Types.ObjectId, ref: "State", default: null },
    city: { type: mongoose.Types.ObjectId, ref: "City", default: null },
    amenities: [{ type: mongoose.Types.ObjectId, ref: "Amenity", default: [] }],
    builders: [{ type: mongoose.Types.ObjectId, ref: "Builder", default: [] }],
    area: { type: mongoose.Types.ObjectId, ref: "Area", default: null },
    zip: { type: String },
    minPrice: { type: Number, default: null },
    maxPrice: { type: Number, default: null },
    homeTypes: { type: [String], default: [] },
    communitySize: { type: Number, default: null },
    ageRestrictions: {
      type: mongoose.Schema.Types.Mixed,
      enum: [true, false, null],
      default: null,
    },
    gated: {
      type: mongoose.Schema.Types.Mixed,
      enum: [true, false, null],
      default: null,
    },
    builtStart: { type: String },
    builtEnd: { type: String },
    imgs: { type: [String], default: [] },
    active: { type: Boolean, default: false },
    status: { type: [String], default: [] },
    map: { type: String },
    thumbnail: { type: String },
    //add created and edited user
    createdby: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updatedby: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    //contact not required
    name: {
      type: String,
    },
    telephone: {
      type: String,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
    },
    airport: {
      type: {
        name: {
          type: String,
          required: false,
        },
        distance: {
          type: Number,
          required: false,
        },
      },
      required: false,
    },
    hospital: {
      type: {
        name: {
          type: String,
          required: false,
        },
        distance: {
          type: Number,
          required: false,
        },
      },
      required: false,
    },
    militaryBase: {
      type: {
        name: {
          type: String,
          required: false,
        },
        distance: {
          type: Number,
          required: false,
        },
      },
      required: false,
    },
    embedVideo: {
      type: String,
    },
    county: {
      type: String,
    },
    pictureDone: {
      type: Boolean,
      default: true,
    },
    health: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DraftCommunityModel =
  mongoose.models.DraftCommunity ||
  mongoose.model("DraftCommunity", DraftCommunitySchema);

module.exports = DraftCommunityModel;
