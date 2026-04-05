// Sample blog data
const blogsData = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    excerpt: "Explore the latest trends and best practices in web development. From frameworks to tools, we cover everything you need to know to get started.",
    date: "March 15, 2025",
    author: "Arv",
    image: "blogs/images/blog-1.svg",
    content: `
      <h3>Getting Started with Modern Web Development</h3>
      <p>The web development landscape is constantly evolving. In this blog, we'll explore the latest trends and best practices that every developer should know about.</p>
      <h4>Key Topics:</h4>
      <ul>
        <li>Frontend frameworks and their advantages</li>
        <li>Backend technology choices</li>
        <li>DevOps and deployment strategies</li>
        <li>Performance optimization techniques</li>
      </ul>
      <p>Whether you're just starting or looking to level up your skills, understanding these fundamentals will set you on the path to success.</p>
      <p>We share insights about modern web development practices and how to stay updated in this rapidly changing field.</p>
    `
  },
  {
    id: 2,
    title: "Design System Best Practices",
    excerpt: "Learn how to build scalable and maintainable design systems. We share our experience in creating cohesive digital experiences across products.",
    date: "March 10, 2025",
    author: "Deb",
    image: "blogs/images/blog-2.svg",
    content: `
      <h3>Design System Best Practices</h3>
      <p>A well-crafted design system can significantly improve your development workflow and product consistency.</p>
      <h4>What We Cover:</h4>
      <ul>
        <li>Component libraries and documentation</li>
        <li>Color systems and typography scales</li>
        <li>Accessibility in design systems</li>
        <li>Design tokens and theming</li>
      </ul>
      <p>In this article, we share our journey building a design system and the lessons we learned along the way. Creating systems that scale is both an art and a science.</p>
    `
  },
  {
    id: 3,
    title: "Productivity Tips for Remote Teams",
    excerpt: "Working remotely has become the norm. Discover practical strategies for staying productive and maintaining team cohesion while working from home.",
    date: "March 5, 2025",
    author: "Deb",
    image: "blogs/images/blog-3.svg",
    content: `
      <h3>Productivity Tips for Remote Teams</h3>
      <p>Remote work offers flexibility but also comes with unique challenges. Let's explore proven strategies to maximize productivity.</p>
      <h4>Topics:</h4>
      <ul>
        <li>Time management and scheduling</li>
        <li>Communication best practices</li>
        <li>Tools and workflows for collaboration</li>
        <li>Maintaining work-life balance</li>
      </ul>
      <p>With the right approach, remote teams can be just as (if not more) productive than co-located ones. We've learned this firsthand!</p>
    `
  }
];

// Sample projects data
const projectsData = [
  {
    id: 1,
    title: "TapMap",
    description: "An interactive mapping application for discovering and sharing locations with friends.",
    image: "projects/images/tapmap.svg",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://tapmap.debarv.com"
  },
  {
    id: 2,
    title: "Portfolio Sites",
    description: "Custom portfolio websites showcasing professional achievements and creative works.",
    image: "projects/images/portfolio.svg",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://arv.debarv.com"
  },
  {
    id: 3,
    title: "DebArv Platform",
    description: "A creative hub combining blogs, projects, and collaborative content for our community.",
    image: "projects/images/platform.svg",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "#projects"
  }
];

// Load blogs on page load
window.addEventListener('DOMContentLoaded', function() {
  loadBlogs();
  loadProjects();
});

function loadBlogs() {
  const blogGrid = document.getElementById('blogGrid');
  // Show only first 3 blogs on homepage
  const displayBlogs = blogsData.slice(0, 3);
  
  blogGrid.innerHTML = displayBlogs.map(blog => `
    <div class="blog-card" onclick="viewBlog(${blog.id})">
      <div class="blog-card-image">
        <img src="${blog.image}" alt="${blog.title}" />
      </div>
      <div class="blog-card-content">
        <div class="blog-card-date">${blog.date}</div>
        <h3 class="blog-card-title">${blog.title}</h3>
        <p class="blog-card-excerpt">${blog.excerpt}</p>
        <p class="blog-card-author">by ${blog.author}</p>
      </div>
    </div>
  `).join('');
}

function loadProjects() {
  const projectGrid = document.getElementById('projectGrid');
  
  projectGrid.innerHTML = projectsData.map(project => `
    <a href="${project.link}" class="project-card" target="${project.link.startsWith('http') ? '_blank' : '_self'}">
      <div class="project-card-image">
        <img src="${project.image}" alt="${project.title}" />
      </div>
      <div class="project-card-content">
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-description">${project.description}</p>
        <div class="project-card-tech">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

function viewBlog(blogId) {
  // Store the blog ID in session storage and redirect to blog page
  sessionStorage.setItem('selectedBlogId', blogId);
  window.location.href = 'blog.html';
}

// Make blog data globally accessible for blog.html
window.blogsData = blogsData;
