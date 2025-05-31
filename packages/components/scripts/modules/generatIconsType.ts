import path from "path";
import fs from "fs";

function generateIconsType() {
  // Directory containing your Icons files

  const iconsDir = path.join(__dirname, "../../src/components/Icon/icons");
  // Get the list of files in the directory
  fs.readdir(iconsDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      process.exit(1);
    }

    // Filter files to get only .vue files and extract the base names (without extension)
    const iconNames = files
      .filter(
        (file) =>
          path.extname(file) === ".vue" && path.basename(file) !== "error.vue"
      )
      .map((file) => path.basename(file, ".vue"));

    // Generate TypeScript type content
    const typeContent = `
export type AvailableIcon = ${iconNames.map((name) => `"${name}"`).join(" | ")} | String;
`;

    // Write the TypeScript type to a file
    fs.writeFile(
      path.join(__dirname, "../../src/types/icon.ts"),
      typeContent,
      (err) => {
        if (err) {
          console.error("Error writing TypeScript file:", err);
          process.exit(1);
        }
        console.log("TypeScript type generated successfully!");
      }
    );
  });
}

generateIconsType();
