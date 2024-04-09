import React, { useState, useEffect } from 'react';

const Board = () => {
    const [joined, setJoined] = useState(false);
    const [eyed, setEyed] = useState(false);
    const [mouseX, setMouseX] = useState(-1);
    const [mouseY, setMouseY] = useState(-1);
    const [mouseDown, setMouseDown] = useState(false);
    const [edits, setEdits] = useState(0);
    const [user, setUser] = useState(localStorage.getItem("username"));
    const [eye, setEye] = useState(false);
    const [recentEdits, setRecentEdits] = useState([]);
    const [board, setBoard] = useState(loadBoard(25));
    const [socket, setSocket] = useState(null);
    const [color, setColor] = useState('#000000');
    const [frames, setFrames] = useState(0);
    const [refresh, setRefresh] = useState(-1);

    useEffect(() => {
        configureWebSocket();
        getBoardData();
    }, []);

    useEffect(() => {
        drawBoard();
    }, [board,refresh]);

    useEffect(() => {
        const colorInput = document.getElementById('color');
        if (colorInput) {
            setColor(colorInput.value);
            colorInput.addEventListener('input', handleColorInputChange);
            return () => colorInput.removeEventListener('input', handleColorInputChange);
        }
    }, []);

    function handleColorInputChange(event) {
        setColor(event.target.value);
    }

    function loadBoard(size) {
        let b = [];
        for (let y = 0; y < size; y++) {
            let row = [];
            for (let x = 0; x < size; x++) {
                row.push("#ffffff");
            }
            b.push(row);
        }
        return b;
    };

    // Function to handle mouse move event
    const handleMouseMove = (event) => {
        setMouseX(event.clientX - event.target.getBoundingClientRect().left);
        setMouseY(event.clientY - event.target.getBoundingClientRect().top);
        if (mouseDown) {
            handleDraw(event);
        }
    };

    // Function to handle mouse down event
    const handleMouseDown = (event) => {
        drawBoard();
        setMouseDown(true);
        handleDraw(event);
    };

    // Function to handle mouse up event
    const handleMouseUp = () => {
        setMouseDown(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
          // Check if the key you're interested in is pressed
          if (event.key === 'i') {
            setEye(true);
          }
        };
    
        const handleKeyUp = (event) => {
          // Check if the key you're interested in is released
          if (event.key === 'i') {
            setEye(false);
          }
        };
    
        // Add event listeners when component mounts
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        // Remove event listeners when component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        };
      }, []);

      useEffect(() => {
        if (user && socket) {
            sendLog("joins", user);
        }
    }, [user, socket]);

    function handleDraw(event) {
        if (!user) {
            return
        }

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / (canvas.width / board.length));
        const y = Math.floor((event.clientY - rect.top) / (canvas.height / board.length));
        
        if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
            if (eye) {
                if (!eyed) {
                    setEyed(true);
                    sendLog("used the Eyedropper (hold the [i] key)",user);
                }
                const color = board[y][x];
                setColor(color);
                document.getElementById("color").value = color;
                return;
            }
            
            if (board[y][x]!=color) {
                if (edits==0) {
                    sendLog("made their first edit",user);
                } else if (edits==99) {
                    sendLog("made 100 edits! Congrats!",user);
                } else if (edits==999) {
                    sendLog("made 1000 edits! Holy Guacamole!",user);
                }
                setEdits(edits+1);
                const newBoard = [...board];
                newBoard[y][x] = color;
                setBoard(newBoard);
                const data = {x:x, y:y, color:color};
                setTimeout(() => {
                    recentEdits.splice(0, 1);
                }, 2000);
                fetch('api/board', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(data),
                })
                .then(response => {
                    sendEdit(data)
                })
                .catch(error => {
                    console.error('Error sending board update:', error);
                });
            }
        }
    }


    async function getBoardData() {
        try {
            const response = await fetch('/api/board');
            const data = await response.json();
            setBoard(data);
        } catch (error) {
            console.error('Error fetching board data:', error);
            // Handle error
        }
    }

    function drawBoard() {

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        const grid = document.getElementById("grid").checked;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sizex = canvas.width / board.length;
        const sizey = canvas.height / board.length;

        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                ctx.fillStyle = board[y][x];
                ctx.strokeStyle = "black";
                ctx.fillRect(x * sizex, y * sizey, sizex + 1, sizey + 1);
                if (grid) ctx.strokeRect(x * sizex, y * sizey, sizex + 1, sizey + 1);
            }
        }
        if (!user) {
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = "black";
            ctx.fillRect(canvas.width*0.2,canvas.height*0.3,canvas.width*0.6,canvas.height*0.4);
            ctx.fillStyle = "white";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = 'center';
            ctx.fillText("Login to Edit!",canvas.width*0.5,canvas.height*0.5);
            ctx.font = "15px Arial";
            ctx.fillText("(Or create a free account)",canvas.width*0.5,canvas.height*0.6);
            ctx.globalAlpha = 1.0;
        }
    }

    function StoN(string) {
        let total = 0;
        const letters = '2VvcSujfiPOK-C7_D8rs5nomtxTXYUz0HgEyBaRIkpL6dJWeNwQ31MAZlh9bG4Fq';
        for (let i = 0; i < string.length; i++) {
            total += (letters.indexOf(string[i]) / letters.length);
        }
        return Math.abs(total % 1);
    }

    function log(message, user) {
        const colors = ["pink","cyan","magenta","yellow","lime","lightgray","IndianRed","hotpink","LightSkyBlue","MediumPurple","Wheat","Orange"]
        document.getElementById("messages").innerHTML +=
            "<li><span style='color:" + colors[Math.floor(StoN(user) * colors.length)] + "''>" +
            user + "</span> " + message + "</li>";
    }

    function configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        let sock = new WebSocket(`${protocol}://${window.location.host}/ws`);
        sock.onopen = () => {
            console.log("WebSocket connection established!");
            setSocket(sock);
        }
        sock.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.from == "edit") {
                updateBoard();
            } else {
                log(msg.msg, msg.from);
            };
        }
    }

    function updateBoard() {
        fetch('api/board')
        .then(response => response.json())
        .then(data => {
            setBoard(data);
        })
        .catch(error => {
            console.error('Error fetching board:', error);
        });
    }

    function sendLog(message, user) {
        log(message, user);
        broadcastMessage(user, message);
    }

    function broadcastMessage(from, msg) {
        if (socket.readyState === WebSocket.OPEN) {
            const event = {
                from: from,
                msg: msg,
            };
            socket.send(JSON.stringify(event));
        } else {
            console.error("WebSocket connection is not open. Trying again in 1 second.");
            setTimeout(() => broadcastMessage(from, msg), 1000);
        }
    }

    function sendEdit(edit) {
        broadcastEdit(edit);
    }

    function broadcastEdit(edit) {
        if (socket.readyState === WebSocket.OPEN) {
            const event = {
                from: "edit",
                msg: edit,
            };
            socket.send(JSON.stringify(event));
        } else {
            console.error("WebSocket connection is not open. Trying again in 1 second.");
            setTimeout(() => broadcastEdit(edit), 1000);
        }
    }

    return (
        <>
        <canvas
            id="canvas"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            width="400px"
            height="400px"
        ></canvas>
        </>
    );
};

export default Board;
