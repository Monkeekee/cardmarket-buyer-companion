import { isMagicOrderDetailUrl } from "../../lib/order-url";
import { relevantTabUrl } from "../../lib/relevant-tab";

async function render(): Promise<void> {
  const title = document.getElementById("title");
  const body = document.getElementById("body");
  if (!title || !body) throw new Error("popup markup missing title/body");

  title.textContent = chrome.i18n.getMessage("extName");

  const url = await relevantTabUrl();
  body.textContent = isMagicOrderDetailUrl(url)
    ? chrome.i18n.getMessage("popupPlaceholder")
    : chrome.i18n.getMessage("popupOpenOrder");
}

void render();
