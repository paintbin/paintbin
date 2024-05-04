import CanvasDraw from "react-canvas-draw";
import React, {useState, useRef} from "react";
import db from "./utils/firebase.tsx";
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import {useParams} from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react'
import {InfoOutlineIcon} from '@chakra-ui/icons'
import ShortUniqueId from 'short-unique-id';
import InfoModal from "./InfoModal.tsx";

import {
    ChakraProvider,
    Button,
	useToast,
	IconButton 
} from "@chakra-ui/react";
import SavedModal from "./SavedModal.tsx";

const uidLen = 8;

function CanvasApp() {
	const [width, setWidth] = React.useState(window.innerWidth);
  	const [height, setHeight] = React.useState(window.innerHeight);
	
	  const rootURL = "https://paintbin.github.io/paintbin";

	// ref for the current canvas
    const [canvas, setCanvas] = useState<CanvasDraw | null>(null);

	// toast is a function that handles notifications
	const toast = useToast();

	// vars that handle the modal (the shit that pops up when u click the info button)
	const { isOpen, onOpen, onClose } = useDisclosure()

	// id generator
	const uid = new ShortUniqueId();


	// stores current canvas data to db and toasts the link
	const saveCanvasToDb = async (inputCanvas: string) => {
		const idInput = uid.rnd(uidLen)
		const docRef = doc(db, "paints", idInput)

		const payload = {
			data: JSON.parse(inputCanvas),
			id: serverTimestamp()
			
		};
		await setDoc(docRef, payload);
		
		toast({
			position: 'top',
			title: 'Paint created at:',
			description: rootURL + "/#/" + idInput, //prom.id,
			status: 'success',
			duration: 10000,
			isClosable: true,
		})
		
	};

	//edit functionality
	const editCanvasToDb = async (inputCanvas: string) => {
		const payload = {
			data: JSON.parse(inputCanvas),
			id: serverTimestamp()
			
		};
		if(id != null){
			const docRef = doc(db, "paints", id);
			await setDoc(docRef, payload);
		}
		else{
			return;
		}
		
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
	const initCanvas = (canvasReff: CanvasDraw | null) => {
		if(canvasReff == null){
			return;
		}

		setCanvas(canvasReff);

		if(canvas == null){
			return;
		}


		const userData = async () => {
			if(id == null){
				console.log("id is null")
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
				if(canvas != null)
				editCanvasToDb(canvas.getSaveData())
				
			}}
				size = 'lg'>
				Edit
			</Button>
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
				<ChakraProvider>
					<div className = "top-right-div">
						<IconButton aria-label='Info Button' 
									icon={<InfoOutlineIcon />} 
									onClick={onOpen}/>
					</div>

					<div className="bottom-middle-div">
							
							<Button onClick={() => {
								if(canvas != null)
								saveCanvasToDb(canvas.getSaveData())}}
								colorScheme='green'
								size = 'lg'>
								Save
							</Button>
							{editButton()}

					</div>

					<InfoModal isOpen={isOpen} onClose={onClose}/>
					{/* <SavedModal isOpen={isOpen} onClose={onClose}/> */}




				</ChakraProvider>
				
			</div>
			
    );
}

export default CanvasApp;
