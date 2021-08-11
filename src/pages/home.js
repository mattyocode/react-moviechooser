import React, { useState, useEffect, useCallback } from "react";
import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { useHttp } from "../hooks";

export default function Home({
  url = `${process.env.REACT_APP_TEST_API}/options`,
}) {
  const [genreList, setGenreList] = useState([]);
  const [runtimeData, setRuntimeData] = useState({});
  const [decadeData, setDecadeData] = useState({});

  const { isLoading, error, sendRequest: fetchFormData } = useHttp();

  useEffect(() => {
    const unpackData = (data) => {
      setGenreList(data.genre);
      setRuntimeData(data.runtime);
      setDecadeData(data.decade);
    };

    fetchFormData({ url: url }, unpackData);
  }, [fetchFormData, url]);

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
    choiceForm = <p>{`Error: ${error}`}</p>;
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
