import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
    Button,
  } from '@chakra-ui/react'

import React, {useState, useRef} from "react";

function SavedModal(props: any){


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Paint Saved</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <a href="https://www.w3schools.com">Visit W3Schools</a>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
                </Button>
                <Button variant='ghost'>Contact</Button>
            </ModalFooter>
            </ModalContent>
		</Modal>
    )
}

export default SavedModal
