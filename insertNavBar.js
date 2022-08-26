const navSection = document.getElementById("nav-section");
navSection.innerHTML = `
<nav id="navbar">
<header id="nav-header">
    <div id="header-img">
        <img src="static/header-photo.jpeg">
    </div>
    <h1>Dan Meleras</h1>
</header>
<!-- TODO give each div  -->
<a class="nav-link" id='index-link' href='index.html'><p>Home</p></a><hr>
<a class="nav-link" id='web-dev-link' href='web-dev.html'><p>Web Dev</p></a><hr>
<a class="nav-link" id='data-link' href='data.html'><p>Data Science</p></a><hr>
<a class="nav-link" id='blog-link' href='blog.html'><p>Blog</p></a><hr>
<a class="nav-link future-section"><p>Potential Future Section 1</p></a><hr>
<a class="nav-link future-section"><p>Potential Future Section 2</p></a><hr>
<div id="icon-links">
    <a href="https://github.com/danme-l"><i class="fa-brands fa-github"></i></a>
    <a href="https://www.linkedin.com/in/daniel-meleras-29794920a/"><i class="fa-brands fa-linkedin-in"></i></a>
</div>
</nav>
`
// highlight the current page on the navbar
let linkID = window.location.pathname.split("/").pop().split(".").shift() + '-link';
let curLink = document.getElementById(linkID);
curLink.style.color = 'white';
curLink.style.backgroundColor = 'darkslateblue';