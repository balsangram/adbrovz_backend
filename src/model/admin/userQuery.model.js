const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    query: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      enum: {
        values: ["Promo", "Bazar", "Assist", "Shortcut"],
      },
    },
    code: {
      type: String,
      trim: true,
      uppercase: true,
    },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    request_id: {
      type: String,
      unique: true,
      index: true,
    },
    reference_id: {
      type: mongoose.Schema.Types.ObjectId,
      comment: "ID of the Promo/Product/Service being queried",
    },
    status: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3],
        message:
          "Status must be 0 (sent), 1 (viewed), 2 (resolved), or 3 (can't resolve)",
      },
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

querySchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

querySchema.virtual("status_text").get(function () {
  const statusMap = {
    0: "Sent",
    1: "Viewed",
    2: "Resolved",
    3: "Cannot be resolved",
  };
  return statusMap[this.status];
});

const Query = mongoose.model("Query", querySchema);

module.exports = Query;
