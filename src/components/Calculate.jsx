import React, { useState, useEffect, useRef } from "react";
// import "./css/calculate.css";


export default function Calculator() {
    const [screen, setScreen] = useState("0");
    const [state, setState] = useState("s0");
    const [firstOperand, setFirstOperand] = useState(0);
    const [lastOperator, setLastOperator] = useState("?");
    const [secondOperand, setSecondOperand] = useState(0);
    const [lastOperandUsed, setLastOperandUsed] = useState(0);

    // อัปเดตหน้าจอ
    function updateScreen(value) {
        setScreen(value.toString());
    }

    function numberClicked(number) {
        if (state === "s0") {
            updateScreen(number);
            setState("s1");
        } else if (state === "s1") {
            updateScreen(screen + number);
        } else if (state === "s2") {
            updateScreen(number);
            setState("s1");
        }
    }

    function operatorClicked(operator) {
        if (state === "s1") {
            if (lastOperator !== "?" && state !== "s2") {
                const second = Number(screen);
                calculate(firstOperand, second, lastOperator);
                setSecondOperand(second);
            } else {
                setFirstOperand(Number(screen));
            }
            setLastOperator(operator);
            setState("s2");
        } else if (state === "s0") {
            setLastOperator(operator);
        } else if (state === "s2") {
            setLastOperator(operator);
        }
    }

    function calculate(a, b, operator) {
        let result = a;
        if (operator === "+") result = a + b;
        else if (operator === "-") result = a - b;
        setFirstOperand(result);
        updateScreen(result);
    }

    function equalClicked() {
        if (lastOperator === "?") return;

        let a = firstOperand;
        let b = secondOperand;
        if (state === "s1") {
            b = Number(screen);
            setSecondOperand(b);
            setLastOperandUsed(b);
        } else if (state === "s0") {
            b = lastOperandUsed;
        }

        calculate(a, b, lastOperator);
        setState("s0");
    }

    function ceClicked() {
        setScreen("0");
        setState("s0");
        setFirstOperand(0);
        setSecondOperand(0);
        setLastOperator("?");
    }

    function checkKeyboard(event) {
        if (event.key >= "0" && event.key <= "9") {
            numberClicked(Number(event.key));
        } else if (event.key === "+") {
            operatorClicked("+");
        } else if (event.key === "-") {
            operatorClicked("-");
        } else if (event.key === "Enter") {
            equalClicked();
        } else if (event.key === "Escape") {
            ceClicked();
        }
    }

    // Refs to hold the latest values so the single event listener can
    // read up-to-date state without being re-attached on every render.
    const screenRef = useRef(screen);
    const stateRef = useRef(state);
    const firstOperandRef = useRef(firstOperand);
    const lastOperatorRef = useRef(lastOperator);
    const secondOperandRef = useRef(secondOperand);
    const lastOperandUsedRef = useRef(lastOperandUsed);

    // keep refs in sync via effects
    useEffect(() => { screenRef.current = screen; }, [screen]);
    useEffect(() => { stateRef.current = state; }, [state]);
    useEffect(() => { firstOperandRef.current = firstOperand; }, [firstOperand]);
    useEffect(() => { lastOperatorRef.current = lastOperator; }, [lastOperator]);
    useEffect(() => { secondOperandRef.current = secondOperand; }, [secondOperand]);
    useEffect(() => { lastOperandUsedRef.current = lastOperandUsed; }, [lastOperandUsed]);

    useEffect(() => {
        const handler = (event) => {
            const k = event.key;

            // number keys
            if (k >= "0" && k <= "9") {
                const curState = stateRef.current;
                if (curState === "s0") {
                    setScreen(k);
                    screenRef.current = k;
                    setState("s1");
                    stateRef.current = "s1";
                } else if (curState === "s1") {
                    setScreen(prev => (prev === "0" ? k : prev + k));
                    // screenRef will be updated on next render, but that's fine
                } else if (curState === "s2") {
                    setScreen(k);
                    screenRef.current = k;
                    setState("s1");
                    stateRef.current = "s1";
                }
                return;
            }

            // operators + and -
            if (k === "+" || k === "-") {
                const curState = stateRef.current;
                const curLastOp = lastOperatorRef.current;
                const curFirst = firstOperandRef.current;
                const curScreenNum = Number(screenRef.current);

                if (curState === "s1") {
                    if (curLastOp !== "?" && curState !== "s2") {
                        const second = curScreenNum;
                        // perform calculation
                        let result = curFirst;
                        if (curLastOp === "+") result = curFirst + second;
                        else if (curLastOp === "-") result = curFirst - second;
                        setFirstOperand(result);
                        firstOperandRef.current = result;
                        setScreen(result.toString());
                        screenRef.current = result.toString();
                        setSecondOperand(second);
                        secondOperandRef.current = second;
                    } else {
                        setFirstOperand(curScreenNum);
                        firstOperandRef.current = curScreenNum;
                    }
                    setLastOperator(k);
                    lastOperatorRef.current = k;
                    setState("s2");
                    stateRef.current = "s2";
                } else if (curState === "s0" || curState === "s2") {
                    setLastOperator(k);
                    lastOperatorRef.current = k;
                }
                return;
            }

            // Enter -> equals
            if (k === "Enter") {
                if (lastOperatorRef.current === "?") return;
                let a = firstOperandRef.current;
                let b = secondOperandRef.current;
                if (stateRef.current === "s1") {
                    b = Number(screenRef.current);
                    setSecondOperand(b);
                    secondOperandRef.current = b;
                    setLastOperandUsed(b);
                    lastOperandUsedRef.current = b;
                } else if (stateRef.current === "s0") {
                    b = lastOperandUsedRef.current;
                }
                // calculate
                let result = a;
                if (lastOperatorRef.current === "+") result = a + b;
                else if (lastOperatorRef.current === "-") result = a - b;
                setFirstOperand(result);
                firstOperandRef.current = result;
                setScreen(result.toString());
                screenRef.current = result.toString();
                setState("s0");
                stateRef.current = "s0";
                return;
            }

            // Escape -> clear
            if (k === "Escape") {
                setScreen("0");
                screenRef.current = "0";
                setState("s0");
                stateRef.current = "s0";
                setFirstOperand(0);
                firstOperandRef.current = 0;
                setSecondOperand(0);
                secondOperandRef.current = 0;
                setLastOperator("?");
                lastOperatorRef.current = "?";
                return;
            }
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div className="mx-auto mt-5 p-2 border border-dark rounded shadow" style={{ width: "fit-content" }}>
            <div className="p-2 mb-3 border text-end" style={{
                borderRadius: "10px",
                borderWidth: "2px",
                borderColor: "black",
                backgroundColor: "rgb(191, 241, 239)"
            }} id="screen">
                {screen}
            </div>

            <div>
                <button className="btn btn-success"
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        margin: "0.3rem",
                        borderRadius: "10px",
                        padding: 0
                    }} disabled>MC</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>MR</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>M+</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>M−</button>
                <button className="btn btn-danger" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={ceClicked}>CE</button>
            </div>

            <div>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(7)}>7</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(8)}>8</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(9)}>9</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>÷</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>√</button>
            </div>

            <div>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(4)}>4</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(5)}>5</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(6)}>6</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>×</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>%</button>
            </div>

            <div>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(1)}>1</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(2)}>2</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(3)}>3</button>
                <button id="minus" className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => operatorClicked("-")}>−</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>1/x</button>
            </div>

            <div>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => numberClicked(0)}>0</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>.</button>
                <button className="btn btn-primary" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} disabled>+⁄−</button>
                <button id="plus" className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={() => operatorClicked("+")}>+</button>
                <button className="btn btn-success" style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0.3rem",
                    borderRadius: "10px",
                    padding: 0
                }} onClick={equalClicked}>=</button>
            </div>
        </div>
    );
}
