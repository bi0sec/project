import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuthStore } from '../store/authStore';

export function Certificate() {
  const { user } = useAuthStore();

  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Add certificate content
    doc.setFontSize(40);
    doc.text('Certificate of Completion', 150, 50, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text('This is to certify that', 150, 80, { align: 'center' });
    
    doc.setFontSize(30);
    doc.text(user?.name || '', 150, 100, { align: 'center' });
    
    doc.setFontSize(20);
    doc.text('has successfully completed the', 150, 120, { align: 'center' });
    doc.text('Security Awareness Training', 150, 135, { align: 'center' });
    
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 150, 160, { align: 'center' });

    doc.save('security-awareness-certificate.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-xl text-gray-600">
          You have successfully completed the Security Awareness Training
        </p>
      </div>

      <div className="border-4 border-gray-200 p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-8">Certificate of Completion</h1>
          <p className="text-xl mb-4">This is to certify that</p>
          <p className="text-3xl font-bold mb-4">{user?.name}</p>
          <p className="text-xl mb-4">has successfully completed the</p>
          <p className="text-2xl font-bold mb-8">Security Awareness Training</p>
          <p className="text-xl">
            Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={generateCertificate}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Certificate
        </button>
      </div>
    </div>
  );
}