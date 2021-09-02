import React from "react";
import { MdOndemandVideo } from "react-icons/md";

import { CardActions, Modal } from "../components";

export function OndemandContainer({ data, closeModal }) {
  return (
    <Modal closeModal={closeModal}>
      <CardActions>
        <CardActions.Header keyword="Watch" title={data.title}>
          <MdOndemandVideo />
        </CardActions.Header>
        <CardActions.Body>
          <CardActions.Image src={data.imgUrl} />
          <CardActions.Links>
            {data.linksData
              ? data.linksData.map((link) => {
                  console.log("ondemand ", link.service);
                  return (
                    <CardActions.Link name={link.service}>
                      {link.service}
                    </CardActions.Link>
                  );
                })
              : null}
          </CardActions.Links>
        </CardActions.Body>
      </CardActions>
    </Modal>
  );
}
