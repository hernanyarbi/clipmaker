import React, { useState } from "react";

interface ClipPopupProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

const ClipPopup = ({ onSave, onClose }: ClipPopupProps) => {
  const [clipName, setClipName] = useState("");
  const handleClipSave = () => {
    onSave(clipName);
  };

  const handleCancel = () => {
    setClipName("");
    onClose();
  };

  return (
    <div className="relative">
      <div className="absolute top-[-400px] left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded shadow">
          <input
            type="text"
            placeholder="Nombre del clip"
            value={clipName}
            onChange={(e) => setClipName(e.target.value)}
            className="border border-gray-400 p-2 rounded mr-2 text-black"
          />
          <button
            onClick={handleClipSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={() => setClipName("")}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClipPopup;
