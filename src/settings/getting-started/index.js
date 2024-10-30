/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { ExternalLink, Spinner } from "@wordpress/components";
import { useContext } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { DataContext } from "../utils";
import { Section, Widget } from "../../components";

/*
 $break-huge: 1440px;
 $break-wide: 1280px;
 $break-xlarge: 1080px;
 $break-large: 960px;	// admin sidebar auto folds
 $break-medium: 782px;	// adminbar goes big
 $break-small: 600px;
 $break-mobile: 480px;
 $break-zoomed-in: 280px;
*/

const WidgetStyled = styled(Widget)`
  border-top: 0;

  h1 {
    padding: 0;
    margin: 10px 0;
    font-size: 2.5em;
  }

  h2 {
    margin-bottom: 0.75em !important;
  }

  .welcome {
    &__description {
      ul,
      p {
        font-size: 1.2em;
      }

      ul {
        padding-left: 20px;
        list-style: disc;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }

    &__guides {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 1.5em;

      h4 {
        margin: 0 0 1em;
      }
    }
  }

  .video-tutorials {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;

    @media (min-width: 782px) {
      // $break-medium
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      // $break-wide
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    &__item {
      border: 1px solid #ddd;

      &__video {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        margin: 0;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &__desc {
        padding: 8px 10px 10px;
        font-size: 1.2em;
        font-weight: 500;
      }
    }
  }

  h2.view-playlists {
    margin-top: 1rem;
  }
`;

const WelcomeWidget = () => {
  const { loading, data: docs } = useContext(DataContext);

  return (
    <WidgetStyled
      isHeaderHidden={true}
      isFullRow={true}
      className="welcome-widget welcome"
    >
      <h1>{__("Welcome to Block Enhancements", "block-enhancements")}</h1>
      <div className="welcome__description">
        <p>
          {__(
            "This plugin enhances your blocks with some usefull features. You can add icons, responsive text alignment, colors, shadows, transforms, transitions with hover style to make your blocks stand out. It works well with both core and third-party blocks, you can choose which blocks should be supported for each feature from the 'Manage Features' section.",
            "block-enhancements",
          )}
        </p>
        <p>
          {__(
            "To get started, we suggest you check out these quick guides and watch these video tutorials below.",
            "block-enhancements",
          )}
        </p>
        <h2>
          {__(
            "Here are some quick guides on how to use them.",
            "block-enhancements",
          )}
        </h2>
        <div className="welcome__guides">
          {loading ? (
            <Spinner />
          ) : (
            !!docs?.guides &&
            docs?.guides.map(({ title, src }) => (
              <div key={src}>
                <h4>{title}</h4>
                <img src={src} />
              </div>
            ))
          )}
        </div>

        <h2>{__("Video tutorials", "block-enhancements")}</h2>
        <p>
          {__(
            "Below is a list of short video tutorials, you can use them as learning resources. We will upload more videos soon, so don’t miss out on the latest updates. To get notified when we release new videos, please subscribe to our youtube channel and turn on the notifications. ",
            "block-enhancements",
          )}
          <ExternalLink href="https://www.youtube.com/channel/UCB7Y3mlCEKHVM-RCZaTkR1g?sub_confirmation=1">
            Subscribe
          </ExternalLink>
          {", "}
          <ExternalLink href="https://www.youtube.com/playlist?list=PLPuEwc7dZklcKwDc2AJLjLvH3QCQclmzh">
            {__("View all playlist", "block-enhancements")}
          </ExternalLink>
        </p>
        <div className="video-tutorials">
          {loading ? (
            <Spinner />
          ) : (
            !!docs?.videoTutorials &&
            docs?.videoTutorials.map(({ title, id }) => (
              <div className="video-tutorials__item" key={id}>
                <div className="video-tutorials__item__video">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}.btn-play{position: absolute;top: 50%;left: 50%;z-index: 1;display: block;width: 68px;height: 48px;margin:0;cursor: pointer;transform: translate3d(-50%, -50%, 0);background-color: transparent;background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');filter: grayscale(100%);transition: filter .1s cubic-bezier(0, 0, 0.2, 1);border: none;}body:hover .btn-play,.btn-play:focus{filter:none}.visually-hidden{clip: rect(0 0 0 0);clip-path: inset(50%);height: 1px;overflow: hidden;position: absolute;white-space: nowrap;width: 1px;}</style><a href="https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1&playsinline=1"><img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${title}"><button type="button" class="btn-play"><span class="visually-hidden">Play</span></button></a>`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-tutorials__item__desc">{title}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </WidgetStyled>
  );
};

const GettingStarted = () => {
  return (
    <Section>
      <WelcomeWidget />
    </Section>
  );
};

export default GettingStarted;
