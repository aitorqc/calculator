import React, { useState } from "react";

import Button from "./components/Button";
import Screen from "./components/Screen";

function App() {

  const [operation, setOperation] = useState("");
  const [data, setData] = useState("");
  const [result, setResult] = useState("");

  let prev;
  let current;

  function clear() {
    setOperation("");
    setData("");
  }

  function updateDisplay() {
    if(operation.length <= 0 && data.length <=0){
      setData("NAN");
      setOperation("=NAN");
    }
    else if(operation === "/" || operation === "x" || operation === "+" || operation === "-"){
      setData("NAN");
      setOperation("=NAN");
    }
    else{
      setData("result");
      setOperation("result");
      console.log(operation);
    }
  }

  function addData(event) {
    let value = event.target.value;

    if (value === "0" || value === 0) {
      if (data === "/" || data === "x" || data === "+" || data === "-") {
        setOperation((preveState) => preveState + value);
        setData(value);
      }
      else if (data === "0" || data === 0) {
        setOperation("0");
        setData("0");
      } else {
        setOperation((preveState) => preveState + value);
        setData((preveState) => preveState + value);
      }
    }
    else if (value === ".") {
      if (data === "/" || data === "x" || data === "+" || data === "-") {
        setOperation((preveState) => preveState + 0 + value);
        setData(0 + value);
      }
      else if (data === "") {
        setOperation(0 + value);
        setData(0 + value);
      } else {
        // OPERACIONES PARA COMPROBAR QUE NO HAYA MAS PUNTOS
        if (data.includes(".")) {

        } else {
          setOperation((preveState) => preveState + value);
          setData((preveState) => preveState + value);
        }
      }
    }
    else {
      if (data === "/" || data === "x" || data === "+" || data === "-") {
        setOperation((preveState) => preveState + value);
        setData(value);
      }
      else if ((data === "0" || data === 0) && (operation.length <= 1)) {
        setOperation(value);
        setData(value);
      }
      else if ((data === "0" || data === 0) && (operation.length > 1)) {
        setOperation((preveState) => preveState.substring(0, preveState.length - 1) + value);
        setData(value);
      }
      else {
        setOperation((preveState) => preveState + value);
        setData((preveState) => preveState + value);
      }
    }
  }

  function chooseOperation(event) {
    let value = event.target.value;
    setData(value);
    // x / +
    if (value === "/" || value === "x" || value === "+") {
      if (operation.slice(-1) === "/" || operation.slice(-1) === "x" || operation.slice(-1) === "+" || operation.slice(-1) === "-") {
        if (operation.slice(-2, -1) === "/" || operation.slice(-2, -1) === "x" || operation.slice(-2, -1) === "+" || operation.slice(-2, -1) === "-") {
          setOperation((preveState) => preveState.substring(0, preveState.length - 2) + value);
        } else {
          setOperation((preveState) => preveState.substring(0, preveState.length - 1) + value);
        }
      } else {
        setOperation((preveState) => preveState + value);
      }
    }
    // -
    else {
      if (operation.slice(-1) === "/" || operation.slice(-1) === "x" || operation.slice(-1) === "+") {
        setOperation((preveState) => preveState + value);
      }
      else if (operation.slice(-1) === "-") {
        setOperation((preveState) => preveState.substring(0, preveState.length - 1) + "+");
        if(operation.slice(-2, -1) === "+"){
          setOperation((preveState) => preveState.substring(0, preveState.length - 1));
        }
      }
      else {
        setOperation((preveState) => preveState + value);
      }
    }
  }

  return (
    <div className="calculator">
      <Screen operation={operation} data={data} />
      <div>
        <Button clsName={"jumbo"} id={"clear"} content={"AC"} style={{ background: "rgb(172, 57, 57)" }} action={clear} />
        <Button id={"divide"} content={"/"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"multiply"} content={"x"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"seven"} content={"7"} action={addData} />
        <Button id={"eight"} content={"8"} action={addData} />
        <Button id={"nine"} content={"9"} action={addData} />
        <Button id={"substract"} content={"-"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"four"} content={"4"} action={addData} />
        <Button id={"five"} content={"5"} action={addData} />
        <Button id={"six"} content={"6"} action={addData} />
        <Button id={"add"} content={"+"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"one"} content={"1"} action={addData} />
        <Button id={"two"} content={"2"} action={addData} />
        <Button id={"three"} content={"3"} action={addData} />
        <Button clsName={"jumbo"} id={"zero"} content={"0"} action={addData} />
        <Button id={"decimal"} content={"."} action={addData} />
        <Button id={"equals"} content={"="}
          style={{ background: "rgb(0, 68, 102)", position: "absolute", height: "130px", bottom: "5px" }}
          action={updateDisplay} />
      </div>
    </div>
  );
}

export default App;
