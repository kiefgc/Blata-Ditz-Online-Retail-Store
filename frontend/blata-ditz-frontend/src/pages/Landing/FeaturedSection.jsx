import { useState, useEffect } from "react";

import ps4 from "../../assets/ps4.png";
import xbox from "../../assets/xbox.png";
import nswitch from "../../assets/switch.png";

function FeaturedSection({ gototopRef }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        // Only active products
        const activeProducts = data.filter((p) => p.is_active);
        setProducts(activeProducts);
      })
      .catch(console.error);
  }, []);

  const onScroll = () => {
    const gototop = gototopRef.current;
    if (!gototop) return;

    const scroll = document.documentElement.scrollTop;
    const threshold = window.innerHeight * 0.3;

    if (scroll > threshold) gototop.classList.add("active");
    else gototop.classList.remove("active");
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const gototop = gototopRef.current;
    window.addEventListener("scroll", onScroll);
    if (gototop) gototop.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (gototop) gototop.removeEventListener("click", handleClick);
    };
  }, []);

  const platforms = [
    {
      name: "Nintendo Switch",
      bgClass: "bg-red",
      image: nswitch,
      categoryId: "6916d1cbf114c98771474287",
    },
    {
      name: "PlayStation",
      bgClass: "bg-blue",
      image: ps4,
      categoryId: "69141c6a3afadf3ae7c796d0",
    },
    {
      name: "Xbox",
      bgClass: "bg-green",
      image: xbox,
      categoryId: "69141c633afadf3ae7c796cf",
    },
  ];

  return (
    <>
      {platforms.map((platform) => {
        const newestProducts = products
          .filter((p) => p.category_ids === platform.categoryId)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        return (
          <div
            key={platform.name}
            className={`featured-container ${platform.bgClass}`}
          >
            <div className="featuredleft">
              <div className="sectiontitle">
                FEATURED {platform.name.toUpperCase()} GAMES
              </div>
              <img
                className="featuredimage"
                src={platform.image}
                alt={platform.name}
              />
            </div>
            <div className="featuredright">
              <div className="featuredgames">
                {newestProducts.length === 0 ? (
                  <p>No products available.</p>
                ) : (
                  newestProducts.map((product) => (
                    <div className="ftgame" key={product._id}>
                      <img
                        src={`http://localhost:3000${product.image}`}
                        alt={product.product_name}
                      />
                      <div className="ftgame-title">
                        <p>{product.product_name}</p>
                        <p>₱{product.unit_price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })}

      <a
        ref={gototopRef}
        id="gotop"
        className="backtotop"
        href="javascript:void(0)"
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4klEQVR4nO1ZO2/UQBC2AgmCkkeTBCqqNMEzl9MlDfyJKAgkyvyFoPyAJD2JjkdHGQQUEBqKdJGQ7nZyYBq6QEiRBy13UAzaPXASxz7vetf2Id1KI1nyevf7dr+dmR173qAN2qBZN16fPcdNf5oFLLLAl0z4mQX+YMJfyuSzgEC9k30aUGP2hsoH/qlynQWssMBdJmQjE/CNCZe5VR0vHri4dY0FPmGBHWPgZ4hghwnq3MCrBYHHeyzgyBr4GYNDblbu5ge8gcNM+Mw9cIxK67GcyzX4S0zwLnfwFO7GhpzTFfjhYsHjPxLvOZgYsSdQhGwokUTdEjzcLw88dm3bn8sG/sPUFSY8KJ2AgKNMLlb5+bLBU2hrZuBb1XEnQcrZLmCHG3jDYPVhxX5i+M2E611Tz7ZElvXAszf0N0+xmWyfCe+EYzYBmXDHchd2ZdKYTkBmlXbgt7jpj8aMO6re2Y1d1ZHPosUqPeUvNy8kjh1MjFg5B4EPNQjgq4x6X0gd/HiOB0zwM8M8L3R2IDAceI9FZUYXfESq3w134KMOAZNUuZHk3o7lAs95q3Yx+V4BmwbzHWgQ0PT/UmoJeo85sLEH+wRRPdkKbHtpTT+ATY71kMZerNSa/nRi4CRnBPQkFPstwXzvBUg+7OxOQnqH2Mo9yr6RXJ/dHWI9PToIUKccgEs3qhXIun0rMwl6N045WK9/eqxRRSe91UjRu1FZZV6vb2VKN5n7ag3Mve1oV/NUxax8wByxJS3wfXqhaSfFnR67APX+IQCPjMArAkHtcl9c6gkOM9dNZa2yfAI4mwl8SELWKsvT/qoV+PDnhcDXJYB/y5u3z1sTOFHc3SgQ/Btnxd1IkTd/zyRw1dnKxxLZ9udy8k771gfWsG661g0w1iveln5euu1CwJ8iQpNjKu3Ikjt1v1kyjrC5EJEJIGFV1m1kzi4vHupmJ9MRZeqW11LvCBdkVtkXv1kHbdC8/7/9AcOKHGirOS2vAAAAAElFTkSuQmCC"
          alt="circled-chevron-up"
        />
      </a>
    </>
  );
}

export default FeaturedSection;
