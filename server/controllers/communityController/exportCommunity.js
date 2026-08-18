import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import path from 'path';
// const iso = require('iso-3166-2');
import iso from "iso-3166-2"
import StateModel from '../../models/StateModel.js';
import AreaModel from '../../models/AreaModel.js';
import CityModel from '../../models/CityModel.js';
import BuilderModel from '../../models/BuildersModel.js';
import AmenityModel from '../../models/AmenityModel.js';
import CommunityModel from '../../models/CommunityModel.js';
import { getImagesForCommunity } from '../../lib/getImagesForCommunity.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportCommunity = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../data/communities-data.xlsx');

    const workbook = XLSX.readFile(filePath);

    // Find the Completed sheet
    const sheetName = 'AllCommunityData-FINAL-IMPORT-F';
    // const sheetName = workbook.SheetNames.find(name => name === 'Completed');

    if (!sheetName) {
      return res.status(400).json({
        success: false,
        message: `Sheet 'Completed' not found. Available sheets: ${workbook.SheetNames.join(', ')}`
      });
    }

    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // get state full name from iso code
    // const stateList = data.splice(0, 5).map((community) => {
    //     const raw = community?.State?.toUpperCase().trim();
    //     if (!raw) return null;

    //     const info = iso.subdivision('US', raw)

    //     if (info) {
    //         console.log(info);
    //         return info.name;
    //     }

    //     console.warn(`No match found for: ${raw}`);
    //     return null;
    // });
    // end

    const notImagesCommunities = [];

    //loop community
    for(const community of data) {
      const raw = community?.State?.toUpperCase().trim();

      // Remove special characters and make the slug
      const sanitizedTitle = community["Community Name"]
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "");
      let slug = sanitizedTitle.split(" ").join("-");

      // Check for duplicates
      const duplicateCommunityCount = await CommunityModel.countDocuments({
        slug: { $regex: `^${slug}(-[0-9]*)?$`, $options: "i" },
      });

      if (duplicateCommunityCount > 0) {
        slug = `${slug}-${duplicateCommunityCount}`;
      }


      const { images: communityImgs, thumbnail: communityThumbnail } = await getImagesForCommunity(slug, raw);



      if(communityImgs.length >= 0) {
        // variables to store state, city, area, amenities, builders
        let stateId;
        let cityId;
        let areaId;
        const amenities = [];
        const builders = [];
        // variables end
      
        // get or create state
        if (!raw) {
          console.log("has no state on this community: ", community);
        } else {
          const info = iso.subdivision('US', raw)
          if (info) {
              // community.State = info.name;
              const findState = await StateModel.findOne({ name: {$regex: info.name, $options: "i"} });
              if (findState) {
                stateId = findState._id;
                community.State = stateId;
                console.log("community state already have:", community.State);
              } else {
                console.warn(`State not found in database so creating: ${info.name}`);
                const newState = new StateModel({
                  name: info.name,
                  abbreviation: info.regionCode,
                  slug: info.name.toLowerCase().trim().split(' ').join("-")
                });
                const savedState = await newState.save();
                community.State = savedState._id;
                stateId = savedState._id;
                console.log("community state1:", community.State);
                console.log("savedState state: ", savedState);
              }
          } else {
              console.warn(`No match found for: ${raw}`);
              community.State = null;
          }
        }
        // state creation end

        // Area create start
        if(community?.Area) {
          const area = await AreaModel.findOne({ name: {$regex: community.Area, $options: "i"}, state: stateId });
          if (area) {
            community.area = area._id;
            areaId = area._id;
          } else {
            console.warn(`Area not found in database so creating: ${community.Area}`);
            const newState = new AreaModel({
              name: community.Area,
              slug: community.Area.toLowerCase().trim().split(' ').join("-"),
              state: stateId
            });
            const savedArea = await newState.save();
            const updateState = await StateModel.findByIdAndUpdate(stateId, { $push: { area: savedArea._id } });
            community.area = savedArea._id;
            areaId = savedArea._id;
            console.log("community area:", community.area);
            console.log("savedArea area: ", savedArea);
          }
        } else {
          console.log("has no area on this community: ", community);
        }
        // Area create end


        // City create start
        if(community?.City) {
          const city = await CityModel.findOne({ name: {$regex: community.City, $options: "i"}, state: stateId, area: areaId });
          if (city) {
            community.city = city._id;
            cityId = city._id;
          } else {
            console.warn(`City not found in database so creating: ${community.City}`);
            const newCity = new CityModel({
              name: community.City,
              slug: community.City.toLowerCase().trim().split(' ').join("-"),
              state: stateId,
              area: areaId
            });
            const savedCity = await newCity.save();
            const updateArea = await AreaModel.findByIdAndUpdate(areaId, { $push: { city: savedCity._id } });
            community.city = savedCity._id;
            cityId = savedCity._id;
            console.log("community city:", community.city);
            console.log("savedCity city: ", savedCity);
          }
        } else {
          console.log("has no city on this community: ", community);
        }
        // City create end

        // Amenities create start
        if(community?.amenities) {
          const amenitiesList = community.amenities.split(',').map(item => item.trim());
          for(const amenityName of amenitiesList) {
            const findAmenity = await AmenityModel.findOne({ name: {$regex: amenityName, $options: "i"} });
            if (findAmenity) {
              amenities.push(findAmenity._id);
              console.log("community amenity already have:", amenityName);
            } else {
              console.warn(`Amenity not found in database so creating: ${amenityName}`);
              const newAmenity = new AmenityModel({
                name: amenityName,
              });
              const savedAmenity = await newAmenity.save();
              amenities.push(savedAmenity._id);
              console.log("community amenity:", amenityName);
              console.log("savedAmenity amenity: ", savedAmenity);
            }
            // find or create amenity and push to amenities array
            // similar to state, area, city creation
          }
        } else {
          console.log("has no amenities on this community: ", community);
        }
        // Amenities create end

        // Builders create start
        if(community?.Builders) {
          const buildersList = community.Builders.split(',').map(item => item.trim());
          for(const builderName of buildersList) {
            const findBuilder = await BuilderModel.findOne({ name: {$regex: builderName, $options: "i"} });
            if (findBuilder) {
              builders.push(findBuilder._id);
              console.log("community builder already have:", builderName);
            } else {
              console.warn(`Builder not found in database so creating: ${builderName}`);
              const newBuilder = new BuilderModel({
                name: builderName,
              });
              const savedBuilder = await newBuilder.save();
              builders.push(savedBuilder._id);
              console.log("community builder:", builderName);
              console.log("savedBuilder builder: ", savedBuilder);
            }
          }
        } else {
          console.log("has no builders on this community: ", community);
        }
        // Builders create end



        


        // finally create community with all the data
        const newCommunity = {
          title: community["Community Name"],
          slug: slug,
          metaTitle: community["Community Name"],
          metaDesc: community.Description ? community.Description.substring(0, 160) : "",
          description: community.Description,
          state: stateId,
          area: areaId,
          city: cityId,
          amenities,
          builders,
          imgs: communityImgs,
          zip: community.Zip,
          minPrice: community.MinPrice,
          maxPrice: community.MaxPrice,
          createdby: "67274878917649709d3bc88f",
          pictureDone: false,
          active: communityImgs.length > 0 ? true : false,
          homeTypes: community.HomeTypes ? community.HomeTypes.split(',').map(item => item.trim()) : []
        };

        community["Closest International Airport"] && (newCommunity.airport = {
          name: community["Closest International Airport"],
          distance: community["A-Distance"]
        });
        community["Closest VA Facility"] && (newCommunity.militaryBase = {
          name: community["Closest VA Facility"],
          distance: community["V-Distance"]
        });
        community["Closest Hospital"] && (newCommunity.hospital = {
          name: community["Closest Hospital"],
          distance: community["H-Distance"]
        });
        community.Zip && (newCommunity.zip = community.Zip);
        (communityThumbnail) && (newCommunity.thumbnail = communityThumbnail);
        community.County && (newCommunity.county = community.County);
        community.Address && (newCommunity.address = community.Address);
        community.City && (newCommunity.map = community.City);
        community["Age Restricted"] ? (newCommunity.ageRestrictions = community["Age Restricted"]?.toLowerCase().includes("yes")) : null;
        community["Gated?"] ? (newCommunity.gated = community["Gated?"]?.toLowerCase().includes("yes")) : null;
        community["Total Homes"] && (newCommunity.communitySize = community["Total Homes"]);
        community["Construction Began"] && (newCommunity.builtStart = community["Construction Began"]);
        community["Construction Completed"] && (newCommunity.builtEnd = community["Construction Completed"]);
        community["Community Website"] && (newCommunity.website = community["Community Website"]);





        // health check
        let healthValue = 100;
        // per field 30%
        if (newCommunity.description == "" || !newCommunity.description || newCommunity.description == "<p><br></p>") {
          healthValue = healthValue - 30;
        }
        // pictureDone is already a boolean
        if (!newCommunity.pictureDone) {
          healthValue = healthValue - 30;
        }

        // amenities is already an array
        if (!newCommunity.amenities || newCommunity.amenities.length <= 0) {
          healthValue = healthValue - 30;
        }

        // per field 10%
        if (!newCommunity.homeTypes || newCommunity.homeTypes?.length <= 0) {
          healthValue = healthValue - 10;
        }
        if (Number(newCommunity.minPrice) <= 0 && Number(newCommunity.maxPrice) <= 0) {
          healthValue = healthValue - 10;
        }
        if (newCommunity.ageRestrictions == null) {
          healthValue = healthValue - 10;
        }
        if (newCommunity.gated == null) {
          healthValue = healthValue - 10;
        }
        if (Number(newCommunity.communitySize) <= 0) {
          healthValue = healthValue - 10;
        }
        if ((!newCommunity.builtStart && !newCommunity.builtEnd) || (newCommunity.builtEnd && !newCommunity.builtStart)) {
          healthValue = healthValue - 10;
        }

        // per field 1%
        if (!newCommunity.airport?.name && !newCommunity.airport?.distance) {
          healthValue = healthValue - 1;
        }
        if (!newCommunity.hospital?.name && !newCommunity.hospital?.distance) {
          healthValue = healthValue - 1;
        }
        if (!newCommunity.militaryBase?.name && !newCommunity.militaryBase?.distance) {
          healthValue = healthValue - 1;
        }

        if (healthValue <= 0) {
          healthValue = 0;
        }

        newCommunity.health = healthValue;



        const insertedCommunity = new CommunityModel(newCommunity);

        const savedCommunity = await insertedCommunity.save();
        console.log("savedCommunity community: ", savedCommunity);

        // push the community in state community list
        const stateUpdate = await StateModel.findByIdAndUpdate(stateId, {
          $push: {
            community: savedCommunity._id,
          },
        });

        // push the community in city community list
        if (cityId) {
          await CityModel.findByIdAndUpdate(cityId, {
            $push: {
              community: savedCommunity._id,
            },
          });
        }

        if (areaId) {
          // push the community in area community list
          await AreaModel.findByIdAndUpdate(areaId, {
            $push: {
              community: savedCommunity._id,
            },
          });
        }
      } else {
        console.log(`No slug found for community: ${slug}`);
        notImagesCommunities.push({ slug, state: raw });
      }


    }

    // After the for...of loop ends
    if (notImagesCommunities.length > 0) {
      const wsData = [
        ['Slug', 'State'],  // header row
        ...notImagesCommunities.map(({ slug, state }) => [slug, state])  // data rows
      ];

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      ws['!cols'] = [{ wch: 60 }, { wch: 20 }];

      XLSX.utils.book_append_sheet(wb, ws, 'No Images');

      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

      res.setHeader('Content-Disposition', 'attachment; filename="no-images-communities.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      return res.status(200).send(buffer);
    }

    res.status(200).json({
      success: true,
      message: "export has completed",
      total: data.length,
      data,
      notImagesCommunities
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default exportCommunity;















// this function has built for find last 20 days images
// import {
//   S3Client,
//   ListObjectsV2Command,
// } from "@aws-sdk/client-s3";

// const client = new S3Client({
//   endpoint: "https://nyc3.digitaloceanspaces.com",
//   region: "nyc3",
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// const BUCKET_NAME = "assets-upload";
// const IMAGE_BASE_URL =
//   "https://assets-upload.nyc3.digitaloceanspaces.com/assets/communityImgs";

// async function getLast20DaysImages() {
//   const twentyDaysAgo = new Date();
//   twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

//   let continuationToken;
//   const recentImages = [];

//   do {
//     const { Contents, NextContinuationToken } = await client.send(
//       new ListObjectsV2Command({
//         Bucket: BUCKET_NAME,
//         Prefix: "assets/communityImgs/",
//         ContinuationToken: continuationToken,
//       })
//     );

//     if (Contents) {
//       recentImages.push(
//         ...Contents.filter(
//           (file) => file.LastModified && file.LastModified >= twentyDaysAgo
//         ).map((file) => ({
//           key: file.Key,
//           url: `${IMAGE_BASE_URL}/${file.Key.replace(
//             "assets/communityImgs/",
//             ""
//           )}`,
//           lastModified: file.LastModified,
//           size: file.Size,
//         }))
//       );
//     }

//     continuationToken = NextContinuationToken;
//   } while (continuationToken);

//   return recentImages;
// }

// const getLast20DaysImagesFun = async (req, res) => {
//   const images = await getLast20DaysImages();

//   console.log(`Found ${images.length} images uploaded in the last 20 days.\n`);

//   images.forEach((img) => {
//     console.log(img.lastModified);
//     console.log(img.url);
//     console.log("-----------------------------");
//   });
//   res.status(200).json({
//     success: true,
//     message: "Images fetched successfully",
//     total: images.length,
//     data: images,
//   });
// };


// import {
//   S3Client,
//   ListObjectsV2Command,
//   DeleteObjectsCommand,
// } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new S3Client({
//   endpoint: "https://nyc3.digitaloceanspaces.com",
//   region: "nyc3",
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// const BUCKET_NAME = "assets-upload";
// const PREFIX = "assets/communityImgs/";
// const DAYS = 20; // Delete files uploaded in the last 20 days

// async function deleteRecentImages(req, res) {
//   const cutoffDate = new Date();
//   cutoffDate.setDate(cutoffDate.getDate() - DAYS);

//   let continuationToken;
//   const filesToDelete = [];

//   console.log(`Searching for files uploaded in the last ${DAYS} days...\n`);

//   // Get all files from the folder
//   do {
//     const response = await client.send(
//       new ListObjectsV2Command({
//         Bucket: BUCKET_NAME,
//         Prefix: PREFIX,
//         ContinuationToken: continuationToken,
//       })
//     );

//     if (response.Contents) {
//       response.Contents.forEach((file) => {
//         if (file.LastModified && file.LastModified >= cutoffDate) {
//           filesToDelete.push({
//             Key: file.Key,
//           });
//         }
//       });
//     }

//     continuationToken = response.NextContinuationToken;
//   } while (continuationToken);

//   console.log(`Found ${filesToDelete.length} file(s) to delete.\n`);

//   if (filesToDelete.length === 0) {
//     console.log("No files found.");
//     return;
//   }

//   // Show files before deleting
//   console.table(filesToDelete);

//   // Uncomment these two lines if you want to verify first
//   // console.log("Verification complete. Remove the return below to actually delete.");
//   // return;

//   // Delete in batches of 1000
//   for (let i = 0; i < filesToDelete.length; i += 1000) {
//     const batch = filesToDelete.slice(i, i + 1000);

//     const result = await client.send(
//       new DeleteObjectsCommand({
//         Bucket: BUCKET_NAME,
//         Delete: {
//           Objects: batch,
//           Quiet: false,
//         },
//       })
//     );

//     console.log(
//       `Deleted batch ${Math.floor(i / 1000) + 1}: ${
//         result.Deleted?.length || 0
//       } file(s).`
//     );
//     res.status(200).json({
//       success: true,
//       message: "Deleted batch successfully",
//       deletedCount: result.Deleted?.length || 0,
//     });

//     if (result.Errors?.length) {
//       console.error("Errors:");
//       console.table(result.Errors);
//     }
//   }

//   console.log("\n✅ Done! All matching files have been deleted.");
// }

// export default deleteRecentImages;

// export default getLast20DaysImagesFun;