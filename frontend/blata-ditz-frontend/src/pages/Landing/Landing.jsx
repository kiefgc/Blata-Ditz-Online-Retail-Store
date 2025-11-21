import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Landing.css";

import Banner from "./Banner";
import Browse from "./Browse";
import FeaturedSection from "./FeaturedSection";

function Landing() {
  const navigate = useNavigate();

  const browseRef = useRef(null);
  const gototopRef = useRef(null);

  return (
    <>
      <div className="page-content">
        <Banner browseRef={browseRef} />
        <Browse browseRef={browseRef} />
        <FeaturedSection gototopRef={gototopRef} />
      </div>
    </>
  );
}

export default Landing;
