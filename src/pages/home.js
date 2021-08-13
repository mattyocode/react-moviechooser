import React, { useState, useEffect } from "react";
import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { useHttp } from "../hooks";

export default function Home({
  url = `${process.env.REACT_APP_TEST_API}/options`,
}) {
  const [options, setOptions] = useState({
    genreList: null,
    decadeData: null,
    runtimeData: null,
  });

  const { isLoading, error, sendRequest: fetchFormData } = useHttp();

  useEffect(() => {
    const unpackData = (data) => {
      setOptions({
        genreList: data.genre,
        decadeData: data.runtime,
        runtimeData: data.decade,
      });
    };

    fetchFormData({ url: url }, unpackData);
  }, [fetchFormData, url]);

  let choiceForm;
  if (options.genreList && options.decadeData && options.runtimeData) {
    choiceForm = (
      <ChoiceFormContainer
        genreList={options.genreList}
        runtimeData={options.runtimeData}
        decadeData={options.decadeData}
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
