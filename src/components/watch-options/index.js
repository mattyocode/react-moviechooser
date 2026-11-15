import React from "react";

import { PROVIDER_ICONS } from "../../assets/provider-icons";
import {
  Credit,
  Cta,
  Message,
  PickerLabel,
  Provider,
  ProviderList,
  Retry,
  Wrapper,
} from "./styles/watch-options";

export default function WatchOptions({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

WatchOptions.Picker = function WatchOptionsPicker({
  value,
  options,
  onChange,
}) {
  return (
    <PickerLabel>
      Country
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </PickerLabel>
  );
};

// One icon per service. The icons aren't links (TMDB gives no per-service
// URLs), so splitting them by stream/rent/buy added nothing: the watch-page
// button is where the viewer goes next. The API orders stream, rent, buy,
// so keeping each service's first entry puts subscriptions first.
WatchOptions.Providers = function WatchOptionsProviders({ providers }) {
  const seen = new Set();
  const unique = providers.filter((p) => {
    if (seen.has(p.provider_id)) return false;
    seen.add(p.provider_id);
    return true;
  });
  return (
    <ProviderList>
      {unique.map((p) => {
        const src = PROVIDER_ICONS[p.provider_id] || p.logo;
        return (
          <Provider key={p.provider_id}>
            {src && <img src={src} alt="" />}
            <span>{p.name}</span>
          </Provider>
        );
      })}
    </ProviderList>
  );
};

WatchOptions.Message = function WatchOptionsMessage({ children, ...restProps }) {
  return <Message {...restProps}>{children}</Message>;
};

WatchOptions.Cta = function WatchOptionsCta({ href, children }) {
  return (
    <Cta href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Cta>
  );
};

WatchOptions.Retry = function WatchOptionsRetry({ onClick, children }) {
  return (
    <Retry type="button" onClick={onClick}>
      {children}
    </Retry>
  );
};

WatchOptions.Credit = function WatchOptionsCredit() {
  return (
    <Credit>
      Streaming data from{" "}
      <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer">
        JustWatch
      </a>
    </Credit>
  );
};
