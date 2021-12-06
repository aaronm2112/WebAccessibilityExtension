
function handleMessage(request, sender, sendResponse) {
  console.log("Message from the content script: " +
    request.greeting);
  sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);



  browser.contextMenus.create({
    id: "report-btn",
    title: "Generate Accessibility Report!",
    contexts: ["all"]
  });
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "report-btn": 
        browser.tabs.create({
            url:"index.html?=Test"
        })
            break;
        default:
            console.log("Other item clicked.")
            break;
    }

  });