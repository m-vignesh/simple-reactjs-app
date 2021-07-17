import React from 'react';
import './flip.css';

const flip = props => {
    return (
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              {props.front}
            </div>
            <div class="flip-card-back">
              {props.back}
            </div>
          </div>
        </div>
    )
}

export default flip;
