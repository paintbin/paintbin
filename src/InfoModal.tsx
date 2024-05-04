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

function InfoModal(props: any){


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Welcome to PaintBin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Hey Hey Hey
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

export default InfoModal
