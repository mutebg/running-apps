import { h } from "preact";
import PreactHead from "preact-head";
import { useEffect } from "preact/hooks";

const Head = ({
  title,
  description = "MyRunning.App",
  image = "",
  url = "",
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "MyRunning.App: " + title;
    }
  }, [title, description, image, url]);
};
// (
//   <PreactHead>
//     <meta property="og:title" content={`MyRunning.App / ${title}`} />
//     <meta property="og:url" content={url} />
//     <meta property="og:image" content={image} />
//     <meta property="og:description" content={description} />
//     <meta property="og:type" content="article" />
//     <meta name="twitter:card" content={image} />
//     <meta name="twitter:title" content={title} />
//     <meta name="twitter:description" content={description} />
//     <meta name="twitter:image" content={image} />
//     <title>{`MyRunning.App / ${title}`}</title>
//     <meta name="description" content={description} />
//   </PreactHead>
//     );

export default Head;
