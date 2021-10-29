import React from "react";
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
  // const [, setCopySuccess] = useState("");

  // const copyLink = (clip) => {
  //   navigator.clipboard
  //     .writeText(clip)
  //     .then(() => {
  //       setCopySuccess("Copied");
  //       alert("Copied!");
  //     })
  //     .catch(() => {
  //       setCopySuccess("Copy failed!");
  //       alert("Copy Failed!");
  //     });
  // };

  // const copyLink = (link) => {
  //   navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
  //     // if (result.state === "granted" || result.state === "prompt") {
  //     updateClipboard(link);
  //     // }
  //   });
  // };

  // const copyLink = (link) => {
  //   const tmpTextField = document.createElement("textarea");
  //   tmpTextField.textContent = link;
  //   tmpTextField.setAttribute("style", "position:absolute; right:200%;");
  //   document.body.appendChild(tmpTextField);
  //   tmpTextField.select();
  //   tmpTextField.setSelectionRange(0, 99999); /*For mobile devices*/
  //   document.execCommand("copy");
  //   tmpTextField.remove();
  // };

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
                navigator.clipboard.writeText(data.shareUrl);
              }}
            >
              <CardActions.Icon name="copy link">Copy Link</CardActions.Icon>
            </button>
          </CardActions.Action>
        </CardActions.Actions>
      </CardActions.Body>
    </CardActions>
  );
}
