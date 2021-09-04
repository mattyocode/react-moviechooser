import React from "react";
import { MdOndemandVideo } from "react-icons/md";

import { CardActions } from "../components";

export function OndemandContainer({ data }) {
  return (
    <CardActions>
      <CardActions.Header keyword="Watch" title={data.title}>
        <MdOndemandVideo />
      </CardActions.Header>
      <CardActions.Body>
        <CardActions.Image src={data.imgUrl} />
        <CardActions.Links>
          {data.linksData
            ? data.linksData.map((link) => {
                return (
                  <CardActions.Link
                    key={link.id}
                    name={link.service}
                    url={link.url}
                  >
                    {link.service}
                  </CardActions.Link>
                );
              })
            : null}
        </CardActions.Links>
      </CardActions.Body>
    </CardActions>
  );
}
