document.getElementById("fillBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillInputsWithRandomText,
  });
});

function fillInputsWithRandomText() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.hasAttribute("readonly") || input.hasAttribute("disabled")) {
      return;
    }
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = Math.random() < 0.5;
    }
    if (input.type === "number") {
      const randomNum = Math.floor(Math.random() * 100);
      input.value = randomNum;
    }
    if (input.type === "date") {
      const randomDate = new Date(
        Date.now() + Math.floor(Math.random() * 10000000000)
      );
      input.value = randomDate.toISOString().split("T")[0];
    }
    if (input.type === "color") {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      input.value = randomColor;
    }
    if (input.type === "file") {
      return;
    }

    if (input.type === "email") {
      const randomEmail =
        Math.random().toString(36).substring(2, 10) + "@example.com";
      input.value = randomEmail;
    }
    if (input.type === "tel") {
      const randomPhone = Math.floor(Math.random() * 1000000000);
      input.value = randomPhone;
    }

    if (input.type === "url") {
      const randomUrl =
        "https://www." + Math.random().toString(36).substring(2, 10) + ".com";
      input.value = randomUrl;
    }

    if (input.type === "datetime-local") {
      const randomDateTime = new Date(
        Date.now() + Math.floor(Math.random() * 10000000000)
      );
      input.value = randomDateTime.toISOString().slice(0, 16);
    }
    if (input.type === "time") {
      const randomTime = new Date(
        Date.now() + Math.floor(Math.random() * 10000000000)
      );
      input.value = randomTime.toISOString().slice(11, 16);
    }
    if (input.type === "month") {
      const randomMonth = new Date(
        Date.now() + Math.floor(Math.random() * 10000000000)
      );
      input.value = randomMonth.toISOString().slice(0, 7);
    }

    if (input.type === "hidden") {
      return;
    }

    if (input.type === "password") {
      const password = "Admin@123";
      input.value = password;
    }

    if (input.type === "text" || input.type === "search") {
      const randomText = Math.random().toString(36).substring(2, 10);
      input.value = randomText;
    }

    if(input.type === "week"){
        const currentYear = new Date().getFullYear();
        const randomWeek = Math.floor(Math.random() * 52) + 1;
        const randomWeekFormatted = `${currentYear}-W${randomWeek.toString().padStart(2, '0')}`;
        input.value = randomWeekFormatted;
    }

    if(input.type === "range"){
        const randomRange = Math.floor(Math.random() * (input.max - input.min + 1)) + parseInt(input.min);
        input.value = randomRange;
    }

  });

  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    const options = Array.from(select.querySelectorAll("option"));
  const validOptions = options.filter(option => !option.disabled && !option.selected);
  if (validOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * validOptions.length);
    select.selectedIndex = Array.from(select.options).indexOf(validOptions[randomIndex]);
  }
  });

    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
        const randomText = Math.random().toString(36).substring(2, 10);
        textarea.value = randomText;
    }
    );
}
