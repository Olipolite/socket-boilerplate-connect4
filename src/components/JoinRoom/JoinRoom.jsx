/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const JoinRoomModal = ({ setRoomCode, socket, roomCode }) => {
  const [roomCodeInput, setRoomCodeInput] = useState(null);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (roomCodeInput === null) {
      alert("Please select or create a room");
    }
    setRoomCode(roomCodeInput);
    setRooms([...rooms, roomCodeInput]);
    socket.emit("update-rooms", [...rooms, roomCodeInput]);
  };

  socket.on("rooms-incoming", (data) => {
    setRooms(data);
  });

  const handleRoomClick = (event) => {
    setRoomCodeInput(event.target.id);
    navigate(`/room${roomCode}`);
    console.log(event.target.id);
  };

  useEffect(() => {
    setRoomCode(roomCodeInput);
  }, [roomCodeInput, setRoomCode]);

  return (
    <div>
      <form>
        <h1 className="joinRoomModal-card-title">Enter a room code</h1>
        <input
          className="joinRoomModal-card-input"
          type="number"
          placeholder="eg: 1212"
          onChange={(e) => setRoomCodeInput(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => handleSave(e)}
          className="joinRoomModal-card-button"
        >
          Save
        </button>
      </form>
      <div>
        {rooms.map((room) => {
          return (
            <button
              type="button"
              id={room}
              onClick={(e) => {
                handleRoomClick(e);
              }}
            >
              Join room {room}
            </button>
          );
        })}
      </div>
    </div>
  );
};

JoinRoomModal.propTypes = {
  setRoomCode: PropTypes.func.isRequired,
};

export default JoinRoomModal;