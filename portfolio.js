document.addEventListener("DOMContentLoaded", function () {
  // Année actuelle dans le footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Menu hamburger
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Fermer le menu mobile quand on clique sur un lien
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Changement de la navbar au scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Données des projets
  const projects = [
    {
      title: "Application E-commerce Web",
      description:
        "Une application ReactJS avec backend Node.js pour la gestion des ventes, de la clientèlle,employé et analyse sur le flux de vente..",
      video: "videos/site_ecommerce.mp4",
      tags: ["ReactJS", "Tailwindcss", "Node.js", "Mysql"],
      category: ["fullstack", "web"],
      github: "https://github.com/mohamed-doumbia/react_ecommerce_app",
    },
    {
      title: "Application E-commerce Mobile",
      description:
        "Application Flutter avec backend Django pour la gestion des ventes, de la clientèlle,employé et analyse sur le flux de vente.",
      video: "videos/fpr2.mp4",
      tags: ["Flutter", "Django", "PostgreSQL"],
      category: ["fullstack", "mobile"],
      github: "https://github.com/mohamed-doumbia/flutter-e-commerce-app",
    },
    {
      title: "Application Web pour la gestion de Transport & Restauration",
      description:
        "Application ReactJS avec backend Spring boot pour la gestion de Transport & Restauration. Elle gère le paiement en ligne, de location de Transport personel, de Réservation des hotels et restaurants.",
      video: "videos/site_transport_resto.mp4",
      tags: ["ReactJS", "Tailwindcss", "Spring boot", "PostgreSQL"],
      category: ["fullstack", "web"],
      github: "https://github.com/mohamed-doumbia/transport-app",
    },
    {
      title: "Application Mobile pour la gestion Bancaire & Agricole",
      description:
        "Application Flutter avec backend Spring boot pour la gestion de banque et agricole. Elle gère la facilité de financement entre les banques et les agriculteurs en permettant aux banques d'investir sur les agriculteurs fiables grâce à un algorithme de scoring, permettant aux agriculteurs d'entrer en contact avec les acheteurs.",
      images: [
        "images/agri1.jpg",
        "images/agri2.jpg",
        "images/agri4.jpg",
        "images/agri5.jpg",
        "images/agri8.jpg",
        "images/agri3.jpg",
        "images/agri7.jpg",
        "images/agri6.jpg",
      ],
      tags: ["Flutter", "Spring boot", "PostgreSQL"],
      category: ["fullstack", "mobile"],
    },
  ];

  const projectsGrid = document.querySelector(".projects-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Afficher les projets
  function displayProjects(filter = "all") {
    projectsGrid.innerHTML = "";

    const filteredProjects =
      filter === "all"
        ? projects
        : projects.filter((project) => project.category.includes(filter));

    filteredProjects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      projectCard.innerHTML = `
        <div class="project-image">
          ${
            project.video
              ? `<video controls width="95%">
                  <source src="${project.video}" type="video/mp4">
                 </video>`
              : ""
          }
          ${
            project.images
              ? `<img src="${project.images[0]}" class="project-img" data-index="0"/>`
              : ""
          }
          ${
            project.images && project.images.length > 1
              ? `<button class="prev-btn">⬅️</button>
                 <button class="next-btn">➡️</button>`
              : ""
          }
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <div class="project-links">
            <a href="${project.github}" target="_blank">
              <i class="fab fa-github"></i> Code source
            </a>
          </div>
        </div>
      `;

      projectsGrid.appendChild(projectCard);

      // Gestion de la pagination des images pour chaque projet
      if (project.images && project.images.length > 1) {
        const imgElement = projectCard.querySelector(".project-img");
        const prevBtn = projectCard.querySelector(".prev-btn");
        const nextBtn = projectCard.querySelector(".next-btn");
        let imgIndex = 0;

        prevBtn.addEventListener("click", () => {
          imgIndex = (imgIndex - 1 + project.images.length) % project.images.length;
          imgElement.src = project.images[imgIndex];
        });

        nextBtn.addEventListener("click", () => {
          imgIndex = (imgIndex + 1) % project.images.length;
          imgElement.src = project.images[imgIndex];
        });
      }
    });
  }

  // Initialiser l'affichage
  displayProjects();

  // Filtrage des projets
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      displayProjects(filter);
    });
  });

  // Animation des barres de compétences
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
});
