/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cell from "../Cell/Cell";
import "./main.css";
import checkWin from "./helperWin";
import Chat from "../Chat/Chat";

const Main = ({ socket, roomCode }) => {
  const [board, setBoard] = useState({
    column1: [],
    column2: ["", "", "", ""],
    column3: ["", "", "", ""],
    column4: ["", "", "", ""],
  });
  const [canPlay, setCanPlay] = useState(true);
  const [username, setUsername] = useState("");
  const updatedBoard = board;

  useEffect(() => {
    socket.on(
      "updateGame",
      (id) => {
        console.log("this is id", id);
        updatedBoard.column1.push("Y");
        console.log("this is the Rival Board", updatedBoard);
        setBoard(updatedBoard);
        setCanPlay(true);
      },
      [updatedBoard, board]
    );

    return () => socket.off("updateGame");
  });

  const handleCellClick = (e) => {
    const { id } = e.currentTarget;
    const column = id.split(".")[1].split("[")[0];
    const position = id.split(".")[1].split("[")[1][0];
    console.log(updatedBoard.column1.length);

    if (canPlay && updatedBoard.column1.length === 4) {
      updatedBoard.column1.push("🔴");
      console.log("move made by player", updatedBoard);
      setBoard(updatedBoard);
      socket.emit("play", { id, column, position, roomCode });
      setCanPlay(false);
      checkWin(updatedBoard);
    } else if (canPlay && updatedBoard.column1.length === 3) {
      updatedBoard.column1.push("🔴");
      console.log("move made by player", updatedBoard);
      setBoard(updatedBoard);
      socket.emit("play", { id, column, position, roomCode });
      setCanPlay(false);
      checkWin(updatedBoard);
      console.log(updatedBoard.column1.length);
    } else if (canPlay && updatedBoard.column1.length === 2) {
      updatedBoard.column1.push("🔴");
      console.log("move made by player", updatedBoard);
      setBoard(updatedBoard);
      socket.emit("play", { id, column, position, roomCode });
      setCanPlay(false);
      checkWin(updatedBoard);
      console.log(updatedBoard.column1.length);
    } else if (canPlay && updatedBoard.column1.length === 1) {
      updatedBoard.column1.push("🔴");
      console.log("move made by player", updatedBoard);
      setBoard(updatedBoard);
      socket.emit("play", { id, column, position, roomCode });
      setCanPlay(false);
      checkWin(updatedBoard);
      console.log(updatedBoard.column1.length);
    } else if (canPlay && updatedBoard.column1.length === 0) {
      updatedBoard.column1.push("🔴");
      console.log("move made by player", updatedBoard);
      setBoard(updatedBoard);
      socket.emit("play", { id, column, position, roomCode });
      setCanPlay(false);
      checkWin(updatedBoard);
      console.log(updatedBoard.column1.length);
    }
  };

  return (
    <main>
      <div>
        {roomCode !== null && (
          <Chat
            roomCode={roomCode}
            username={username}
            setUsername={setUsername}
            socket={socket}
          />
        )}
      </div>
      <section className="main-section">
        <Cell
          handleCellClick={handleCellClick}
          id="board.column1[0]"
          text={updatedBoard.column1[0]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column1[1]"
          text={updatedBoard.column1[1]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column1[2]"
          text={updatedBoard.column1[2]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column1[3]"
          text={updatedBoard.column1[3]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column2[0]"
          text={board.column2[0]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column2[1]"
          text={board.column2[1]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column2[2]"
          text={board.column2[2]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column2[3]"
          text={board.column2[3]}
        />

        <Cell
          handleCellClick={handleCellClick}
          id="board.column3[0]"
          text={board.column3[0]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column3[1]"
          text={board.column3[1]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column3[2]"
          text={board.column3[2]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column3[3]"
          text={board.column3[3]}
        />

        <Cell
          handleCellClick={handleCellClick}
          id="board.column4[0]"
          text={board.column4[0]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column4[1]"
          text={board.column4[1]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column4[2]"
          text={board.column4[2]}
        />
        <Cell
          handleCellClick={handleCellClick}
          id="board.column4[3]"
          text={board.column4[3]}
        />
      </section>
    </main>
  );
};

Main.defaultProps = {
  roomCode: null,
};

Main.propTypes = {
  socket: PropTypes.object.isRequired,
  roomCode: PropTypes.string,
};

export default Main;
