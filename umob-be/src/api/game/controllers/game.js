"use strict";

/**
 * A set of functions called "actions" for `game`
 */

const {
  getRandomIndices,
  findObjectWithLargestField,
  findObjectWithSmallestField,
} = require("../../../helpers/api-helpers");
const axios = require("axios");

const FirstProvider =
  "https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_ch/gbfs.json";
const FirstProviderStationInfo =
  "https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_ch/de/station_information.json";
const FirstProviderStationStatus =
  "https://gbfs.nextbike.net/maps/gbfs/v2/nextbike_ch/de/station_status.json";

const SecondProvider =
  "https://dubai.publicbikesystem.net/customer/gbfs/v2/gbfs.json";
const SecondProviderStationStatus =
  "https://dubai.publicbikesystem.net/customer/gbfs/v2/en/station_status";
const SecondProviderStationInfo =
  "https://dubai.publicbikesystem.net/customer/gbfs/v2/en/station_information";

const thirdProvider =
  "https://stables.donkey.bike/api/public/gbfs/2/donkey_oxford/gbfs.json";

const ThirdProviderStationInfo = `https://stables.donkey.bike/api/public/gbfs/2/CITY/en/station_information.json`;
const ThirdProviderStationStatus = `https://stables.donkey.bike/api/public/gbfs/2/CITY/en/station_status.json`;
const ThirdProviderBikes = `https://stables.donkey.bike/api/public/gbfs/2/CITY/en/free_bike_status.json`;

const GbSities = ["donkey_cirencester", "donkey_oxford", "donkey_worthing"];
module.exports = {
  handleGameData: async (ctx, next) => {
    try {
      const firstProviderInfoRes = await axios.get(FirstProviderStationInfo);
      // console.log(firstProviderInfoRes?.data?.data?.stations);

      const threeRandomStationsIndex = getRandomIndices(
        firstProviderInfoRes?.data?.data?.stations,
        3
      );

      const firstProviderStatusRes = await axios.get(
        FirstProviderStationStatus
      );

      const mostDocsAvailable = findObjectWithLargestField(
        firstProviderStatusRes?.data?.data?.stations,
        "num_docks_available"
      );

      const mostBikesAvailable = findObjectWithLargestField(
        firstProviderStatusRes?.data?.data?.stations,
        "num_bikes_available"
      );

      const leestBikesAvailable = findObjectWithSmallestField(
        firstProviderStatusRes?.data?.data?.stations,
        "num_bikes_available"
      );

      const mostDocsAvailableData = {
        ...firstProviderInfoRes?.data?.data?.stations?.filter(
          (i) => i?.station_id === mostDocsAvailable?.station_id
        )?.[0],
        is_correct: true,
      };

      const mostBikesAvailableData = {
        ...firstProviderInfoRes?.data?.data?.stations?.filter(
          (i) => i?.station_id === mostBikesAvailable?.station_id
        )?.[0],
        is_correct: true,
      };

      const leestBikesAvailableData = {
        ...firstProviderInfoRes?.data?.data?.stations?.filter(
          (i) => i?.station_id === leestBikesAvailable?.station_id
        )?.[0],
        is_correct: true,
      };

      const randonGbCity = GbSities?.[getRandomIndices(GbSities, 1)[0]];

      const secondProviderInfoRes = await axios.get(SecondProviderStationInfo);

      const secondProviderStatusRes = await axios.get(
        SecondProviderStationStatus
      );

      const enableStataion =
        secondProviderStatusRes?.data?.data?.stations?.filter(
          (i) => i.status === "IN_SERVICE"
        )?.[0];
      const enableStataionData = {
        ...secondProviderInfoRes?.data?.data?.stations?.filter(
          (i) => i?.station_id === enableStataion?.station_id
        )?.[0],
        is_correct: true,
      };

      const thirdProviderInfoRes = await axios.get(
        ThirdProviderStationInfo?.replace("CITY", randonGbCity)
      );

      const thirdProviderStatusRes = await axios.get(
        ThirdProviderStationStatus?.replace("CITY", randonGbCity)
      );

      const randomStationObject =
        thirdProviderStatusRes?.data?.data?.stations?.[
          getRandomIndices(thirdProviderStatusRes?.data?.data?.stations, 1)[0]
        ];

      const randomStationInfo =
        thirdProviderInfoRes?.data?.data?.stations?.filter(
          (i) => i?.station_id === randomStationObject?.station_id
        )[0];

      const thirdProviderBikes = await axios.get(
        ThirdProviderBikes?.replace("CITY", randonGbCity)
      );

      ctx.body = {
        thirdProvider: {
          city: randonGbCity?.replace("donkey_", "").replaceAll("_", " "),
          reserved_bikes_num: thirdProviderBikes?.data?.data?.bikes?.filter(
            (i) => i?.is_reserved === true
          )?.length,
          station_capasity: {
            ...randomStationObject,
            ...randomStationInfo,
          },
          station_name:
            thirdProviderInfoRes?.data?.data?.stations?.[
              getRandomIndices(thirdProviderInfoRes?.data?.data?.stations, 1)[0]
            ],
          station_in_this_city: [
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[0]
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[1]
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[2]
            ],
            {
              ...thirdProviderInfoRes?.data?.data?.stations?.[
                getRandomIndices(
                  thirdProviderInfoRes?.data?.data?.stations,
                  1
                )[0]
              ],
              is_correct: true,
            },
          ],
        },
        secondProvider: {
          enable_station: [
            enableStataionData,
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[0] - 8)
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[1] - 7)
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[2] - 5)
            ],
          ],
          number_of_bikes: {
            ...enableStataionData,
            ...enableStataion,
          },
        },
        firstProvider: {
          with_most_docs: [
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[0]
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[1]
            ],
            mostDocsAvailableData,
            firstProviderInfoRes?.data?.data?.stations?.[
              threeRandomStationsIndex[2]
            ],
          ],
          with_most_bikes: [
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[0] - 1)
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[1] - 1)
            ],
            mostBikesAvailableData,
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[2] - 1)
            ],
          ],
          leest_bike_available: [
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[0] - 1)
            ],
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[1] - 2)
            ],
            leestBikesAvailableData,
            firstProviderInfoRes?.data?.data?.stations?.[
              Math.abs(threeRandomStationsIndex[1] - 3)
            ],
          ],
        },
      };
    } catch (err) {
      ctx.body = err;
    }
  },
};

/* 
{
        "bike_id": "7ab896b6-1f80-4405-9449-2c1ada550878",
        "lat": "51.7546839",
        "lon": "-1.289349",
        "is_reserved": false,
        "is_disabled": false,
        "last_reported": "2023-11-20T18:19:01.550Z",
        "rental_uris": {
            "ios": "https://dnky.bike/bike?bike_id=7ab896b6-1f80-4405-9449-2c1ada550878",
            "android": "https://dnky.bike/bike?bike_id=7ab896b6-1f80-4405-9449-2c1ada550878"
        },
        "hub_id": "20213"
    }
*/
