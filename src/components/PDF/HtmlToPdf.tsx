import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrintSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    const content = contentRef.current;
    if (content) {
      const canvas = await html2canvas(content); // Create a canvas from the content
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to the PDF and save it with the desired filename
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("sessionData.pdf"); // Set default save name
    }
  };

  return (
    <div>
      {/* Section you don't want to include in the print */}
      <div className="no-print">
        <h1 className="text-gray-700">This content won't be printed.</h1>
        <p>
          This is the rest of the page, but it will be hidden when printing.
        </p>
      </div>

      {/* Section you want to print */}
      <div ref={contentRef} className="print-section">
        <h1 className="text-red-500">Prabhat's Report</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Age</th>
              <th className="border border-gray-300 p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Prabhat</td>
              <td className="border border-gray-300 p-2">30</td>
              <td className="border border-gray-300 p-2">India</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handlePrint}
        className="no-print mt-6 bg-green-500 text-white p-3 rounded-md"
      >
        Print Section as PDF
      </button>
    </div>
  );
};

export default PrintSection;
