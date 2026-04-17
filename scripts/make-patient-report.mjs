import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "patient_report.pdf");

async function main() {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 750;
  const line = (text, size = 11, f = font, color = rgb(0.1, 0.15, 0.2)) => {
    page.drawText(text, { x: 50, y, size, font: f, color });
    y -= size + 8;
  };

  line("StayHealthy — Patient visit summary", 16, bold);
  line("Generated for course submission (sample data)", 10, font, rgb(0.4, 0.45, 0.5));
  y -= 6;

  line("Patient information", 13, bold);
  line("Name: Amina Rahman");
  line("Patient ID: SH-20481");
  line("Date of birth: 1991-04-12");
  line("Phone: +1 (555) 019-8844");
  line("Location: Highland Valley (remote clinic catchment)");
  y -= 6;

  line("Visit details", 13, bold);
  line("Clinician: Dr. Samira Khan — Family medicine");
  line("Visit date: 2026-04-17");
  line("Mode: Telehealth follow-up");
  y -= 6;

  line("Prescription", 13, bold);
  line("Medication: Amoxicillin 500 mg capsule");
  line("Sig: Take one capsule by mouth every 8 hours for 7 days");
  line("Quantity: 21 capsules");
  line("Refills: 0");
  line("Pharmacy notes: Patient counseled on completing full course.");
  y -= 10;

  line("Disclaimer: Fictitious record for educational use only.", 9, font, rgb(0.45, 0.45, 0.45));

  const bytes = await pdf.save();
  fs.writeFileSync(outPath, bytes);
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
