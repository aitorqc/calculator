import React, { useState } from "react";

import Button from "./components/Button";
import Screen from "./components/Screen";

function App() {

  const [operation, setOperation] = useState("");
  const [data, setData] = useState("0");
  const [totalState, setTotalState] = useState(0);
  let total = 0;
  let lastOperator = "";

  // Formatea todos los estados
  function clear() {
    setOperation("");
    setData("0");
    setTotalState(0);
  }

  // Muestra el resultado por pantalla
  function updateDisplay() {
    // Si ya se ha mostrado el resultado y no se añaden mas operaciones no realiza ninguna tarea
    if (operation.includes("=") && !isNaN(parseFloat(operation.slice(-1)))) {

    }
    else if (operation.length <= 0) {
      setOperation("=NAN");
      setData("NAN");
    }
    else if (operation === "/" || operation === "x" || operation === "+" || operation === "-") {
      setOperation("=NAN");
      setData("NAN");
    }
    else if (operation.includes("NAN")) {
      setOperation("=NAN");
      setData("NAN");
    }
    // Se pueden calcular operaciones
    else {
      // Convertimos el string de operaciones a un array que distinga numeros de operadores
      let arrayOperations = operation.split(/(\+|-|x|\/)/);
      let filteredArray = arrayOperations.filter(function (el) {
        return el !== "";
      });
      // Si el primer elemento del array es una operacion de "*" o "/" no obtine resultado
      if (filteredArray[0] === "/" || filteredArray[0] === "x") {

      } else {
        // Asignamos una operacion por defecto
        let sign = "+";
        // Recorremos los elementos del array almacenando los datos numericos
        // y aplicamos las operaciones que vamos almacenando en otra variable
        for (let x of filteredArray) {
          if (isNaN(x)) {
            switch (x) {
              case "-":
                sign = "-";
                break;
              case "+":
                sign = "+";
                break;
              case "x":
                sign = "x";
                lastOperator = "x";
                break;
              case "/":
                sign = "/";
                lastOperator = "/";
                break;
              default:
                break;
            }
          } else {
            switch (sign) {
              case "-":
                // En caso de encontrar el operando - nos aseguramos que antes de este no se encontrase ni una "*" o "/"
                if (lastOperator === "/" || lastOperator === "x") {
                  switch (lastOperator) {
                    case "/":
                      total = total / - parseFloat(x);
                      break;
                    case "x":
                      total = total * - parseFloat(x);
                      break;
                    default:
                      break;
                  }
                  lastOperator = "";
                } else {
                  total -= parseFloat(x);
                }
                break;
              case "+":
                total += parseFloat(x);
                lastOperator = "";
                break;
              case "x":
                total *= parseFloat(x);
                lastOperator = "";
                break;
              case "/":
                total /= parseFloat(x);
                lastOperator = "";
                break;
              default:
                break;
            }
          }
        }
        // Reducimos el numero de decimales del resultado
        total = Math.round((total) * 100000) / 100000;
        setOperation((preveState) => preveState + "=" + total);
        setData(total);
        setTotalState(total);
      }
    }
  }

  // Añade los numeros
  function addData(event) {
    let value = event.target.value;

    // Si ya se ha mostrado el resultado vuelve a comenzar un nuevo ciclo de operaciones
    if (operation.includes("=")) {
      setOperation(value);
      setData(value);
    }
    else if (value === "0" || value === 0) {
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
      else if (data === "" || operation === "") {
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

  // Añade los operandos
  function chooseOperation(event) {
    let value = event.target.value;
    setData(value);

    // Si se ha mostrado el resultado reinicia el estado de operacion al resultado obtenido anteriormente
    if (operation.includes("=")) {
      setOperation(totalState + value);
      setData(value);
    }
    // x, /, +
    else if (value === "/" || value === "x" || value === "+") {
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
        if (operation.slice(-2, -1) === "+") {
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
      <Screen id={"display"} operation={operation} data={data} />
      <div>
        <Button clsName={"jumbo"} id={"clear"} content={"AC"} style={{ background: "rgb(172, 57, 57)" }} action={clear} />
        <Button id={"divide"} content={"/"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"multiply"} content={"x"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
        <Button id={"seven"} content={"7"} action={addData} />
        <Button id={"eight"} content={"8"} action={addData} />
        <Button id={"nine"} content={"9"} action={addData} />
        <Button id={"subtract"} content={"-"} style={{ background: "rgb(102, 102, 102)" }} action={chooseOperation} />
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
