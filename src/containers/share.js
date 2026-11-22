import React, { useState } from "react";
import { MdShare } from "react-icons/md";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

import { CardActions } from "../components";

// X's web intent for a new post. react-share 4's Twitter button still opens
// twitter.com/share, so X gets its own button, opened like react-share's.
export function xShareUrl(url, text) {
  return (
    "https://x.com/intent/post" +
    `?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  );
}

function openXShare(url, text) {
  const width = 550;
  const height = 400;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    xShareUrl(url, text),
    "_blank",
    `noopener,noreferrer,width=${width},height=${height},left=${left},top=${top}`
  );
}

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
        <CardActions.Image
          path={data.posterPath}
          url={data.posterUrl}
          title={data.title}
        />
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
            <button
              type="button"
              aria-label="Share on X"
              onClick={() => openXShare(data.shareUrl, data.title)}
            >
              <CardActions.Icon name="X">X</CardActions.Icon>
            </button>
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
