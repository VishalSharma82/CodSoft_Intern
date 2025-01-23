// Mock job data with multiple listings
const mockJobs = [
  {
    title: "Software Engineer Intern",
    company: "Tech Solutions",
    location: "Bangalore",
    applyLink: "#"
  },
  {
    title: "Marketing Manager",
    company: "Growth Hub",
    location: "Mumbai",
    applyLink: "#"
  },
  {
    title: "Graphic Designer",
    company: "Creative Minds",
    location: "Delhi",
    applyLink: "#"
  },
  {
    title: "Data Analyst",
    company: "Data Wizards",
    location: "Hyderabad",
    applyLink: "#"
  },
  {
    title: "Front-End Developer",
    company: "Pixel Perfect",
    location: "Pune",
    applyLink: "#"
  },
  {
    title: "Back-End Developer",
    company: "CodeCraft",
    location: "Chennai",
    applyLink: "#"
  },
  {
    title: "UI/UX Designer",
    company: "DesignFlow",
    location: "Jaipur",
    applyLink: "#"
  },
  {
    title: "Digital Marketing Specialist",
    company: "AdSphere",
    location: "Kolkata",
    applyLink: "#"
  },
  {
    title: "Content Writer",
    company: "WordSmith",
    location: "Lucknow",
    applyLink: "#"
  },
  {
    title: "IT Support Specialist",
    company: "TechCare",
    location: "Ahmedabad",
    applyLink: "#"
  }
];

// Function to display job listings dynamically
function displayJobs(jobs) {
  const jobsContainer = document.getElementById("jobs-container");
  const loading = document.getElementById("loading");

  // Clear any previous content in the container
  jobsContainer.innerHTML = "";
  loading.style.display = "none"; // Hide the loading message

  // Iterate through each job in the list and create job cards
  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <a href="#" class="apply-link">Apply Now</a>
    `;

    jobsContainer.appendChild(jobCard);
  });

  // Attach click event to all "Apply Now" buttons
  const applyLinks = document.querySelectorAll(".apply-link");
  applyLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("The page you are looking for could not be found.");
    });
  });
}

// Simulate a loading delay and then display the jobs
document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "block"; // Show loading message

  setTimeout(() => {
    displayJobs(mockJobs);
  }, 1000); // Simulated 1-second delay before loading jobs
});