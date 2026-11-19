/* =====================================================================
   IMAGE SETTINGS  -  the ONLY file you need to edit to change pictures
   ---------------------------------------------------------------------
   Two easy ways to change an image:
   1) Replace the file inside the images/ folder and keep the SAME name.
   2) Or put a new file in images/ and change its name below.
   Keep this file, index.html, style.css, script.js and the images/
   folder together in one folder.
   ===================================================================== */
const IMAGES = {
  favicon: "./favicon.svg",   // small icon on the browser tab (.svg, .png or .ico)
  ganesh:  "./ganesh.jpg",    // Ganesh ji picture above the blessing
  couple:  "./mohit.jpg",     // photo in "The Couple" section

  // Extra photos (the "Our Moments" gallery with full-screen viewer).
  // Empty list = gallery stays hidden. To show it, add file names, e.g.:
  //   gallery: ["images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg"],
  gallery: [],
  galleryPosition: "50% 25%"       // keeps faces inside the crop (x% y%)
};
