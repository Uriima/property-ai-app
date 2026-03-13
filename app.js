async function estimate() {
  const city = document.getElementById("city").value;
  const area = document.getElementById("area").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const imageFiles = document.getElementById("images").files;

  const resultEl = document.getElementById("result");
  resultEl.innerText = "Estimating value...";

  try {
    const formData = new FormData();
    formData.append("city", city);
    formData.append("area", area);
    formData.append("bedrooms", bedrooms);

    // Add up to 5 images
    for (let i = 0; i < imageFiles.length && i < 5; i++) {
      formData.append("images", imageFiles[i]);
    }

    // Call your Replit backend
    const response = await fetch(
      "https://ac24cbe7-acbd-4473-90d0-1c5cc04fc244-00-1fy8wqlwog2wc.worf.replit.dev/api/estimate",
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error("Server returned " + response.status);
    }

    const data = await response.json();

    resultEl.innerText = "Estimated Value: ₦ " + data.price;

  } catch (error) {
    resultEl.innerText = "Error connecting to server.";
    console.error(error);
  }
}