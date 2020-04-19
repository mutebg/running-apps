import { h } from "preact";
import get from "just-safe-get";
import { formatPrice } from "../../utils/index";
import "./style.scss";

const Compare = ({ data, slugs }) => {
  const slugsList = slugs.split(",");
  const apps = data.filter(({ slug }) => slugsList.indexOf(slug) >= 0);

  const compareRows = [
    { label: "", value: "apple.logo", type: "img" },
    { label: "Name", value: "name" },
    {
      label: "Google play rating",
      value: "google.rating",
    },
    { label: "Apple Store rating", value: "apple.rating" },
    { label: "Free", value: "free" },
    { label: "Monthly subscription", value: "submonthly", type: "price" },
    { label: "Yearly subscription", value: "subyearly", type: "price" },
    { label: "", value: "slug", type: "viewmore" },
  ];

  return (
    <div class="compare-page">
      <table class="compare-table">
        {compareRows.map((rowItem) => (
          <tr class={rowItem.value}>
            <td class="label">{rowItem.label}</td>
            {apps.map((app) => (
              <td class="value">{displayCell(app, rowItem)}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Compare;

const displayCell = (app, rowItem) => {
  const value = get(app, rowItem.value);
  switch (rowItem.type) {
    case "img":
      return <img src={value} alt="" width="80" />;
    case "viewmore":
      return <a href={`/view/${value}`}>view more</a>;
    case "price":
      return formatPrice(value);
    default:
      return value;
  }
};
