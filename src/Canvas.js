import CanvasDraw from "react-canvas-draw";
import React, {useState} from "react";
import Menubar from "./Menubar";
import db from "./utils/firebase";
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import {useParams} from 'react-router-dom';
import NotFound from "./NotFound";
import { Resizable } from 'react-resizable';

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


	// boolean to see if we loaded in a valid url
	const [validId, setValidId] = useState(false);

	// ref for the current canvas
    const [canvas, setCanvas] = useState(null);

	// toast is a function that handles notifications
	const toast = useToast();

	// stores current canvas data to db and toasts the link
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

	//edit functionality
	const editCanvasToDb = async (inputCanvas) => {
		const collectionRef = collection(db, "paints");
		const payload = {
			data: inputCanvas,
			id: serverTimestamp()
			
		};

		const docRef = doc(db, "paints", id);

		console.log(docRef);
		console.log(payload);
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
				console.log(docSnap.data()['data']);
				canvas.loadSaveData(docSnap.data()['data'])
				setValidId(true);	

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
	console.log(width, height);
    return (
		<Resizable
			width={width}
			height={height}
			onResize={(event, {element, size}) =>{
				setWidth(size.width);
        		setHeight(size.height);
				console.log(size.width, size.height)
			}}
		
		
		>
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
		</Resizable>
			
    );
}

export default CanvasApp;
