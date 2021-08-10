import React, { useState, useEffect, useCallback } from "react";
import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";

export default function Home({
  url = `${process.env.REACT_APP_FIREBASE_TEST_API}/options.json`,
}) {
  const [genreList, setGenreList] = useState([]);
  const [runtimeData, setRuntimeData] = useState({});
  const [decadeData, setDecadeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOptions = useCallback(async (url) => {
    setIsLoading(true);
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
      setGenreList(data.genre);
      setRuntimeData(data.runtime);
      setDecadeData(data.decade);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOptions(url);
  }, [fetchOptions, url]);

  let choiceForm;
  if (genreList && decadeData && runtimeData) {
    choiceForm = (
      <ChoiceFormContainer
        genreList={genreList}
        runtimeData={runtimeData}
        decadeData={decadeData}
      />
    );
  }
  if (error) {
    choiceForm = <p>{`${error}`}</p>;
  }
  if (isLoading) {
    choiceForm = <p>Loading...</p>;
  }

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
      {choiceForm}
    </>
  );
}
