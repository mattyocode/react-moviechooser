# Moviechooser.co.uk

A web app that allows users to input genre(s), runtime range, and release decade range and receive a selection of matching movies. Where available, movies have links to streaming services. Movie detail pages can be shared on social media and via link.

## Tech stack

- React (Hooks and compound components)
- Redux
- Styled Components
- Framer Motion
- Formik
- Axios
- Jest
- React Testing Library
- Mock Service Worker (for mock API calls in testing)
- Github Actions (CI/CD)

## Deployment

App is available at [moviechooser.co.uk](https://moviechooser.co.uk) and is hosted on AWS (S3, Cloudfront, Route 53).

## How to install

1. Clone from Github

   ```bash
   cd projects
   git clone <repo-tag>
   ```

2. Add environment variables

   Create `.env` file in the root directory that includes the required variables (as listed in the .env.example file).

3. Install dependencies

   Run `yarn install` to install dependencies.

4. Run tests

   Run `yarn test` see results of unit tests.

5. Start app locally

   Run `yarn start` to launch the app on localhost:3000

## User experience

The key concept with this web app is to make it as simple as possible for users to input requirements and be offered a selection of relevant movies to watch. Genres are chosen via toggle buttons (checkboxes), with range sliders for runtime and release decade range to keep interaction as ‘light’ as possible.

![homepage.png](https://github.com/mattyocode/images/blob/main/react-moviechooer/homepage.png)

The movie cards are designed to make the most of the portrait poster image while providing a snippet of the film description and a side scrolling row of relevant genres. They feature an averaged score based on reviews from IMDB, Rotten Tomatoes, and Metacritic, displayed over the top left of the poster image.

![results-page.png](https://github.com/mattyocode/images/blob/main/react-moviechooer/results-page.png)

On click, the cards open up to reveal the full description with information about cast, director and the individual scores from each review source.

![movie-card.png](https://github.com/mattyocode/images/blob/main/react-moviechooer/movie-card.png)

The watch and share buttons at the footer of the cards launch modals that link through to streaming services or launch social posts with links to a page featuring the movie card.

![share-modal.png](https://github.com/mattyocode/images/blob/main/react-moviechooer/share-modal.png)

Users can log in and add movies to a list, which is divided into movies which have been watched, and those which have been - determined by clicking the ‘Watched?’ toggle icon in the top right of cards when they feature on the My List page.

![watch-list.png](https://github.com/mattyocode/images/blob/main/react-moviechooer/watch-list.png)

## Featured Code

One of the aspects I’m most happy with is the genre checkbox logic, which is handled by a custom hook in order to keep the component lean.

```jsx
// checkboxes/index.js

export default function Checkboxes({
  section,
  valuesList,
  isChecked,
  changeHandler,
  ...restProps
}) {
  return (
    <Options data-testid={`${section}-checkboxes`}>
      {valuesList
        ? valuesList.map((genreObj, index) => {
            return (
              <li key={index}>
                <Input
                  id={`${section}-checkbox-${index}`}
                  value={genreObj.id}
                  checked={isChecked[index]}
                  onChange={() => changeHandler(index)}
                />
                <Label
                  data-testid={`${section}-checkbox`}
                  htmlFor={`${section}-checkbox-${index}`}
                  checked={isChecked[index]}
                  {...restProps}
                >
                  {genreObj.name}
                </Label>
              </li>
            );
          })
        : null}
    </Options>
  );
}
```

```jsx
// use-checkbox.js

import { useState, useEffect, useCallback } from "react";

export default function useCheckbox(options = []) {
  const [isChecked, setIsChecked] = useState(
    new Array(options.length).fill(false)
  );
  const [allBtnHighlighted, setAllBtnHighlighted] = useState(true);

  const checkboxChangeHandler = useCallback(
    (position) => {
      const updatedCheckedState = isChecked.map((item, index) =>
        index === position ? !item : item
      );
      setIsChecked((prevState) => updatedCheckedState);
    },
    [isChecked]
  );

  const allBtnHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (isChecked.includes(false)) {
        setIsChecked(new Array(options.length).fill(true));
      } else {
        setIsChecked(new Array(options.length).fill(false));
      }
    },
    [isChecked, options]
  );

  useEffect(() => {
    if (isChecked.includes(false)) {
      setAllBtnHighlighted(true);
    } else {
      setAllBtnHighlighted(false);
    }
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(new Array(options.length).fill(false));
  }, [options]);

  return {
    isChecked,
    checkboxChangeHandler,
    allBtnHandler,
    allBtnHighlighted,
  };
}
```

## Challenges and Improvements

Learning to use JSON Web Tokens effectively, in particular refreshing tokens seamlessly via Redux and Axios Auth Refresh, took some dedication but is particularly satisfying to get right.

There is a lot that I would like to add to this site, with the key next steps being:

- Get test coverage above 95%
- Refactor to use TypeScript
- Include landscape image for each movie in streaming services modal
- Include selector to only see results which include streaming service link
