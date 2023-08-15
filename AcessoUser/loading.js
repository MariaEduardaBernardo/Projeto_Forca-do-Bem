function showLoadingIndicator(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }
