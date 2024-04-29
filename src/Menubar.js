import CanvasDraw from 'react-canvas-draw';
import React, { useRef, useEffect } from 'react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    ChakraProvider,
    Button
  } from '@chakra-ui/react'


function Menubar() {

    const [sliderValue, setSliderValue] = React.useState(30)
    const [showTooltip, setShowTooltip] = React.useState(false)



    return (


        <div className="container">
            <div className="bottom-middle-div">
                <ChakraProvider>
                
                    

                </ChakraProvider>
            </div>
      </div>

    );
  }
  
  export default Menubar;
  