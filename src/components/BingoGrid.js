import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { selectBox, checkBingo, deselectBox } from '../actions/BingoActions';

function BingoGrid(props) {
    const bingoStore = useSelector(data => data.bingo);
  const currentBingos = useStore().getState().bingo.bingos.length
  const dispatch = useDispatch();
    
    const selectBingoBox = (e, index) => {
        let className = props.boxReference.current[index].className
        if (!className.includes('--selected')) {
          props.boxReference.current[index].className = className + '--selected'
          dispatch(selectBox({ selectedPhrase: index }))
          dispatch(checkBingo({ currentBingos: currentBingos }))
        } else {
          let removable = true
          for (let option of bingoStore.options) {
            let verifier = option.filter(x => bingoStore.selectedPhrases.includes(x))
            if (verifier.length === 5 && verifier.includes(index)) {
              removable = false
            }
          }
    
          if (removable) {
            props.boxReference.current[index].className = className.replace('--selected', '')
            dispatch(deselectBox({ selectedPhrase: index }))
          }
    
        }
      }

    return (        <div className="board__grid">

    {
      bingoStore.phrases.map((phrase, index) => index !== 12 ? (
        <div key={index} onClick={(e) => selectBingoBox(e, index)} className="board__grid__box">
          <div key={phrase.length} ref={ref => props.boxReference.current[index] = ref} className="board__grid__box__inner">
            <span>{index + 1}</span>
            <p>{phrase}</p>
          </div>
        </div>
      ) : (
        <div key={index} className="board__grid__box">
          <div style={{ textDecoration: 'initial' }} className="board__grid__box__inner--selected">
            <p>FREE</p>
          </div>
        </div>
      ))
    }
  </div>)

}

export default BingoGrid