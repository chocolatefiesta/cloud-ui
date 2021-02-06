import React, { useContext, useReducer, useRef, useState } from "react";

export const CanvasContext = React.createContext();

function count(state) {
  return state + 1
}

export const CanvasProvider = ({ children }) => {
  const [isPrepared, setPrepared] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [stops, setStops] = useState([]);
  const [counter, setCounter] = useReducer(count, 0)

  const prepareCanvas = () => {
    if (isPrepared) { return }
    const navbarHeight = 64;
    const canvas = canvasRef.current
    const canvasSize = Math.min(window.innerWidth, window.innerHeight - navbarHeight * 2)
    canvas.width = canvasSize * 2;
    canvas.height = canvasSize * 2;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "brown";
    context.lineWidth = 14;
    contextRef.current = context;
    setPrepared(true);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setStops([...stops, x.length - 1]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    if (counter % 2 === 0) {
      setX([...x, offsetX]);
      setY([...y, offsetY]);
    };
    setCounter();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    setX([]);
    setY([]);
    setStops([]);
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        x,
        y,
        stops,
        isPrepared,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
