import figlet from "figlet";

export async function logFiglet(text: string) {
  const ascii = await figlet.text(text, {
    font: "3-d", // Try "Slant", "Ghost", etc.
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  const lines = ascii.split("\n");

  lines.forEach(line => {
    // Roughly divide into 4 parts (one per letter)
    const aPart = line.slice(0, 11);    // A
    const dPart = line.slice(11, 25);   // D
    const sPart = line.slice(25, 35);  // S
    const cPart = line.slice(35);      // C

    console.log(
      "%c" + aPart + "%c" + dPart + "%c" + sPart + "%c" + cPart,
      "color: #dc3d43; font-weight: bold;",     // A
      "color: #3cb179; font-weight: bold;",   // D
      "color: #0091ff; font-weight: bold;",    // S
      "color: #f7ce00; font-weight: bold;"   // C
    );
  });
}
