const path = require("path");

function dateFromFilename(inputPath) {
  if (!inputPath) {
    return null;
  }

  const baseName = path.basename(inputPath, path.extname(inputPath));

  // Support Unix timestamps used in note filenames (seconds or milliseconds).
  if (/^\d{10}$/.test(baseName)) {
    return new Date(Number(baseName) * 1000);
  }
  if (/^\d{13}$/.test(baseName)) {
    return new Date(Number(baseName));
  }

  // Support date-prefixed filenames like YYYY-MM-DD-my-post.md.
  const datePrefixMatch = baseName.match(/^(\d{4}-\d{2}-\d{2})(?:$|[-_])/);
  if (datePrefixMatch) {
    return new Date(`${datePrefixMatch[1]}T00:00:00.000Z`);
  }

  return null;
}

module.exports = {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: "note/{{ title | slug }}/",
  eleventyComputed: {
    date: (data) => {
      if (data.date) {
        return data.date;
      }

      return dateFromFilename(data?.page?.inputPath) || data?.page?.date;
    },
  },
};
