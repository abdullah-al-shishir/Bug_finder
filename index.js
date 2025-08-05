document.addEventListener("DOMContentLoaded", () => {
  const issueBtn = document.getElementById("issue-btn");
  const loadingState = document.getElementById("loading-state");
  const displayResult = document.getElementById("displayResult");

  //   API Call //
  const GITHUB_API_URL =
    "https://api.github.com/search/issues?q=windows+label:bug+language:python+state:open&sort=created&order=asc";

  async function findButton() {
    showLoadingState();
    try {
      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) {
        const msge = `Error found`;
        throw new Error(msge);
      }
      const data = await response.json();
      if (data.items.length === 0) {
        displayError("No issues found with the specified query.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * data.items.length);
      const randomIssue = data.items[randomIndex];

      displayIssue(randomIssue);
    } catch (error) {
      displayError(
        "Failed to fetch issue. Please check your connection or try again later."
      );
    } finally {
      hideLoadingState();
    }
  }
  // Functon to display the issue result //
  function displayIssue(issue) {
    displayResult.innerHTML = "";
    displayResult.classList.remove("hidden");

    const createdAt = new Date(issue.created_at).toLocaleDateString();

    // Extract the repository name from the repository URL
    const repoUrlParts = issue.repository_url.split("/");
    const repoName = `${repoUrlParts[repoUrlParts.length - 2]}/${
      repoUrlParts[repoUrlParts.length - 1]
    }`;

    // Create the HTML content using a template literal for easier readability
    const issueHTML = `
                    <a href="${
                      issue.html_url
                    }" target="_blank" rel="noopener noreferrer" class="issue-title">${
      issue.title
    }</a>
                    <p class="issue-repo">Repository: <a href="${issue.repository_url.replace(
                      "api.github.com/repos",
                      "github.com"
                    )}" target="_blank">${repoName}</a></p>
                    <div class="issue-stats">
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M18 13.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM12 13.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM6 13.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM18 7.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM12 7.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM6 7.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM18 2.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM12 2.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2zM6 2.5a.5.5 0 00-.5-.5h-2a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2z"></path>
                            </svg>
                            <span>State:</span>
                            <span class="stat-value">${issue.state}</span>
                        </span>
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 13a3 3 0 100-6 3 3 0 000 6zM5.5 13.5a.5.5 0 00.5.5H18a.5.5 0 000-1H6a.5.5 0 00-.5.5z"></path>
                            </svg>
                            <span>Comments:</span>
                            <span class="stat-value">${issue.comments}</span>
                        </span>
                        <span class="stat-item">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M14.5 1a.5.5 0 00-.5.5v3a.5.5 0 001 0v-3a.5.5 0 00-.5-.5zM5.5 1a.5.5 0 00-.5.5v3a.5.5 0 001 0v-3a.5.5 0 00-.5-.5zM15 7H5a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2zM5 8h10a1 1 0 011 1v1H4V9a1 1 0 011-1zm11 10a1 1 0 01-1 1H5a1 1 0 01-1-1v-4h12v4z"></path>
                            </svg>
                            <span>Created:</span>
                            <span class="stat-value">${createdAt}</span>
                        </span>
                    </div>
                `;

    displayResult.innerHTML = issueHTML;
  }

  // setting up initial works //
  function showLoadingState() {
    loadingState.classList.remove("hidden");
    displayResult.classList.add("hidden");
  }

  function hideLoadingState() {
    loadingState.classList.add("hidden");
  }
  function displayError(message) {
    displayResult.classList.add("hidden");
  }

  //   EventListener to the button //
  issueBtn.addEventListener("click", findButton);
});
