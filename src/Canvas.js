import CanvasDraw from "react-canvas-draw";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Menubar from "./Menubar";
import db from "./utils/firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Link , useNavigate, useParams} from 'react-router-dom';
import NotFound from "./NotFound";


import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    ChakraProvider,
    Button,
	useToast 
} from "@chakra-ui/react";

function CanvasApp() {
    const [color, setColor] = React.useState(30);
    const [showGrid, setShowGrid] = React.useState(true);
    const [thickness, setThickness] = React.useState(2);

    const [canvas, setCanvas] = useState(null);
    const [sliderValue, setSliderValue] = React.useState(30);
	const [canvasID, setCanvasID] = React.useState(null);
	const toast = useToast();

	const saveCanvasToDb = async (inputCanvas) => {
		const collectionRef = collection(db, "paints");
		const payload = {
			data: inputCanvas,
			id: serverTimestamp()
			
		};
		const prom = await addDoc(collectionRef, payload);

		console.log(prom.id);
		
		toast({
			position: 'top',
			title: 'Paint created at:',
			description: "srikartalluri.github.io/paintbin/#/" + prom.id,
			status: 'success',
			duration: 10000,
			isClosable: true,
		})
		
	};

	const { id } = useParams();
	const navigate = useNavigate();

	  const initCanvas = (canvasReff) => {
		setCanvas(canvasReff);
		const userData = async () => {
			if(id == null){
				return;
			}

			const docRef = doc(db, "paints", id);
			const docSnap = await getDoc(docRef);
	  
			if (docSnap.exists() && canvas != null) {
			  console.log(docSnap.data()['data']);
			  canvas.loadSaveData(docSnap.data()['data'])
  
			} else {
				console.log(id + " not found!");

			  

			}
		  };
		userData();
		
	  }

	

    return (
        <div className="App">
            <CanvasDraw
                ref={canvasRef => initCanvas(canvasRef)}
                enablePanAndZoom={true}
                canvasHeight={window.innerHeight}
                canvasWidth={window.innerWidth}
                mouseZoomFactor={-0.01}
            />

            <div className="bottom-middle-div">
                <ChakraProvider>
{/* 
					<div className = "sliderParent">
						<Slider
							aria-label="slider-ex-1"
							defaultValue={sliderValue}
							opacity={0.01 * sliderValue}
							onChange={(v) => setSliderValue(v)}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							<SliderThumb />
						</Slider>

					</div> */}

                    
                    <Button onClick={() => {
							localStorage.setItem(
								"savedDrawing",
								canvas.getSaveData()
							  );

							  
							saveCanvasToDb(canvas.getSaveData());

						}}
						colorScheme='green'

					
					
					>Save</Button>
					{/* <Button onClick={() => {
							
							canvas.loadSaveData(localStorage.getItem("savedDrawing"));
							console.log(localStorage.getItem("savedDrawing"))
					}}	 
					
					/> */}
                </ChakraProvider>
            </div>
        </div>
    );
}

export default CanvasApp;
