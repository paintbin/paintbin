import CanvasDraw from "react-canvas-draw";
import React, { useRef, useEffect, useState, useCallback } from "react";


function NotFound() {


    console.log("hereee");

    return (
        <div className="App">
            <CanvasDraw
                enablePanAndZoom={true}
                canvasHeight={window.innerHeight}
                canvasWidth={window.innerWidth}
                mouseZoomFactor={-0.01}
                disabled = {true}
            />

        </div>
    );
}

export default NotFound;
