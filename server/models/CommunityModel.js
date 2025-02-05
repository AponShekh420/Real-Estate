const mongoose = require("mongoose");

const CommunitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDesc: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    website: String,
    phone: {
      type: String,
      required: false,
    },
    description: String,
    address: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "State",
    },
    area: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "Area",
    },
    city: {
      type: mongoose.Types.ObjectId,
      default: null,
      ref: "City",
    },
    amenities: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "Amenity",
      },
    ],
    builders: [
      {
        type: mongoose.Types.ObjectId,
        default: [],
        ref: "Builder",
      },
    ],

    zip: String,
    minPrice: {
      type: Number,
      required: false,
    },
    maxPrice: {
      type: Number,
      required: false,
    },
    homeTypes: [
      {
        type: String,
        required: false,
      },
    ],
    communitySize: {
      type: String,
      required: true,
    },
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
    builtStart: {
      type: String,
      required: false,
    },
    builtEnd: {
      type: String,
      required: false,
    },
    imgs: [
      {
        type: String,
        required: true,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    status: [
      {
        type: String,
        required: true,
      },
    ],
    sqft: {
      type: Number,
    },
    map: String,
    thumbnail: String,
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
        name: String,
        distance: Number,
      },
    },
    hospital: {
      type: {
        name: String,
        distance: Number,
      },
    },
    militaryBase: {
      type: {
        name: String,
        distance: Number,
      },
    },
  },
  { timestamps: true }
);

const CommunityModel =
  mongoose.models.Community || mongoose.model("Community", CommunitySchema);

module.exports = CommunityModel;
