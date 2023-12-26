import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getGame } from '../../redux/slices/game.slice'

interface IResultsModalProps {
  isVisible: boolean
  onClose: () => void
  score: number,
  counterReset: () => void
}

export default function ResultsModal(props: IResultsModalProps) {
  const {isVisible, onClose, score, counterReset} = props;

  const results = useAppSelector(state => state.User.results)
  const dispatch = useAppDispatch()

  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={styles.container} >
        <Text style={styles.title} >
          {score>0 ? 'You won the game!' : 'You lost the game!'}
        </Text>
        {
          results?.map((i, index)=>(
            <Text style={styles.items} >round {index+1} : {i} score</Text>
          ))
        }
        <Button
          mode={'contained'}
          onPress={()=>{
            dispatch(getGame())
            counterReset()
            onClose()
          }}
        >
          Play again!
        </Button>
      </View>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: '5%',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    marginBottom: '15%'
  },
  items: {
    marginVertical: '4%',
    alignSelf: 'center'
  }
})