/**
 * External dependencies
 */
import { findKey } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { render } from "@wordpress/element";
import domReady from "@wordpress/dom-ready";
import { TabPanel } from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";

/**
 * Internal dependencies
 */
import { SearchParams } from "../utils";
import { DataContext, useGlobalData } from "./utils";
import GettingStarted from "./getting-started";
import SectionManageFeatures from "./manage-features";

// Styles
import "./index.scss";

const TabContent = ({ children }) => (
  <div className="metabox-holder">{children}</div>
);

const SettingsBody = () => {
  const tabs = [
    {
      name: "getting-started",
      title: __("Getting Started", "block-enhancements"),
      className: "setting-tabs__getting-started",
    },
    {
      name: "manage-features",
      title: __("Manage Features", "block-enhancements"),
      className: "setting-tabs__manage-features",
    },
  ];

  const searchParams = new SearchParams();
  const tabParam = searchParams.get("tab");
  const initialTabName = findKey(tabs, ["name", tabParam])
    ? tabParam
    : "getting-started";

  const globalData = useGlobalData();
  return (
    <DataContext.Provider value={globalData}>
      <TabPanel
        tabs={tabs}
        className="settings-tabs"
        activeClass="is-active"
        initialTabName={initialTabName}
        onSelect={(tabName) => {
          searchParams.set("tab", tabName);
        }}
      >
        {(tab) => {
          switch (tab.name) {
            case "getting-started":
              return (
                <TabContent>
                  <GettingStarted />
                </TabContent>
              );

            case "manage-features":
              return (
                <TabContent>
                  <SectionManageFeatures />
                </TabContent>
              );

            default:
              break;
          }
        }}
      </TabPanel>
    </DataContext.Provider>
  );
};

/**
 * Kick start
 */
domReady(() => {
  registerCoreBlocks();
  render(<SettingsBody />, document.querySelector(".js-be-settings-root"));
});
