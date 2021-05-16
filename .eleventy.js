const htmlmin = require('html-minifier')
const sharp = require("sharp")
const Image = require("@11ty/eleventy-img")
const now = String(Date.now())

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src/static/images/${src}.jpg`, {
    widths: [600, 1000, 1600],
    formats: ["avif", "jpeg"],
    outputDir: "./_site/img/"
  });
  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)

  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy("src/static")

  eleventyConfig.addWatchTarget('./_tmp/style.css')

  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })
  
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/alpine.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy("static");

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }

    return content
  });

  return {
    dir: {
      input: "src",
      includes: "components",
      layouts: "layouts",
      data: "data",
    },
    htmlTemplateEngine: "njk",
  };
}