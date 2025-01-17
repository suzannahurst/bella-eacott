import { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { NavLink } from "react-router-dom";
import SEO from "./../../components/Structure/SEO/SEO.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import usePageTracking from "./../../hooks/usePageTracking";
import text from "./../../assets/img/blue-words.png";

import logoInner from "./../../assets/img/logo-no-text.png";
import img from "./../../assets/img/Bella.JPG";
import "../../components/Structure/Main/Main.js";
import "./home.css";

export const Home = ({ setPageStatus }) => {
  usePageTracking();
  useEffect(() => {
    setPageStatus("home");
  }, []);

  // Phone and tablet
  const matches = useMediaQuery("(max-width:768px)");
  const turn = useSpring({
    to: { rotateZ: 0 },
    from: { rotateZ: 360 },
    config: {
      duration: 100000,
      mass: 1,
      tension: 180,
      friction: 12,
    },
    delay: 500,
    loop: true,
  });

  return (
    <>
      <SEO
        title="Bella Eacott Massage"
        description="Osteopathy & massage across London"
        name="Home"
        type="article"
      />
      {matches ? (
        // MOBILE VERSION
        <>
          <main className="home">
            <section className="home content" href="#home">
              <div className="homeLogoWrapper">
                <img
                  style={turn}
                  src={logoInner}
                  alt="Bella Eacott Massage"
                  className="logo mob inner"
                />{" "}
                <animated.img
                  style={turn}
                  src={text}
                  alt="I deserve to feel nice... You deserve to feel nice... We deserve to feel nice..."
                  className="logo mob text "
                />
              </div>

              <div className="homeMenu">
                <div className="homeMenuItem">
                  <NavLink
                    to="/about"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--yellow)"
                        : "  color: var(--blue)",
                    })}
                  >
                    About me
                  </NavLink>
                </div>
                <div className="homeMenuItem">
                  <NavLink
                    to="/what-to-expect"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--yellow)"
                        : "  color: var(--blue)",
                    })}
                  >
                    <div className="treatments">
                      <span>What to Expect</span>
                    </div>
                  </NavLink>
                </div>
                <div className="homeMenuItem">
                  <NavLink
                    to="/pricing"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--yellow)"
                        : "  color: var(--blue)",
                    })}
                  >
                    Pricing
                  </NavLink>
                </div>
                <div className="homeMenuItem">
                  <NavLink
                    to="/book"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--yellow)"
                        : "  color: var(--blue)",
                    })}
                  >
                    Book me
                  </NavLink>
                </div>
                <div className="homeMenuItem">
                  <NavLink
                    to="/contact"
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--yellow)"
                        : "  color: var(--blue)",
                    })}
                  >
                    Contact me
                  </NavLink>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        // DESKTOP VERSION
        <>
          <main className="home">
            <section className="home content" href="#home">
              <img
                src={img}
                alt="Bella sitting in a chair, with her eyes closed, on a balcony facing the sun. In black and white."
                className="bella"
              />
              <div className="description">
              Osteopathy & massage across London
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
