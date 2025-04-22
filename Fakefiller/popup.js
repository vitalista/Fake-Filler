document.getElementById("fillBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillInputsWithRandomText,
  });
});

function fillInputsWithRandomText() {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.hasAttribute("readonly") || input.hasAttribute("disabled")) return;

    let valueToSet = null;

    switch (input.type) {
      case "text":
      case "search":
        valueToSet = Math.random().toString(36).substring(2, 10);
        break;

      case "checkbox":
      case "radio":
        input.checked = Math.random() < 0.5;
        return; // no value to set

      case "number":
        if (input.hasAttribute('maxlength')) {
          const maxLength = parseInt(input.getAttribute('maxlength'));
          const randomNum = Math.floor(Math.random() * Math.pow(10, maxLength));
          valueToSet = randomNum.toString().padStart(maxLength, '0');
        } else {
          valueToSet = Math.floor(Math.random() * 10);
        }
        break;

      case "date":
        valueToSet = new Date(Date.now() + Math.floor(Math.random() * 1e10))
          .toISOString().split("T")[0];
        break;

      case "color":
        valueToSet = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        break;

      case "file":
        return;

      case "email":
        valueToSet = Math.random().toString(36).substring(2, 10) + "@example.com";
        break;

      case "tel":
        valueToSet = Math.floor(Math.random() * 1000000000).toString();
        break;

      case "url":
        valueToSet = "https://www." + Math.random().toString(36).substring(2, 10) + ".com";
        break;

      case "datetime-local":
        valueToSet = new Date(Date.now() + Math.floor(Math.random() * 1e10))
          .toISOString().slice(0, 16);
        break;

      case "time":
        valueToSet = new Date(Date.now() + Math.floor(Math.random() * 1e10))
          .toISOString().slice(11, 16);
        break;

      case "month":
        valueToSet = new Date(Date.now() + Math.floor(Math.random() * 1e10))
          .toISOString().slice(0, 7);
        break;

      case "hidden":
        return;

      case "password":
        valueToSet = "Admin@123";
        break;

      case "week":
        const currentYear = new Date().getFullYear();
        const randomWeek = Math.floor(Math.random() * 52) + 1;
        valueToSet = `${currentYear}-W${randomWeek.toString().padStart(2, "0")}`;
        break;

      case "range":
        const min = parseInt(input.min || 0);
        const max = parseInt(input.max || 100);
        valueToSet = Math.floor(Math.random() * (max - min + 1)) + min;
        break;

      default:
        return;
    }

    if (valueToSet !== null) {
      nativeInputValueSetter.call(input, valueToSet);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    if (select.hasAttribute("readonly") || select.hasAttribute("disabled")) return;

    const options = Array.from(select.options).filter(
      (option) => !option.disabled
    );

    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      select.selectedIndex = randomIndex;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea) => {
    if (textarea.hasAttribute("readonly") || textarea.hasAttribute("disabled")) return;

    const randomText = Math.random().toString(36).substring(2, 10);
    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value"
    ).set;
    nativeTextAreaValueSetter.call(textarea, randomText);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

