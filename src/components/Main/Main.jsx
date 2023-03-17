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
    column0: ["", "", "", "", "", ""],
    column1: ["", "", "", "", "", ""],
    column2: ["", "", "", "", "", ""],
    column3: ["", "", "", "", "", ""],
    column4: ["", "", "", "", "", ""],
    column5: ["", "", "", "", "", ""],
    column6: ["", "", "", "", "", ""],
  });
  const [canPlay, setCanPlay] = useState(true);
  const [username, setUsername] = useState("");
  const updatedBoard = board;

  useEffect(() => {
    socket.on(
      "updateGame",
      (id) => {
        console.log("this is id", id);
        updatedBoard.column.push("Y");
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
    const column = Object.entries(board)[id][1];
    // const column = id.split(".")[1].split("[")[0];
    // const position = id.split(".")[1].split("[")[1][0];
    // return console.log(id, Object.entries(board)[id]);
    if (canPlay) {
      console.log(column, "<------");
      // id.push("X");
      for (let i = 0; i < column.length; i++) {
        if (column[i] === "") {
          column[i] = "x";
          return;
        }
      }
      setBoard({
        ...board,
        [`column${id}`]: [...column],
      });
    }
    socket.emit("play", { id, column, position, roomCode });
    setCanPlay(false);
    checkWin(updatedBoard);
    console.log(updatedBoard[column].length);
  };

  useEffect(() => console.log(board), [board]);
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
        {Object.entries(board).map((column, index) => {
          return column[1].map((value) => {
            return (
              <Cell
                handleCellClick={handleCellClick}
                id={index}
                text={updatedBoard.column1[0]}
              />
            );
          });
        })}
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
