import { Options, Label, Input } from "./styles/checkboxes";

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
