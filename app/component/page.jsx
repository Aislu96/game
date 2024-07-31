"use client";

import Image from "next/image";
import Profile from "./profile";

import React, { useState, useRef, useEffect, useCallback } from "react";

const Wheel = () => {
  return (
    <div className="bg-black h-screen">
      <Profile />
    </div>
  );
};

export default Wheel;
