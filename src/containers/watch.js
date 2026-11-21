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
  const { data, error, isValidating, mutate } = useWatch(movie.slug, country);
  const { data: regions } = useRegions();

  const name = countryName(country);
  const options = pickerOptions(regions, country);

  const changeCountry = (code) => {
    setCountry(code);
    storeCountry(code);
  };

  // SWR keeps the last data when a revalidation fails, so a later error only
  // counts as a failure when there's nothing loaded to show.
  const failed = data ? data.available === false : Boolean(error);
  const cta = data && data.link && (
    <WatchOptions.Cta href={data.link}>
      Where to watch in {name}
    </WatchOptions.Cta>
  );

  let body;
  if (failed && !isValidating) {
    body = (
      <>
        <WatchOptions.Message role="alert">
          Couldn't load streaming information right now.
        </WatchOptions.Message>
        <WatchOptions.Retry onClick={() => mutate()}>
          Try again
        </WatchOptions.Retry>
        {cta}
      </>
    );
  } else if (!data || failed) {
    // Still loading, or retrying after a failure: SWR keeps the error until a
    // request succeeds, so it would otherwise stay up while the retry runs.
    body = <Loading small aria-label="Loading where to watch" />;
  } else if (data.providers.length === 0) {
    body = (
      <>
        <WatchOptions.Message>
          Not streaming in {name} right now
        </WatchOptions.Message>
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
        <CardActions.Image
          path={movie.poster_path}
          url={movie.poster_url}
          title={movie.title}
        />
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
