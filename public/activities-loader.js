(function () {
  window.__ACTIVITIES_LOADER_PRESENT = true;

  const SUPABASE_URL = "https://onpsyayyvfwsdvlywqpf.supabase.co";
  const ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucHN5YXl5dmZ3c2R2bHl3cXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MzU1MjAsImV4cCI6MjA5MjUxMTUyMH0.dCN1ggJjxZjr0EOE5vOXHzQ4HxXUYNcgPwclNSCPpog";
  const STORAGE_BUCKET = "activities-images";

  function escapeHtml(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function imageUrl(path) {
    if (!path) return null;
    return (
      SUPABASE_URL +
      "/storage/v1/object/public/" +
      STORAGE_BUCKET +
      "/" +
      path.split("/").map(encodeURIComponent).join("/")
    );
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { iso: "", display: "" };
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    return { iso: y + "-" + mo + "-" + da, display: y + "." + mo + "." + da };
  }

  function renderActivityHtml(a) {
    const dateObj = formatDate(a.date);
    const img = imageUrl(a.image_path);
    const titleEsc = escapeHtml(a.title || "");
    const imgTag = img
      ? '<img src="' + escapeHtml(img) + '" alt="' + titleEsc + '" loading="lazy" />'
      : '<div class="activity-thumb-placeholder" aria-hidden="true"></div>';
    const descHtml = a.description
      ? "<p>" + escapeHtml(a.description) + "</p>"
      : "";
    const timeHtml = dateObj.iso
      ? '<time datetime="' + dateObj.iso + '">' + dateObj.display + "</time>"
      : "";

    if (a.external_url) {
      const url = escapeHtml(a.external_url);
      return (
        '<li data-href="' +
        url +
        '" tabindex="0" role="link" aria-label="' +
        titleEsc +
        ' の詳細を見る">' +
        '<a class="activity-media-link" href="' +
        url +
        '" aria-label="' +
        titleEsc +
        ' の詳細を見る">' +
        imgTag +
        "</a>" +
        '<div class="activity-content">' +
        timeHtml +
        "<h3>" +
        titleEsc +
        "</h3>" +
        descHtml +
        '<button class="activity-link" type="button">詳細を見る</button>' +
        "</div>" +
        "</li>"
      );
    }
    return (
      "<li>" +
      imgTag +
      '<div class="activity-content">' +
      timeHtml +
      "<h3>" +
      titleEsc +
      "</h3>" +
      descHtml +
      "</div>" +
      "</li>"
    );
  }

  function startCarousel() {
    if (typeof window.__initActivityCarousel === "function") {
      window.__initActivityCarousel();
    } else {
      window.__ACTIVITIES_READY = true;
    }
  }

  async function loadActivities() {
    const list = document.querySelector(
      "[data-activity-carousel] .activity-list"
    );
    if (!list) {
      startCarousel();
      return;
    }

    try {
      const url =
        SUPABASE_URL +
        "/rest/v1/activities?published=eq.true&select=*&order=date.desc,created_at.desc&limit=20";
      const res = await fetch(url, {
        headers: { apikey: ANON_KEY, Authorization: "Bearer " + ANON_KEY }
      });
      if (!res.ok) throw new Error("fetch failed: " + res.status);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const carousel = list.closest("[data-activity-carousel]");
        const dots = carousel ? carousel.querySelector(".works-dots") : null;
        if (dots) dots.innerHTML = "";
        list.innerHTML = data.map(renderActivityHtml).join("");
      }
    } catch (err) {
      console.warn("Activities fetch failed, using static fallback:", err);
    }

    startCarousel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadActivities);
  } else {
    loadActivities();
  }
})();
