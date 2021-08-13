import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pauseAnimation, playAnimation } from '../actions/BingoActions';
import bingoAnimationX1 from '../assets/animations/bingox1.json';
import bingoAnimationX2 from '../assets/animations/bingox2.json';
import bingoAnimationX3 from '../assets/animations/bingox3.json';
import bingoAnimationFull from '../assets/animations/fullbingo.json';
import Lottie from 'react-lottie';

function BingoAnimation() {
  const bingoStore = useSelector(data => data.bingo);
  const dispatch = useDispatch();

  if (bingoStore.playAnimation) {

    let bingoAnimation
    
    switch (bingoStore.animationsQueue[0]) {
      case 4:
        bingoAnimation = bingoAnimationFull
        break;
      case 3:
        bingoAnimation = bingoAnimationX3
        break;
      case 2:
        bingoAnimation = bingoAnimationX2
        break;
      default:
        bingoAnimation = bingoAnimationX1
        break;
    }

    return (
      <div key={bingoStore.animationKey} className="board__animation">
        <Lottie options={{
          loop: bingoStore.animationsQueue[0] === 4,
          autoplay: true,
          animationData: bingoAnimation
        }}
          eventListeners={[
            {
              eventName: 'complete',
              callback: () => {
                dispatch(pauseAnimation());
                if (bingoStore.animationsQueue.length > 0) {
                  dispatch(playAnimation())
                }
              },
            }, {
              eventName: 'loopComplete',
              callback: () => {
                if (bingoStore.selectedPhrases.length === 1 && bingoStore.bingos.length === 0) {
                  dispatch(pauseAnimation())
                } else {
                  dispatch(playAnimation())
                }
              }
            }
          ]} />
      </div>)
  } else {
    return null
  }

}

export default BingoAnimation;