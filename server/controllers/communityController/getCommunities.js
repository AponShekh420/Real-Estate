const CommunityModel = require("../../models/CommunityModel");

const getCommunities = async (req, res) => {
  const { searchParams, active, limitEnd, sortby, limitStart } = req.body;

  let sortOptions;
  if (sortby == "community_name_asc") {
    sortOptions = {
      title: 1,
    };
  } else if (sortby == "date_edited_asc") {
    sortOptions = {
      updatedAt: 1,
    };
  } else if (sortby == "date_edited_desc") {
    sortOptions = {
      updatedAt: -1,
    };
  } else if (sortby == "date_added_asc") {
    sortOptions = {
      createdAt: 1,
    };
  } else if (sortby == "data_health_asc") {
    sortOptions = {
      health: 1,
    };
  } else if (sortby == "data_health_desc") {
    sortOptions = {
      health: -1,
    };
  } else {
    sortOptions = {
      createdAt: -1,
    };
  }

  try {
    const getCommunitiesData = await CommunityModel.find({ active })
      .populate("state")
      .populate("city")
      .populate("area")
      .populate("amenities")
      .populate("builders")
      .populate({ path: "createdby" })
      .populate({ path: "updatedby" })
      .sort(sortOptions);

    // Filter the results based on the populated fields
    const filteredCommunities = getCommunitiesData.filter((community) => {
      return (
        community?.title?.match(new RegExp(searchParams, "i")) ||
        community?.state?.name.match(new RegExp(searchParams, "i")) ||
        community?.city?.name.match(new RegExp(searchParams, "i")) ||
        community?.area?.name.match(new RegExp(searchParams, "i"))
      );
    });

    res.status(200).json({
      data: filteredCommunities.slice(limitStart, limitEnd),
      lotalNumberOfData: filteredCommunities.length,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = getCommunities;
