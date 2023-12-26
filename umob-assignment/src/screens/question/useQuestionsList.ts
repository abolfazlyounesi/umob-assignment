import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../hooks";

export function useQuestionsList() {
  const [data, setData] = useState<any>([]);

  const gameData = useAppSelector((state) => state.Game, shallowEqual);
  useEffect(() => {
    if (!!!gameData?.thirdProvider?.city) {
      return;
    }
    let questionsList = [];

    questionsList.push({
      title: "What is this station name?",
      hasMap: true,
      location: [
        {
          latitude: gameData?.thirdProvider?.station_name?.lat,
          longitude: gameData?.thirdProvider?.station_name?.lon,
        },
      ],
      options: [
        {
          title: gameData?.thirdProvider?.station_name.name,
          is_correct: true,
        },
        ...gameData?.firstProvider?.leest_bike_available
          ?.slice(0, 3)
          ?.map((i) => ({
            title: i?.name,
            is_correct: false,
          })),
      ],
    });

    const questionTwoAnswer =
      gameData?.secondProvider?.number_of_bikes?.num_bikes_available;
    questionsList.push({
      title: `How many bike the ${gameData?.secondProvider?.number_of_bikes?.name} has?`,
      hasMap: false,
      location: [
        {
          latitude: gameData?.secondProvider?.number_of_bikes?.lat,
          longitude: gameData?.secondProvider?.number_of_bikes?.lon,
        },
      ],
      options: [
        {
          title: Math.abs(questionTwoAnswer - 9),
          is_correct: false,
        },
        {
          title: questionTwoAnswer,
          is_correct: true,
        },
        {
          title: Math.abs(questionTwoAnswer - 3),
          is_correct: false,
        },
        {
          title: Math.abs(questionTwoAnswer - 34),
          is_correct: false,
        },
      ],
    });

    questionsList.push({
      title: `How much is ${gameData?.thirdProvider?.station_capasity?.name} station's capacity?`,
      hasMap: true,
      location: [
        {
          latitude: gameData?.thirdProvider?.station_capasity?.lat,
          longitude: gameData?.thirdProvider?.station_capasity?.lon,
        },
      ],
      options: [
        {
          title: Math.abs(
            gameData?.thirdProvider?.station_capasity?.capacity - 21
          ),
          is_correct: false,
        },
        {
          title: Math.abs(
            gameData?.thirdProvider?.station_capasity?.capacity - 2
          ),
          is_correct: false,
        },
        {
          title: gameData?.thirdProvider?.station_capasity?.capacity,
          is_correct: true,
        },
        {
          title: Math.abs(
            gameData?.thirdProvider?.station_capasity?.capacity - 12
          ),
          is_correct: false,
        },
      ],
    });

    questionsList.push({
      title: `Which one of these stations is located in ${gameData.thirdProvider.city}?`,
      hasMap: false,
      options: gameData?.thirdProvider?.station_in_this_city?.map((i) => ({
        title: i?.name,
        is_correct: i?.is_correct,
      })),
    });

    questionsList.push({
      title: "Which station has the most available docks as of now?",
      hasMap: false,
      options: gameData?.firstProvider?.with_most_docs?.map((i) => ({
        title: i?.name,
        is_correct: i?.is_correct,
      })),
    });

    questionsList.push({
      title: "Which of these stations currently has no available bikes?",
      hasMap: false,
      options: gameData?.firstProvider?.with_most_bikes?.map((i) => ({
        title: i?.name,
        is_correct: i?.is_correct,
      })),
    });

    questionsList.push({
      title: "Which of these stations has the least number of bikes available?",
      hasMap: false,
      options: gameData?.firstProvider?.leest_bike_available?.map((i) => ({
        title: i?.name,
        is_correct: i?.is_correct,
      })),
    });

    questionsList.push({
      title: "Which of these stations is enabled?",
      hasMap: true,
      location: gameData?.secondProvider?.enable_station?.map((i) => ({
        latitude: i.lat,
        longitude: i.lon,
      })),
      options: gameData?.secondProvider?.enable_station?.map((i) => ({
        title: i?.name,
        is_correct: i?.is_correct,
      })),
    });

    questionsList.push({
      title: `How many bikes are reserved in ${gameData?.thirdProvider?.city} as of now?`,
      hasMap: false,
      options: [
        {
          title: gameData?.thirdProvider?.reserved_bikes_num,
          is_correct: true,
        },
        {
          title: Math.abs(gameData?.thirdProvider?.reserved_bikes_num - 10),
          is_correct: false,
        },
        {
          title: Math.abs(gameData?.thirdProvider?.reserved_bikes_num - 9),
          is_correct: false,
        },
        {
          title: Math.abs(gameData?.thirdProvider?.reserved_bikes_num - 11),
          is_correct: false,
        },
      ],
    });

    setData(questionsList as any);
  }, [gameData]);

  return {
    data,
  };
}
