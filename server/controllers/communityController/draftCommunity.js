const mongoose = require("mongoose");
const DraftCommunityModel = require("../../models/DraftCommunityModel");
const deleteFileFromSpace = require("../../utils/deleteFileFromSpace");

const getDraftCommunityById = async (req, res) => {
  const { id } = req.params;
  const validatedId = mongoose.Types.ObjectId.isValid(id) ? id : null;
  try {
    const singleCommunity = await DraftCommunityModel.findOne({
      _id: validatedId,
    })
      .populate({ path: "state" })
      .populate({ path: "city" })
      .populate({ path: "area" })
      .populate({ path: "amenities" })
      .populate({ path: "builders" })
      .populate({ path: "createdby" })
      .populate({ path: "updatedby" });
    if (singleCommunity) {
      res.status(200).json({
        msg: "Community has fetched successfully",
        data: singleCommunity,
      });
    } else {
      res.status(404).json({
        errors: {
          notFound: {
            msg: "The community has not founded",
          },
        },
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const getDraftCommunities = async (req, res) => {
  const { searchParams, limitEnd, sortby, limitStart } = req.body;
  let sortOptions;
  if (sortby == "community_name_asc") {
    sortOptions = {
      title: 1,
    };
  } else if (sortby == "date_added_asc") {
    sortOptions = {
      createdAt: 1,
    };
  } else if (sortby == "date_edited_asc") {
    sortOptions = {
      updatedAt: 1,
    };
  } else if (sortby == "date_edited_desc") {
    sortOptions = {
      updatedAt: -1,
    };
  } else {
    sortOptions = {
      createdAt: -1,
    };
  }

  try {
    const getDraftCommunitiesData = await DraftCommunityModel.find()
      .populate("state")
      .populate("city")
      .populate("area")
      .populate("amenities")
      .populate("builders")
      .populate({ path: "createdby" })
      .populate({ path: "updatedby" })
      .sort(sortOptions);

    // Filter the results based on the populated fields
    const filteredDraftCommunities = getDraftCommunitiesData.filter(
      (community) => {
        return (
          community?.title?.match(new RegExp(searchParams, "i")) ||
          community?.state?.name.match(new RegExp(searchParams, "i")) ||
          community?.city?.name.match(new RegExp(searchParams, "i")) ||
          community?.area?.name.match(new RegExp(searchParams, "i"))
        );
      }
    );

    res.status(200).json({
      data: filteredDraftCommunities.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredDraftCommunities.length,
    });
  } catch (err) {
    console.log(err.message);
  }
};
const addDraftCommunity = async (req, res) => {
  const {
    stateId,
    cityId,
    areaId,
    draftId,
    amenities,
    builders,
    status,
    active,
    metaSlug,
    createdby,
    updatedby,
    hospital,
    airport,
    currentThumbnail,
    militaryBase,
    ...otherFields
  } = req.body;

  try {
    const validatedDraftId = mongoose.Types.ObjectId.isValid(draftId)
      ? draftId
      : null;
    const validatedState = mongoose.Types.ObjectId.isValid(stateId)
      ? stateId
      : null;
    const validatedCity = mongoose.Types.ObjectId.isValid(cityId)
      ? cityId
      : null;
    const validatedArea = mongoose.Types.ObjectId.isValid(areaId)
      ? areaId
      : null;
    const validatedCreatedby = mongoose.Types.ObjectId.isValid(createdby)
      ? createdby
      : null;
    const validatedUpdateddby = mongoose.Types.ObjectId.isValid(updatedby)
      ? updatedby
      : null;

    // Validate draftId if provided
    let draft;
    if (validatedDraftId) {
      if (!mongoose.Types.ObjectId.isValid(validatedDraftId)) {
        return res
          .status(400)
          .json({ errors: { draftId: { msg: "Invalid draft ID." } } });
      }
      draft = await DraftCommunityModel.findById(validatedDraftId);
      if (!draft) {
        return res.status(404).json({ errors: { msg: "Draft not found." } });
      }
    }

    // Combine the validated fields with other fields
    const draftData = {
      ...otherFields,
      state: validatedState,
      city: validatedCity,
      area: validatedArea,
      thumbnail: currentThumbnail,
      active,
      slug: metaSlug,
      status: active ? "Active" : "Pending",
      amenities: Array.isArray(JSON.parse(amenities))
        ? JSON.parse(amenities)
        : [],
      builders: Array.isArray(JSON.parse(builders)) ? JSON.parse(builders) : [],
      createdby: validatedCreatedby,
      updatedby: validatedUpdateddby,
      hospital: JSON.parse(hospital),
      airport: JSON.parse(airport),
      militaryBase: JSON.parse(militaryBase),
    };

    if (draft) {
      // Update existing draft
      draft = await DraftCommunityModel.findByIdAndUpdate(
        validatedDraftId,
        draftData,
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "Draft updated successfully.", data: draft });
    } else {
      // Create new draft
      draft = await DraftCommunityModel.create(draftData);
      res.status(201).json({ msg: "Draft saved successfully.", data: draft });
    }
  } catch (err) {
    console.error("Error saving draft:", err.message);
    res.status(500).json({
      errors: {
        server: {
          msg: "An error occurred while saving the draft.",
          error: err.message,
        },
      },
    });
  }
};
const deleteDraftCommunity = async (req, res) => {
  const id = req.params.id;
  const { removeImg = true } = req.body;
  try {
    const draft = await DraftCommunityModel.findByIdAndDelete(id);
    if (removeImg && draft?.imgs.length > 0) {
      for (let img of draft?.imgs) {
        await deleteFileFromSpace("assets-upload", img);
      }
    }

    if (draft) {
      res.status(200).json({
        data: id,
        msg: "deleted successfull",
      });
    } else {
      res.status(404).json({
        errors: {
          locationUpdate: {
            msg: "Somehow this draft community has not deleted from location",
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        msg: "There was an server side error",
      },
    });
  }
};

module.exports = {
  getDraftCommunities,
  getDraftCommunityById,
  addDraftCommunity,
  deleteDraftCommunity,
};
