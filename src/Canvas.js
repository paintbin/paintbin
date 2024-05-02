import CanvasDraw from "react-canvas-draw";
import React, {useState} from "react";
import Menubar from "./Menubar";
import db from "./utils/firebase";
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import {useParams} from 'react-router-dom';
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
	const [width, setWidth] = React.useState(window.innerWidth);
  	const [height, setHeight] = React.useState(window.innerHeight);

	// ref for the current canvas
    const [canvas, setCanvas] = useState(null);

	// toast is a function that handles notifications
	const toast = useToast();

	// stores current canvas data to db and toasts the link
	const saveCanvasToDb = async (inputCanvas) => {
		const collectionRef = collection(db, "paints");
		const payload = {
			data: JSON.parse(inputCanvas),
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

	//edit functionality
	const editCanvasToDb = async (inputCanvas) => {
		const payload = {
			data: JSON.parse(inputCanvas),
			id: serverTimestamp()
			
		};

		const docRef = doc(db, "paints", id);
		await setDoc(docRef, payload);
		
		toast({
			position: 'top',
			title: 'Paint updated at:',
			description: "srikartalluri.github.io/paintbin/#/" + id,
			status: 'success',
			duration: 10000,
			isClosable: true,
		})
		
	};

	// dynamic resizing
	const updateSize = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};
	window.addEventListener('resize', updateSize);


	// id is the url of the current drawing. null if on homepage
	const { id } = useParams();

	// function to run once on init.
	// sets canvas hook to input ref
	// if we have a valid id url, then we load that info into canvas
	const initCanvas = (canvasReff) => {
		setCanvas(canvasReff);
		const userData = async () => {
			if(id == null){
				return;
			}

			const docRef = doc(db, "paints", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists() && canvas != null) {
				canvas.loadSaveData(JSON.stringify(docSnap.data()['data']))

			} else {
				console.log(id + " not found!");
			}
			};
		userData();
	
	}

	// renders an edit button if we have a valid id
	const editButton = () => {
		if(id == null){
			return
		}
		return (
			<Button onClick={() => {

				editCanvasToDb(canvas.getSaveData())

			}}>Edit</Button>
		)

	}
    return (
			<div className="App">
				<CanvasDraw
					ref={canvasRef => initCanvas(canvasRef)}
					enablePanAndZoom={true}
					canvasHeight={height}
					canvasWidth={width}
					mouseZoomFactor={-0.01}
				/>

				<div className="bottom-middle-div">
					<ChakraProvider>
						
						<Button onClick={() => {saveCanvasToDb(canvas.getSaveData())}}
							colorScheme='green'>
							Save
						</Button>
						{editButton()}

					</ChakraProvider>
				</div>
			</div>
			
    );
}

export default CanvasApp;
