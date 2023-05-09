import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/films");
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setloading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="body">
      <div className="header">
        {loading && (
          <div className="loader">Data is loading. Please wait...</div>
        )}
        {error && (
          <div>{"There is a problem fetching your data-${error}"} </div>
        )}
        <div className="wrapper">
          <ul className="info">
            {data &&
              data.results.map((item) => {
                return (
                  <li className="moviecard" key={item.episode_id}>
                    <p>{item.title}</p>
                    <p>{item.release_date}</p>
                    <p>{item.opening_crawl}</p>
                    <hr />
                    <Link className="footer" to={`/moreinfo/}`} >
                      More info
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
