import React, { useState } from "react";
import { MdShare } from "react-icons/md";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

import { CardActions } from "../components";

export function ShareContainer({ data }) {
  const [copyClass, setCopyClass] = useState("");
  const [copyText, setCopyText] = useState("Copy Link");

  const copySuccess = () => {
    setCopyClass("flash");
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyClass("");
      setCopyText("Copy Text");
    }, 1000);
  };

  return (
    <CardActions landscape={false}>
      <CardActions.Header keyword="Share" title={data.title}>
        <MdShare />
      </CardActions.Header>
      <CardActions.Body>
        <CardActions.Image src={data.posterUrl} />
        <CardActions.Actions>
          <CardActions.Action>
            <EmailShareButton
              url={data.shareUrl}
              subject={`Check out ${data.title}!`}
              body="body"
            >
              <CardActions.Icon name="Email">Email</CardActions.Icon>
            </EmailShareButton>
          </CardActions.Action>

          <CardActions.Action>
            <TelegramShareButton url={data.shareUrl} title={data.title}>
              <CardActions.Icon name="Telegram">Telegram</CardActions.Icon>
            </TelegramShareButton>
          </CardActions.Action>

          <CardActions.Action>
            <WhatsappShareButton
              url={data.shareUrl}
              title={data.title}
              separator=":: "
            >
              <CardActions.Icon name="whatsapp">Whatsapp</CardActions.Icon>
            </WhatsappShareButton>
          </CardActions.Action>

          <CardActions.Action>
            <FacebookShareButton url={data.shareUrl} quote={data.title}>
              <CardActions.Icon name="facebook">Facebook</CardActions.Icon>
            </FacebookShareButton>
          </CardActions.Action>

          <CardActions.Action>
            <TwitterShareButton url={data.shareUrl} title={data.title}>
              <CardActions.Icon name="Twitter">Twitter</CardActions.Icon>
            </TwitterShareButton>
          </CardActions.Action>

          <CardActions.Action>
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(data.shareUrl)
                  .then(() => {
                    copySuccess();
                  })
                  .catch();
              }}
            >
              <CardActions.Icon name="copy link" className={copyClass}>
                {copyText}
              </CardActions.Icon>
            </button>
          </CardActions.Action>
        </CardActions.Actions>
      </CardActions.Body>
    </CardActions>
  );
}
