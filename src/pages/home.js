import React, { useState, useEffect, useCallback } from "react";
import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";

export default function Home() {
  const [genreList, setGenreList] = useState([]);
  const [runtimeData, setRuntimeData] = useState({});
  const [decadeData, setDecadeData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOptions = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {},
        body: null,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      console.log(data);
      setGenreList(data.genre);
      setRuntimeData(data.runtime);
      setDecadeData(data.decade);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("GET'S HERE");

    fetchOptions(`${process.env.REACT_APP_FIREBASE_TEST_API}/options.json`);
  }, [fetchOptions]);

  return (
    <>
      <NavbarContainer />
      <Headline>
        <Headline.Title>
          <span>Stop deciding,</span> <span>start watching</span>
        </Headline.Title>
        <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead>
      </Headline>
      {loading ? (
        <p>Is loading right now!</p>
      ) : (
        <ChoiceFormContainer
          genreList={genreList}
          runtimeData={runtimeData}
          decadeData={decadeData}
        />
      )}
    </>
  );
}
