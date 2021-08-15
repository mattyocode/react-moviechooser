import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { useHttp } from "../hooks";
import { fetchOptionsData } from "../store/query-actions";

export default function Home() {
  //   url = `${process.env.REACT_APP_TEST_API}/options`,
  // }) {
  //   const [options, setOptions] = useState({
  //     genreList: null,
  //     decadeData: null,
  //     runtimeData: null,
  //   });

  //   const { isLoading, error, sendRequest: fetchFormData } = useHttp();

  //   useEffect(() => {
  //     const unpackData = (data) => {
  //       setOptions({
  //         genreList: data.genre,
  //         decadeData: data.runtime,
  //         runtimeData: data.decade,
  //       });
  //     };

  //     fetchFormData({ url: url }, unpackData);
  //   }, [fetchFormData, url]);

  const options = useSelector((state) => state.options);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOptionsData());
  }, [dispatch]);

  console.log(options.options.genre);
  let choiceForm;
  if (notification) {
    choiceForm = <p>{`${notification.message}`}</p>;
  }
  if (
    options.options.genre &&
    options.options.decade &&
    options.options.runtime
  ) {
    console.log("gets into options conditional");
    choiceForm = (
      <ChoiceFormContainer
        genreList={options.options.genre}
        runtimeData={options.options.runtime}
        decadeData={options.options.decade}
      />
    );
  }

  // if (isLoading) {
  //   choiceForm = <p>Loading...</p>;
  // }

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
