
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbyEgdUqBEnICXi7BwOn3r0Tj7M7Fer-HWHHtWIkBoYc-73dXW6qtwfYMErwpSU62YfC/exec";

  const inputName  = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const inputRole  = document.getElementById("inputRole");
  const submitBtn  = document.getElementById("submitBtn");
  const errorMsg   = document.getElementById("errorMsg");
  const formView   = document.getElementById("formView");
  const successView = document.getElementById("successView");
  const checkSvg   = document.getElementById("checkSvg");

  // Enable button only when all fields are filled
  function checkReady() {
    const ready = inputName.value.trim() && inputEmail.value.trim() && inputRole.value;
    submitBtn.disabled = !ready;
  }

  inputName.addEventListener("input", checkReady);
  inputEmail.addEventListener("input", checkReady);
  inputRole.addEventListener("change", checkReady);

  function setLoading(on) {
    if (on) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove("loading");
      checkReady();
    }
  }

  function showSuccess() {
    formView.classList.add("hidden");
    successView.classList.add("visible");
    // Trigger check animation
    setTimeout(() => checkSvg.classList.add("animate"), 50);
  }

  function showError() {
    errorMsg.classList.add("visible");
  }

  submitBtn.addEventListener("click", async function () {
    if (submitBtn.disabled) return;
    setLoading(true);
    errorMsg.classList.remove("visible");

    const qs = new URLSearchParams({
      name:      inputName.value.trim(),
      email:     inputEmail.value.trim(),
      role:      inputRole.value,
      timestamp: new Date().toISOString()
    });

    try {
      await new Promise(function (resolve) {
        var img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = SHEET_URL + "?" + qs.toString();
        setTimeout(resolve, 3000);
      });
      showSuccess();
    } catch (e) {
      setLoading(false);
      showError();
    }
  });
