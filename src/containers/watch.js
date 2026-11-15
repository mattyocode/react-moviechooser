import React, { useState } from "react";
import { MdOndemandVideo } from "react-icons/md";

import { CardActions, Loading, WatchOptions } from "../components";
import { useRegions, useWatch } from "../hooks/use-watch";
import {
  countryName,
  initialCountry,
  storeCountry,
} from "../utils/watch-country";

// The "Where to watch" panel. It only mounts while its modal is open, so the
// watch request happens on open, never while rendering a list of movies.
export function WatchContainer({ movie }) {
  const [country, setCountry] = useState(initialCountry);
  const { data, error, mutate } = useWatch(movie.slug, country);
  const { data: regions } = useRegions();

  const name = countryName(country);
  const options = pickerOptions(regions, country);

  const changeCountry = (code) => {
    setCountry(code);
    storeCountry(code);
  };

  const failed = Boolean(error) || (data && data.available === false);
  const cta = data && data.link && (
    <WatchOptions.Cta href={data.link}>Where to watch in {name}</WatchOptions.Cta>
  );

  let body;
  if (failed) {
    body = (
      <>
        <WatchOptions.Message role="alert">
          Couldn't load streaming information right now.
        </WatchOptions.Message>
        <WatchOptions.Retry onClick={() => mutate()}>Try again</WatchOptions.Retry>
        {cta}
      </>
    );
  } else if (!data) {
    body = <Loading small aria-label="Loading where to watch" />;
  } else if (data.providers.length === 0) {
    body = (
      <>
        <WatchOptions.Message>Not streaming in {name} right now</WatchOptions.Message>
        {cta}
        <WatchOptions.Credit />
      </>
    );
  } else {
    body = (
      <>
        <WatchOptions.Providers providers={data.providers} />
        {cta}
        <WatchOptions.Credit />
      </>
    );
  }

  return (
    <CardActions landscape={false}>
      <CardActions.Header keyword="Watch" title={movie.title}>
        <MdOndemandVideo />
      </CardActions.Header>
      <CardActions.Body>
        {movie.poster_url && <CardActions.Image src={movie.poster_url} alt="" />}
        <WatchOptions>
          <WatchOptions.Picker
            value={country}
            options={options}
            onChange={changeCountry}
          />
          {body}
        </WatchOptions>
      </CardActions.Body>
    </CardActions>
  );
}

// Region names in the browser's language, sorted, always including the
// current country (it may not be in the list, or the list may not be loaded).
function pickerOptions(regions, current) {
  const codes = new Set((regions || []).map((r) => r.code));
  codes.add(current);
  return [...codes]
    .map((code) => ({ code, name: countryName(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
