import React from "react";
import { MdOndemandVideo } from "react-icons/md";

import { CardActions, Modal } from "../components";

export function OndemandContainer({ title, imgUrl, linksData }) {
  return (
    <Modal>
      <CardActions>
        <CardActions.Header src={MdOndemandVideo} keyword="Watch">
          {title}
        </CardActions.Header>
        <CardActions.Body>
          <CardActions.Image src={imgUrl} />
          <CardActions.Links>
            {linksData
              ? linksData.map((link) => {
                  return (
                    <CardActions.Link iconName={link.service}>
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
