//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const homeStartingContent =
  "Welcome to the Daily Journal, your personal space to share thoughts, stories, and experiences. Here, you can compose new posts, read inspiring content from others, and explore a vibrant community of writers. Our platform encourages creativity, reflection, and connection through the power of words. Whether you are here to document your daily life or to find inspiration, we provide a welcoming environment for all voices. Join us and start your journaling journey today!";
const aboutContent =
  "Our About page shares the story behind the Daily Journal, highlighting our mission to provide a welcoming platform for personal expression and community connection. We believe in the power of storytelling to inspire, heal, and bring people together. Learn more about our values, goals, and the team dedicated to supporting your journaling journey. We are committed to fostering a safe and inclusive environment where every voice matters. Join us as we continue to grow and evolve, creating a space for creativity and meaningful connections.";
const contactContent =
  "Our Contact page provides multiple ways to get in touch with the Daily Journal team. Whether you have questions, feedback, or want to collaborate, we welcome your messages. Reach out via email, social media, or our contact form. We are committed to responding promptly and fostering open communication with our community. Your voice matters to us, and we look forward to hearing from you. We value every interaction and strive to create a supportive environment where your concerns and ideas are heard. Feel free to connect with us anytime, and join us in making the Daily Journal a better place for everyone.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    newPosts: posts,
  });
});

app.get("/posts/:postName", function (req, res) {
  // const postName = req.params.postName.replace(/-/g, " ").toLowerCase();
  const postName = _.lowerCase(req.params.postName);
  posts.forEach((post) => {
    // const postTitle = post.title.replace(/ /g, "-").toLowerCase();
    const postTitle = _.lowerCase(post.title);
    if (postTitle === postName) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    } else if (postTitle !== postName) {
      console.log("not a match");
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  console.log(posts);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
