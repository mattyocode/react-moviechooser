import React from "react";
import { render } from "@testing-library/react";

import ChoiceForm from "./index";

describe("<ChoiceForm/>", () => {
  const { getByText } = render(<ChoiceForm />);
});
