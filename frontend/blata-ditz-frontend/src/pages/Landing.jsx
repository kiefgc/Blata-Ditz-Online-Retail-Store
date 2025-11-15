import "./Landing.css";
import React, { useEffect, useRef } from "react";

import ps4 from "../assets/ps4.png";
import xbox from "../assets/xbox.png";
import nswitch from "../assets/switch.png";

import pokemonns from "../assets/nswitch-pokemon.png";
import kirbyns from "../assets/nswitch-kirby.png";
import littlenightmaresns from "../assets/nslittlenightmares.png";

import eriksholmps from "../assets/ps5eriksholm.png";
import pawpatrolps from "../assets/ps5pawpatrol.jpg";
import ddreviveps from "../assets/ps5ddrevive.png";

import nba2k26xb from "../assets/xboxnba2k26.jpg";
import wuchangxb from "../assets/xboxwuchang.jpg";
import suicidesquadxb from "../assets/xboxssktjl.png";

function Landing() {
  const gototopRef = useRef(null);

  const onScroll = () => {
    const gototop = gototopRef.current;

    if (!gototop) return;

    const scroll = document.documentElement.scrollTop;
    const threshold = window.innerHeight * 0.3;

    if (scroll > threshold) {
      gototop.classList.add("active");
    } else {
      gototop.classList.remove("active");
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const gototop = gototopRef.current;
    window.addEventListener("scroll", onScroll);

    if (gototop) {
      gototop.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (gototop) {
        gototop.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      <div class="navbar">
        <div>
          <a href="#" class="logo">
            BLATADITZ
          </a>
        </div>
        <div>
          <a href="#">
            <div class="search-bar">
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFD033/search--v1.png"
                alt="search--v1"
              />
              <input type="text" placeholder="Search" />
            </div>
          </a>
        </div>
        <div class="nav-links">
          <div class="pop-uo-parent-container">
            <button class="signin-button">Sign In</button>
          </div>
          <div class="pop-uo-parent-container">
            <button class="signup-button">Create Account</button>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="featured-container bg-red">
          <div class="featuredleft">
            <div class="sectiontitle">
              FEATURED NINTENDO<br></br>SWITCH GAMES
            </div>
            <img class="featuredimage2" src={nswitch}></img>
          </div>
          <div class="featuredright">
            <div class="featuredgames">
              <div class="ftgame">
                <img src={pokemonns}></img>
                <div class="ftgame-title">
                  <p>Pokémon™ Legends: Z-A – Nintendo Switch™ 2 Edition</p>
                  <p>₱3,095.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={kirbyns}></img>
                <div class="ftgame-title">
                  <p>
                    Kirby™ and the Forgotten Land – Nintendo Switch™ 2 Edition +
                    Star-Crossed World
                  </p>
                  <p>₱3,395.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={littlenightmaresns}></img>
                <div class="ftgame-title">
                  <p>Little Nightmares III</p>
                  <p>₱2,095.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="featured-container bg-blue">
          <div class="featuredleft">
            <div class="sectiontitle">
              FEATURED PLAYSTATION<br></br>GAMES
            </div>
            <img class="featuredimage" src={ps4}></img>
          </div>
          <div class="featuredright">
            <div class="featuredgames">
              <div class="ftgame">
                <img src={eriksholmps}></img>
                <div class="ftgame-title">
                  <p>Eriksholm: The Stolen Dream</p>
                  <p>₱1,795.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={pawpatrolps}></img>
                <div class="ftgame-title">
                  <p>PAW Patrol Rescue Wheels Championship</p>
                  <p>₱1,850.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={ddreviveps}></img>
                <div class="ftgame-title">
                  <p>Double Dragon Revive</p>
                  <p>₱2,095.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="featured-container bg-green">
          <div class="featuredleft">
            <div class="sectiontitle">
              FEATURED XBOX<br></br>GAMES
            </div>
            <img class="featuredimage" src={xbox}></img>
          </div>
          <div class="featuredright">
            <div class="featuredgames">
              <div class="ftgame">
                <img src={nba2k26xb}></img>
                <div class="ftgame-title">
                  <p>NBA 2K26 Superstar Edition</p>
                  <p>₱4,190.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={wuchangxb}></img>
                <div class="ftgame-title">
                  <p>Wuchang: Fallen Feathers Day One</p>
                  <p>₱3,250.00</p>
                </div>
              </div>
              <div class="ftgame">
                <img src={suicidesquadxb}></img>
                <div class="ftgame-title">
                  <p>Suicide Squad: Kill the Justice League</p>
                  <p>₱1.715.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          ref={gototopRef}
          id="gotop"
          class="backtotop"
          href="javascript:void(0)"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4klEQVR4nO1ZO2/UQBC2AgmCkkeTBCqqNMEzl9MlDfyJKAgkyvyFoPyAJD2JjkdHGQQUEBqKdJGQ7nZyYBq6QEiRBy13UAzaPXASxz7vetf2Id1KI1nyevf7dr+dmR173qAN2qBZN16fPcdNf5oFLLLAl0z4mQX+YMJfyuSzgEC9k30aUGP2hsoH/qlynQWssMBdJmQjE/CNCZe5VR0vHri4dY0FPmGBHWPgZ4hghwnq3MCrBYHHeyzgyBr4GYNDblbu5ge8gcNM+Mw9cIxK67GcyzX4S0zwLnfwFO7GhpzTFfjhYsHjPxLvOZgYsSdQhGwokUTdEjzcLw88dm3bn8sG/sPUFSY8KJ2AgKNMLlb5+bLBU2hrZuBb1XEnQcrZLmCHG3jDYPVhxX5i+M2E611Tz7ZElvXAszf0N0+xmWyfCe+EYzYBmXDHchd2ZdKYTkBmlXbgt7jpj8aMO6re2Y1d1ZHPosUqPeUvNy8kjh1MjFg5B4EPNQjgq4x6X0gd/HiOB0zwM8M8L3R2IDAceI9FZUYXfESq3w134KMOAZNUuZHk3o7lAs95q3Yx+V4BmwbzHWgQ0PT/UmoJeo85sLEH+wRRPdkKbHtpTT+ATY71kMZerNSa/nRi4CRnBPQkFPstwXzvBUg+7OxOQnqH2Mo9yr6RXJ/dHWI9PToIUKccgEs3qhXIun0rMwl6N045WK9/eqxRRSe91UjRu1FZZV6vb2VKN5n7ag3Mve1oV/NUxax8wByxJS3wfXqhaSfFnR67APX+IQCPjMArAkHtcl9c6gkOM9dNZa2yfAI4mwl8SELWKsvT/qoV+PDnhcDXJYB/y5u3z1sTOFHc3SgQ/Btnxd1IkTd/zyRw1dnKxxLZ9udy8k771gfWsG661g0w1iveln5euu1CwJ8iQpNjKu3Ikjt1v1kyjrC5EJEJIGFV1m1kzi4vHupmJ9MRZeqW11LvCBdkVtkXv1kHbdC8/7/9AcOKHGirOS2vAAAAAElFTkSuQmCC"
            alt="circled-chevron-up"
          />
        </a>
      </div>

      <div class="footer">
        <a href="#" class="logo">
          BLATADITZ
        </a>
        <p class="copyright">Copyright &copy; 2025</p>
        <p class="disclaimer">FOR ACADEMIC PURPOSES ONLY</p>
      </div>
    </>
  );
}

export default Landing;
