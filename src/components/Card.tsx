"use client";

import React from "react";
import Label from "./Label";

interface CardProps {
  type_id: number;
  value: string;
}

export const Card: React.FC<CardProps> = ({ type_id, value }) => {
  const titles = {
    0: "Total Tasks",
    1: "Total Days",
    2: "Total Hours",
  };

  const title =
    titles[type_id] !== undefined ? titles[type_id] : "Unknown Title";

  return (
    <div
      style={{
        width: 200,
        marginRight: "50px",
        padding: "25px 0px",
        border: "solid 2px rgba(207,217,225,255)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Label content={title} size={18} bold={false} />
      <Label content={value} size={24} bold={true} />
    </div>
  );
};
