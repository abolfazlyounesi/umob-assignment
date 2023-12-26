import React, { useRef } from "react";
import { ScreensContainerComponent } from "../../common";
import { StyleSheet, Text } from "react-native";
import PagerView from "react-native-pager-view";
import QuestionsItems from "./questions.items";
import { useQuestionScreen } from "./useQuestionScreen";
import AnimatedLottieView from "lottie-react-native";
// @ts-ignore
import CountDownTimer from 'react-native-countdown-timer-hooks';
import ResultsModal from "./results.modal";

export default function QuestionsScreen() {
  const { 
    data, 
    isLoading, 
    score, 
    setScore, 
    pagerRef,
    page, 
    setPage, 
    showModal, 
    setShowModal, 
    timerCallbackFunc 
  } = useQuestionScreen();

  const refTimer = useRef<any>();

  return (
    <ScreensContainerComponent>
      {isLoading ? (
        <AnimatedLottieView
          autoPlay
          source={require("../../../assets/animations/loading.json")}
        />
      ) : (
        <>
          <CountDownTimer
            ref={refTimer}
            timestamp={60}
            timerCallback={timerCallbackFunc}
            containerStyle={styles.counterContainer}
            textStyle={styles.counterText}
          />
          <Text style={styles.score}>Your score is: {score}</Text>
          <PagerView
            style={styles.viewPager}
            initialPage={0}
            ref={pagerRef}
            onPageSelected={(position) => {
              setPage(position.nativeEvent.position);
            }}
            scrollEnabled={false}
          >
            {data?.map((i: any) => (
              <QuestionsItems
                key={i.title}
                question={i.title}
                options={i.options}
                hasMap={i?.hasMap}
                location={i?.location}
                setScore={setScore}
                score={score}
                goNext={() => {
                  if (page >= data?.length - 1) {
                    timerCallbackFunc();
                    return
                  }
                  pagerRef?.current?.setPage(page + 1);
                }}
              />
            ))}
          </PagerView>
          <AnimatedLottieView
            autoPlay
            source={require("../../../assets/animations/anim-1.json")}
            style={styles.animation}
          />
        </>
      )}
      <ResultsModal 
        isVisible={showModal} 
        onClose={()=> setShowModal(false)} 
        score={score}
        counterReset={()=> refTimer?.current?.resetTimer()}
      />
    </ScreensContainerComponent>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  animation: {
    width: "50%",
    alignSelf: "center",
  },
  score: {
    alignSelf: "center",
    marginBottom: "5%",
  },
  counterContainer: {
    height: 56,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#2196f3',
    marginStart: '5%'
  },
  counterText: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: 0.25,
  }
});
