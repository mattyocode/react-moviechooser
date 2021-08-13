import { Options, Label, Input } from "./styles/checkboxes";

export default function Checkboxes({
  name,
  valuesList,
  isChecked,
  changeHandler,
  ...restProps
}) {
  return (
    <Options data-testid={`${name}-checkboxes`}>
      {valuesList
        ? valuesList.map((value, index) => {
            return (
              <li key={index}>
                <Input
                  id={`${name}-checkbox-${index}`}
                  value={value}
                  checked={isChecked[index]}
                  onChange={() => changeHandler(index)}
                />
                <Label
                  data-testid={`${name}-checkbox`}
                  htmlFor={`${name}-checkbox-${index}`}
                  checked={isChecked[index]}
                  {...restProps}
                >
                  {value}
                </Label>
              </li>
            );
          })
        : null}
    </Options>
  );
}
