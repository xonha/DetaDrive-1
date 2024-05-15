async function login() {
  const url = "https://api.detadrive.xonha.space/user/login";
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "X-API-Key": "e09HopoZnGSg_RnQDjeM87SoG6JQ85Rd4NpiWdYLGpxod",
  };

  const body = JSON.stringify({
    username: "string",
    password: "string",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

login();
