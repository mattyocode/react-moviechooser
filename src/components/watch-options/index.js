import React from "react";

import { PROVIDER_ICONS } from "../../assets/provider-icons";
import {
  Credit,
  Cta,
  Group,
  Message,
  PickerLabel,
  Provider,
  Retry,
  Wrapper,
} from "./styles/watch-options";

const GROUPS = [
  ["stream", "Stream"],
  ["rent", "Rent"],
  ["buy", "Buy"],
];

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

// Stream / Rent / Buy, in API order, leaving out empty groups.
WatchOptions.Providers = function WatchOptionsProviders({ providers }) {
  return GROUPS.map(([kind, heading]) => {
    const inGroup = providers.filter((p) => p.kind === kind);
    if (inGroup.length === 0) return null;
    return (
      <Group key={kind}>
        <h3>{heading}</h3>
        <ul>
          {inGroup.map((p) => {
            const src = PROVIDER_ICONS[p.provider_id] || p.logo;
            return (
              <Provider key={`${kind}-${p.provider_id}`}>
                {src && <img src={src} alt="" />}
                <span>{p.name}</span>
              </Provider>
            );
          })}
        </ul>
      </Group>
    );
  });
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
